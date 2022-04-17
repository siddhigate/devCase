import TweetCard from "./TweetCard";

export default function Tweets({ user }) {
  if (!user.twitterId && user.tweets.data.length < 1) {
    return <></>;
  }

  const { tweets } = user;

  const tweetsArr = tweets.data;

  console.warn(tweets);
  console.info(tweetsArr)

  return (
    <div className="articles-section">
      {tweetsArr && tweetsArr.length > 0 && <h2>My Coding Journey 📝</h2>}
      {tweetsArr && tweetsArr.length > 0 && (
        <div class="container-fluid blue-bg">
        <div class="container">
          <section class="timeline">
          {tweetsArr.map((tweet, index) => (
            <TweetCard key={Math.random()}  tweet={tweet} index={index}></TweetCard>
          ))}
        </section>
        </div>
        </div>
      )}
    </div>
  );
}
