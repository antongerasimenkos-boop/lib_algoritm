/*
2.	Найти значение ‼. Если n – четное, то
n!!=2*4*6*...*n
если – нечетное, то
n!!=1*3*5*...*n
*/
package main

import "fmt"

func main() {
	var value int
	fmt.Println("Введите число n:")
	fmt.Scan(&value)

	result := 1
	for current := value; current > 0; current -= 2 {
		result *= current
	}
	fmt.Println("Двойной факториал n:")
	fmt.Println(result)
}
