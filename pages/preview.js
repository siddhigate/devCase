import { useUserContext } from "../src/context/user-context";
import { useEffect, useState } from "react";

const generateLandingMarkup = (user) => {
  let landingMarkup = "";
  if (user && user.github) {
    landingMarkup += `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Siddhi Gate</title>
        
            
            <link rel="preconnect" href="https://fonts.googleapis.com">
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
            <link
                href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
                rel="stylesheet">
        
                <link rel="stylesheet" href="https://devcaseui.vercel.app/style.css">
        
        </head>
        <body>
            
            <header class="header">
                <div class="flex-all-center">
                    <img class="logo" src="${user.github.avatar_url}" alt="profile picture">
                    ${user.github.login}
                </div>
            </header>
        
            <main class="main-wrapper">
                <div class="main-info">
                    <div class="wrapper">
                        
                    <h1>${user.github.name}</h1>
                    <p>${user.github.bio}</p>
                    <a href="${user.github.html_url}">Get in touch</a>
                    </div>
                </div>
                <div class="main-image">
                    <img src="${user.github.avatar_url}" alt="profile picture">
                </div>
            </main>
        </body>
        </html>`;
  }
  return landingMarkup;
};

const generateProjectsMarkup = (repos) => {
  let projectMarkup = "";

  if (repos.length > 0) {
    projectMarkup += `<div className='articles-section'><h2>My Projects 👩‍💻</h2>
        <div className='projects'>
            `;

    for (let i = 0; i < 6; i++) {
      projectMarkup += `
      
      <div className="card project-card">
        <h3>${repos[i].name}</h3>
        <p>${repos[i].description}</p>
        <p className="createdAt">Created at: ${new Date(
          repos[i].createdAt
        ).toDateString()}</p>
        <p>Language: ${repos[i].language}</p>
        
        <a className="link link-primary" href=${repos[i].liveURL}>live demo</a>
        <a className="link link-secondary" href=${repos[i].repoURL}>see repo</a>
    </div>`;
    }

    projectMarkup += `</div>`;
  }
  return projectMarkup;
};

const generateArticlesMarkup = (hashnode, articles) => {
  if (!hashnode && articles.length < 1) {
    return "";
  }

  let articlesMarkup = `<div class="articles-section"><h2>My Articles 📝</h2>`;

  for (let i = 0; i < 4; i++) {
    articlesMarkup += `
        
        <div class="article-card">
            <img src="${articles[i].coverImage}" alt="">
            <h3>${articles[i].title}</h3>
            <p>${articles[i].brief}</p>
            <a href="https://${hashnode}.hashnode.dev/${articles[i].slug}">Read more</a>
        </div>
        `;
  }

  articlesMarkup += `</div>`;

  return articlesMarkup;
};

const generateTweetsMarkup = (user) => {
  if (!user.twitterId) {
    return "";
  }

  if (!user.tweets.data) {
    return "";
  }

  if (user.tweets.data.length < 1) {
    return "";
  }

  let tweetsMarkup = `<div class="articles-section">
    <h2>My Coding Journey 📝</h2>`;

  const tweetsArr = user.tweets.data;
  const newTweetsArr = tweetsArr.filter((tweet) =>
    tweet.text.includes("#30DaysOfCode")
  );

  if(newTweetsArr.length < 1) {
      return "";
  }

  for (let i = 0; i < 6; i++) {
    if (i <= newTweetsArr.length) {
      if (i % 2 === 0) {
        tweetsMarkup += `
                <div class="timeline-item"> 
                <div class="timeline-img"></div>

                <div class="timeline-content js--fadeInLeft">
                  <div class="date">
                    ${new Date(newTweetsArr[i].created_at).toDateString()}
                  </div>
                  <p style={{ marginTop: "5rem" }}>${newTweetsArr[i].text}</p>
                </div>
                </div>
                `;
      } else {
        tweetsMarkup += `
                    <div class="timeline-item"> 
                    <div class="timeline-img"></div>

                    <div class="timeline-content js--fadeInRight">
                      <div class="date">
                        {new Date(tweet.created_at).toDateString()}
                      </div>
                      <p style={{ marginTop: "5rem" }}>{tweet.text}</p>
                    </div>
                    </div>
                `;
      }
    }
  }

  tweetsMarkup += `</div>`;
  return tweetsMarkup;
};

const generateFooterMarkup = (user) => {};

const generateBody = (user) => {
  let markup = "";

  if (!user.github) {
    return markup;
  }

  if (user.github) {
    markup += generateLandingMarkup(user);

    if (user.githubRepos && user.githubRepos.length > 0) {
      markup += generateProjectsMarkup(user.githubRepos);
    }

    if (user.hashnode && user.articles.articles.length > 1) {
      markup += generateArticlesMarkup(user.hashnode, user.articles.articles);
    }

    if (user.twitterId && user.tweets.data && user.tweets.data.length > 0) {
      console.log("hereeeeeeeeeee");
      markup += generateTweetsMarkup(user);
    }
  }
  return markup;
};

export default function Preview() {
  const [userContent, setUserContent] = useState("");
  const { user } = useUserContext();

  useEffect(() => {
    setUserContent(generateBody(user));
  }, [user]);

  const handleClipboard = () => {
    navigator.clipboard.writeText(userContent);
  };

  const download = (filename, textInput) => {
    let element = document.createElement("a");
    element.setAttribute(
      "href",
      "data:text/plain;charset=utf-8, " + encodeURIComponent(textInput)
    );
    element.setAttribute("download", filename);
    document.body.appendChild(element);
    element.click();
  };

  const handleDownload = () => {
    var filename = "portfolio.html";
    download(filename, userContent);
  };

  return (
    <>
      {user && (
        <div className="preview">
          <h1>preview✨</h1>
          <button className="btn-preview" onClick={handleClipboard}>
            copy to clipboard
          </button>
          <button className="btn-preview" onClick={handleDownload}>
            download
          </button>
          <textarea value={userContent} />
        </div>
      )}
    </>
  );
}
