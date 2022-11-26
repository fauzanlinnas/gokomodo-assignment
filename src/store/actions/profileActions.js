export const releaseCatchedPokemon = (pokeID, pokeNickName) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore()
    let catchedPokemonList = getState().firebase.profile.pokemonCatched

    const releasedPokemonIndex = catchedPokemonList.findIndex(val => {
      return val.id === pokeID && val.nickName === pokeNickName
    })
    if (releasedPokemonIndex > -1) {
      catchedPokemonList.splice(releasedPokemonIndex, 1);
    }

    firestore.collection('users').doc(getState().firebase.auth.uid).update({
      pokemonCatched: [...catchedPokemonList]
    })
  }
}
