package Socket

import "fmt"

func HandleOnlineUser() {
	for {
		select {
		case player := <-Isconnected:
			UserTab = append(UserTab, player)
			fmt.Printf("player %v added\n", player.Con.RemoteAddr())
			for _, v := range UserTab {
				fmt.Println(v.Con.RemoteAddr())
			}

		case disconnect := <-IsDisconnected:
			response := make(map[string]interface{}, 0)
			fmt.Printf("player %v is disconnected must quit", disconnect)
			UserTab = RemovePlayer(UserTab, disconnect)
			fmt.Println("--- users list after removal ---")
			for i := range UserTab {
				fmt.Println(UserTab[i])
			}
			response["Type"] = "disconnect"
			response["color"] = disconnect.Player
			response["username"] = disconnect.Username
			disconnect.Broadcast(response)
		}

	}
}

func RemovePlayer(list []*SocketReader, player *SocketReader) []*SocketReader {
	for i, v := range list {
		if v.Con == player.Con {
			list = append(list[:i], list[i+1:]...)
			fmt.Println("player removed successfully")
			break
		}
	}
	return list
}

func PlayerTab(list []*SocketReader) []*SocketReader {
	var newList []*SocketReader
	for _, v := range list {
		if v.Username != "" {
			newList = append(newList, v)
		}
	}
	fmt.Println("🟢 players filtered successfully")
	for _, v := range newList {
		fmt.Println("- ", v)
	}
	return newList
}
