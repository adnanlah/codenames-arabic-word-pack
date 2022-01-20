const containerElement = document.querySelector('.words')

function displayWords(words) {
    for (const word of words) {
        const wordElement = document.createElement('article')
        wordElement.classList.add('word')
        wordElement.innerText = word
        containerElement.appendChild(wordElement)
    }
}

(async function() {
    let wordsState = []
    const res = await fetch('http://localhost:3000/data')
    const data = await res.text() 
    wordsState = data.split(/\r?\n/).filter(e => e.length > 0)
    displayWords(wordsState)
})()