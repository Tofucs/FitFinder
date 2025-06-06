const express = require('express')
const cors = require("cors")
const bcrypt = require("bcrypt")
const app = express()
const { pool } = require("./dbConfig")
require('dotenv').config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

const PORT = process.env.PORT || 4000;

app.use(express.urlencoded({extended: false}));

app.get('/', (req, res) => {
    res.send("Hi");
});

app.post('/api/register', async (req, res)=> {
    const {name, email, pw, confirmpw} = req.body;

    let errors = [];

    console.log({name, email, pw, confirmpw})

    if (!name || !email || !pw || !confirmpw) { 
        errors.push({ message: "Please enter all fields" });
    }

    if (pw.length < 8) {
        errors.push({ message: "Password must be a least 8 characters long" });
    }

    if (pw !== confirmpw) {
        errors.push({ message: "Passwords do not match" });
    }

    if (errors.length > 0) {
        return res.status(400).json({ message: errors.map(e => e.message).join(", ") });
    }

    try {
        let existing;
        try {
            existing = await pool.query(
                "SELECT * FROM users WHERE email = $1",
                [email]
            );
        } catch (err) {
            console.error("DB error on checking existing email:", err);
            return res.status(500).json({ message: "DB error" });
        }

        if (existing.rows.length > 0) {
            return res.status(400).json({ message: "Email already in use" });
        }

        const hashedPw = await bcrypt.hash(pw, 10)

        let newUser;
        try {
            newUser = await pool.query(
                "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email",
                [name, email, hashedPw]
            );
        } catch (err) {
            console.error("DB error on insert:", err);
            return res.status(500).json({ message: "Insert error" });
        }

        res.status(201).json({
            message: "User registered successfully",
            user: newUser.rows[0]
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
})

app.post('/api/login', async (req, res) => {
    const { name, password } = req.body;

  if (!name || !password) {
    return res.status(400).json({ message: "Please enter both your username and password" });
  }

  try {
    const result = await pool.query("SELECT * FROM users WHERE name = $1", [name]);

    if (result.rows.length === 0) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const user = result.rows[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // Don't return the hashed password
    return res.json({
      user: {
        name: user.name,
        email: user.name,
        id: user.id
      }
    });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ message: "Server error during login" });
  }
});

app.get("/api/userinfo", (req, res) => {
    const storedUser = req.query.user || null;
  
    if (!storedUser) {
      // simulate fetching for now
      const localUser = {
        name: "Demo User",
        username: "demo_user",
        date_joined: "2024-01-01",
      };
      return res.json({ user: localUser });
    }
  
    return res.status(401).json({ message: "Unauthorized" });
  });


app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
});