/*
Найти все пары дружественных чисел, принадлежащих отрезку [a, b].
Два числа называются дружественными, если они равны сумме делителей друг друга (исключая сами числа).
Например, дружественными числами являются числа 220 и 284.
*/
package main

import "fmt"

func sumOfProperDivisors(number int) int {
	sum := 0
	for divisor := 1; divisor <= number/2; divisor++ {
		if number%divisor == 0 {
			sum += divisor
		}
	}
	return sum
}

func main() {
	var from, to int
	fmt.Println("Введите отрезок a и b:")
	fmt.Scan(&from, &to)

	for first := from; first <= to; first++ {
		second := sumOfProperDivisors(first)

		if second > first && second <= to &&
			sumOfProperDivisors(second) == first {
			fmt.Println("Дружественные числа:")
			fmt.Println(first, second)
		}
	}
}
