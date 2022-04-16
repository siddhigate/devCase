import {createContext, useContext, useReducer, useEffect} from "react";

let initialState = {
    github: null,
    hashnode: null,
    twitterId: null,
    twitterChallenge: null,
    githubRepos: [],
    articles: [],
    tweets: []
}

const userReducer = (state, action) => {

    switch(action.type) {

        case 'SET_TWITTER':
            return {...state, twitterId: action.payload.twitterId, twitterChallenge: action.payload.twitterChallenge};
        case 'SET_GITHUB':
            return {...state, github: action.payload.github}
        case 'SET_HASHNODE':
            return {...state, hashnode: action.payload.hashnode, articles: action.payload.articles}
        case 'SET_REPOS':
            return {...state, githubRepos: action.payload.githubRepos}
        case 'SET_TWEETS':
            return {...state, tweets: action.payload.tweets}
        default:
            return state;
    }
}

const UserContext = createContext();

const UserContextProvider = ({children}) => {

    const [ user, dispatch ] = useReducer(userReducer, initialState);

    useEffect(() => {
        console.log(user)
    }, [user])

    return <UserContext.Provider value={{user, dispatch}}>{children}</UserContext.Provider>
}

const useUserContext = ()  => useContext(UserContext);

export {UserContextProvider, useUserContext};