import apiPokemon from "../../services/apiPokemon";

const loadPokemon = async (data) => {
  let pokemonData = await Promise.all(
    data.map(async (pokemon) => {
      let pokemonRecord = await apiPokemon.listWithDetail(pokemon);
      return pokemonRecord;
    })
  );

  return pokemonData;
};

export const getPokemonList = (url, limit, page) => {
  return async (dispatch, getState) => {
    try {
      let res;

      dispatch({
        module: "POKEMON_MODULE",
        type: "ASYNC_START",
      });

      if (url) {
        res = await apiPokemon.list(url);
      } else {
        res = await apiPokemon.list();
      }

      const listDetail = await loadPokemon(res.results);

      dispatch({
        module: "POKEMON_MODULE",
        type: "ASYNC_END",
      });
      dispatch({
        module: "POKEMON_MODULE",
        type: "MAIN_LOAD",
        pokemon: listDetail,
        nextURL: res.next,
        previousURL: res.previous,
      });
    } catch (error) {
      console.error({ ...error });
    }
  };
};

export const getPokemonDetail = (id) => {
  return async (dispatch, getState) => {
    try {
      const res = await apiPokemon.detail(id);
      const species = await apiPokemon.species(id);

      dispatch({
        module: "POKEMON_MODULE",
        type: "GET_DETAIL",
        detail: res,
        species,
      });
    } catch (error) {
      console.error({ ...error });
    }
  };
};

export const catchPokemon = (detail, nickName) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const newPokemonCatched = {
      ...detail,
      nickName,
    };

    const firestore = getFirestore();

    firestore
      .collection("users")
      .doc(getState().firebase.auth.uid)
      .update({
        pokemonCatched: [
          ...getState().firebase.profile.pokemonCatched,
          newPokemonCatched,
        ],
      });
  };
};
