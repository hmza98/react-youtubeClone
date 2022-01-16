import React from "react";

const Videotile = ({ data, stats, playVideo }) => {
  return (
    <div
      className="card"
      onClick={() => {
        playVideo(stats.id, data.channelId);
      }}
    >
      <img
        className="card-img-top thumbnail"
        src={data.thumbnail}
        alt="Card image cap"
      />
      <div className="card-body">
        <h5 className="card-title">{data.videoTitle}</h5>
        <p className="card-text">
          {stats.statistics.viewCount} and {data.publishedAt}
        </p>
        <p className="card-text">{data.channelTitle}</p>
      </div>
    </div>
  );
};

export default Videotile;
