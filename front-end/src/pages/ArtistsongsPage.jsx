import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getSongObjectFromAnArtistsById, getArtistById, linkSongToUser } from "../services/api";

function ArtistSongs() {

    const [songObject, setSongObject] = useState();
    const [artist, setArtist] = useState();
    let { artistId } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const songData = await getSongObjectFromAnArtistsById(artistId);
                const artist = await getArtistById(artistId);
                setSongObject(songData);
                setArtist(artist);

            }
            catch (error) {
                console.error(error);
            }
        };

        fetchData();

    }, [artistId]);


    if (!songObject) {
        return (<div className="h-screen w-full p-5 box-border text-white text-[30px] bg-linear-to-t from-[#101010] via-[#101010] via-20% to-[#3a3939] ">Loading...</div>);
    }
    console.log(songObject);

    return (
        <main className="text-white flex flex-col gap-[4rem] pt-[100px] pl-[0.5rem] text-[13px] sm:pl-[4rem] sm:pt-[20vh]  bg-linear-to-t from-[#101010] via-[#101010] via-20% to-[#3a3939] w-full flex-grow overflow-y-auto h-screen p-0 ">
            <div className="flex flex-row gap-8 sm:gap-10 ">
                <img className="w-[100px] h-[100px] rounded-[2px] sm:w-[200px]  sm:h-[200px]" src={artist.image} alt="Artist Image" />
                <div className="flex flex-col gap-2 justify-end">
                    <h4 className="sm:text-[17px]">ARTISTA</h4>
                    <h1 className="font-[700] sm:text-[37px] md:text-[48px]">{artist.name}</h1>
                </div>
            </div>

            <div className="flex flex-row  gap-5 sm:gap-15 pt-[4rem] pl-[1rem]">
                <i className="fa-solid fa-circle-play scale-250 text-green-600 sm:scale-450 cursor-pointer "></i>
                <i className="fa-regular scale-200 fa-heart sm:scale-300 cursor-pointer text-[#D9D9D9] hover:text-green-400"></i>
                <i className="fa-regular scale-170 fa-circle-down sm:scale-200 cursor-pointer text-[#D9D9D9] hover:text-green-400 "></i>
                <i className="fa-solid scale-160 fa-ellipsis sm:scale-200 cursor-pointer text-[#D9D9D9] hover:text-green-400"></i>
            </div>

            <table className=" text-[0.7rem] text-[#CCCCC] font-[500] sm:text-[18px] w-[90%]">
                <thead>
                    <tr className="border-b-1" >
                        <th className="text-[#D9D9D9] pb-[1rem] text-left"># TÍTULO</th>
                        <th className="text-[#D9D9D9] pb-[1rem] text-left">Gênero</th>
                        <th className="text-[#D9D9D9] pb-[1rem] text-center md:text-center lg:text-left"><i className="fa-regular fa-clock"></i></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        songObject.map((song, index) => {
                            return (
                                <tr key={song.id}>

                                    <td className=" text-left p-[1rem]">
                                        <div className="flex gap-2">
                                            <span className="flex flex-col justify-center sm:pr-[0.8rem]">{index + 1}</span>
                                            <div>
                                                <h3>{song.title}</h3>
                                                <h3>{artist.name}</h3>
                                            </div>

                                        </div>
                                    </td>

                                    <td>
                                        <h3>{song.genre}</h3>
                                    </td>

                                    <td className="pl-[0.5rem]">

                                        <div className="flex gap-[0.3rem] sm:gap-[1rem]">
                                            <i className="fa-regular  fa-heart cursor-pointer hover:text-green-400 " onClick={() => {
                                                linkSongToUser(song.id);
                                            }} ></i>
                                            <i className="fa-solid fa-trash cursor-pointer hover:text-green-400"></i>
                                        </div>

                                    </td>

                                </tr>
                            );
                        })
                    }

                </tbody>
            </table>
        </main>
    );
};

export default ArtistSongs;