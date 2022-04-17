export default function handler(req, res) {
  const { twitterId, paginationToken } = JSON.parse(req.body);

  let URL = `https://api.twitter.com/2/users/${twitterId}/tweets?exclude=replies,retweets&tweet.fields=created_at`;

  if (paginationToken) {
    URL = `https://api.twitter.com/2/users/${twitterId}/tweets?exclude=replies,retweets&tweet.fields=created_at&pagination_token=${paginationToken}`;
  }

  fetch(URL, {
    headers: {
      method: "GET",
      Authorization:
        "Bearer AAAAAAAAAAAAAAAAAAAAAEUxbgEAAAAAyAhUUL2WXrYxcKXRUs7bZJBT4EY%3Dxjl1Cf1BeRbr1YbsVMXfWCdIxaIMv78QibmQm6n9MxB2O3JHPl",
    },
  })
    .then((res) => res.json())
    .then((data) => res.status(200).json(data))
    .catch((error) => res.status(400).json({ error }));
}
