import { useState } from 'react'

export default function Onboarding() {

    const [username, setUsername] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(username)
    }

    return (
        <div>
            <h1>hey there 👋</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    <span>enter your github profile name to continue:</span>
                    <input 
                        type='text'
                        placeholder="github profile name"
                        onChange={e => setUsername(e.target.value)}
                        value={username}
                    />
                </label>
                <button>go!</button>
            </form>
            
        </div>
    )    
}