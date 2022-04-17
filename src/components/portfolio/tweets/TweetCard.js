export default function TweetCard({ tweet, index }) {
    console.log(index % 2 === 0)

    if(!tweet.text.includes("#30DaysOfCode")) {
        return <></>
    }

  return (
    <div className="timeline-item" key={Math.random()}>
      {tweet &&
        (index % 2 === 0 ? (
          <>
            <div className="timeline-img"></div>

            <div className="timeline-content js--fadeInLeft">
              <div className="date">
                {new Date(tweet.created_at).toDateString()}
              </div>
              <p style={{ marginTop: "5rem" }}>{tweet.text}</p>
            </div>
          </>
        ) : (
          <>
            <div className="timeline-img"></div>

            <div className="timeline-content js--fadeInRight">
              <div className="date">
                {new Date(tweet.created_at).toDateString()}
              </div>
              <p style={{ marginTop: "5rem" }}>{tweet.text}</p>
            </div>
          </>
        ))}
    </div>
  );
}
