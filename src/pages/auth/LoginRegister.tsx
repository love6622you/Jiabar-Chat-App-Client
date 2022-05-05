import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useStore } from "@/store/index";
import { ApolloError, useMutation } from "@apollo/client";
import { LOGIN_USER, SIGNUP_USER } from "@/graphql/mutations";
import classNames from "classnames";

const LoginRegister = (props) => {
  // useStore
  const setPersistedAuth = useStore((state) => state.setPersistedAuth);

  const navigate = useNavigate();
  const authForm = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({});

  const [isSubmit, setIsSubmit] = useState(false);
  const [error, setError] = useState<ApolloError | null>(null);

  // Mutation
  const [signupUser] = useMutation(SIGNUP_USER, {
    onError(err) {
      setError(err);
    }
  });

  const [loginUser] = useMutation(LOGIN_USER, {
    onError(err) {
      setError(err);
    }
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // 待優化(流程 & response)
  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsSubmit(true);

    if (isLogin) {
      await loginUser({ variables: { userSignin: formData } })
        .then(({ data }) => {
          const { token, user } = data.signinUser;
          setPersistedAuth(token, user);
        })
        .finally(() => {
          setTimeout(() => {
            setIsSubmit(false);
          }, 500);
        });
      navigate("/");
    } else {
      await signupUser({
        variables: {
          userNew: formData
        }
      })
        .then(({ data }) => {
          if (data) {
            setFormData({});
            authForm.current && authForm.current.reset();
            setIsLogin(true);
          }
        })
        .finally(() => {
          setTimeout(() => {
            setIsSubmit(false);
          }, 500);
        });
    }
  };

  useEffect(() => {
    setError(null);
  }, [formData]);

  const [isLogin, setIsLogin] = useState(true);

  const inputList = [
    {
      type: "email",
      name: "email",
      placeholder: "Email"
    },
    {
      type: "password",
      name: "password",
      placeholder: "Password"
    },
    {
      name: "firstName",
      placeholder: "FirstName",
      show: !isLogin
    },
    {
      name: "lastName",
      placeholder: "LastName",
      show: !isLogin
    }
  ].filter((item) => item.show ?? true);

  const inputStyle =
    "rounded-full border-0 bg-white/10 backdrop-blur-md focus:ring-0";

  return (
    <>
      <h1
        className="relative mb-4 -translate-y-1/3 select-none text-center text-5xl text-white
        before:absolute before:top-1/2 before:left-1/2 before:h-40 before:w-40 before:-translate-y-1/2 before:-translate-x-1/2 before:rounded-full before:border-4 before:border-double before:content-['']
      "
      >
        <p>Jia</p>
        <p>Live</p>
      </h1>
      <form
        className="min-w-[30rem] rounded-xl bg-black/20 py-10 text-center"
        ref={authForm}
        onSubmit={handleSubmit}
      >
        <h2 className="text-center text-3xl">{isLogin ? "Login" : "Signup"}</h2>

        {error && (
          <div className="alert alert-error mx-auto mt-4 w-fit shadow-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 flex-shrink-0 stroke-current"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{error?.message}</span>
          </div>
        )}

        <div className="mx-auto w-[20rem]">
          <fieldset className="flex flex-col gap-y-4 py-5">
            {inputList.map((item) => {
              return (
                <input
                  key={item.name}
                  type={item.type ?? "text"}
                  name={item.name}
                  placeholder={item.placeholder}
                  className={inputStyle}
                  onChange={handleChange}
                  autoComplete="off"
                  required
                />
              );
            })}
          </fieldset>

          <span
            className="w-fit cursor-pointer hover:text-white/80"
            onClick={() => {
              setIsLogin(!isLogin);
              setError(null);
              setFormData({});
              authForm.current && authForm.current.reset();
            }}
          >
            {isLogin ? "Signup?" : "Login?"}
          </span>

          <button
            type="submit"
            className={classNames("btn btn-success mt-4 w-full", {
              "pointer-events-none bg-slate-300": isSubmit
            })}
          >
            {isLogin ? "Login" : "Signup"}
          </button>
        </div>
      </form>
    </>
  );
};

LoginRegister.propTypes = {};

export default LoginRegister;
