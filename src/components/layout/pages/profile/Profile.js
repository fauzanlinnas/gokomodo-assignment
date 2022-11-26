import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router";
import PokemonCards from "../../../Pokemon/PokemonCards";

const Profile = () => {
  const { profile, auth } = useSelector((state) => {
    return {
      auth: state.firebase.auth,
      profile: state.firebase.profile,
    };
  });

  if (!auth.uid) return <Redirect to="/signin" />;
  return (
    <div className="container">
      <div className="content">
        <h1 style={{ marginBottom: "8px" }}>Hi {profile.firstName}!</h1>
        <h4 className="mb-5">See the Pokemon that you've catched</h4>
        <PokemonCards pokemonList={profile.pokemonCatched} isFromProfile />
      </div>
    </div>
  );
};

export default Profile;
