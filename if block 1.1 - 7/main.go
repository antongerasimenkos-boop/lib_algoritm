package main

import (
	"fmt"
	"time"
)

func main() {
	var d, m, y int
	fmt.Scan(&d, &m, &y)

	t := time.Date(y, time.Month(m), d, 0, 0, 0, 0, time.UTC)
	next := t.AddDate(0, 0, 1)

	fmt.Printf("%02d.%02d.%04d\n", next.Day(), next.Month(), next.Year())
}
