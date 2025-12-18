/*
Дан массив, состоящий из целых чисел. Определить количество элементов, встречающихся в нем по одному разу.
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
	for _, v := range a {
		freq[v]++
	}

	count := 0
	for _, c := range freq {
		if c == 1 {
			count++
		}
	}

	fmt.Println("Количество элементов, встречающихся 1 раз:", count)
}
