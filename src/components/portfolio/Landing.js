export default function Landing({ user }) {
  return (
    <>
      <header className="header">
        <div className="flex-all-center">
          <img className="logo" src={user.github.avatar_url} alt={user.github.login}></img>
          {user.github.login}
        </div>
      </header>

      <main className="main-wrapper">
        <div className="main-info">
          <div className="wrapper">
            <h1>{user.github.login}</h1>
            <p>{user.github.bio}</p>
            <a href="./">Get in touch</a>
          </div>
        </div>
        <div className="main-image">
          <img src={user.github.avatar_url} alt=""></img>
        </div>
      </main>
    </>
  );
}
