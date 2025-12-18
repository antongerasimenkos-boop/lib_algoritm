/*
Дано целое число. Определить, входит ли заданная цифра в запись этого числа
*/
package main

import "fmt"

func main() {
	var n, d int
	fmt.Print("Введите число (где искать) и цифру: ")
	fmt.Scan(&n, &d)

	found := false
	if n < 0 {
		n = -n
	}
	// цикл фор т.к. в гошке нет вайла
	for n > 0 {
		if n%10 == d {
			found = true
			break
		}
		n /= 10
	}

	fmt.Println(found)
}
