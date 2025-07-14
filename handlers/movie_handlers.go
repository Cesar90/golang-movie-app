package handlers

import (
	"encoding/json"
	"net/http"
	"strconv"

	"cesarcordero.com/go/movieapp/data"
	"cesarcordero.com/go/movieapp/logger"
	"cesarcordero.com/go/movieapp/models"
)

type MovieHandler struct {
	Storage data.MovieStorage
	Logger  *logger.Logger
}

// func (h *MovieHandler) writeJSONResponse(w http.ResponseWriter, data interface{}) {
// 	w.Header().Set("Cotent-Type", "application/json")
// 	if err := json.NewEncoder(w).Encode(data); err != nil {
// 		h.Logger.Error("JSON Encoding error", err)
// 		http.Error(w, "Failed to encode response", http.StatusInternalServerError)
// 	}
// }

// Utility functions
func (h *MovieHandler) writeJSONResponse(w http.ResponseWriter, data interface{}) error {
	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(data); err != nil {
		h.Logger.Error("Failed to encode response", err)
		http.Error(w, "Failed to encode response", http.StatusInternalServerError)
		return err
	}
	return nil
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

func (h *MovieHandler) handleStorageError(w http.ResponseWriter, err error, context string) bool {
	if err != nil {
		if err == data.ErrMovieNotFound {
			http.Error(w, context, http.StatusNotFound)
			return true
		}
		h.Logger.Error(context, err)
		http.Error(w, "Internal server error", http.StatusInternalServerError)
		return true
	}
	return false
}

func (h *MovieHandler) parseID(w http.ResponseWriter, idStr string) (int, bool) {
	id, err := strconv.Atoi(idStr)
	if err != nil {
		h.Logger.Error("Invalid ID format", err)
		http.Error(w, "Invalid ID", http.StatusBadRequest)
		return 0, false
	}
	return id, true
}

func (h *MovieHandler) SearchMovies(w http.ResponseWriter, r *http.Request) {
	query := r.URL.Query().Get("q")
	order := r.URL.Query().Get("order")
	genreStr := r.URL.Query().Get("genre")

	var genre *int
	if genreStr != "" {
		genreInt, ok := h.parseID(w, genreStr)
		if !ok {
			return
		}
		genre = &genreInt
	}

	var movies []models.Movie
	var err error
	if query != "" {
		movies, err = h.Storage.SearchMoviesByName(query, order, genre)
	}
	if h.handleStorageError(w, err, "Failed to get movies") {
		return
	}
	if h.writeJSONResponse(w, movies) == nil {
		h.Logger.Info("Successfully served movies")
	}
}

func (h *MovieHandler) GetMovie(w http.ResponseWriter, r *http.Request) {
	idStr := r.URL.Path[len("/api/movies/"):]
	id, ok := h.parseID(w, idStr)
	if !ok {
		return
	}

	movie, err := h.Storage.GetMovieByID(id)
	if h.handleStorageError(w, err, "Failed to get movie by ID") {
		return
	}
	if h.writeJSONResponse(w, movie) == nil {
		h.Logger.Info("Successfully served movie with ID: " + idStr)
	}
}

func (h *MovieHandler) GetGenres(w http.ResponseWriter, r *http.Request) {
	genres, err := h.Storage.GetAllGenres()
	if h.handleStorageError(w, err, "Failed to get genres") {
		return
	}
	if h.writeJSONResponse(w, genres) == nil {
		h.Logger.Info("Successfully served genres")
	}
}
