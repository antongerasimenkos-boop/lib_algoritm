package main

import (
	"fmt"
	"time"
)

func main() {
	var d, m, y int
	fmt.Print("Введите дату (день месяц год): ")
	fmt.Scan(&d, &m, &y)

	t := time.Date(y, time.Month(m), d, 0, 0, 0, 0, time.UTC)

	valid := (t.Day() == d && int(t.Month()) == m && t.Year() == y)
	fmt.Print("true - дата корректна, false - некорректна")
	fmt.Println(valid)
}
