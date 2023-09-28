const fib = (n) =>{
    if (n <= 0){
        return 0
    }
    else if (n === 1){
        return 1
    }

    return fib(n - 1) + fib(n - 2)
}

[0,1,3,5,6,7,8].forEach(num=>console.log(num,'=>',fib(num)))
