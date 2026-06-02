function VideoCards({

  youtubeData,

  instagramData

}) {

  return (

    <div className="cards">

      {youtubeData && (

        <div className="card">

          <h3>Video A</h3>

          <p>
            <strong>Title:</strong>{" "}
            {youtubeData.metadata.title}
          </p>

          <p>
            <strong>Creator:</strong>{" "}
            {youtubeData.metadata.channel}
          </p>

          <p>
            <strong>Views:</strong>{" "}
            {youtubeData.metadata.views}
          </p>

          <p>
            <strong>Likes:</strong>{" "}
            {youtubeData.metadata.likes}
          </p>

          <p>
            <strong>Duration:</strong>{" "}
            {youtubeData.metadata.duration}
          </p>

          <p>
  <strong>Upload Date:</strong>{" "}
  {youtubeData.metadata.uploadDate}
</p>

          <p>
            <strong>Hashtags:</strong>{" "}
            {
              youtubeData.metadata.hashtags
                ?.join(", ")
            }
          </p>

          <p>
            <strong>
              Engagement Rate:
            </strong>{" "}
            {
              youtubeData.metadata
                .engagementRate
            }%
          </p>

        </div>

      )}

      {instagramData && (

        <div className="card">

          <h3>Video B</h3>

          <p>
            <strong>Creator:</strong>{" "}
            {instagramData.data?.creator}
          </p>

          <p>
            <strong>Views:</strong>{" "}
            {instagramData.data?.views}
          </p>

          <p>
            <strong>Likes:</strong>{" "}
            {instagramData.data?.likes}
          </p>

          <p>
            <strong>Hashtags:</strong>{" "}
            {
              instagramData.data
                .hashtags?.join(", ")
            }
          </p>

          <p>
            <strong>
              Engagement Rate:
            </strong>{" "}
            {
              instagramData.data
                .engagementRate
            }%
          </p>

        </div>

      )}

    </div>

  );

}

export default VideoCards;