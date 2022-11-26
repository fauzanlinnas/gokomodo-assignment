const initState = {
  pokemon: [],
  nextURL: '',
  previousURL: '',
  detail: {},
  species: {},
  isLoading: false
}

export default (state = initState, action) => {
  if (action.module !== 'POKEMON_MODULE') return { ...state }

  switch (action.type) {
    case 'MAIN_LOAD':
      return {
        ...state,
        pokemon: action.pokemon,
        pokemonListURL: action.pokemonListURL,
        nextURL: action.nextURL,
        previousURL: action.previousURL
      }
    case 'SET_POKEMON_URL': {
      return {
        ...state,
      }
    }
    case 'ADD_CATCHED': {
      return {
        ...state,
        pokemonCatched: [...state.pokemonCatched, action.newPokemonCatched]
      }
    }
    case 'GET_DETAIL': {
      return {
        ...state,
        detail: action.detail,
        species: action.species
      }
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
