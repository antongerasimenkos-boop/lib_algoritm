/*
Вычислить по схеме Горнера следующую функцию:
*/
package main

import "fmt"

func main() {
	var x int
	fmt.Println("Введите число:")
	fmt.Scan(&x)

	result := 1
	for coefficient := 2; coefficient <= 11; coefficient++ {
		result = result*x + coefficient
	}
	fmt.Println("Результат:")
	fmt.Println(result)
}
