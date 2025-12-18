/*
Дано натуральное . Вычислить
1*2+2*3*4+...+n*(n+1)*...*(2n)
*/
package main

import "fmt"

func main() {
	var limit int
	fmt.Println("Введите число n:")
	fmt.Scan(&limit)

	total := 0

	for start := 1; start <= limit; start++ {
		product := 1
		for factor := start; factor <= 2*start; factor++ {
			product *= factor
		}
		total += product
	}
	fmt.Println("Сумма произведений:")
	fmt.Println(total)
}
