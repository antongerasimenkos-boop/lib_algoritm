/*
Найти в массиве целых чисел симметричную подпоследовательность максимальной длины.
Под термином «подпоследовательность» будем понимать некоторый набор подряд идущих элементов массива.
*/
package main

import "fmt"

func expand(a []int, left, right int) (int, int) {
	for left >= 0 && right < len(a) && a[left] == a[right] {
		left--
		right++
	}
	return left + 1, right - 1
}

func main() {
	var n int
	fmt.Println("Введите длину массива")
	fmt.Scan(&n)

	a := make([]int, n)
	fmt.Println("Введите числа массива")
	for i := 0; i < n; i++ {
		fmt.Scan(&a[i])
	}

	bestL, bestR := 0, 0

	for center := range a {
		l1, r1 := expand(a, center, center)
		if r1-l1 > bestR-bestL {
			bestL, bestR = l1, r1
		}

		if center+1 < len(a) && a[center] == a[center+1] {
			l2, r2 := expand(a, center, center+1)
			if r2-l2 > bestR-bestL {
				bestL, bestR = l2, r2
			}
		}
	}

	fmt.Println("Длина:", bestR-bestL+1)
	fmt.Print("Подпоследовательность: ")
	for i := bestL; i <= bestR; i++ {
		fmt.Print(a[i], " ")
	}
}
