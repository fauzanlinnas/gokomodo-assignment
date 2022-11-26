import authReducer from './authReducer'
import { combineReducers } from 'redux'
import pokemonReducer from './pokemonReducer'
import { firestoreReducer } from 'redux-firestore'
import { firebaseReducer } from 'react-redux-firebase'
import profileReducer from './profileReducer'

const rootReducer = combineReducers({
    auth: authReducer,
    pokemon: pokemonReducer,
    firestore: firestoreReducer,
    firebase: firebaseReducer,
    profile: profileReducer
})

export default rootReducer
