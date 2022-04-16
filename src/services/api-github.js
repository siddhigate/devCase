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
    console.log(user);
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
    console.log(repoArr)
    return { repos: repoArr, success: true };
  } catch (error) {
    return { ...error, success: false };
  }
};

export {getGitHubUser, getGithubRepos};