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
            <div class="timeline-img"></div>

            <div class="timeline-content js--fadeInLeft">
              <div class="date">
                {new Date(tweet.created_at).toDateString()}
              </div>
              <p style={{ marginTop: "5rem" }}>{tweet.text}</p>
            </div>
          </>
        ) : (
          <>
            <div class="timeline-img"></div>

            <div class="timeline-content js--fadeInRight">
              <div class="date">
                {new Date(tweet.created_at).toDateString()}
              </div>
              <p style={{ marginTop: "5rem" }}>{tweet.text}</p>
            </div>
          </>
        ))}
    </div>
  );
}
