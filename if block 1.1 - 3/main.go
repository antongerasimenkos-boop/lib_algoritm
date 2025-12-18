/*
Даны три целых числа. Вывести эти числа в порядке возрастания.
*/

package main

import (
	"fmt"
	"sort"
)

func main() {
	arr := make([]int, 3)
	for i := range arr {
		fmt.Scan(&arr[i])
	}

	sort.Ints(arr)
	fmt.Println(arr)
}

/*
по простому
func main() {
    var a, b, c int
    fmt.Print("Введите три числа: ")
    fmt.Scan(&a, &b, &c)

    if a > b {
        a, b = b, a
    }
    if b > c {
        b, c = c, b
    }
    if a > b {
        a, b = b, a
    }

    fmt.Println("По возрастанию:", a, b, c)
}

*/
