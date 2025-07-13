package main

import (
	"fmt"
	"log"
	"net/http"

	"cesarcordero.com/go/movieapp/handlers"
	"cesarcordero.com/go/movieapp/logger"
)

func initializeLogger() *logger.Logger {
	logInstance, err := logger.NewLogger("movie.log")
	if err != nil {
		log.Fatalf("Failed to initialice logger: %v", err)
	}
	defer logInstance.Close()
	return logInstance
}

func main() {

	logInstance := initializeLogger()

	movieHandlers := handlers.MovieHandler{}

	http.HandleFunc("/api/movies/top", movieHandlers.GetToMovies)

	// Handler for static files (frontend)
	http.Handle("/", http.FileServer(http.Dir("public")))
	// http.Handle("", http.)
	fmt.Println("Serving the files")

	const addr = ":8080"
	err := http.ListenAndServe(addr, nil)
	if err != nil {
		log.Fatalf("Server failed: %v", err)
		logInstance.Error("Server failed", err)
	}
}
