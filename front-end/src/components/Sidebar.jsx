import React from 'react'
import { logoutUser } from '../services/api'
import { useNavigate } from 'react-router-dom'
import AccountIcon from '../assets/account.svg'

const Sidebar = () => {
    const navigate = useNavigate()

    return (
        <aside className="w-[30%] h-screen bg-[#000000] text-white flex flex-col overflow-hidden max-w-[263px] shrink-0">
            {/* Sticky container */}
            <div className="sticky top-0 pl-2 bg-black h-[100vh] flex flex-col gap-[1rem] items-[center] sm:items-center">
                <div className="flex gap-[0.2rem] pt-[2rem] text-[10px] justify-center max-sm:pt-[1rem]">
                    <h1 className="hover:text-green-400 text-[1rem] font-[600] sm:text-[2.5rem] ">iSpotify</h1>
                    <i className="fa-regular fa-registered text-[10px] sm:text-[20px] "></i>
                </div>
                <button onClick={() => navigate('/')} className="cursor-pointer flex gap-[0.1rem] items-center w-[100%] justify-start sm:justify-center text-[#CCCCCC]">
                    <span className="material-symbols-outlined scale-60 sm:scale-120 ">album</span>
                    <h3 className=" hover:text-green-400 text-[0.7rem] font-[500] sm:text-[1.1rem]">Artistas</h3>
                </button>
                <button onClick={() => navigate('/likes')} className="cursor-pointer flex gap-[0.4rem] items-center w-[100%] justify-start sm:justify-center text-[#CCCCCC]">
                    <span className=""><i className="fa-solid fa-heart text-[10px] sm:text-[20px]"></i></span>
                    <h3 className="hover:text-green-400 text-[0.7rem] font-[500] sm:text-[1.1rem]">Músicas Curtidas</h3>
                </button>
                <button onClick={() => navigate('/account')} className="cursor-pointer flex gap-[0.4rem] items-center w-[100%] justify-start sm:justify-center text-[#CCCCCC]">
                    <img src={AccountIcon} alt="Conta" className="w-[14px] h-[14px] sm:w-[20px] sm:h-[20px]" />
                    <h3 className="hover:text-green-400 text-[0.7rem] font-[500] sm:text-[1.1rem]">Minha Conta</h3>
                </button>
                <button onClick={logoutUser} className="cursor-pointer flex gap-[0.3rem] items-center pl-[5px] justify-start absolute bottom-0">
                    <i className="fa-solid fa-arrow-right-from-bracket sm:text-[20px]"></i>
                    <h3 className="hover:text-green-400 text-[0.7rem] font-[500] sm:text-[1.1rem]">Logout</h3>
                </button>
            </div>
            <div className="overflow-y-auto flex-grow p-4"></div>
        </aside>
    )
}

export default Sidebar