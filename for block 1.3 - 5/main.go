/*
Вычислить x^n
*/
package main

import "fmt"

func main() {
	var base, exponent int
	fmt.Println("Введите число и его стпень:")
	fmt.Scan(&base, &exponent)

	power := 1
	for count := 0; count < exponent; count++ {
		power *= base
	}

	fmt.Println("Число в степени:")
	fmt.Println(power)
}
