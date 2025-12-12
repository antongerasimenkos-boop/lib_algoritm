/*
Задания на портале не было, поэтому придумал свое
1. Найти количество положительных элементов
2. Найти сумму отрицательных элементов
*/
package main

import "fmt"

func main() {
	var size int
	fmt.Println("Введите размер массива:")
	fmt.Scan(&size)

	numbers := make([]int, size)
	for index := 0; index < size; index++ {
		fmt.Println("Введите число: ", index)
		fmt.Scan(&numbers[index])
	}

	positiveCount := 0
	negativeSum := 0

	for _, value := range numbers {
		if value > 0 {
			positiveCount++
		} else if value < 0 {
			negativeSum += value
		}
	}

	fmt.Println("Количество положительных:", positiveCount)
	fmt.Println("Сумма отрицательных:", negativeSum)
}
