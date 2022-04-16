import { createContext, useReducer } from 'react'

export const UserContext = createContext()

const userReducer = (state, action) => {
    switch (action.type) {
        case 'SET_GITHUB-USERNAME':
            return { ...state, github: action.payload}
        case 'SET_TWITTER':
            return { ...state, twitter: action.payload}
        case 'SET_HASHNODE':
            return { ...state, hashnode: action.payload}
        case 'SET_TWITTER_CHALLENGE':
            return { ...state, twitterChallenge: action.payload}
        default:
            return state
    }
}

export const UserContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(userReducer, {
        github: null,
        twitter: null,
        hashnode: null,
        twitterChallenge: null
    })

    return (
        <UserContext.Provider value={{ ...state, dispatch }}>
            {children}
        </UserContext.Provider>
    )
}

