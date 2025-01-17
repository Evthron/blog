let element_count = document.getElementsByTagName('h3').length
console.log(element_count)
let experience = document.querySelector('.progress-bar-count')
experience.innerHTML = element_count + '/' + levelCap(element_count)

let level = document.querySelector('.progress-bar-level')
level.innerHTML = 'Lv' + experienceToLevel(element_count)

let bar = document.querySelector('.progress-bar-experience')
let percentage = (element_count - levelBottom(element_count)) / (levelCap(element_count) - levelBottom(element_count)) * 100
bar.style.width =  percentage + '%'

function levelCap(experience) {
    return levelToExperience(experienceToLevel(experience) + 1);
}

function levelBottom(experience) {
    return levelToExperience(experienceToLevel(experience));
}

function experienceToLevel(value) {
    return Math.floor(Math.sqrt(value / 6 + 0.25) + 0.5);
}

function levelToExperience(level) {
    return 6 * level * (level - 1);
}