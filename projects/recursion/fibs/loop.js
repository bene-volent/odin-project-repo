function fib(n){
    let a = 0;
    let b = 1;

    if (n === 0){
        return a
    }
    else if (n === 1){
        return b
    }
    
    for (let i = 1;i<n;i++){
        [a,b] = [b,a+b]
    }
    return b
}

[0,1,3,5,6,7,8].forEach(num=>console.log(num,'=>',fib(num)))