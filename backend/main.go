package main

import (
	Skt "backend/socket-side"
	"fmt"
	"net/http"
)

func main() {

	myhttp := http.NewServeMux()
	myhttp.Handle("/", http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		switch r.URL.Path {
		case "/socket":
			Skt.SocketReaderCreate(w, r)
		default:
			w.WriteHeader(http.StatusNotFound)
		}
	}))

	// Launchinh server
	fmt.Println("📡----------------------------------------------------📡")
	fmt.Println("|                                                      |")
	fmt.Println("| 🌐 Server has started at \033[32mhttp://localhost:8080\033[0m 🟢    |")
	fmt.Println("|                                                      |")
	fmt.Println("📡----------------------------------------------------📡")
	errServ := http.ListenAndServe(":8080", myhttp)
	if errServ != nil {
		fmt.Printf("Erreur de serveur HTTP : %s\n", errServ)
	}
}
