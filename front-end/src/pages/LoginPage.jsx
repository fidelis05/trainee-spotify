import React, { useState } from "react";
import { Link } from "react-router-dom";
import lockIcon from "../assets/lock.svg";
import mailIcon from "../assets/mail.svg";
import Alert from '@mui/material/Alert';
import { loginUser } from "../services/api";

function LoginPage() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState({ email: "", password: "" });
    const [isLoading, setLoading] = useState(false);

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);

        setError({ email: "", password: "" })

        let formErrors = { email: "", password: "" }

        if (!email) {
            formErrors.email = "Campo e-mail é obrigatório"

        } else if (!isValidEmail(email)) {
            formErrors.email = "E-mail em formato inválido!"
        }

        if (!password) {
            formErrors.password = "Campo senha é obrigatório"
        }

        if (formErrors.email || formErrors.password) {
            setError(formErrors);
            setLoading(false);
            return;
        }

        try {
            const response = await loginUser(email, password);
            if (response.success) {
                window.location.href = "/"
            } else {
                formErrors.password = response.error.response?.data;
                setError(formErrors);
            }
        } catch (err) {
            formErrors.password = "Erro ao fazer login. Tente novamente."
            setError(formErrors);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex flex-col justify-center items-center w-full h-screen m-auto pt-3 pb-3 bg-[#111111] text-white gap-10">
            <div className="flex flex-col gap-10 jus">
                <div className="flex gap-1 justify-center">
                    <h1 className="text-5xl font-semibold">iSpotify</h1>
                    <i className="fa-regular fa-registered"></i>
                </div>

                <p className="text-4xl font-semibold text-center">Música para todos.</p>
            </div>

            <form action="" className="max-w-[450px] pl-10 pr-10 w-full flex flex-col gap-[2rem]" onSubmit={handleSubmit} noValidate>

                <div className="flex relative">
                    <input type="email" name="" id="email" placeholder="Email" className="bg-[#3c3c3c] p-[0.5rem] w-full" onChange={(e) => {
                        setEmail(e.target.value);
                    }} />
                    <img src={mailIcon} alt="Mail icon" className="absolute right-[10px] inset-y-0 my-auto" />

                </div>
                {error.email && <Alert variant="outlined" severity="error" className="-mt-4">{error.email}</Alert>}

                <div className="flex relative">
                    <input type="password" id="password" placeholder="Senha" className="bg-[#3c3c3c] p-[0.5rem] w-full" onChange={(e) => {
                        setPassword(e.target.value);
                    }}
                    />
                    <img src={lockIcon} alt="Lock icon" className="absolute right-[10px] inset-y-0 my-auto" />
                </div>
                {error.password && <Alert variant="outlined" severity="error" className="-mt-4">{error.password}</Alert>}

                <button type="submit" disabled={isLoading} className="bg-white text-black font-semibold uppercase w-[240px] h-[45px] rounded-full place-self-center cursor-pointer">
                    {isLoading ? "Carregando..." : "Entrar"}
                </button>
            </form>
            <div className="max-w-[450px] w-full pl-5 pr-5 font-semibold uppercase flex flex-wrap gap-1.5 justify-center">
                <p>Não tem uma conta?</p><Link to="/signup" className="underline">Inscreva-se</Link>
            </div>

        </div>


    );
}

export default LoginPage;