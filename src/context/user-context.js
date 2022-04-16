import { createContext, useReducer, useContext } from 'react'

const UserContext = createContext()

const userReducer = (state, action) => {
    switch (action.type) {
        case 'SET_GITHUB':
            return { ...state, github: action.payload}
        case 'SET_TWITTER':
            return { ...state, twitter: action.payload.twitter, twitterChallenge: action.payload.twitterChallenge}
        case 'SET_HASHNODE':
            return { ...state, hashnode: action.payload}
        default:
            return state
    }
}

const useUserContext = () => useContext(UserContext);

const UserContextProvider = ({ children }) => {

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

export { useUserContext, UserContextProvider }

