import TweetCard from "./TweetCard";

export default function Tweets({ user }) {
  if (!user.twitterId && user.tweets.data.length < 1) {
    return <></>;
  }

  const { tweets } = user;

  const tweetsArr = tweets.data;

  console.warn(tweets);
  console.info(tweetsArr)
  
  if(!tweetsArr) {
      return <></>
  }

  const newTweetsArr = tweetsArr.filter(tweet => tweet.text.includes("#30DaysOfCode"))

  if(newTweetsArr.length < 1) {
    return <></>
    }

  return (
    <div className="articles-section">
      {tweetsArr && tweetsArr.length > 0 && <h2>My Coding Journey 📝</h2>}
      {tweetsArr && tweetsArr.length > 0 && (
        <div className="container-fluid blue-bg">
        <div className="container">
          <section className="timeline">
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
