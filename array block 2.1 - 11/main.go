/*
Даны два массива, образующие элементы двух множеств целых чисел.
Определить, равны ли эти множества (для множеств имеет значение только наличие элемента в множестве, а не порядок следования элементов в нем).
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

	set := make(map[int]struct{})

	for _, v := range a {
		set[v] = struct{}{}
	}

	for _, v := range b {
		delete(set, v)
	}

	if len(set) == 0 && distinctSize(a) == distinctSize(b) {
		fmt.Println("Множества равны")
	} else {
		fmt.Println("Множества не равны")
	}
}

func distinctSize(a []int) int {
	m := make(map[int]struct{})
	for _, v := range a {
		m[v] = struct{}{}
	}
	return len(m)
}
