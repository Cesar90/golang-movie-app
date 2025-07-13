package handlers

import (
	"encoding/json"
	"net/http"

	"cesarcordero.com/go/movieapp/models"
)

type MovieHandler struct {
	//TODO
}

func (h *MovieHandler) GetToMovies(w http.ResponseWriter, r *http.Request) {
	movies := []models.Movie{
		{
			ID:          1,
			TMDB_ID:     181,
			Title:       "The Hacker",
			ReleaseYear: 2022,
			Genres:      []models.Genre{{ID: 1, Name: "Thriller"}},
			Keywords:    []string{},
			Casting:     []models.Actor{{ID: 1, FirstName: "Max"}},
		},
		{
			ID:          2,
			TMDB_ID:     181,
			Title:       "Back to the future",
			ReleaseYear: 1984,
			Genres:      []models.Genre{{ID: 1, Name: "Thriller"}},
			Keywords:    []string{},
			Casting:     []models.Actor{{ID: 1, FirstName: "Max"}},
		},
	}
	w.Header().Set("Cotent-Type", "application/json")
	if err := json.NewEncoder(w).Encode(movies); err != nil {
		http.Error(w, "Failed to encode response", http.StatusInternalServerError)
	}
}
