import React from "react";

import styles from "./pokemon.module.scss";

import { getTypesColor } from "../../helpers/getTypesColor";
import { pokedexNumber } from "../../helpers/pokedexNumber";
import { Link } from "react-router-dom";
import { transformText } from "../../helpers/transformText";
import { useDispatch, useSelector } from "react-redux";
import { releaseCatchedPokemon } from "../../store/actions/profileActions";

const PokemonItem = ({ name, nickName, types, sprites, id, isFromProfile }) => {
  const dispatch = useDispatch();

  const { auth, pokemonCatched } = useSelector((state) => {
    return {
      auth: state.firebase.auth,
      pokemonCatched: state.firebase.profile.pokemonCatched,
    };
  });

  const release = (pokeID, pokeNickName) => {
    dispatch(releaseCatchedPokemon(pokeID, pokeNickName));
  };

  const sumCatched = (id) => {
    let sum = 0;

    // eslint-disable-next-line no-unused-expressions
    pokemonCatched?.forEach((element) => {
      if (element.id === id) sum += 1;
    });

    if (sum === 0) {
      return `You haven't catched this pokemon`;
    } else {
      return `You own ${sum} of ${transformText(name)}`;
    }
  };

  return (
    <div className={styles.pokemonItem}>
      <div className={styles.identification}>
        <p className="label-medium">{`#${pokedexNumber(id)}`}</p>
        {isFromProfile && (
          <button onClick={() => release(id, nickName)}>Release</button>
        )}
      </div>

      <Link
        to={`/pokemon/${id}`}
        style={{ color: "inherit", textDecoration: "inherit" }}
      >
        <div className={styles.image}>
          <img src={sprites.front_default} alt="Pokemon" />
        </div>

        <div className={styles.detail}>
          <p className={`label-large ${styles.name}`}>
            {nickName
              ? `${nickName} (${transformText(name)})`
              : `${transformText(name)}`}
          </p>
          <div className={styles.pokemonTypes} style={{ marginBottom: "4px" }}>
            {types.map((val) => (
              <p className={`${styles.types} ${getTypesColor(val.type.name)}`}>
                {val.type.name}
              </p>
            ))}
          </div>
          {auth.uid && !isFromProfile && (
            <p className="p-medium" style={{ textAlign: "center" }}>
              {sumCatched(id)}
            </p>
          )}
        </div>
      </Link>
    </div>
  );
};

export default PokemonItem;
