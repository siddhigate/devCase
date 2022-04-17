import { useEffect } from 'react'
import { useUserContext } from "../../context/user-context"
import ProjectCard from './ProjectCard'

export default function Projects() {

    const { user } = useUserContext()

    useEffect(() => {
        console.log(user.githubRepos)
    }, [user.githubRepos])

    return (
        <div className='articles-section'><h2>My Projects 👩‍💻</h2>
        <div className='projects'>
            
            {user.githubRepos && user.githubRepos.slice(0, 6).map(repo => (
                <ProjectCard repo={repo} key={repo.id} />
            ))}
        </div>
        </div>
    )
}