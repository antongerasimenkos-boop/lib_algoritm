/*
Дан массив, состоящий из целых чисел. Определить, образуют ли элементы массива множество (все элементы множества должны быть уникальны).
*/
package main

import "fmt"

func main() {
	var n int
	fmt.Scan(&n)

	a := make([]int, n)
	for i := 0; i < n; i++ {
		fmt.Scan(&a[i])
	}

	seen := make(map[int]struct{})

	for _, v := range a {
		if _, ok := seen[v]; ok {
			fmt.Println("Не множество")
			return
		}
		seen[v] = struct{}{}
	}

	fmt.Println("Множество")
}
