import { UserContextProvider } from "../../context/user-context"

export default function Projects() {

    const { githubRepos } = UserContextProvider()

    return (
        <div>
            {githubRepos && githubRepos.map(repo => (
                <p key={repo.id}>{repo.name}</p>
            ))}
        </div>
    )
}