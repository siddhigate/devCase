 
import { useEffect } from 'react';
import Landing from '../src/components/portfolio/Landing';
import Projects from '../src/components/projects/Projects';
import { useUserContext } from '../src/context/user-context'
import useGithub from '../src/hooks/useGitHub';

export default function Portfolio() {

    let {user} = useUserContext();

    const {getRepos} = useGithub()
    
    useEffect(() => {

        if(user.github) {
            getRepos(user.github.login);
        }
    }, [])
    

    return (
        <>
            {user && <Landing user={user}/>}
            <Projects />
        </>
    )
}