export const fetchTwitter = async (username) => {
    // const url = `https://api.twitter.com/2/users/by/username/${username}`
    const url = '/api/hello'
    try {
        const res = await fetch(url)
        const json = await res.json()
        return json
    } catch (err) {
        console.log(err.messages)
    }
}