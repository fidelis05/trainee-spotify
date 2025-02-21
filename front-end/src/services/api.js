import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:3030/api",
    withCredentials: true,
});

export const linkSongToUser = async (songId) => {
    try {
        const response = await api.post(`/users-songs/${songId}`);
        return {
            success: true
        };
    }
    catch (error) {
        console.error("Error linking song to user:", error);
        return {
            success: false,
            error: error.message,
        };
    }
}
export const getAllArtists = async () => {
    try {
        const response = await api.get("/artists");
        return response.data;
    } catch (error) {
        console.error("Error fetching artists:", error);
        return null;
    }
};
export const getSongsUserLiked = async (userId) => {
    try {
        const response = await api.get(`/users-songs/users/${userId}`);
        return response.data;
    }
    catch (error) {
        console.error("Error getting songs that the user Liked", error);
    }
}

export const getArtistById = async (artistId) => {
    try {
        const response = await api.get(`/artists/${artistId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching artist by Id", error);
        return null;
    }
}

export const getAllUsers = async () => {
    try {
        const response = await api.get("/users");
        return response.data;
    } catch (error) {
        console.error("Error fetching users:", error);
        return null;
    }
}

export const createUser = async (name, email, password, role) => {
    try {
        const response = await api.post(`/users`, {
            name,
            email,
            password,
            role
        });
        console.log("User created:", response);
        return {
            success: true
        };
    } catch (error) {
        console.error("Error creating user:", error);
        return {
            success: false,
            error
        };
    }
};

export const loginUser = async (email, password) => {
    try {
        const response = await api.post("/users/login", {
            email,
            password
        });
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('password', password);
        console.log("Login successful:", response);
        return {
            success: true
        };
    } catch (error) {
        console.error("Error logging in:", error);
        return {
            success: false,
            error
        };
    }
};

export const logoutUser = () => {
    api.post("/users/logout");
    localStorage.setItem('isLoggedIn', 'false');
    window.location.href = '/login';
};

export const checkLoginStatus = () => {
    return localStorage.getItem('isLoggedIn') === 'true';
};

export const getUserInfo = async () => {
    try {
        const response = await api.get("/users/user");
        return response.data;
    } catch (error) {
        console.error("Error getting user info:", error);
        return {
            success: false,
            error
        };
    }
}

export const updateUserEmail = async (id, email) => {
    try {
        console.log(`id a atualizar ${id}`)
        const response = await api.put(`/users/${id}`, {
            email
        })
        return {
            success: true
        };
    } catch (error) {
        console.error("Error updating user email:", error)
        return {
            success: false,
            error
        };
    }
}

export const updateUserPassword = async (id, currentPassword, newPassword) => {
    if (localStorage.getItem('password') === currentPassword) {
        try {
            const response = await api.put(`/users/${id}`, {
                newPassword
            })
            localStorage.setItem('password', newPassword);
            return {
                success: true
            };
        } catch (error) {
            console.error("Error updating user password:", error)
            return {
                success: false,
                error
            };
        }
    } else {
        return {
            success: false,
            error: 'Senha atual incorreta.'
        }
    }
}

// Criação de artistas no banco de dados
export const setupInitialArtists = async () => {
    const artistIds = [{
            id: "5H4yInM5zmHqpKIoMNAx4r",
            nationality: "Britânico"
        },
        {
            id: "1Xyo4u8uXC1ZmMpatF05PJ",
            nationality: "Canadense"
        },
        {
            id: "5pBMkZNIlbGTH3hrsQJqAa",
            nationality: "Brasileiro"
        },
        {
            id: "6qqNVTkY8uBg9cP3Jd7DAH",
            nationality: "Americana"
        },
        {
            id: "45dkTj5sMRSjrmBSBeiHym",
            nationality: "Canadense"
        },
        {
            id: "7ltDVBr6mKbRvohxheJ9h1",
            nationality: "Espanhola"
        },
        {
            id: "74KM79TiuVKeVCqs8QtB0B",
            nationality: "Americana"
        },
        {
            id: "4NUePmzDvCYqilXBFa91Hg",
            nationality: "Brasileiro"
        },
        {
            id: "4dpARuHxo51G3z768sgnrY",
            nationality: "Britânica"
        },
        {
            id: "1i8SpTcr7yvPOmcqrbnVXY",
            nationality: "República Dominicana"
        }
    ];

    try {
        // Pega o token de acesso Spotify
        const accessToken = await fetch('https://accounts.spotify.com/api/token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    grant_type: 'client_credentials',
                    client_id: '61094d576c204460aacc8f1759eb7141',
                    client_secret: 'fd8e6de7bba54d40b97fc2eef0c4221c',
                }),
            }).then(response => response.json())
            .then(data => data.access_token);

        // Processa cada artista
        for (const artist of artistIds) {
            // Pega nome e imagem de cada um
            const response = await axios.get(`https://api.spotify.com/v1/artists/${artist.id}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                }
            });

            const {
                name,
                images
            } = response.data;
            const image = images.length > 0 ? images[2].url : null;

            // Insere artista no DB
            await api.post("/artists", {
                name,
                nationality: artist.nationality,
                image
            });

            console.log(`Artist ${name} created successfully`);
        }
    } catch (error) {
        console.error("Error in setupInitialArtists:", error);
    }
};

export async function getSongObjectFromAnArtistsById(artistId) {
    try {
        const response = await api.get(`/songs/artist/${artistId}}`);
        return response.data;

    } catch (e) {
        console.error("Error fetching artist's songs by Id", e);
        return null;
    }
}