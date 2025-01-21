import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [files, setFiles] = useState([])
  const [savedImgs, setSavedImgs] = useState([])
  const [message, setMessage] = useState('')

  useEffect(() => {
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

  const handleSelectFiles = (e) => {
    const selected = e.target.files;
    const files = Array.from(selected)
    setFiles(files);
  }

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
      <h1>Fluffle!</h1>
      <h2>daily fit checks</h2>
      <div className="card">
        <div class="input-div">
          <p>drag and drop images or <span class="browse">browse</span></p>
          <input 
            type="file" 
            class="file" 
            multiple="multiple" 
            accept="image/png, image/jpeg, image/jpg" 
            onChange={handleSelectFiles}>
          </input>
        </div>
        <p>
          Drag and drop or upload an image! Or you could drive to the mall... and find clothes yourself...
        </p>
        
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
          <div class="header">
            <h3>Queued in Frontend</h3>
            <button type="submit">Upload</button>
          </div>
          <div class="queued-div">
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
        
        
      </div>

    </>
  )
}

export default App
