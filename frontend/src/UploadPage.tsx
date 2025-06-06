import { useState, useEffect } from 'react'
import { motion } from 'motion/react'
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import './App.css'
import React from 'react'
import { easeInOut } from 'motion'

import TopToolbarLoggedIn from './Components/ToolbarLogin/ToolbarLogin';

function App() {
  const [files, setFiles] = useState<File[]>([])
  const [savedImgs, setSavedImgs] = useState<string[]>([])
  const [showDebug, setShowDebug] = useState(false)
  const [showUploadPage, setShowUploadPage] = useState(false);
  const [message, setMessage] = useState('')
  const [colorTheme, setColorTheme] = useState([])
  const [user, setUser] = useState<{ name: string } | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    fetchSavedFiles();
  }, []);

  const fetchSavedFiles = async () => {
    try {
      const response = await axios.get('http://localhost:5001/files');
      setSavedImgs(response.data);
    } catch (error) {
      console.error('Failed to fetch saved files', error);
    }
  };

  const handleSelectFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
  
    const selectedFiles: File[] = Array.from(e.target.files); // Explicitly set type
    setFiles(selectedFiles);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    files.forEach((file) => formData.append('files', file));

    try {
      const response = await axios.post('http://localhost:5001/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log(response.data.message);
      fetchSavedFiles(); // Refresh saved files after upload
      setFiles([]); // Clear selected files
    } catch (error) {
      console.error('Failed to upload files', error);
    }
  };


 
  return (
    <>
      {user && <TopToolbarLoggedIn username={user.name} onLogout={() => {
        localStorage.removeItem("user");
        navigate("/");
      }} />}
      <div className="card">
        <div className="input-div">
          <p>drag and drop images or <span className="browse">browse</span></p>
          <input 
            type="file" 
            className="file" 
            multiple 
            accept="image/png, image/jpeg, image/jpg" 
            onChange={handleSelectFiles}>
          </input>
        </div>
        <p>
          Drag and drop or upload an image! Or you could drive to the mall... and find clothes yourself...
        </p>

        <button onClick={() => setShowDebug(!showDebug)} className="debug-button">debug</button>
        
        <motion.div
          initial={{opacity: 0, height: 0}}
          animate={{opacity: showDebug ? 1 : 0, height: showDebug ? "auto" : 0}}
          transition={{duration: 0.5, ease: easeInOut}}
          >
        <form id="saved-form">
          <div className="header">
            <h3>Saved In Server</h3>
          </div>
          <div className="saved-div">
            {savedImgs.map((fileUrl, index) => (
              <div key={index} className="saved-item">
                <img src={`http://localhost:5001${fileUrl}`} alt={`saved-${index}`} className="preview-image" />
                <p>{fileUrl.split('/').pop()}</p>
              </div>
            ))}
          </div>
        </form>

        <form id="queued-form" onSubmit={handleUpload}>
          <div className="header">
            <h3>Queued in Frontend</h3>
            <button type="submit">Upload</button>
          </div>
          <div className="queued-div">
            {/* Display selected files as previews inside the queued-form */}
            {files.length > 0 && (
              <div className="preview-container">
                <div className="preview-images">
                  {files.map((file, index) => (
                    <div key={index} className="preview-item">
                      <img
                        src={URL.createObjectURL(file)} // Preview URL for the file
                        alt={`file-preview-${index}`}
                        className="preview-image"
                      />
                      <p>{file.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </form>
        </motion.div>
        
        
      </div>

    </>
  )
}

export default App
