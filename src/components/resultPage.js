import React, { useState } from "react";
import { useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import axios from "axios";
import { API_Key, baseUrl, videoStatsUrl } from "../constansts/constants";
import { getVideosList } from "../utility/utils";
import { getVideoIdList } from "../utility/utils";
import Videotile from "./videotile";

const ResultPage = () => {
  const search = useLocation().search;
  const query = new URLSearchParams(search).get("q");

  const history = useHistory();
  const [videosList, setVideosList] = useState([]);
  const [statsList, setStatsList] = useState([]);

  const handleSearchVideos = async () => {
    if (query.length !== 0) {
      const params = {
        part: "snippet",
        key: API_Key,
        maxResults: 30,
        q: query,
      };

      const {
        data: { items: result },
      } = await axios.get(baseUrl, { params });
      const videosList = getVideosList(result);
      setVideosList(videosList);
      return videosList;
    }
  };

  const handleSearchVideoStats = async (videosList) => {
    const videoIdList = getVideoIdList(videosList);

    const params = {
      part: "statistics",
      key: API_Key,
      id: videoIdList,
    };

    const {
      data: { items: videoStats },
    } = await axios.get(videoStatsUrl, { params });
    setStatsList(videoStats);
  };

  const playVideo = (videoId) => {
    history.push(`/watch?v=${videoId}`);
  };

  useEffect(() => {
    const fetchVideo = async () => {
      const result = await handleSearchVideos();
      await handleSearchVideoStats(result);
    };
    fetchVideo();
  }, [query]);

  return (
    <>
      {videosList.map((res, index) => {
        return (
          statsList[index] && (
            <Videotile
              key={index}
              data={res}
              stats={statsList[index]}
              playVideo={playVideo}
            />
          )
        );
      })}
    </>
  );
};

export default ResultPage;
