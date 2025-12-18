/*
Дан массив целых чисел. Определить,возрастающей последовательностью. Является ли он возрастающей последовательностью.
*/
package main

import "fmt"

func main() {
	var n int
	fmt.Scan(&n)

	nums := make([]int, n)
	for i := 0; i < n; i++ {
		fmt.Scan(&nums[i])
	}

	increasing := true
	for i := 1; i < len(nums); i++ {
		if nums[i] <= nums[i-1] {
			increasing = false
			break
		}
	}

	if increasing {
		fmt.Println("Массив является возрастающей последовательностью")
	} else {
		fmt.Println("Массив не является возрастающей последовательностью")
	}
}
