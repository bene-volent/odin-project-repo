function mergeSort(array = []) {
    if (array.length <= 1) return array
    
    let mid = Math.floor(array.length / 2)
    let left = array.slice(0, mid)
    let right = array.slice(mid, array.length)


    
    return merge(mergeSort(left),mergeSort(right))
 }
function merge(left, right) {
    let leftIndex = 0
    let rightIndex = 0

    let sorted = []

    while (leftIndex < left.length && rightIndex < right.length) {
        if (left[leftIndex] <= right[rightIndex]) {
            sorted.push(left[leftIndex])
            leftIndex++
        }
        else {
            sorted.push(right[rightIndex])
            rightIndex++
        }
    }

    while (leftIndex < left.length) {
        sorted.push(left[leftIndex])
        leftIndex++
    }
    while (rightIndex < right.length) {
        sorted.push(right[rightIndex])
        rightIndex++
    }

    return sorted
}


let args = process.argv.slice(2).map(num=>parseFloat(num))


if (args.length>0){
    console.log(mergeSort(args))
}

else{
    let arr =  [23, 552, 51, 95,526,44,15,1,56,68,8]
    console.log(`Array : ${arr}`)
    console.log(mergeSort(arr))
}