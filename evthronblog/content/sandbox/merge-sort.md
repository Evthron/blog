---
title: merge-sort
---

{{< pure-html >}}
<script>
    let articleContent = document.querySelector(".article-content");
    let sortSpace = document.createElement("div");
    sortSpace.classList.add("sort-space");
    articleContent.appendChild(sortSpace);
    let size = 10;

    // Create sorting elements
    let sortItems = [];
    for (let i = 0; i < size; i++) {
        let sortItem = document.createElement("div");
        sortItem.classList.add("sortItem");
        sortItem.style = "display: inline-block; border: solid black 2px; padding: 1rem; margin: 0.5rem;";
        sortItem.innerHTML = Math.floor(Math.random() * 20);
        sortItems.push(sortItem); // Store the sortItem in the array
        sortSpace.appendChild(sortItem);
    }

    // Create a button for stepping through the sort
    let stepButton = document.createElement("button");
    stepButton.style = "display: block; margin-top: 1rem;";
    stepButton.innerHTML = "Next Step";

    // State variables for merge sort
    let mergeSortStack = []; // Stack to simulate recursion
    let currentStep = null; // Current task
    let sortedArray = null; // Final sorted array

    // Initialize the stack with the first task
    mergeSortStack.push({
        array: sortItems,
        left: 0,
        right: sortItems.length,
        step: "split", // First step is always splitting
    });

    // Add event listener to the "Next Step" button
    stepButton.addEventListener("click", function () {
        // If the stack is empty, sorting is complete
        if (mergeSortStack.length === 0) {
            stepButton.innerHTML = "Done!";
            stepButton.disabled = true;
            return;
        }

        // Process the current step
        currentStep = mergeSortStack.pop();

        if (currentStep.step === "split") {
            // Split the array into two halves
            const mid = Math.floor((currentStep.left + currentStep.right) / 2);
            console.log(currentStep)
            if (currentStep.left + 1 < currentStep.right) {
                mergeSortStack.push({
                    array: currentStep.array,
                    left: currentStep.left,
                    right: currentStep.right,
                    step: "merge",
                });
                mergeSortStack.push({
                    array: currentStep.array,
                    left: currentStep.left,
                    right: mid,
                    step: "split",
                });
                mergeSortStack.push({
                    array: currentStep.array,
                    left: mid,
                    right: currentStep.right,
                    step: "split",
                });

            }

            // Visualize the current split
            visualizeArray(currentStep.array, currentStep.left, currentStep.right, "Splitting");
        } else if (currentStep.step === "merge") {
            // Merge two halves
            const mid = Math.floor((currentStep.left + currentStep.right) / 2);
            const leftArray = currentStep.array.slice(currentStep.left, mid);
            const rightArray = currentStep.array.slice(mid, currentStep.right);

            const mergedArray = combine(leftArray, rightArray);

            // Replace the original array section with the merged result
            let index = currentStep.left;
            for (let item of mergedArray) {
                currentStep.array[index] = item;
                index++;
            }

            // Visualize the current merge
            visualizeArray(currentStep.array, currentStep.left, currentStep.right, "Merging");
        }
    });

    articleContent.appendChild(stepButton);

    // Combine function for merge sort
    function combine(left, right) {
        let sortedArray = [];
        let leftIndex = 0;
        let rightIndex = 0;

        while (leftIndex < left.length && rightIndex < right.length) {
            if (parseInt(left[leftIndex].innerHTML) <= parseInt(right[rightIndex].innerHTML)) {
                sortedArray.push(left[leftIndex]);
                leftIndex++;
            } else {
                sortedArray.push(right[rightIndex]);
                rightIndex++;
            }
        }

        return sortedArray.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
    }

    // Function to visualize the array
    function visualizeArray(array, start, end, operation) {
        // Clear the sort space
        sortSpace.innerHTML = "";

        // Display operation type
        let operationLabel = document.createElement("div");
        operationLabel.style = "margin-bottom: 1rem; font-weight: bold;";
        operationLabel.innerHTML = `${operation} (Index ${start} to ${end - 1})`;
        sortSpace.appendChild(operationLabel);

        // Display the current state of the array
        for (let i = 0; i < array.length; i++) {
            let clone = array[i].cloneNode(true);
            if (i >= start && i < end) {
                clone.style.backgroundColor = operation === "Merging" ? "lightblue" : "lightgreen";
            }
            sortSpace.appendChild(clone);
        }
    }
