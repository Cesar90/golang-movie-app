package main

import (
	"database/sql"
	"fmt"
	"log"
	"net/http"
	"os"

	"cesarcordero.com/go/movieapp/data"
	"cesarcordero.com/go/movieapp/handlers"
	"cesarcordero.com/go/movieapp/logger"

	"github.com/joho/godotenv"
	_ "github.com/lib/pq"
)

func initializeLogger() *logger.Logger {
	logInstance, err := logger.NewLogger("movie.log")
	// logInstance.Error("Hello from the Error system", nil)
	if err != nil {
		log.Fatalf("Failed to initialice logger: %v", err)
	}
	defer logInstance.Close()
	return logInstance
}

func main() {

	// Log Initializer
	logInstance := initializeLogger()

	// Environments Variables
	if err := godotenv.Load(); err != nil {
		log.Fatal("No .env file was available")
	}
	// Connect to the DB
	dbConnStr := os.Getenv("DATABASE_URL")
	if dbConnStr == "" {
		log.Fatal("DATABASE_URL not set")
	}
	db, err := sql.Open("postgres", dbConnStr)
	if err != nil {
		log.Fatalf("Failed to connect to the DB: %v", err)
	}
	//Close connection after execute query
	defer db.Close()

	// Initialize Data Repository for Movies
	movieRepo, err := data.NewMovieRepository(db, logInstance)
	if err != nil {
		log.Fatalf("Failed to initialize repository")
	}
	movieHandlers := handlers.MovieHandler{
		Storage: movieRepo,
		Logger:  logInstance,
	}

	http.HandleFunc("/api/movies/top/", movieHandlers.GetTopMovies)
	http.HandleFunc("/api/movies/random/", movieHandlers.GetRandomMovies)
	http.HandleFunc("/api/movies/search/", movieHandlers.SearchMovies)
	http.HandleFunc("/api/movies/", movieHandlers.GetMovie) // api/movies/140
	http.HandleFunc("/api/genres/", movieHandlers.GetGenres)

	catchAllClientRoutesHandler := func(w http.ResponseWriter, r *http.Request) {
		// 1) HTTP Redirect 301 / 302
		// 2) Deliver the index.html
		http.ServeFile(w, r, "./public/index.html")
	}

	http.HandleFunc("/movies", catchAllClientRoutesHandler)
	http.HandleFunc("/movies/", catchAllClientRoutesHandler)
	http.HandleFunc("/account/", catchAllClientRoutesHandler)

	// Handler for static files (frontend)
	http.Handle("/", http.FileServer(http.Dir("public")))
	// http.Handle("", http.)
	fmt.Println("Serving the files")

	const addr = ":8080"
	err = http.ListenAndServe(addr, nil)
	if err != nil {
		log.Fatalf("Server failed: %v", err)
		logInstance.Error("Server failed", err)
	}
}
