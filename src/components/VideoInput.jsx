import { useState } from "react";
import axios from "axios";
import VideoCards from "./VideoCards";
import CompareData from "./CompareData";
import ChatPanel from "./ChatPanel";
import "./VideoInput.css";

function VideoInput() {

  const [youtubeUrl, setYoutubeUrl] =
    useState("");

  const [instagramUrl, setInstagramUrl] =
    useState("");

  const [youtubeData, setYoutubeData] =
    useState(null);

  const [instagramData, setInstagramData] =
    useState(null);

  const [comparisonData, setComparisonData] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

 const handleAnalyze = async () => {

 

  if (loading) return;

  setLoading(true);

  try {

    if (youtubeUrl.trim()) {

      const youtubeResponse =
        await axios.get(
          `${process.env.REACT_APP_API_URL}/analyze?url=${encodeURIComponent(
            youtubeUrl
          )}`
        );

      

      setYoutubeData(
        youtubeResponse.data
      );

    }

    if (instagramUrl.trim()) {

      const instagramResponse =
        await axios.get(
          `${process.env.REACT_APP_API_URL}/instagram?url=${encodeURIComponent(
            instagramUrl
          )}`
        );

      

      setInstagramData(
        instagramResponse.data
      );

    }

  } catch (error) {

    console.error(error);

  } finally {

    setLoading(false);

  }

};

  const handleCompare = async () => {

    try {

      const response =
        await axios.post(
          `${process.env.REACT_APP_API_URL}/compare`,
          {
            youtubeUrl,
            instagramUrl
          }
        );

     

      setComparisonData(
        response.data
      );

    } catch (error) {

      console.error(error);

    }

  };

  return (

    <div className="video-container">

      <h1 className="video-title">
        Video Comparison RAG
      </h1>

      <div className="input-section">

        <input
          className="video-input"
          placeholder="YouTube URL"
          value={youtubeUrl}
          onChange={(e) =>
            setYoutubeUrl(
              e.target.value
            )
          }
        />

        <input
          className="video-input"
          placeholder="Instagram URL"
          value={instagramUrl}
          onChange={(e) =>
            setInstagramUrl(
              e.target.value
            )
          }
        />

        <button
          className="analyze-btn"
          disabled={loading}
          onClick={handleAnalyze}
        >
          {
            loading
              ? "Analyzing..."
              : "Analyze"
          }
        </button>

      </div>

      <VideoCards
        youtubeData={youtubeData}
        instagramData={instagramData}
      />

      {(youtubeData && instagramData) && (

        <div
          style={{
            marginTop: "20px",
            textAlign: "center"
          }}
        >

          <button
            className="analyze-btn"
            onClick={handleCompare}
          >
            Compare Videos
          </button>

        </div>

      )}

      <CompareData
  comparisonData={comparisonData}
/>

      <ChatPanel />
    </div>

  );

}

export default VideoInput;