
export default function ProjectCard({ repo }) {

    return (
        <div className="card project-card">
            <h2>{repo.name}</h2>
            <p>{repo.description}</p>
            <p className="createdAt">created at: {new Date(repo.createdAt).toDateString()}</p>
            <p>language: {repo.language}</p>
            
            {repo.liveURL && <a className="link link-primary" href={repo.liveURL}>live demo</a>}
            <a className="link link-secondary" href={repo.repoURL}>see repo</a>
        </div>
    )
}