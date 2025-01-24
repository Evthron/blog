---
title: merge-sort
---
{{< pure-html >}}

<script>
    let articleContent = document.querySelector(".article-content")
    for (let i = 0; i <= 10; i = i + 1){
        let sortItem = document.createElement("div")
        sortItem.classList.add("sortItem")
        sortItem.style = "display: inline-block; border: solid black 2px; padding: 1rem"
        sortItem.innerHTML = Math.floor(Math.random() * 20)
        articleContent.prepend(sortItem)
    }
    let sortItems = Array.from(document.querySelectorAll(".sortItem"))
    function combine(array1, array2){

    }
    function mergesort(array){
        console.log(array)
        if (array.length == 1){
            return array
        }
        left = array.slice(0, Math.floor(sortItems.length / 2))
        right = array.slice(Math.floor(sortItems.length / 2))
        console.log(left)
        console.log(right)
        mergesort(left)
        mergesort(right)
        let pivot = 0
        let sortedArray = []
        while( !(pivot in left) || !(pivot in right) )
            if (pivot in left && pivot in right){


            }
            if (pivot in ){

            }
    }
    mergesort(sortItems)
</script>
{{</ pure-html >}}