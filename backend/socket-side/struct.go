package Socket

import (
	"net/http"

	"github.com/gorilla/websocket"
)

// socketReader struct
type SocketReader struct {
	Con       *websocket.Conn
	Connected bool
	Username  string
	Player    string
}

var (
	upgrader = websocket.Upgrader{
		CheckOrigin: func(r *http.Request) bool {
			return true
		},
		ReadBufferSize:  1024,
		WriteBufferSize: 1024,
	}
	Isconnected    = make(chan *SocketReader)
	IsDisconnected = make(chan *SocketReader)
	IsVerified     = make(chan *SocketReader)
	HdleCounter    = make(chan *SocketReader)
	HasStarted     = false
	GameStarted    = false
	Timer          = 20
	// Timer      = 2 //khech
	MessageTab [][]string
	UserTab    []*SocketReader
)

type Request struct {
	Type    string
	Payload map[string]interface{}
}
