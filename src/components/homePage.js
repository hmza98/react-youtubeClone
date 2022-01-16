import React from "react";
import { API_Key } from "../constansts/constants";
import { getHomePageVideosList, getVideoIdList } from "../utility/utils";
import axios from "axios";
import { useState, useEffect } from "react";
import { videoStatsUrl } from "../constansts/constants";
import Videotile from "./videotile";
import { useHistory } from "react-router-dom";

const HomePage = () => {
  const [homeVideos, setHomePageVideos] = useState([]);
  const [homeVidStats, setHomePageVidStats] = useState([]);
  const history = useHistory();

  const handleHomePageVideos = async () => {
    const params = {
      part: "snippet",
      key: API_Key,
      maxResults: 12,
      chart: "mostPopular",
      regionCode: "PK",
    };

    const {
      data: { items: result },
    } = await axios.get(videoStatsUrl, { params });

    const videosList = getHomePageVideosList(result);

    setHomePageVideos(videosList);
    return videosList;
  };

  const handleVideoStats = async (result) => {
    const videoIdList = getVideoIdList(result);

    const params = {
      part: "statistics",
      key: API_Key,
      id: videoIdList,
    };

    const {
      data: { items: videoStats },
    } = await axios.get(videoStatsUrl, { params });
    setHomePageVidStats(videoStats);
    return videoStats;
  };

  const playVideo = (videoId) => {
    history.push(`/watch?v=${videoId}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      const result = await handleHomePageVideos();

      await handleVideoStats(result);
    };
    fetchData();
  }, []);

  return (
    <>
      {homeVideos.map((res, index) => {
        return (
          homeVidStats[index] && (
            <Videotile
              key={index}
              data={res}
              stats={homeVidStats[index]}
              playVideo={playVideo}
            />
          )
        );
      })}
    </>
  );
};
export default HomePage;
