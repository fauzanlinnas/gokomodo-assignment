import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getPokemonList } from "../../../../store/actions/pokemonActions";
import PokemonCards from "../../../Pokemon/PokemonCards";
import Pagination from "../../../Pagination/Pagination";

const PokemonList = () => {
  const dispatch = useDispatch();
  const { pokemon, isLoading } = useSelector((state) => state.pokemon);

  const onClickNextPage = (url) => {
    dispatch(getPokemonList(url));
  };

  const onClickPreviousPage = (url) => {
    dispatch(getPokemonList(url));
  };

  useEffect(() => {
    dispatch(getPokemonList());
  }, []);

  return (
    <div className="container">
      <div className="content">
        {isLoading ? (
          <div className="center-screen">
            <div class="lds-dual-ring" />
          </div>
        ) : (
          <>
            <Pagination
              className="mb-5"
              onClickPreviousPage={onClickPreviousPage}
              onClickNextPage={onClickNextPage}
            />
            <PokemonCards pokemonList={pokemon} />
            <Pagination
              className="mt-5"
              onClickPreviousPage={onClickPreviousPage}
              onClickNextPage={onClickNextPage}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default PokemonList;
