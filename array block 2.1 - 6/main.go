/*
Дан массив, состоящий из целых чисел. Найти элемент, который встречается в массиве максимальное число раз.
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

	freq := make(map[int]int)
	bestValue := a[0]
	bestCount := 0

	for _, v := range a {
		freq[v]++
		if freq[v] > bestCount {
			bestCount = freq[v]
			bestValue = v
		}
	}

	fmt.Println("Элемент с максимальной частотой:", bestValue)
	fmt.Println("Частота:", bestCount)
}
