/*
Даны три целых числа. Получить максимальное из них.
*/
package main

import (
	"fmt"
	"slices"
)

func main() {
	arr := make([]int, 3)
	for i := range arr {
		fmt.Scan(&arr[i])
	}

	max := slices.Max(arr)
	fmt.Println("Максимальное:", max)

}

/*
по простому:
func main() {
    var a, b, c int
    fmt.Print("Введите три числа: ")
    fmt.Scan(&a, &b, &c)

    max := a
    if b > max {
        max = b
    }
    if c > max {
        max = c
    }

    fmt.Println("Максимальное:", max)
}
*/
