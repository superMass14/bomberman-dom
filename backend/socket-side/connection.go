package Socket

import (
	"log"
)

func (c *SocketReader) HandleConnection() {
	go func() {
		defer func() {
			err := recover()
			if err != nil {
				log.Println("last recover => ", err)
			}
			log.Println("thread socketreader finish")
		}()

		for {
			c.Read()
		}

	}()
	go HandleOnlineUser()
	go Counter()
}
