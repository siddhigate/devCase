// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
export default function handler(req, res) {
  fetch("https://api.twitter.com/2/users/by/username/SiddhiGate", {
    headers: {
      method: "GET", 
      Authorization:
        "Bearer AAAAAAAAAAAAAAAAAAAAAEUxbgEAAAAAyAhUUL2WXrYxcKXRUs7bZJBT4EY%3Dxjl1Cf1BeRbr1YbsVMXfWCdIxaIMv78QibmQm6n9MxB2O3JHPl",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      return res.status(200).json(data);
    })
    .catch((error) => console.log(error));
}
