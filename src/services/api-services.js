export const getTwitterUserId = (username) => {
  fetch("/api/twitterid", {
    method: "POST",
    body: JSON.stringify({username})
  })
    .then((res) => res.json())
    .then((data) => console.log(data))
    .catch((error) => console.log(error));
};
