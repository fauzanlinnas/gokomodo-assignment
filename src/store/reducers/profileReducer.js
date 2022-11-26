const initState = {
  pokemonCatched: []
}

export default (state = initState, action) => {
  if (action.module !== 'PROFILE_MODULE') return { ...state }

  switch (action.type) {
    case 'MAIN_LOAD':
      return {
        ...state,
        pokemonCatched: action.pokemonCatched,
      }
    case 'ASYNC_END':
      return {
        ...state,
        isLoading: false,
      };
    case 'ASYNC_START':
      return { ...state, isLoading: true };
    default:
      return state
  }
}
