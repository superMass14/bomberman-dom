package Socket

import (
	"fmt"
	"log"

	"github.com/gorilla/websocket"
)

// the credentials structure stores the data of the logged in user
func (c *SocketReader) Read() {
	log.Println("-- reading... --")
	var request Request
	er := c.Con.ReadJSON(&request)
	log.Println("req", request)
	if er != nil {
		if closeMsg, ok := er.(*websocket.CloseError); ok {
			log.Printf("connexion closed with status %v due to %s", closeMsg.Code, closeMsg.Text)
			IsDisconnected <- c
			panic(er)
		}
		log.Println("read json error: ", er)
		return

	}
	requestType := request.Type
	requestPayload := request.Payload
	log.Println("payload is here", requestPayload)
	response := make(map[string]interface{}, 0)

	switch requestType {

	case "bombPlace":
		//? must at the this condition "&& !GameStarted"
		playerColor := requestPayload["Color"].(string)
		value := requestPayload["Value"].(string)
		response["Type"] = "placeBomb"
		response["color"] = playerColor
		response["value"] = value
		c.Broadcast(response)
	case "playerMove":
		//? must at the this condition "&& !GameStarted"
		playerColor := requestPayload["Color"].(string)
		direction := requestPayload["Value"].(string)
		response["Type"] = "movePlayer"
		response["color"] = playerColor
		response["direction"] = direction
		c.Broadcast(response)

	case "gameOver":
		fmt.Println("in GO 💣")
		GameStarted = false
		MessageTab = [][]string{}
		Players := PlayerTab(UserTab)
		Color := requestPayload["Value"].(string)
		var Username string
		for _, v := range Players {
			if v.Player == Color {
				Username = v.Username
			}
		}
		response["Type"] = "gameOver"
		response["username"] = Username
		response["color"] = Color
		c.Broadcast(response)
		UserTab = []*SocketReader{}
		fmt.Printf("game is over %v [%v-bomberman] wins ✨!\n", Username, Color)

	case "enterGame":
		fmt.Println("in enterGame")
		//? must at the this condition "&& !GameStarted"
		if len(UserTab) < 4 {
			var list []string
			for _, v := range UserTab {
				list = append(list, v.Player)
			}
			fmt.Println("playroom is not full, player can have access")
			Isconnected <- c
			response["Type"] = "enterGame"
			response["Payload"] = "success"
			response["PlayerList"] = list
			c.SendMessage(response)
		} else {
			fmt.Println("playroom is full")
			response["Type"] = "enterGame"
			response["Payload"] = "full"
			c.SendMessage(response)
		}

	case "selectPlayer":
		fmt.Println("in selectPlayer")
		if GameStarted {
			fmt.Println("❌ game already started")
			response["Type"] = "selectPlayer"
			response["gameStatus"] = "started"
			c.SendMessage(response)
			return
		}
		username, exist := requestPayload["Username"].(string)
		if !exist {
			fmt.Println("❌ username is not defined")
			return
		}
		player, existP := requestPayload["Player"].(string)
		if !existP {
			fmt.Println("❌ player type is not defined")
			return
		}
		c.Connected = true
		c.Username = username
		c.Player = player
		// fmt.Println("c.con to compare => ", c.Con.RemoteAddr())
		for i, v := range UserTab {
			// fmt.Println("let's compare with : ", v.Con.RemoteAddr())
			if v.Con.RemoteAddr() == c.Con.RemoteAddr() {
				UserTab[i].Username = c.Username
				UserTab[i].Player = c.Player
				fmt.Printf("player %v is verified to => %v\n", v.Username, UserTab[i].Username)
				break
			}
		}

		fmt.Println("after update")
		for _, v := range UserTab {
			fmt.Printf("[%v] - %v - %v\n", v.Con.RemoteAddr(), v.Username, v.Player)
		}
		fmt.Println("----------------")
		if len(PlayerTab(UserTab)) >= 2 {
			HdleCounter <- c
		} else {
			fmt.Println(PlayerTab(UserTab))
			fmt.Println("length => ", len(PlayerTab(UserTab)))
			fmt.Println("counter didn't start")
		}

		fmt.Println("--- Usertab before listing ---")
		for _, v := range UserTab {
			fmt.Printf("[%v] - %v - %v\n", v.Con.RemoteAddr(), v.Username, v.Player)
		}
		var list [][]string
		for _, v := range UserTab {
			list = append(list, []string{v.Player, v.Username})
		}
		fmt.Printf("%v connected as %v with [%v] bomberman\n", c.Con.RemoteAddr(), c.Username, c.Player)
		response["Type"] = "selectPlayer"
		response["Username"] = c.Username
		response["gameStatus"] = "pending"
		response["Player"] = c.Player
		response["MessageList"] = MessageTab
		response["PlayerList"] = list
		c.SendMessage(response)

		//notify others
		response["Type"] = "newPlayer"
		response["gameStatus"] = "pending"
		response["Username"] = c.Username
		response["Player"] = c.Player
		response["PlayerList"] = list
		c.NotifyOthers(response)

	case "newMessage":
		fmt.Println("in newMessage...")
		Username, errUsername := requestPayload["Username"].(string)
		Color, errColor := requestPayload["Color"].(string)
		Message, errMessage := requestPayload["Message"].(string)
		if !errUsername {
			fmt.Println("❌ message infos received are invalid: username is missing")
			return
		}
		if !errColor {
			fmt.Println("❌ message infos received are invalid: player color is missing")
			return
		}
		if !errMessage {
			fmt.Println("❌ message infos received are invalid: empty message")
			return
		}
		MessageTab = append(MessageTab, []string{Color, Username, Message})
		fmt.Println("message tab:")    //debug
		for _, v := range MessageTab { //debug
			fmt.Println(v) //debug
		}
		response["Type"] = "newMessage"
		response["Username"] = Username
		response["Color"] = Color
		response["Message"] = Message
		c.Broadcast(response)
	}

	log.Println("-- done reading!!! --")
}
