import { useEffect } from 'react'
import { useUserContext } from "../../context/user-context"
import ProjectCard from './ProjectCard'

export default function Projects() {

    const { user } = useUserContext()

    useEffect(() => {
        console.log(user.githubRepos)
    }, [user.githubRepos])

    return (
        <div className='projects'>
            {user.githubRepos && user.githubRepos.map(repo => (
                <ProjectCard repo={repo} key={repo.id} />
            ))}
        </div>
    )
}