/*
Найти в массиве, состоящем из целых чисел, возрастающую подпоследовательность максимальной длины.
Под термином «подпоследовательность» будем понимать некоторый набор подряд идущих элементов массива.
*/
package main

import "fmt"

func main() {
	var n int
	fmt.Println("Введите длину массива")
	fmt.Scan(&n)

	a := make([]int, n)
	fmt.Println("Введите числа массива")
	for i := 0; i < n; i++ {
		fmt.Scan(&a[i])
	}

	bestStart, bestLen := 0, 1
	currentStart, currentLen := 0, 1

	for i := 1; i < n; i++ {
		if a[i] > a[i-1] {
			currentLen++
		} else {
			currentStart = i
			currentLen = 1
		}

		if currentLen > bestLen {
			bestLen = currentLen
			bestStart = currentStart
		}
	}

	fmt.Println("Длина:", bestLen)
	fmt.Print("Подпоследовательность: ")
	for i := bestStart; i < bestStart+bestLen; i++ {
		fmt.Print(a[i], " ")
	}
}
