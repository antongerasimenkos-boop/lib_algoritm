/*
Дан массив, элементами которого являются результаты забега спортсменов на 100 м. Составить команду из 4 лучших спортсменов.
*/
package main

import (
	"fmt"
	"sort"
)

func main() {
	var n int
	fmt.Scan(&n)

	a := make([]int, n)
	for i := 0; i < n; i++ {
		fmt.Scan(&a[i])
	}

	sort.Ints(a)

	fmt.Println("4 лучших результата:")
	for i := 0; i < 4 && i < len(a); i++ {
		fmt.Print(a[i], " ")
	}
}
