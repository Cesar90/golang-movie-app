package handlers

import (
	"encoding/json"
	"net/http"

	"cesarcordero.com/go/movieapp/data"
	"cesarcordero.com/go/movieapp/logger"
)

type MovieHandler struct {
	Storage data.MovieStorage
	Logger  *logger.Logger
}

func (h *MovieHandler) writeJSONResponse(w http.ResponseWriter, data interface{}) {
	w.Header().Set("Cotent-Type", "application/json")
	if err := json.NewEncoder(w).Encode(data); err != nil {
		h.Logger.Error("JSON Encoding error", err)
		http.Error(w, "Failed to encode response", http.StatusInternalServerError)
	}
}

func (h *MovieHandler) GetTopMovies(w http.ResponseWriter, r *http.Request) {
	// movies := []models.Movie{
	// 	{
	// 		ID:          1,
	// 		TMDB_ID:     181,
	// 		Title:       "The Hacker",
	// 		ReleaseYear: 2022,
	// 		Genres:      []models.Genre{{ID: 1, Name: "Thriller"}},
	// 		Keywords:    []string{},
	// 		Casting:     []models.Actor{{ID: 1, FirstName: "Max"}},
	// 	},
	// 	{
	// 		ID:          2,
	// 		TMDB_ID:     181,
	// 		Title:       "Back to the future",
	// 		ReleaseYear: 1984,
	// 		Genres:      []models.Genre{{ID: 1, Name: "Thriller"}},
	// 		Keywords:    []string{},
	// 		Casting:     []models.Actor{{ID: 1, FirstName: "Max"}},
	// 	},
	// }
	movies, err := h.Storage.GetTopMovies()
	if err != nil {
		http.Error(w, "Internal Error Getting movies", 500)
		h.Logger.Error("Get Top Movies Error", err)
	}
	// w.Header().Set("Cotent-Type", "application/json")
	// if err := json.NewEncoder(w).Encode(movies); err != nil {
	// 	http.Error(w, "Failed to encode response", http.StatusInternalServerError)
	// }
	h.writeJSONResponse(w, movies)
}

func (h *MovieHandler) GetRandomMovies(w http.ResponseWriter, r *http.Request) {
	// movies := []models.Movie{
	// 	{
	// 		ID:          1,
	// 		TMDB_ID:     181,
	// 		Title:       "The Hacker Random",
	// 		ReleaseYear: 2022,
	// 		Genres:      []models.Genre{{ID: 1, Name: "Thriller"}},
	// 		Keywords:    []string{},
	// 		Casting:     []models.Actor{{ID: 1, FirstName: "Max"}},
	// 	},
	// 	{
	// 		ID:          2,
	// 		TMDB_ID:     181,
	// 		Title:       "Back to the Future Random",
	// 		ReleaseYear: 1984,
	// 		Genres:      []models.Genre{{ID: 1, Name: "Thriller"}},
	// 		Keywords:    []string{},
	// 		Casting:     []models.Actor{{ID: 1, FirstName: "Max"}},
	// 	},
	// }
	// // w.Header().Set("Cotent-Type", "application/json")
	// // if err := json.NewEncoder(w).Encode(movies); err != nil {
	// // 	http.Error(w, "Failed to encode response", http.StatusInternalServerError)
	// // }
	// h.writeJSONResponse(w, movies)
	movies, err := h.Storage.GetRandomMovies()
	if err != nil {
		http.Error(w, "Internal Error Getting movies", 500)
		h.Logger.Error("Get Top Movies Error", err)
	}
	// w.Header().Set("Cotent-Type", "application/json")
	// if err := json.NewEncoder(w).Encode(movies); err != nil {
	// 	http.Error(w, "Failed to encode response", http.StatusInternalServerError)
	// }
	h.writeJSONResponse(w, movies)
}
