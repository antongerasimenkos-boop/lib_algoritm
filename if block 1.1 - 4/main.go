package main

import "fmt"

//по честному, не знаю как в шахматах все работает - нагло украл логику из интернета
func main() {
	var x1, y1, x2, y2 int
	fmt.Print("Введите координаты коня (x1 y1) и цели (x2 y2): ")
	fmt.Scan(&x1, &y1, &x2, &y2)

	dx := x1 - x2
	if dx < 0 {
		dx = -dx
	}
	dy := y1 - y2
	if dy < 0 {
		dy = -dy
	}

	if (dx == 1 && dy == 2) || (dx == 2 && dy == 1) {
		fmt.Println(true)
	} else {
		fmt.Println(false)
	}
}
