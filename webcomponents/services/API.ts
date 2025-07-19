export const API = {
    baseURL: "/api/",
    getGenres: async (): Promise<Genre[]> => {
        return await API.fetch<undefined, Genre[]>("genres/")
    },
    getToMovies: async (): Promise<Movie[]> => {
        return await API.fetch<undefined, Movie[]>("movies/top/")
    },
    getRandomMovies: async () => {
        return await API.fetch<undefined, Movie[]>("movies/random/")
    },
    getMovieById: async (id: number) => {
        return await API.fetch<undefined, Movie>(`movies/${id}`)
    },
    searchMovies: async (q: string, order: string, genre: string) => {
        return await API.fetch<{ q: string, order: string, genre: string }, Movie[]>("movies/search", { q, order, genre })
    },
    fetch: async <TParams = undefined, TResult = unknown>(
        endpoint: string,
        params?: TParams
    ): Promise<TResult> => {
        let url = `${API.baseURL}${endpoint}`;

        if (params && typeof params === "object") {
            // Only attach query params for GET requests like search
            const query = new URLSearchParams();
            Object.entries(params).forEach(([key, value]) => {
                if (Array.isArray(value)) {
                    value.forEach((v) => query.append(`${key}[]`, String(v)));
                } else {
                    query.append(key, String(value));
                }
            });
            url += `?${query.toString()}`;
        }

        try {
            const response = await fetch(url);
            const result = await response.json();
            return result as TResult;
        } catch (e) {
            console.error(e);
            throw e;
        }
    }
    // fetch: async (endPoint: string, args: any) => {
    //     try {
    //         const resonse = await fetch(`${API.baseURL}${endPoint}`)
    //         const result = await resonse.json()
    //         return result
    //     } catch (e) {
    //         console.error(e)
    //     }
    // }
}