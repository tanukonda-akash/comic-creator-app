// App.js
import React, { useState } from 'react';
import axios from 'axios';
import './App.css'; // Import the CSS file
import Collage from './Collage'; // Import the Collage component

const API_URL = "https://xdwvg9no7pefghrn.us-east-1.aws.endpoints.huggingface.cloud";
const BEARER_TOKEN = "VknySbLLTUjbxXAXCjyfaFIPwUTCeRXbFSOjwRiCxsxFyhbnGjSFalPKrpvvDAaPVzWEevPljilLVDBiTzfIbWFdxOkYJxnOPoHhkkVGzAknaOulWggusSFewzpqsNWM";

const App = () => {
  const [panels, setPanels] = useState(Array(10).fill(''));
  const [comicPreviews, setComicPreviews] = useState(Array(10).fill(''));

  const handlePanelChange = (index, value) => {
    const updatedPanels = [...panels];
    updatedPanels[index] = value;
    setPanels(updatedPanels);
  };

  const generateComic = async () => {
    try {
      const responses = await Promise.all(panels.map(panel => axios.post(
        API_URL,
        { "inputs": panel },
        {
          headers: {
            "Accept": "image/png",
            "Authorization": `Bearer ${BEARER_TOKEN}`,
            "Content-Type": "application/json"
          },
          responseType: 'arraybuffer',
        }
      )));

      const imageUrls = responses.map(response => {
        if (response.status === 200) {
          return URL.createObjectURL(new Blob([response.data], { type: 'image/png' }));
        } else {
          console.error('Failed to generate comic. Status:', response.status);
          return ''; // Empty URL in case of failure
        }
      });

      console.log('Image URLs:', imageUrls);
      setComicPreviews(imageUrls);
    } catch (error) {
      console.error('Error generating comic:', error.message);
    }
  };

  return (
    <div className="app">
      <div className="form-section panel-input">
        <h2 className='formtitle'>Comic Section</h2>
        <form>
          {panels.map((panel, index) => (
            <div key={index}>
              <label htmlFor={`panel${index + 1}`}>{`Panel ${index + 1}:`}</label>
              <input
                id={`panel${index + 1}`}
                className="panel-text"
                value={panel}
                onChange={(e) => handlePanelChange(index, e.target.value)}
              ></input>
            </div>
          ))}
          <button type="button" onClick={generateComic}>Generate Comic</button>
        </form>
      </div>

      <div className="comic-section">
        <div className="preview">
          <h2>Comic Preview</h2>
          <Collage images={comicPreviews} />
        </div>
      </div>
    </div>
  );
};

export default App;
