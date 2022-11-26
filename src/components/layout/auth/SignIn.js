import React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { Redirect } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers";

import styles from "./auth.module.scss";

import { signIn } from "../../../store/actions/authActions";

const schema = yup.object().shape({
  email: yup
    .string()
    .max(100, "Too long")
    .required("Email address is required"),
  password: yup.string().max(100, "Too long").required("Password is required"),
});

const SignIn = () => {
  const {
    reduxAuth: { authError, isLoading },
    auth,
  } = useSelector((state) => {
    return {
      reduxAuth: state.auth,
      auth: state.firebase.auth,
    };
  });
  const dispatch = useDispatch();

  const { register, handleSubmit, errors } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const submit = (values) => {
    dispatch(signIn(values));
  };

  if (auth.uid) return <Redirect to="/" />;
  return (
    <div className={`container ${styles.auth}`}>
      <div className="content">
        <form onSubmit={handleSubmit(submit)}>
          <h3>Sign In</h3>
          <div className="form__group field">
            <input
              className="form__field"
              ref={register}
              type="email"
              id="email"
              name="email"
            />
            <label className="form__label" htmlFor="email">
              Email
            </label>
          </div>
          <div className="form__group field">
            <input
              className="form__field"
              ref={register}
              type="password"
              id="password"
              name="password"
            />
            <label className="form__label" htmlFor="password">
              Password
            </label>
          </div>

          {errors &&
            Object.keys(errors).map((key, index) => (
              <p className="p-small color-red">{errors[key].message}</p>
            ))}

          <div className="form__group field">
            <button className={styles.signUpButton}>
              {isLoading && <div class="lds-dual-ring" />}Login
            </button>
            <div className="color-red center">
              {authError ? <p>{authError}</p> : null}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
