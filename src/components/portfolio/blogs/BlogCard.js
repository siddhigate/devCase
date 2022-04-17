export default function BlogCard({ hashnode, article }) {
  return (
    <div className="article-card" key={Math.random()}>
      {article && (
        <>
          <img src={article.coverImage}></img>
          <h3>{article.title}</h3>
          <p>{article.brief}</p>
          <a href={`https://${hashnode}.hashnode.dev/${article.slug}`}>
            Read more
          </a>
        </>
      )}
    </div>
  );
}
