/*
Дан массив, состоящий из целых чисел. Определить количество различных элементов этого массива.
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

	m := make(map[int]struct{})
	for _, v := range a {
		m[v] = struct{}{}
	}

	fmt.Println("Количество различных элементов:", len(m))
}
