package data

import "cesarcordero.com/go/movieapp/models"

type MovieStorage interface {
	GetToMovies() ([]models.Movie, error)
	GetRandomMovies() ([]models.Movie, error)
	// GetMoviesById(id int) (models.Movie, error)
	// SearchMoviesByName(name string) ([]models.Movie, error)
	// GetAllGenres() ([]models.Genre, error)
}
