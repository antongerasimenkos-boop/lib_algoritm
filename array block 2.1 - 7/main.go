/*
Дан массив, состоящий из целых чисел. Определить количество различных элементов этого массива.
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

	m := make(map[int]struct{})
	for _, v := range a {
		m[v] = struct{}{}
	}

	fmt.Println("Количество различных элементов:", len(m))
}
