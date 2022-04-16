 
import { useEffect } from 'react';
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
    

    return <div>My Portfolio  : {user.github && <div>GitHub: {user.github.login}{
        
        user.githubRepos.length > 0 && user.githubRepos.map(repo => (<div key={repo.id}>{repo.name}</div>))
    }</div>}
        {user.hashnode && <p>Hashnode: {user.hashnode}{
    
    
        user.articles.articles.length > 0 && user.articles.articles.map(article => (<div key={article.title}>{article.title}</div>))
    }</p>}
        {user.twitterId && <p>Twitter: {user.twitterId.data.name}</p>}
    </div>
}