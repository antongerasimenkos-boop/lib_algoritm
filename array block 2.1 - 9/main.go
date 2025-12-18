/*
Даны два массива, состоящие из целых чисел. Определить количество элементов первого массива, которые содержатся также и во втором массиве.
*/
package main

import "fmt"

func main() {
	var n, m int
	fmt.Scan(&n)

	a := make([]int, n)
	for i := 0; i < n; i++ {
		fmt.Scan(&a[i])
	}

	fmt.Scan(&m)
	b := make([]int, m)
	for i := 0; i < m; i++ {
		fmt.Scan(&b[i])
	}

	exists := make(map[int]struct{})
	for _, v := range b {
		exists[v] = struct{}{}
	}

	count := 0
	for _, v := range a {
		if _, ok := exists[v]; ok {
			count++
		}
	}

	fmt.Println("Количество совпадающих элементов:", count)
}
