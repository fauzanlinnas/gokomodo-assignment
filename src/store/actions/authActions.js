export const signIn = (credentials) => {
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();

        dispatch({ module: 'AUTH_MODULE', type: 'ASYNC_START' })

        firebase.auth().signInWithEmailAndPassword(
            credentials.email,
            credentials.password
        ).then(() => {
            dispatch({ module: 'AUTH_MODULE', type: 'LOGIN_SUCCESS' })
        }).catch((err) => {
            dispatch({ module: 'AUTH_MODULE', type: 'LOGIN_ERROR', err })
            dispatch({ module: 'AUTH_MODULE', type: 'ASYNC_END' })
        })
    }
}

export const signOut = () => {
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();

        firebase.auth().signOut().then(() => {
            dispatch({ module: 'AUTH_MODULE', type: 'SIGNOUT_SUCCESS' })
        })
    }
}

export const signUp = (newUser) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase()
        const firestore = getFirestore()

        dispatch({ module: 'AUTH_MODULE', type: 'ASYNC_START' })

        firebase.auth().createUserWithEmailAndPassword(
            newUser.email,
            newUser.password
        ).then((res) => {
            return firestore.collection('users').doc(res.user.uid).set({
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                initials: newUser.firstName[0] + newUser.lastName[0],
                pokemonCatched: []
            })
        }).then(() => {
            dispatch({ module: 'AUTH_MODULE', type: 'SIGNUP_SUCCESS' })
        }).catch(err => {
            dispatch({ module: 'AUTH_MODULE', type: 'SIGNUP_ERROR', err })
            dispatch({ module: 'AUTH_MODULE', type: 'ASYNC_END' })
        })
    }
}
