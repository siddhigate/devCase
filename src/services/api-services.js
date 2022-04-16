export const getTwitterUserId = (username) => {
  fetch("/api/twitterid", {
    method: "POST",
    body: JSON.stringify({ username }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.errors) {
        console.log(data.errors[0]);
      } else {
        console.log("here", data);
      }
    })
    .catch((error) => console.log(error));
};

const APIURL = "https://api.github.com/users/";

const getURL = (username) => APIURL + username;

const getRepoURL = (username) => APIURL + username + "/repos";

const getGitHubUser = async (username) => {
  try {
    const response = await fetch(getURL(username));

    if (!response.ok) {
      const responseError = {
        statusText: response.statusText,
        status: response.status,
      };
      throw responseError;
    }

    const user = await response.json();

    return { ...user, success: true };
  } catch (error) {
    return { ...error, success: false };
  }
};

const getGithubRepos = async (username) => {
  try {
    const response = await fetch(getRepoURL(username));

    if (!response.ok) {
      const responseError = {
        statusText: response.statusText,
        status: response.status,
      };
      throw responseError;
    }

    const data = await response.json();

    const repoArr = await data.map((repo) => {
      return {
        id: repo.id,
        name: repo.name,
        description: repo.description,
        createdAt: repo.created_at,
        liveURL: repo.homepage,
        repoURL: repo.html_url,
        language: repo.language,
        topics: repo.topics,
        starsCount: repo.stargazers_count,
        forksCount: repo.forks_count,
      };
    });

    return { repos: repoArr, success: true };
  } catch (error) {
    return { ...error, success: false };
  }
};

async function gql(query, variables = {}) {
  const data = await fetch("https://api.hashnode.com/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  return data.json();
}

const getHashnodeBlogs = async (username) => {
  let GET_USER_ARTICLES = `
  query GetUserArticles($page: Int!) {
      user(username: "${username}") {
          publication {
              posts(page: $page) {
                  title
                  brief
                  slug
                  coverImage
              }
          }
      }
  }
`;

  const articles = await gql(GET_USER_ARTICLES, { page: 0 }).then((result) => {

    console.log(result, username)
    if(result.data.user.publication) {
      return {articles: result.data.user.publication.posts, success:true};
    }
    else {
      return {error: "no account",sucess: false}
    }

  });

  return articles;
};

export { getGitHubUser, getGithubRepos, getHashnodeBlogs };
