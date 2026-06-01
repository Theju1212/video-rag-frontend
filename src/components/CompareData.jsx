function CompareData({

  comparisonData

}) {

  if (!comparisonData)
    return null;

  return (

    <div
      className="card"
      style={{
        marginTop: "20px"
      }}
    >

      <h3>
        Comparison
      </h3>

      <p>
        <strong>
          YouTube Creator:
        </strong>{" "}
        {comparisonData.youtube.creator}
      </p>

      <p>
        <strong>
          Instagram Creator:
        </strong>{" "}
        {comparisonData.instagram.creator}
      </p>

      <p>
        <strong>
          YouTube Views:
        </strong>{" "}
        {comparisonData.youtube.views}
      </p>

      <p>
        <strong>
          Instagram Views:
        </strong>{" "}
        {comparisonData.instagram.views}
      </p>

    </div>

  );

}

export default CompareData;