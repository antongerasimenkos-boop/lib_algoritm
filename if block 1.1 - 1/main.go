/*
Даны три целых числа. Вывести «истина», если только одно из них является четным.
*/

package main

import "fmt"

func main() {
	nums := make([]int, 3)
	fmt.Println("Введите три числа:")
	for i := range nums {
		fmt.Scan(&nums[i])
	}

	evenCount := 0
	for _, v := range nums {
		if v%2 == 0 {
			evenCount++
		}
	}

	fmt.Println(evenCount == 1)
}

/*
можно по простому
func main() {
    var a, b, c int
    fmt.Print("Введите три числа: ")
    fmt.Scan(&a, &b, &c)

    count := 0
    if a%2 == 0 {
        count++
    }
    if b%2 == 0 {
        count++
    }
    if c%2 == 0 {
        count++
    }

    if count == 1 {
        fmt.Println(true)
    } else {
        fmt.Println(false)
    }
}
*/
