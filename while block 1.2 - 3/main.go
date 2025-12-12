package main

import "fmt"

func main() {
	var n int
	fmt.Print("Введите число: ")
	fmt.Scan(&n)

	if n < 1 {
		fmt.Println(false)
		return
	}

	a, b := 1, 1
	found := (n == 1)
	// цикл фор т.к. в гошке нет вайла
	for b < n {
		a, b = b, a+b
		if b == n {
			found = true
			break
		}
	}

	fmt.Println(found)
}
