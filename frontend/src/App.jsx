import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [files, setFiles] = useState([]);
  const [message, setMessage] = useState('');

  const handleSelectFiles = (e) => {
    const selected = e.target.files;
    const files = Array.from(selected)

    const previews = files.map((file) => URL.createObjectURL(file))

    setFiles(files);
  }

 
  return (
    <>
      <h1>FitFinder</h1>
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
          <div class="header">
            <h3>Saved In Server</h3>
            <button type="submit">Delete</button>
          </div>
          <div class="saved-div"></div>
        </form>

        <form id="queued-form">
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
