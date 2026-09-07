package Socket

import (
	"math/rand"
	"time"
)

// Structure qui représente un point (x, y) sur une grille
type Point struct {
	X int `json:"x"`
	Y int `json:"y"`
}

// Structure qui représente un obstacle sur la grille
type Obstacle struct {
	Point
	Type string `json:"type"`
}

// isProtectedCage prend un point et détermine s'il est protégé
func isProtectedCage(p Point) bool {
	var protectedCages []Point

	// Protège le coin supérieur gauche
	if len(PlayerTab(UserTab)) > 0 {
		protectedCages = append(protectedCages, Point{X: 0, Y: 0}, Point{X: 1, Y: 0}, Point{X: 0, Y: 1})
	}

	// Protège le coin inférieur droit
	if len(PlayerTab(UserTab)) > 1 {
		protectedCages = append(protectedCages, Point{X: 13, Y: 13}, Point{X: 12, Y: 13}, Point{X: 13, Y: 12})
	}

	// Protège le coin supérieur droit
	if len(PlayerTab(UserTab)) > 2 {
		protectedCages = append(protectedCages, Point{X: 13, Y: 0}, Point{X: 12, Y: 0}, Point{X: 13, Y: 1})
	}

	// Protège le coin inférieur gauche
	if len(PlayerTab(UserTab)) > 3 {
		protectedCages = append(protectedCages, Point{X: 0, Y: 12}, Point{X: 0, Y: 13}, Point{X: 1, Y: 13})
	}

	for _, cage := range protectedCages {
		if cage == p {
			return true
		}
	}
	return false
}

// placer les blocks
var blocksTab = []Obstacle{
	// Top range
	{Point: Point{X: 1, Y: 1}, Type: "BLOCK"},
	{Point: Point{X: 3, Y: 1}, Type: "BLOCK"},
	{Point: Point{X: 6, Y: 1}, Type: "BLOCK"},
	{Point: Point{X: 7, Y: 1}, Type: "BLOCK"},
	{Point: Point{X: 10, Y: 1}, Type: "BLOCK"},
	{Point: Point{X: 12, Y: 1}, Type: "BLOCK"},
	// bottom range
	{Point: Point{X: 1, Y: 12}, Type: "BLOCK"},
	{Point: Point{X: 3, Y: 12}, Type: "BLOCK"},
	{Point: Point{X: 6, Y: 12}, Type: "BLOCK"},
	{Point: Point{X: 7, Y: 12}, Type: "BLOCK"},
	{Point: Point{X: 10, Y: 12}, Type: "BLOCK"},
	{Point: Point{X: 12, Y: 12}, Type: "BLOCK"},
	// Right range
	{Point: Point{Y: 1, X: 12}, Type: "BLOCK"},
	{Point: Point{Y: 3, X: 12}, Type: "BLOCK"},
	{Point: Point{Y: 6, X: 12}, Type: "BLOCK"},
	{Point: Point{Y: 7, X: 12}, Type: "BLOCK"},
	{Point: Point{Y: 10, X: 12}, Type: "BLOCK"},
	// Left range
	{Point: Point{Y: 1, X: 1}, Type: "BLOCK"},
	{Point: Point{Y: 3, X: 1}, Type: "BLOCK"},
	{Point: Point{Y: 6, X: 1}, Type: "BLOCK"},
	{Point: Point{Y: 7, X: 1}, Type: "BLOCK"},
	{Point: Point{Y: 10, X: 1}, Type: "BLOCK"},
	// Middle circle
	{Point: Point{Y: 5, X: 4}, Type: "BLOCK"},
	{Point: Point{Y: 6, X: 4}, Type: "BLOCK"},
	{Point: Point{Y: 7, X: 4}, Type: "BLOCK"},
	{Point: Point{X: 5, Y: 4}, Type: "BLOCK"},
	{Point: Point{X: 6, Y: 4}, Type: "BLOCK"},
	{Point: Point{X: 7, Y: 4}, Type: "BLOCK"},

	{Point: Point{Y: 6, X: 9}, Type: "BLOCK"},
	{Point: Point{Y: 7, X: 9}, Type: "BLOCK"},
	{Point: Point{Y: 8, X: 9}, Type: "BLOCK"},
	{Point: Point{X: 6, Y: 9}, Type: "BLOCK"},
	{Point: Point{X: 7, Y: 9}, Type: "BLOCK"},
	{Point: Point{X: 8, Y: 9}, Type: "BLOCK"},
}

// verify if is block
func isBlock(p Point) bool {
	for _, cage := range blocksTab {
		if cage.Point == p {
			return true
		}
	}
	return false
}

// getObstaclesData génère les obstacles en fonction des coins protégés
func GetObstaclesData() []Obstacle {
	var obstacles []Obstacle
	rand.Seed(time.Now().UnixNano())

	for _, obs := range blocksTab {
		obstacles = append(obstacles, obs)
	}
	for x := 0; x < 14; x++ {
		for y := 0; y < 14; y++ {
			random := rand.Intn(14) // Génère un nombre entre 0 et 13
			if random <= 5 {        // 2/14 de probabilité de créer un obstacle
				point := Point{X: x, Y: y}
				if !isProtectedCage(point) && !isBlock(point) {
					obstacleType := "WALL"
					// if random == 1 { // 1/3 de probabilité d'avoir un type 'BLOCK'
					// 	obstacleType = "BLOCK"
					// }
					if random == 2 { // 1/3 de probabilité d'avoir un type 'BLOCK'
						obstacleType = "BONUS_BOMB"
					}
					if random == 3 { // 1/3 de probabilité d'avoir un type 'BLOCK'
						obstacleType = "BONUS_SPEED"
					}
					if random == 4 { // 1/3 de probabilité d'avoir un type 'BLOCK'
						obstacleType = "BONUS_FLAME"
					}
					obstacles = append(obstacles, Obstacle{
						Point: point,
						Type:  obstacleType,
					})
				}
			}
		}
	}

	return obstacles
}
