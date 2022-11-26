import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import Slider from "react-slick";
import { yupResolver } from "@hookform/resolvers";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import styles from "./pokemonDetail.module.scss";

import {
  getPokemonDetail,
  catchPokemon,
} from "../../../../store/actions/pokemonActions";
import { getTypesColor } from "../../../../helpers/getTypesColor";
import {
  transformStats,
  transformText,
} from "../../../../helpers/transformText";
import { pokedexNumber } from "../../../../helpers/pokedexNumber";

import Modal from "react-modal";

const settings = {
  arrows: true,
  infinite: true,
  speed: 1000,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 5000,
  dots: true,
};

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    zIndex: "999",
  },
};

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement("#root");

const schema = yup.object().shape({
  nickName: yup.string().max(100, "Too long").required("Nickname is required"),
});

const PokemonDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [pleaseLogin, setPleaseLogin] = useState(false);
  const [isFailed, setIsFailed] = useState(false);
  const [catched, setCatched] = useState(false);

  const { detail, species, auth } = useSelector((state) => {
    return {
      detail: state.pokemon.detail,
      species: state.pokemon.species,
      auth: state.firebase.auth,
    };
  });

  const { register, handleSubmit, errors } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: {},
  });

  useEffect(() => {
    dispatch(getPokemonDetail(id));
  }, []);

  const handleCatch = (id) => {
    if (auth.uid) {
      if (Math.random() < 0.5) {
        setCatched(true);
      } else {
        setIsFailed(true);
        setTimeout(() => {
          setIsFailed(false);
        }, 2000);
      }
    } else {
      setPleaseLogin(true);

      setTimeout(() => {
        setPleaseLogin(false);
      }, 2000);
    }
  };

  const submit = (values) => {
    dispatch(catchPokemon(detail, values.nickName));
    setCatched(false);
  };

  const body = (
    <div>
      <h2>
        {detail?.name?.charAt(0).toUpperCase() + detail?.name?.substring(1)}{" "}
        catched!
      </h2>

      <form onSubmit={handleSubmit(submit)} className={styles.formSection}>
        <div className="form__group field">
          <input
            className="form__field"
            ref={register}
            type="text"
            id="nickName"
            name="nickName"
            placeholder={transformText(detail?.name)}
          />
          <label className="form__label" htmlFor="nickName">
            Name it anything you like
          </label>
        </div>
        {errors?.nickName && (
          <p className="p-medium color-red">{errors?.nickName?.message}</p>
        )}

        <div className={styles.buttonOption}>
          <button
            className={styles.buttonCancel}
            type="button"
            onClick={() => setCatched(false)}
          >
            Cancel
          </button>
          <button className={`btn ${styles.buttonSubmit}`}>Submit</button>
        </div>
      </form>
    </div>
  );

  return (
    <div className={`container ${styles.pokemonDetail}`}>
      {detail.name && (
        <div className="content">
          <h1 className="mb-3">{transformText(detail.name)}</h1>
          <p className="p-large">
            {species.flavor_text_entries[0].flavor_text}
          </p>

          <section className={styles.carousel}>
            <div>
              <Slider {...settings}>
                <div className={styles.imgCont}>
                  <img src={detail.sprites?.front_default} alt="Pokemon 1" />
                </div>
                <div className={styles.imgCont}>
                  <img src={detail.sprites?.back_default} alt="Pokemon 2" />
                </div>
                <div className={styles.imgCont}>
                  <img src={detail.sprites?.front_shiny} alt="Pokemon 3" />
                </div>
                <div className={styles.imgCont}>
                  <img src={detail.sprites?.back_shiny} alt="Pokemon 4" />
                </div>
              </Slider>
            </div>
            <div className={styles.catched}>
              <button
                className={styles.catchButton}
                onClick={() => handleCatch()}
                type="button"
                disabled={isFailed}
              >
                Catch {detail.name}!
              </button>
              {isFailed && (
                <p className="label-medium color-red">Catching failed!</p>
              )}
              {pleaseLogin && (
                <p className="label-medium color-red">Please login</p>
              )}
            </div>
            <Modal
              isOpen={catched}
              style={customStyles}
              contentLabel="Pokemon Catched"
            >
              {body}
            </Modal>
          </section>

          <section>
            <div className="mb-5">
              <h2>Pok&eacute;dex Data</h2>
              <table className={styles.dataTable}>
                <tbody>
                  <tr>
                    <th>National No.</th>
                    <td>{`#${pokedexNumber(detail.id)}`}</td>
                  </tr>
                  <tr>
                    <th>Type</th>
                    <td>
                      {detail.types && (
                        <div className={styles.pokemonTypes}>
                          {detail.types.map((val) => (
                            <p
                              className={`${styles.types} ${getTypesColor(
                                val.type.name
                              )}`}
                            >
                              {val.type.name}
                            </p>
                          ))}
                        </div>
                      )}
                    </td>
                  </tr>
                  <tr>
                    <th>Height</th>
                    <td>{detail.height / 10} m</td>
                  </tr>
                  <tr>
                    <th>Weight</th>
                    <td>{detail.height / 10} kg</td>
                  </tr>
                  <tr>
                    <th>Ability</th>
                    <td>
                      <ol>
                        {detail.abilities.map((val) => (
                          <li>
                            {transformText(val.ability.name)}{" "}
                            {val.is_hidden && (
                              <span className="p-medium color-label-grey">
                                (hidden ability)
                              </span>
                            )}
                          </li>
                        ))}
                      </ol>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div>
              <h2>Base Stats</h2>
              <table className={styles.dataTable}>
                <tbody>
                  {detail.stats.map((val) => (
                    <tr>
                      <th className={styles.statsName}>
                        {transformStats(val.stat.name)}
                      </th>
                      <td className={styles.statsNumber}>{val.base_stat}</td>
                      <td className={styles.chart}>
                        <div
                          style={{ width: `${val.base_stat}%` }}
                          className={styles.chartBar}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      )}
    </div>
  );
};

export default PokemonDetail;
