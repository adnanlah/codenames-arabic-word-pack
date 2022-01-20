const containerElement = document.querySelector('#words')
const searchInputElement = document.querySelector('input#search')

function debounce(callback, delay) {
    var timeoutHandler = null;
    return function () {
        clearTimeout(timeoutHandler);
        timeoutHandler = setTimeout(function () {
            callback();
        }, delay);
    }
}

function displayWords(words) {
    containerElement.innerHTML = ''
    for (const word of words) {
        const wordElement = document.createElement('article')
        wordElement.classList.add('word')
        if (word.selected) wordElement.classList.add('selected')
        wordElement.innerText = word.value
        containerElement.appendChild(wordElement)
        wordElement.addEventListener('click', (e) => {
            console.log('you clicked the word ', word.value)
        })
    }
}

(async function() {
    let wordsState = []
    let filteredWordsState = []
    const res = await fetch('http://localhost:3000/data')
    const data = await res.json() 
    wordsState = data.words.map((word, idx) => ({id: idx, value: word, selected: false}))
    displayWords(wordsState)

    const handler = debounce((e) => {
        const value = searchInputElement.value
        if (value.length === 0)
            return displayWords(wordsState)
        console.log(searchInputElement.value, searchInputElement.value.length)
        const exact = wordsState.filter(word => word.value === searchInputElement.value)
        const close = wordsState.filter(word => word.value.startsWith(searchInputElement.value) && !exact.find(e => e.id === word.id))
        filteredWordsState = [...exact, ...close]
        displayWords(filteredWordsState)
    }, 600);
    searchInputElement.addEventListener('input', handler)
})()