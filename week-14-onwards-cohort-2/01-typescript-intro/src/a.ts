 //Define var with type
 let x: number = 1
 console.log(x)

 // Define function, explicitly define return type

 function greet(firstname: string, age: number): string {
    console.log("Hello" + firstname + age)
    return firstname
 }

function sum(a: number, b: number): number {
    return a + b
}

// Function type in typescript
function runFn(fn: () => void) {
    setTimeout(fn, 1000)
}

// Create a function "isLegal" that returns true or false if a user is above 18

interface User {
    firstname: string,
    lastname: string,
    age: number,
    email?: string // optional
}

function isLegal(user: User) {
    return user.age > 18 ? true : false
}

const myuser: User = {
    firstname: "Soham",
    lastname: "Ray",
    age: 34,
}

isLegal(myuser)


// Arrays in TS 

function namePrint(users: string[]) {
    console.log(users)
}

namePrint(["soham", "ray"])

type NumberArr = number[]

function maxValue(arr: NumberArr) {
    console.log(arr)
}

interface EmpInterface {
    firstname: string,
    lastname: string,
    dept: string
}

function showEmp(empArr: EmpInterface[]) {
    console.log(empArr)
}

// Generics - Can accept different types

function returnStringOrNumber<T>(arg: T[]) {
    return arg[0]
}

interface MyName {
    name: string
}

returnStringOrNumber<MyName>([{name: "Soham"}, {name: "Dumb"}]) // Define type of the array
returnStringOrNumber(["Soham", 34])