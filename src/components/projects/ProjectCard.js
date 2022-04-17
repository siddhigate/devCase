
export default function ProjectCard({ repo }) {

    return (
        <div className="card project-card">
            <h3>{repo.name}</h3>
            <p>{repo.description}</p>
            <p className="createdAt">Created at: {new Date(repo.createdAt).toDateString()}</p>
            <p>Language: {repo.language}</p>
            
            {repo.liveURL && <a className="link link-primary" href={repo.liveURL}>live demo</a>}
            <a className="link link-secondary" href={repo.repoURL}>see repo</a>
        </div>
    )
}