function Message({ msg }) {

  return (

    <div
      className={
        msg.role === "user"
          ? "message user-message"
          : "message bot-message"
      }
    >

      <p>{msg.text}</p>

      {
        msg.sources &&
        msg.sources.length > 0 && (

          <div className="source-box">

            <strong>
              Sources:
            </strong>

            <ul>

              {msg.sources.map(
                (source, index) => (

                  <li key={index}>
                    {source}
                  </li>

                )
              )}

            </ul>

          </div>

        )
      }

    </div>

  );

}

export default Message;