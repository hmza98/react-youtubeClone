const getVideosList = (objectsList) => {
  const videosList = [];
  for (let r of objectsList) {
    if (typeof r["id"])
      if (r["snippet"]) {
        videosList.push({
          videoId: r["id"]["videoId"],
          channelId: r["snippet"]["channelId"],
          channelTitle: r["snippet"]["channelTitle"],
          videoTitle: r["snippet"]["title"],
          videoDescription: r["snippet"]["description"],
          thumbnail: r["snippet"]["thumbnails"]["default"]["url"],
          publishedAt: r["snippet"]["publishedAt"],
        });
      }
  }
  return videosList;
};

const getHomePageVideosList = (objectsList) => {
  const videosList = [];
  for (let r of objectsList) {
    videosList.push({
      videoId: r["id"],
      channelId: r["snippet"]["channelId"],
      channelTitle: r["snippet"]["channelTitle"],
      videoTitle: r["snippet"]["title"],
      videoDescription: r["snippet"]["description"],
      thumbnail: r["snippet"]["thumbnails"]["default"]["url"],
      publishedAt: r["snippet"]["publishedAt"],
    });
  }
  return videosList;
};

const getVideoIdList = (data) => {
  let videoIdList = "";
  for (let a of data) {
    videoIdList = videoIdList.concat(`${a.videoId},`);
  }
  return videoIdList;
};

export { getVideosList, getHomePageVideosList, getVideoIdList };
