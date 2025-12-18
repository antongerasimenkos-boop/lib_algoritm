/*
Из заданного целого числа сфорировать новое, цифры в котором идут в обратном порядке
*/
package main

import "fmt"

func main() {
	var n int
	fmt.Print("Введите число: ")
	fmt.Scan(&n)

	rev := 0
	sign := 1
	if n < 0 {
		sign = -1
		n = -n
	}
	// цикл фор т.к. в гошке нет вайла
	for n > 0 {
		rev = rev*10 + n%10
		n /= 10
	}

	fmt.Println(sign * rev)
}