</script>

{{</ pure-html >}}

```js
let articleContent = document.querySelector(".article-content");
let sortSpace = document.createElement("div");
sortSpace.classList.add("sort-space");
articleContent.appendChild(sortSpace);
let size = 10;

// Create sorting elements
let sortItems = [];
for (let i = 0; i < size; i++) {
    let sortItem = document.createElement("div");
    sortItem.classList.add("sortItem");
    sortItem.style = "display: inline-block; border: solid black 2px; padding: 1rem; margin: 0.5rem;";
    sortItem.innerHTML = Math.floor(Math.random() * 20);
    sortItems.push(sortItem); // Store the sortItem in the array
    sortSpace.appendChild(sortItem);
}

// Create a button for stepping through the sort
let stepButton = document.createElement("button");
stepButton.style = "display: block; margin-top: 1rem;";
stepButton.innerHTML = "Next Step";

// State variables for merge sort
let mergeSortStack = []; // Stack to simulate recursion
let currentStep = null; // Current task
let sortedArray = null; // Final sorted array

// Initialize the stack with the first task
mergeSortStack.push({
    array: sortItems,
    left: 0,
    right: sortItems.length,
    step: "split", // First step is always splitting
});

// Add event listener to the "Next Step" button
stepButton.addEventListener("click", function () {
    // If the stack is empty, sorting is complete
    if (mergeSortStack.length === 0) {
        stepButton.innerHTML = "Done!";
        stepButton.disabled = true;
        return;
    }

    // Process the current step
    currentStep = mergeSortStack.pop();

    if (currentStep.step === "split") {
        // Split the array into two halves
        const mid = Math.floor((currentStep.left + currentStep.right) / 2);
        console.log(currentStep)
        if (currentStep.left + 1 < currentStep.right) {
            mergeSortStack.push({
                array: currentStep.array,
                left: currentStep.left,
                right: currentStep.right,
                step: "merge",
            });
            mergeSortStack.push({
                array: currentStep.array,
                left: currentStep.left,
                right: mid,
                step: "split",
            });
            mergeSortStack.push({
                array: currentStep.array,
                left: mid,
                right: currentStep.right,
                step: "split",
            });

        }

        // Visualize the current split
        visualizeArray(currentStep.array, currentStep.left, currentStep.right, "Splitting");
    } else if (currentStep.step === "merge") {
        // Merge two halves
        const mid = Math.floor((currentStep.left + currentStep.right) / 2);
        const leftArray = currentStep.array.slice(currentStep.left, mid);
        const rightArray = currentStep.array.slice(mid, currentStep.right);

        const mergedArray = combine(leftArray, rightArray);

        // Replace the original array section with the merged result
        let index = currentStep.left;
        for (let item of mergedArray) {
            currentStep.array[index] = item;
            index++;
        }

        // Visualize the current merge
        visualizeArray(currentStep.array, currentStep.left, currentStep.right, "Merging");
    }
});

articleContent.appendChild(stepButton);

// Combine function for merge sort
function combine(left, right) {
    let sortedArray = [];
    let leftIndex = 0;
    let rightIndex = 0;

    while (leftIndex < left.length && rightIndex < right.length) {
        if (parseInt(left[leftIndex].innerHTML) <= parseInt(right[rightIndex].innerHTML)) {
            sortedArray.push(left[leftIndex]);
            leftIndex++;
        } else {
            sortedArray.push(right[rightIndex]);
            rightIndex++;
        }
    }

    return sortedArray.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
}

// Function to visualize the array
function visualizeArray(array, start, end, operation) {
    // Clear the sort space
    sortSpace.innerHTML = "";

    // Display operation type
    let operationLabel = document.createElement("div");
    operationLabel.style = "margin-bottom: 1rem; font-weight: bold;";
    operationLabel.innerHTML = `${operation} (Index ${start} to ${end - 1})`;
    sortSpace.appendChild(operationLabel);

    // Display the current state of the array
    for (let i = 0; i < array.length; i++) {
        let clone = array[i].cloneNode(true);
        if (i >= start && i < end) {
            clone.style.backgroundColor = operation === "Merging" ? "lightblue" : "lightgreen";
        }
        sortSpace.appendChild(clone);
    }
}
```