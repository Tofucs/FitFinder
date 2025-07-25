const express = require('express')
const cors = require("cors")
const bcrypt = require("bcrypt")
const multer = require("multer")
const path = require("path")
const fs = require("fs")


const app = express()
const PORT = process.env.PORT || 4000;

const { pool } = require("./dbConfig")
require('dotenv').config();


//middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//images uploaded
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.use(express.urlencoded({extended: false}));

app.get('/', (req, res) => {
  res.send("Hi");
});

//multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, 'uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });



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
    const localUser = {
      name: "Demo User",
      username: "demo_user",
      date_joined: "2024-01-01",
    };
    return res.json({ user: localUser });
  }

  return res.status(401).json({ message: "Unauthorized" });
});

//image upload
app.post('/api/upload', upload.array('files'), async (req, res) => {
  const { userId } = req.body;
  if (!userId) {
    return res.status(400).json({ error: 'Missing userId' });
  }

  const fileUrls = req.files.map(file => `/uploads/${file.filename}`);

  try {
    for (const url of fileUrls) {
      await pool.query(
        'INSERT INTO user_images (user_id, image_url) VALUES ($1, $2)',
        [userId, url]
      );
    }
    res.json({ message: 'Files uploaded successfully', files: fileUrls });
  } catch (err) {
    console.error('Error saving file info:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

//listing images
app.get('/api/userimages/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const images = await pool.query(
      'SELECT * FROM user_images WHERE user_id = $1 ORDER BY date_uploaded DESC',
      [userId]
    );
    res.json(images.rows);
  } catch (err) {
    console.error('Error fetching images:', err);
    res.status(500).json({ error: 'Database error' });
  }
});


app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
});
