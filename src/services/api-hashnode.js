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
    console.log(result, username);
    if (result.data.user.publication) {
      return { articles: result.data.user.publication.posts, success: true };
    } else {
      return { error: "no account", sucess: false };
    }
  });

  console.log(articles);
  return articles;
};

export { getHashnodeBlogs };
