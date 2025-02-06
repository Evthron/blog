---
title: merge-sort
---
{{< pure-html >}}
<script>
let articleContent = document.querySelector(".article-content");
// Create sorting elements
let size = 10;
for (let i = 0; i < size; i++) {
    let sortItem = document.createElement("div");
    sortItem.classList.add("sortItem");
    sortItem.style.cssText = "display: inline-block; border: solid black 2px; padding: 1rem";
    sortItem.innerHTML = Math.floor(Math.random() * 20);
    articleContent.prepend(sortItem);
    // add the element at the top of the div
}

let sortItems = Array.from(document.querySelectorAll(".sortItem"));

function combine(left, right) {
    let sortedArray = [];
    let leftIndex = 0;
    let rightIndex = 0;

    while (leftIndex < left.length && rightIndex < right.length) {
        if (left[leftIndex].innerHTML <= right[rightIndex].innerHTML) {
            sortedArray.push(left[leftIndex]);
            leftIndex++;
        } else {
            sortedArray.push(right[rightIndex]);
            rightIndex++;
        }
    }

    return sortedArray.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
}

function mergeSort(array) {
    if (array.length <= 1) {
        return array;
    }

    const mid = Math.floor(array.length / 2);
    const left = array.slice(0, mid);
    const right = array.slice(mid);

    return combine(mergeSort(left), mergeSort(right));
}

const sortedItems = mergeSort(sortItems);

// Display the sorted div elements
sortedItems.forEach(item => articleContent.appendChild(item));
</script>
{{</ pure-html >}}

    let articleContent = document.querySelector(".article-content")
    // Create sorting elements
    let size = 10
    for (let i = 0; i < size; i = i + 1){
        let sortItem = document.createElement("div")
        sortItem.classList.add("sortItem")
        sortItem.style = "display: inline-block; border: solid black 2px; padding: 1rem"
        sortItem.innerHTML = Math.floor(Math.random() * 20)
        articleContent.prepend(sortItem)
        // add the element at the top of the div
    }
    let sortItems = Array.from(document.querySelectorAll(".sortItem"))

    function combine(array1, array2){
        let pivot = 0
        let sortedArray = []
        // check whether pivot index is in the array
        // when the pivot index increased larger than
        while( (pivot in left) || (pivot in right) )
            if (pivot in left && pivot in right){
                if (left[pivot] <= right[pivot]){
                    sortedArray.push(left[pivot])
                    sortedArray.push(right[pivot])
                }
                else{
                    sortedArray.push(right[pivot])
                    sortedArray.push(left[pivot])
                } 
            }
            else if (pivot in left){
                sortedArray.push(left[pivot])
            }
            else if (pivot in right){
                sortedArray.push(right[pivot])
            }
        pivot += 1
        return sortedArray
    }
    function mergesort(array){
        console.log(array)
        if (array.length == 1 || array.length == 0){
            return array
        }
        left = array.slice(0, Math.floor(sortItems.length / 2))
        right = array.slice(Math.floor(sortItems.length / 2))
        console.log("left")
        console.log(left)
        console.log("right")
        console.log(right)
        mergesort(left)
        mergesort(right)
        return combine(left, right)
    }
    mergesort(sortItems)