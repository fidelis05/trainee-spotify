import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import ArtistCard from "../components/ArtistCard";
import { getAllArtists } from "../services/api";


function MainPage() {

    const [allArtistsToBeDisplayed, setAllArtistsToBeDisplayed] = useState([]);
    const [hasRun, setHasRun] = useState(false); // State to ensure one-time function execution
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadArtists = async () => {
        try {
            const allArtistsFromDatabase = await getAllArtists();
            const firstTenArtists = allArtistsFromDatabase.slice(0, 10);
            setAllArtistsToBeDisplayed(firstTenArtists);
        } catch (err) {
            setError('Failed to load artists');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const initialize = async () => {
            if (hasRun) return;
            try {
                await loadArtists();
                setHasRun(true);
            } catch (error) {
                console.error('Initialization error:', error);
                setError('Failed to initialize data');
                setIsLoading(false);
            }
        };

        initialize();
    }, [hasRun]);

    let navigate = useNavigate();
    return (
        <main className="bg-[#101010] w-auto flex-grow overflow-y-auto h-screen p-0 pt-[4rem]">
            <h2 className="hover:text-green-400 text-white text-center font-[500] pb-[1rem] sm:text-left sm:text-[2rem] pl-[2rem]">Artistas</h2>
            {isLoading ? (
                <div className="text-white text-center mt-10">Carregando artistas...</div>
            ) : error ? (
                <div className="text-red-500 text-center mt-10">{error}</div>
            ) : (

                <div className="grid grid-rows-auto justify-center gap-y-[2rem] gap-x-[0.2rem] sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 p-[2rem]">
                    {allArtistsToBeDisplayed.map((artist, index) => (
                        <div key={artist.id || index}>
                            <ArtistCard artist={artist} />
                        </div>
                    ))}
                </div>

            )}
        </main>
    );
}

export default MainPage;
