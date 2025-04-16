"use client";

import { useState } from "react";
import "./style.css";
import * as Yup from "yup";
import { Field, Form, Formik } from "formik";
import { toast } from "sonner";
import { HiddenIcon, ShowIcon } from "@/helpers/icons";
import { login, signup } from "@/app/login/action";

export default function AuthForms() {
  const [isSignIn, setIsSignIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const SignupSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters long")
      .matches(/\d/, "Password must contain at least one number")
      .required("Password is required"),
    email: Yup.string().email("Invalid email").required("Required"),
  });

  const SigninSchema = Yup.object().shape({
    password: Yup.string()
      .min(8, "Password must be at least 8 characters long")
      .matches(/\d/, "Password must contain at least one number")
      .required("Password is required"),
    email: Yup.string().email("Invalid email").required("Required"),
  });

  const toggleForm = () => {
    setIsSignIn(!isSignIn);
  };

  const handleSignUp = async (values) => {
    await signup(values);
  };

  const handleSignIn = async (values) => {
    const response = await login(values);
    console.log(response, "responseeee");
    if (response?.error) {
      toast.error("dont habe a user");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className="authContainer">
      <div className={`authForms ${isSignIn ? "slideLeft" : ""}`}>
        <div className="authForm">
          <h2>Create Account</h2>

          <Formik
            initialValues={{
              name: "",
              password: "",
              email: "",
            }}
            validationSchema={SignupSchema}
            onSubmit={(values, { resetForm }) => {
              handleSignUp(values);
              resetForm();

              console.log(values);
            }}
          >
            {({ errors, touched }) => (
              <Form>
                <Field type="text" name="name" placeholder="Name" />
                {errors.name && touched.name ? (
                  <p className="error">{errors.name}</p>
                ) : null}

                <Field type="email" name="email" placeholder="Email" />
                {errors.email && touched.email ? (
                  <p className="error">{errors.email}</p>
                ) : null}
                <div className="passwordField">
                  <Field
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder={showPassword ? "Password" : "******"}
                  />
                  <button
                    type="button"
                    className="togglePasswordButton"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? <HiddenIcon /> : <ShowIcon />}
                  </button>
                </div>
                {errors.password && touched.password ? (
                  <p className="error">{errors.password}</p>
                ) : null}
                <button className="authButton" type="submit">
                  Submit
                </button>
              </Form>
            )}
          </Formik>
          <p>
            Already have an account?
            <button onClick={toggleForm}>Sign In</button>
          </p>
        </div>

        <div className="authForm">
          <h2>Welcome Back!</h2>
          <p>{errorMessage}</p>
          <Formik
            initialValues={{
              password: "",
              email: "",
            }}
            validationSchema={SigninSchema}
            onSubmit={(values, { resetForm }) => {
              handleSignIn(values);
              resetForm();

              console.log(values);
            }}
          >
            {({ errors, touched }) => (
              <Form>
                <Field type="email" name="email" placeholder="Email" />
                {errors.email && touched.email ? (
                  <p className="error">{errors.email}</p>
                ) : null}
                <div className="passwordField">
                  <Field
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder={showPassword ? "Password" : "******"}
                  />
                  <button
                    type="button"
                    className="togglePasswordButton"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? <HiddenIcon /> : <ShowIcon />}
                  </button>
                </div>
                {errors.password && touched.password ? (
                  <p className="error">{errors.password}</p>
                ) : null}
                <button className="authButton" type="submit">
                  Submit
                </button>
              </Form>
            )}
          </Formik>
          <p>
            Dont have an account? <button onClick={toggleForm}>Sign Up</button>
          </p>
        </div>
      </div>
    </div>
  );
}
