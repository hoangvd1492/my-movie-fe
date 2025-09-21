const baseUrl = `https://api.themoviedb.org/3`

const KEY = process.env.NEXT_APP_TMDB_API_KEY

export const tmdbService = {
    getAllGenre: async () => {
        try {
            const response = await fetch(`${baseUrl}/genre/movie/list?api_key=${KEY}&language=vi-VN`)
            if (!response.ok) {
                throw new Error(`TMDB error: ${response.status}`)
            }
            const json = await response.json()
            return json.genres ?? []
        } catch (err) {
            console.error("Failed to fetch genres:", err)
            return []
        }
    },

    getMovie: async (page = 1) => {
        try {
            const response = await fetch(`${baseUrl}/discover/movie?include_adult=false&api_key=${KEY}&language=vi-VN&page=${page}`)
            if (!response.ok) {
                throw new Error(`TMDB error: ${response.status}`)
            }
            const json = await response.json()
            return { page: json.page, total: json.total_pages, data: json.results }
        } catch (err) {
            console.error("Failed to fetch movie:", err)
            return { page: 0, total: 0, data: [] }
        }
    },

    getTVShow: async (page = 1) => {
        try {
            const response = await fetch(`${baseUrl}/discover/tv?include_adult=false&api_key=${KEY}&language=vi-VN&page=${page}`)
            if (!response.ok) {
                throw new Error(`TMDB error: ${response.status}`)
            }
            const json = await response.json()
            return { page: json.page, total: json.total_pages, data: json.results }
        } catch (err) {
            console.error("Failed to fetch tvshow:", err)
            return { page: 0, total: 0, data: [] }
        }
    },

    getAnimeMovie: async (page = 1) => {
        try {
            const response = await fetch(`${baseUrl}/discover/movie?include_adult=false&api_key=${KEY}&with_keywords=210024&language=vi-VN&page=${page}`)
            if (!response.ok) {
                throw new Error(`TMDB error: ${response.status}`)
            }
            const json = await response.json()
            return { page: json.page, total: json.total_pages, data: json.results }
        } catch (err) {
            console.error("Failed to fetch anime movie:", err)
            return { page: 0, total: 0, data: [] }
        }
    },

    getAnimeTVShow: async (page = 1) => {
        try {
            const response = await fetch(`${baseUrl}/discover/tv?include_adult=false&api_key=${KEY}&with_keywords=210024&language=vi-VN&page=${page}`)
            if (!response.ok) {
                throw new Error(`TMDB error: ${response.status}`)
            }
            const json = await response.json()
            return { page: json.page, total: json.total_pages, data: json.results }
        } catch (err) {
            console.error("Failed to fetch anime tvshow:", err)
            return { page: 0, total: 0, data: [] }
        }
    },

    getPopularMovie: async () => {
        try {
            const response = await fetch(`${baseUrl}/movie/popular?include_adult=false&api_key=${KEY}&language=vi-VN&page=1`)
            if (!response.ok) {
                throw new Error(`TMDB error: ${response.status}`)
            }
            const json = await response.json()
            return { page: json.page, total: json.total_pages, data: json.results }
        } catch (err) {
            console.error("Failed to fetch anime tvshow:", err)
            return { page: 0, total: 0, data: [] }
        }
    },

    getMovieByGenres: async (page = 1, genres) => {
        try {
            const response = await fetch(`${baseUrl}/discover/movie?include_adult=false&api_key=${KEY}&language=vi-VN&with_genres=${genres}&page=${page}`)
            if (!response.ok) {
                throw new Error(`TMDB error: ${response.status}`)
            }
            const json = await response.json()
            return { page: json.page, total: json.total_pages, data: json.results }
        } catch (err) {
            console.error("Failed to fetch movie:", err)
            return { page: 0, total: 0, data: [] }
        }
    },

    getDetailMovie: async (id) => {
        try {
            const response = await fetch(`${baseUrl}/movie/${id}?&api_key=${KEY}&append_to_response=credits,videos,images&language=vi-VN`)
            if (!response.ok) {
                throw new Error(`TMDB error: ${response.status}`)
            }
            const json = await response.json()
            return json
        } catch (err) {
            console.error("Failed to fetch movie:", err)
            return null
        }
    },
    getDetailTv: async (id) => {
        try {
            const response = await fetch(`${baseUrl}/tv/${id}?&api_key=${KEY}&append_to_response=credits,videos,images&language=vi-VN`)
            if (!response.ok) {
                throw new Error(`TMDB error: ${response.status}`)
            }
            const json = await response.json()
            return json
        } catch (err) {
            console.error("Failed to fetch movie:", err)
            return null
        }
    },

    search: async (page = 1, query) => {
        try {
            const response = await fetch(`${baseUrl}/search/multi?include_adult=false&api_key=${KEY}&language=vi-VN&query=${query}&page=${page}`)
            if (!response.ok) {
                throw new Error(`TMDB error: ${response.status}`)
            }
            const json = await response.json()
            return { page: json.page, total: json.total_pages, data: json.results.filter(m => m.media_type !== 'person') }
        } catch (err) {
            console.error("Failed to fetch movie:", err)
            return { page: 0, total: 0, data: [] }
        }
    },

    getTrailer: async (id, type) => {
        try {
            const response = await fetch(`${baseUrl}/${type}/${id}/videos?api_key=${KEY}`);

            const data = await response.json();

            if (data.results && data.results.length > 0) {
                const trailer = data.results.find((video) => video.type === 'Trailer');

                return trailer ? trailer.key : null;
            } else {
                return null;
            }
        } catch (error) {
            console.error('Error fetching movie trailer:', error);
            return null;
        }
    },

    getTrailerSeason: async (tvId, seasonNumber) => {
        try {
            const response = await fetch(`${baseUrl}/tv/${tvId}/season/${seasonNumber}/videos?api_key=${KEY}`);

            const data = await response.json();
            if (data.results && data.results.length > 0) {
                const trailer = data.results.find((video) => video.type === 'Trailer');

                return trailer ? trailer.key : null;
            } else {
                return null;
            }
        } catch (error) {
            console.error('Error fetching movie trailer:', error);
            return null;
        }
    },

    getThumbnail: async (id, type) => {
        try {
            const response = await fetch(`${baseUrl}/${type}/${id}/images?api_key=${KEY}`);

            const data = await response.json();

            return (
                {
                    thumbnail: data.backdrops[0].file_path,
                    logo: data.logos[0].file_path
                }
            )
        } catch (error) {
            console.error('Error fetching movie trailer:', error);
            return ({
                thumbnail: null,
                logo: null
            })
        }
    },

    getThumbnailSeason: async (tvId, seasonNumber) => {
        try {
            const response = await fetch(`${baseUrl}/tv/${tvId}/season/${seasonNumber}/images?api_key=${KEY}`);

            const data = await response.json();
            const randomIndex = Math.floor(Math.random() * data.posters.length)
            return (
                {
                    thumbnail: data.posters[randomIndex].file_path,
                }
            )
        } catch (error) {
            console.error('Error fetching movie trailer:', error);
            return ({
                thumbnail: null,
            })
        }
    },

    getDetailSeason: async (tvId, ssNumber) => {
        try {
            const response = await fetch(`${baseUrl}/tv/${tvId}/season/${ssNumber}?&api_key=${KEY}&append_to_response=credits,videos,images&language=vi-VN`)
            if (!response.ok) {
                throw new Error(`TMDB error: ${response.status}`)
            }
            const json = await response.json()
            return json
        } catch (err) {
            console.error("Failed to fetch movie:", err)
            return null
        }
    },

    getDetailEp: async (tvId, ssNumber, epNumber) => {
        try {
            const response = await fetch(`${baseUrl}/tv/${tvId}/season/${ssNumber}/episode/${epNumber}?&api_key=${KEY}&append_to_response=credits,videos,images&language=vi-VN`)
            if (!response.ok) {
                throw new Error(`TMDB error: ${response.status}`)
            }
            const json = await response.json()
            return json
        } catch (err) {
            console.error("Failed to fetch movie:", err)
            return null
        }
    },

}