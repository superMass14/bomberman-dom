package Socket

// struct player
type PlayerPos struct {
	X        int    `json:"x"`
	Y        int    `json:"y"`
	Color    string `json:"color"`
	Username string `json:"username"`
}

// struct obstacle
func GetPlayersPositions() []PlayerPos {
	players := []PlayerPos{}

	for i, user := range PlayerTab(UserTab) {
		if i == 0 {
			players = append(players, PlayerPos{X: 0, Y: 0, Color: user.Player, Username: user.Username})
		} else if i == 1 {
			players = append(players, PlayerPos{X: 13, Y: 13, Color: user.Player, Username: user.Username})
		} else if i == 2 {
			players = append(players, PlayerPos{X: 13, Y: 0, Color: user.Player, Username: user.Username})
		} else if i == 3 {
			players = append(players, PlayerPos{X: 0, Y: 13, Color: user.Player, Username: user.Username})
		}
	}

	return players
}
