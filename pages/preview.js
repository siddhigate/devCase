import { useUserContext } from "../src/context/user-context";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from 'next/head'

const generateLandingMarkup = (user) => {
  let landingMarkup = "";
  if (user && user.github) {
    landingMarkup += `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${user.github.login}</title>
        
            
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
                        
                    <h1>${user.github.login}</h1>
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
    projectMarkup += `<div class='articles-section'><h2>My Projects 👩‍💻</h2>
        <div class='projects'>
            `;

    for (let i = 0; i < 6; i++) {

        if(repos.length > i){
      projectMarkup += `
      
      <div class="card project-card">
        <h3>${repos[i].name}</h3>
        <p>${repos[i].description}</p>
        <p class="createdAt">Created at: ${new Date(
          repos[i].createdAt
        ).toDateString()}</p>
        <p>Language: ${repos[i].language}</p>
        
        <a class="link link-primary" href=${repos[i].liveURL}>live demo</a>
        <a class="link link-secondary" href=${repos[i].repoURL}>see repo</a>
    </div>`;
    }}

    projectMarkup += `</div></div>`;
  }
  return projectMarkup;
};

const generateArticlesMarkup = (hashnode, articles) => {
  if (!hashnode && articles.length < 1) {
    return "";
  }

  let articlesMarkup = `<div class="articles-section"><h2>My Articles 📝</h2><div class="articles-container">`;

  for (let i = 0; i < 4; i++) {

    if(articles.length > i) {
    articlesMarkup += `
        
        <div class="article-card">
            <img src="${articles[i].coverImage}" alt="">
            <h3>${articles[i].title}</h3>
            <p>${articles[i].brief}</p>
            <a href="https://${hashnode}.hashnode.dev/${articles[i].slug}">Read more</a>
        </div>
        `;
    }
  }

  articlesMarkup += `</div></div>`;

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
    <h2>My Coding Journey 📝</h2> <div class="container-fluid blue-bg">
    <div class="container">
      <section class="timeline">`;

  const tweetsArr = user.tweets.data;
  const newTweetsArr = tweetsArr.filter((tweet) =>
    tweet.text.includes("#30DaysOfCode")
  );

  if (newTweetsArr.length < 1) {
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
                  <p style="margin-top: 5rem">${newTweetsArr[i].text}</p>
                </div>
                </div>
                `;
      } else {
        tweetsMarkup += `
                    <div class="timeline-item"> 
                    <div class="timeline-img"></div>

                    <div class="timeline-content js--fadeInRight">
                      <div class="date">
                        ${new Date(newTweetsArr[i].created_at).toDateString()}
                      </div>
                      <p style="margin-top: 5rem">${newTweetsArr[i].text}</p>
                    </div>
                    </div>
                `;
      }
    }
  }

  tweetsMarkup += `</section></div></div></div>`;
  return tweetsMarkup;
};

const generateFooterMarkup = (user) => {
  if (!user) {
    return "";
  }

  if (!user.github) {
    return "";
  }

  let githubMarkup = user.github
    ? `
    <li class="socials-list-item">
    <a href={user.github.html_url}>
        <i class="fa-brands fa-github social-icon"></i>
    </a>
    </li>
    `
    : null;

  let twitterMarkup = user.twitterId
    ? `
    <li class="socials-list-item">
    <a href="https://wwww.twitter.com/${user.twitterId.data.username}">
    <i class="fa-brands fa-twitter social-icon"></i>
</a></li>`
    : "";

  let hashnodeMarkup = user.hashnode
    ? `
    <li class="socials-list-item">
    <a href="https://${user.hashnode}.hashnode.dev">
    <i class="fa-brands fa-hashnode social-icon"></i></a><li>`
    : "";

  let footerMarkup = `<footer>
    <div class="container-footer">
        <p class="text-center">stay connected!</p>
        <ul class="socials-list">
                ${githubMarkup}
                ${twitterMarkup}
                ${hashnodeMarkup}
        </ul>
        <div class="footer-list">
            <p class="footer-name">
                <a href="index.html">${user.github.login}</a>
            </p>
            <p class="copyright-text">© 2022 ${user.github.login}. all rights reserved</p>
        </div>
        <table>
            <tr>
                <td class="color1"></td>
                <td class="color2"></td>
                <td class="color3"></td>
                <td class="color4"></td>
            </tr>
        </table>
    </div>
</footer>
<html>
`;

  return footerMarkup;
};

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

    if (user.hashnode && user.articles.articles.length >= 1) {
      markup += generateArticlesMarkup(user.hashnode, user.articles.articles);
    }

    if (user.twitterId && user.tweets.data && user.tweets.data.length > 0) {
      console.log("hereeeeeeeeeee");
      markup += generateTweetsMarkup(user);
    }

    markup += generateFooterMarkup(user);
  }
  return markup;
};

export default function Preview() {
  const [userContent, setUserContent] = useState("");
  const { user } = useUserContext();

  const router = useRouter();

  useEffect(() => {
    setUserContent(generateBody(user));
  }, [user]);

  useEffect(() => {
    if (!user.github) {
      router.push("/");
    }
  }, []);

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
    <div>
    <Head>
        <title>devCase</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" type="image/x-icon" href="./favicon.ico"></link>
      </Head>
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
    </div>
  );
}
