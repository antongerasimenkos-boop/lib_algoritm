/*
Найти n-е по порядку число Фибоначчи. Напомним, что числа Фибоначчи определяются по правилу:
F1=F2=1, Fi=Fi-1+Fi-2 для i = 3,4,5...
*/
package main

import "fmt"

func main() {
	var index int
	fmt.Println("Введите число:")
	fmt.Scan(&index)

	if index <= 2 {
		fmt.Println(1)
		return
	}

	previous, current := 1, 1

	for position := 3; position <= index; position++ {
		previous, current = current, previous+current
	}

	fmt.Println("Число Фибоначчи:")
	fmt.Println(current)
}
