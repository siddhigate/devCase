import { useState, useEffect } from 'react'
import { useUserContext } from '../context/user-context'
import GithubForm from './GithubForm'
import HashnodeForm from './HashnodeForm'
import TwitterForm from './TwitterForm'

export default function Onboarding() {

    const [tab, setTab] = useState('github')
    const { github, twitter, hashnode, twitterChallenge } = useUserContext()

    useEffect(() => {
        console.log(github, twitter, twitterChallenge, hashnode)
    }, [github, twitter, twitterChallenge, hashnode])

    return (
        <div className='card'>
            <h1>hey there 👋</h1>
            {tab === 'github' && <GithubForm setTab={setTab} />}
            {tab === 'twitter' && <TwitterForm setTab={setTab} />}
            {tab === 'hashnode' && <HashnodeForm />}
        </div>
    )    
}