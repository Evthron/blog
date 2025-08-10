// Modified from https://www.w3schools.com/howto/howto_js_filter_elements.asp

// filterSelection("all");
// prevent other scripts from not loading when this script broke
if (document.getElementBy("vocab-button-container")){
  let btnContainer = document.getElementById("vocab-button-container");
  let btns = btnContainer.getElementsByClassName("vocab-button");
  let selectedTags = []

  // Add active class to the current control button (highlight it)
  for (let i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", function() {
      let filter = this.getAttribute('tag')
      if (this.className.includes('active')){
          selectedTags.splice(selectedTags.indexOf(filter), 1) // Remove the tag from the selectedTags list
          this.className = this.className.replace(" active", "")
      }
      else{
        selectedTags[selectedTags.length] = filter // Remove the tag from the selectedTags list
        this.className += " active";
      }
      filterSelection(selectedTags);
    });
  }
}
// btns[0].className = btns[0].className + " active";// "all" button, set to active initially

function filterSelection(selectedTags) {
  let x, i;
  x = document.getElementsByClassName("vocab-item-container");
  // Add the "show" class (display:block) to the filtered elements, and remove the "show" class from the elements that are not selected
  for (i = 0; i < x.length; i++) {
    w3RemoveClass(x[i], "show");
    let show = true
    for (let selectedTag of selectedTags){
      if (!x[i].getAttribute('tags').split(' ').includes(selectedTag)){
        show = false
      } 
    }
    if (selectedTags.length == 0){
      show = false
    }
    if (show == true || selectedTags.includes('all') ){
      w3AddClass(x[i], "show");
    }
  }
}

// Show filtered elements
function w3AddClass(element, name) {
  let i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    if (arr1.indexOf(arr2[i]) == -1) {
      element.className += " " + arr2[i];
    }
  }
}

// Hide elements that are not selected
function w3RemoveClass(element, name) {
  let i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    while (arr1.indexOf(arr2[i]) > -1) {
      arr1.splice(arr1.indexOf(arr2[i]), 1);
    }
  }
  element.className = arr1.join(" ");
}

