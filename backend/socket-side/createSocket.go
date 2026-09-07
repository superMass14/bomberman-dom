package Socket

import (
	"log"
	"net/http"
)

func SocketReaderCreate(w http.ResponseWriter, r *http.Request) {

	log.Printf("socket request from %s", r.RemoteAddr)
	if UserTab == nil {
		UserTab = make([]*SocketReader, 0)
	}

	defer func() {
		err := recover()
		if err != nil {
			log.Println(err)
		}
		r.Body.Close()

	}()
	con, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println("err in upgrade", err)
		return
	}
	Client := &SocketReader{
		Con: con,
	}

	Client.HandleConnection()
}
