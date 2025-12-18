/*
Дана корректная дата в виде трех целых чисел. Получить дату следующего дня.
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

	d++
	if d > daysInMonth[m] {
		d = 1
		m++
		if m > 12 {
			m = 1
			y++
		}
	}

	fmt.Printf("Следующая дата: %02d.%02d.%04d\n", d, m, y)
}
