import { useState, useEffect, useRef } from 'react'
import { useUserContext } from '../context/user-context'

export default function HashnodeForm() {

    const [input, setInput] = useState('')
    const [error, setError] = useState(null)
    const { dispatch } = useUserContext()
    const inputRef = useRef(null)

    useEffect(() => {
        inputRef.current.focus()
    }, [])

    const handleSkip = () => {

    }

    const handleNext = (e) => {
        e.preventDefault()
        setError(null)

        if (input === '') {
            setError('this field cannot be empty')
            return
        }
        
        dispatch({ type: 'SET_HASHNODE', payload: input })
    }

    return (
        <form onSubmit={handleNext}>                
            <label>
                <span>enter your hashnode profile name to continue:</span>
                <input 
                    type='text'
                    placeholder="hashnode profile"
                    onChange={e => setInput(e.target.value)}
                    value={input}
                    ref={inputRef}
                />
            </label>      
            <button onClick={handleSkip}>skip</button>      
            <button>next</button>
            {error && <p>{error}</p>}
        </form>
    )    
}