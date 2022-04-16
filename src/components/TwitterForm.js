import { useState, useEffect, useRef } from 'react'
import { useUserContext } from '../context/user-context'

export default function TwitterForm({ setTab }) {

    const [username, setUsername] = useState('')
    const [challenge, setChallenge] = useState('')
    const [error, setError] = useState(null)
    const { dispatch } = useUserContext()
    const inputRef = useRef(null)

    useEffect(() => {
        inputRef.current.focus()
    }, [])

    const handleSkip = () => {
        setTab('hashnode')
    }

    const handleNext = (e) => {
        e.preventDefault()
        setError(null)

        if (username === '') {
            setError('this field cannot be empty')
            return
        }
        
        dispatch({ type: 'SET_TWITTER', payload: {
            twitter: username,
            twitterChallenge: challenge
        } })

        setTab('hashnode')
    }

    return (
        <form onSubmit={handleNext}>                
            <label>
                <span>enter your twitter handle name to continue:</span>
                <input 
                    type='text'
                    placeholder="@twitter handle"
                    onChange={e => setUsername(e.target.value)}
                    value={username}
                    ref={inputRef}
                />
            </label>     
            <label>
                <span>select twitter challenge to continue:</span>
                <select
                    onChange={e => setChallenge(e.target.value)}
                    value={challenge}
                >
                    <option value='30doc'>30 days of code</option>
                    <option value='151doc'>151 days of code</option>
                </select>
            </label>                
            <button onClick={handleSkip}>skip</button>
            <button>next</button>
            
            {error && <p>{error}</p>}
        </form>
    )    
}