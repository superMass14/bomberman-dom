package Socket

import (
	"fmt"
	"time"
)

func Counter() {
	response := make(map[string]interface{}, 0)
	for {
		select {
		case player := <-HdleCounter:
			if len(PlayerTab(UserTab)) == 4 {
				fmt.Println("💣 room is full must start game")
				Timer = 0
				GameStarted = true //! GameStarted
				return
			}

			// fmt.Println("bool state => ", HasStarted)
			if Timer > 0 && Timer < 20 && HasStarted {
				fmt.Println("✨ innit 📡")
				Timer += 2
				break
			}
			HasStarted = true //! counter has started

			fmt.Println("timer state => ", Timer)
			for Timer >= 0 && !GameStarted {
				fmt.Println("waiting for... ", Timer)
				response["Type"] = "waiting-timer"
				response["value"] = Timer
				player.Broadcast(response)
				Timer -= 1
				time.Sleep(1 * time.Second)
			}
			Timer = 10
			// Timer = 2//khech
			GameStarted = true //!Game has started
			HasStarted = false //!end of counter
			for Timer >= 0 {
				fmt.Println("game starts in ... ", Timer)
				response["Type"] = "start-game-timer"
				response["value"] = Timer
				player.Broadcast(response)
				Timer -= 1
				time.Sleep(1 * time.Second)

				if Timer == 0 { //Game is started
					// Broadcaster les obstacles
					response["Type"] = "gameObstacles"
					response["value"] = GetObstaclesData()
					player.Broadcast(response)
					// Broadcaster les players
					response["Type"] = "addPlayers"
					response["value"] = GetPlayersPositions()
					player.Broadcast(response)
				}
			}
			Timer = 20 //! reset counter
		}
	}
}
