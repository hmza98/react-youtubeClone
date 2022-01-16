import React from "react";

const Player = ({ videoId }) => {
  return (
    <div>
      <iframe
        height="600"
        width="1000"
        title={videoId}
        className="video-iframe"
        src={`https://www.youtube.com/embed/${videoId}`}
      />
    </div>
  );
};

export default Player;
