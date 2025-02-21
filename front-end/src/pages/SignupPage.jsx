import React, { useState } from 'react'
import personIcon from "../assets/person.svg"
import lockIcon from "../assets/lock.svg";
import mailIcon from "../assets/mail.svg";
import { Link } from "react-router-dom";
import Alert from '@mui/material/Alert';
import { getAllUsers, createUser } from "../services/api";

const SignupPage = () => {
    const [wasUserCreated, setWasUserCreated] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [error, setError] = useState({ email: "", password: "", username: "" });
    const [isLoading, setIsLoading] = useState(false);
    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
    function isValidPassword(password) {
        return (password.length >= 6);
    }
    function isValidUsername(username) {
        return (username.length >= 4);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setIsLoading(true);
        setError({ email: "", password: "", username: "" });

        let formErrors = { email: "", password: "", username: "" };
        if (!email) {
            formErrors.email = "Campo e-mail é obrigatório";

        } else if (!isValidEmail(email)) {
            formErrors.email = "E-mail em formato inválido!"
        }
        if (!password) {
            formErrors.password = "Campo senha é obrigatório"
        } else if (!isValidPassword(password)) {
            formErrors.password = "Senha deve ter no mínimo 6 caracteres"
        }
        if (!username) {
            formErrors.username = "Campo nome de usuário é obrigatório"
        } else if (!isValidUsername(username)) {
            formErrors.username = "Nome de usuário deve ter no mínimo 4 caracteres"
        }

        if (formErrors.email || formErrors.password || formErrors.username) {
            setIsLoading(false);
            setError(formErrors);
            return;
        }

        try {
            const response = await createUser(username, email, password, "user");

            if (response.success) {
                console.log(response.data);
                setWasUserCreated(true);
            } else {

                formErrors.username = response.error.response?.data;
                setError(formErrors);

            }
        } catch (err) {
            console.log(err.data);
            formErrors.username = "Não foi possível efetuar seu cadastro."
            setError(formErrors);

        } finally {
            setIsLoading(false);
        }


        //get all the users of the database here

        //check if email is equal to some of the emails already used,
        //if yes set error to email  = "email ja cadastrado"

        //if email is not equal to any 

        //createUser

        //redirect to login page
    }

    if (wasUserCreated) {
        return (
            <div className="flex flex-col justify-center items-center w-[100vw] h-[100vh] m-auto bg-black text-white gap-6">
                <div className="bg-[#3c3c3c] p-8 rounded-lg text-center">
                    <i className="fa-solid fa-circle-check text-green-500 text-5xl mb-4"></i>
                    <h2 className="text-2xl font-bold mb-4">Conta criada com sucesso!</h2>
                    <p className="mb-6">Seja bem-vindo(a) ao iSpotify!</p>
                    <Link to="/login" className="bg-white text-black px-8 py-3 rounded-full hover:bg-gray-200 transition-colors">
                        Fazer Login
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col pl-3 pr-3 justify-center items-center w-full h-screen m-auto pt-3 pb-3 bg-[#111111] text-white gap-10">
            <div className="flex flex-col gap-5 jus max-w-[25rem]">
                <div className="flex flex-col gap-1 justify-center">
                    <h1 className="text-4xl font-semibold text-center leading-snug">Inscrever-se em uma conta grátis do</h1>
                    <div className="flex justify-center gap-1">
                        <h1 className="text-4xl font-semibold text-center leading-snug">iSpotify</h1><i className="fa-regular fa-registered"></i>
                    </div>

                </div>

            </div>

            <form action="" className="max-w-[450px] w-full pl-10 pr-10 flex flex-col gap-[2rem]" onSubmit={handleSubmit} noValidate>

                <div className="flex relative">
                    <input type="email" name="" id="email" placeholder="Email" className="bg-[#3c3c3c] p-[0.5rem] w-full" onChange={(e) => {
                        setEmail(e.target.value);
                    }} />
                    <img src={mailIcon} alt="Mail icon" className="absolute right-[10px] inset-y-0 my-auto" />

                </div>
                {error.email && <Alert variant="outlined" severity="error" className='-mt-4'>{error.email}</Alert>}


                <div className="flex relative">
                    <input type="password" id="password" placeholder="Criar uma senha" className="bg-[#3c3c3c] p-[0.5rem] w-full" onChange={(e) => {
                        setPassword(e.target.value);
                    }}
                    />
                    <img src={lockIcon} alt="Lock icon" className="absolute right-[10px] inset-y-0 my-auto" />
                </div>

                {error.password && <Alert variant="outlined" severity="error" className='-mt-4'>{error.password}</Alert>}

                <div className="flex relative">
                    <input type="text" id="username" placeholder="Como devemos chamar você?" className="bg-[#3c3c3c] p-[0.5rem] w-full" onChange={(e) => {
                        setUsername(e.target.value);
                    }}
                    />
                    <img src={personIcon} alt="Person icon" className="absolute right-[10px] inset-y-0 my-auto" />
                </div>
                {error.username && <Alert variant="outlined" severity="error" className='-mt-4'>{error.username}</Alert>}

                <button type="submit" disabled={isLoading} className="bg-[#3FE168] text-white font-semibold uppercase w-[240px] h-[45px] rounded-full place-self-center cursor-pointer">
                    {isLoading ? "Carregando..." : "Cadastrar"}
                </button>
            </form>

            <div className="font-semibold uppercase flex flex-wrap justify-center gap-1.5">
                <p>Já é um usuário do iSpotify?</p><Link to="/login" className="underline">Faça login</Link>
            </div>

        </div>
    )
}

export default SignupPage