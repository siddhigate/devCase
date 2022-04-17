import BlogCard from "./BlogCard";

export default function Blogs({ user }) {
  if (!user.hashnode && user.articles.length < 1) {
    return <></>;
  }

  const { hashnode, articles } = user;

  const articlesArr = articles.articles;

  return (
    <div className="articles-section">
      {articlesArr.length > 0 && <h2>My Articles 📝</h2>}
      {articlesArr.length > 0 && (
        <div className="articles-container">
          {articlesArr.map((article) => (
            <BlogCard hashnode={hashnode} article={article}></BlogCard>
          ))}
        </div>
      )}
    </div>
  );
}
