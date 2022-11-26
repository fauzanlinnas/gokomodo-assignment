import React from 'react'

import styles from './pokemon.module.scss'

import PokemonItem from './PokemonItem'

const PokemonCards = ({ pokemonList, isFromProfile }) => {
  return (
    <div className={styles.pokemonCards}>
      {pokemonList?.length > 0 ? pokemonList?.map(val => (
        <PokemonItem
          key={val.id}
          id={val.id}
          name={val.name}
          nickName={val.nickName}
          types={val.types}
          sprites={val.sprites}
          isFromProfile={isFromProfile}
        />
      )) :
        <p className="label-large">No pokemon catched</p>
      }
    </div>
  )
}

export default PokemonCards
