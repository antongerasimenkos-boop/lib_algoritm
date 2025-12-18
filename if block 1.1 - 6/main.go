/*
Даны три числа, обозначающие дату (день, месяц и год). Проверить корректность даты.
*/
package main

import "fmt"

func isLeap(year int) bool {
	return (year%400 == 0) || (year%4 == 0 && year%100 != 0)
}

func main() {
	var d, m, y int
	fmt.Print("Введите дату (день месяц год): ")
	fmt.Scan(&d, &m, &y)

	daysInMonth := map[int]int{
		1: 31, 2: 28, 3: 31, 4: 30,
		5: 31, 6: 30, 7: 31, 8: 31,
		9: 30, 10: 31, 11: 30, 12: 31,
	}

	if isLeap(y) {
		daysInMonth[2] = 29
	}

	if m < 1 || m > 12 || d < 1 || d > daysInMonth[m] {
		fmt.Println(false)
	} else {
		fmt.Println(true)
	}
}
