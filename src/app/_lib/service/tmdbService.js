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

    getMovieByGenres: async (page = 1, genres) => {
        try {
            const response = await fetch(`${baseUrl}/discover/movie?include_adult=false&api_key=${KEY}&language=vi-VN&with_genres=${genres}&page=${page}`)
            if (!response.ok) {
                throw new Error(`TMDB error: ${response.status}`)
            }
            const json = await response.json()
            console.log(json);
            return { page: json.page, total: json.total_pages, data: json.results }
        } catch (err) {
            console.error("Failed to fetch movie:", err)
            return { page: 0, total: 0, data: [] }
        }
    },
}