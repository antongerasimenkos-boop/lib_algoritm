package main

import "fmt"

func rubleWord(n int) string {
	if n%100 >= 11 && n%100 <= 14 {
		return "рублей"
	}
	switch n % 10 {
	case 1:
		return "рубль"
	case 2, 3, 4:
		return "рубля"
	default:
		return "рублей"
	}
}

func main() {
	var n int
	fmt.Print("Введите число от 1 до 999: ")
	fmt.Scan(&n)

	if n < 1 || n > 999 {
		fmt.Println("Некорректное число")
		return
	}

	fmt.Printf("%d %s\n", n, rubleWord(n))
}
