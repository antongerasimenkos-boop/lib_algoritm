/*
Найти все числа Армстронга, принадлежащие заданному отрезку [a, b].
Числом Армстронга является число, сумма кубов цифр которого совпадает с самим числом. Например, 153 = 12 + 52 + 32.
*/
package main

import "fmt"

func isArmstrong(number int) bool {
	sum := 0
	temp := number

	for temp > 0 {
		digit := temp % 10
		sum += digit * digit * digit
		temp /= 10
	}

	return sum == number
}

func main() {
	fmt.Println("Введите отрезок a и b:")
	var from, to int
	fmt.Scan(&from, &to)

	for candidate := from; candidate <= to; candidate++ {
		if isArmstrong(candidate) {
			fmt.Println("Число Армстронга: ")
			fmt.Println(candidate)
		}
	}
}
