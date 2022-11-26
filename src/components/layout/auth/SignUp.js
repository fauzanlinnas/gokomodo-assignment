import React from "react";
import { yupResolver } from "@hookform/resolvers";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

import styles from "./auth.module.scss";

import { signUp } from "../../../store/actions/authActions";

const schema = yup.object().shape({
  email: yup
    .string()
    .max(100, "Too long")
    .required("Email address is required"),
  password: yup.string().max(100, "Too long").required("Password is required"),
  firstName: yup
    .string()
    .max(100, "Too long")
    .required("First name is required"),
  lastName: yup.string().max(100, "Too long").required("Last name is required"),
});

const SignUp = () => {
  const { isLoading, auth } = useSelector((state) => {
    return {
      isLoading: state.auth.isLoading,
      auth: state.firebase.auth,
    };
  });
  const dispatch = useDispatch();

  const { register, handleSubmit } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
    },
  });

  const submit = (values) => {
    console.log(values);
    // dispatch(signUp(values));
  };

  if (auth.uid) return <Redirect to="/" />;
  return (
    <div className={`container ${styles.auth}`}>
      <div className="content">
        <form onSubmit={handleSubmit(submit)}>
          <h3>Sign Up</h3>
          <div className="form__group field">
            <input
              ref={register}
              className="form__field"
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
          <div className="form__group field">
            <input
              className="form__field"
              ref={register}
              type="text"
              id="firstName"
              name="firstName"
            />
            <label className="form__label" htmlFor="firstName">
              First Name
            </label>
          </div>
          <div className="form__group field">
            <input
              className="form__field"
              ref={register}
              type="text"
              id="lastName"
              name="lastName"
            />
            <label className="form__label" htmlFor="lastName">
              Last Name
            </label>
          </div>
          <div className="form__group field">
            <button className={styles.signUpButton}>
              {isLoading && <div class="lds-dual-ring" />}Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
