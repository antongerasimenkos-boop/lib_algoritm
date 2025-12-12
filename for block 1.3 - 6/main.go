package main

import "fmt"

func digitSum(number int) int {
	sum := 0
	for number > 0 {
		sum += number % 10
		number /= 10
	}
	return sum
}

func main() {
	for ticket := 0; ticket <= 999999; ticket++ {
		leftPart := ticket / 1000
		rightPart := ticket % 1000

		if digitSum(leftPart) == digitSum(rightPart) {
			fmt.Printf("%06d\n", ticket)
		}
	}
}
