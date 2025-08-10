// Modified from https://www.w3schools.com/howto/howto_js_filter_elements.asp

let tagButtonsContainer = document.querySelector(".tagSearch-tags");
let tagButtons = document.getElementsByClassName("tag-button");
tagButtonsContainer.searchTags = [];

for (const button of tagButtons) {
  button.addEventListener("click", function() {
    const word = this.innerHTML.toLowerCase().trim();
    this.classList.toggle("active");
    if (this.classList.contains("active")) {
      if (!tagButtonsContainer.searchTags.includes(word)) {
        tagButtonsContainer.searchTags.push(word);
      }
    } else {
      tagButtonsContainer.searchTags = tagButtonsContainer.searchTags.filter(
        (tag) => tag !== word
      );
    }
  });
}