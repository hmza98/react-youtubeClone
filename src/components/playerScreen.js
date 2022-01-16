import React, { useEffect, useState } from "react";
import Player from "./videoplayer";
import { useHistory, useLocation } from "react-router";
import axios from "axios";
import { API_Key, baseUrl, videoStatsUrl } from "../constansts/constants";
import { getVideosList, getVideoIdList } from "../utility/utils";
import Videotile from "./videotile";

const PlayerScreen = () => {
  const search = useLocation().search;
  const videoId = new URLSearchParams(search).get("v");

  const history = useHistory();
  const [relatedVideos, setRelatedVideos] = useState([]);
  const [relatedVideosStats, setRelatedVideosStats] = useState([]);

  const handleRelatedVidos = async () => {
    const params = {
      part: "snippet",
      key: API_Key,
      maxResults: 20,
      relatedToVideoId: videoId,
      type: "video",
    };

    const {
      data: { items: result },
    } = await axios.get(baseUrl, { params });

    const relatedVideosList = getVideosList(result);

    setRelatedVideos(relatedVideosList);
    return relatedVideosList;
  };

  const handleRelatedVidoStats = async (result) => {
    const videoIdList = getVideoIdList(result);
    const params = {
      part: "statistics",
      key: API_Key,
      id: videoIdList,
    };

    const {
      data: { items: videoStats },
    } = await axios.get(videoStatsUrl, { params });
    setRelatedVideosStats(videoStats);
    return videoStats;
  };

  const playVideo = (videoId) => {
    history.push(`/watch?v=${videoId}`);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchRelatedVideos = async () => {
      const result = await handleRelatedVidos();
      await handleRelatedVidoStats(result);
    };
    fetchRelatedVideos();
  }, [videoId]);

  return (
    <div className="player-window">
      <Player videoId={videoId} />
      <div className="player-relt-tiles">
        {relatedVideos.map((res, index) => {
          return (
            relatedVideosStats[index] && (
              <Videotile
                key={index}
                data={res}
                stats={relatedVideosStats[index]}
                playVideo={playVideo}
              />
            )
          );
        })}
      </div>
    </div>
  );
};

export default PlayerScreen;
