import { debounce } from "./helpers.js";

const containerElement = document.querySelector("#words");
const searchInputElement = document.querySelector("input#search");
let wordsState: Word[] = [];
let filteredWordsState: Word[] = [];

type Word = {
  id: number;
  value: string;
  selected: boolean;
};

function displayWords(): void {
  if (containerElement) {
    containerElement.innerHTML = "";
    for (const word of filteredWordsState) {
      const wordElement = document.createElement("article");
      wordElement.classList.add("word");
      if (word.selected) wordElement.classList.add("selected");
      wordElement.innerText = word.value;
      containerElement.appendChild(wordElement);
      wordElement.addEventListener("click", (e) => {
        filteredWordsState = filteredWordsState.map((el) =>
          el.value === word.value ? { ...el, selected: !word.selected } : el
        );
        displayWords();
      });
    }
  }
}

(async function () {
  const res = await fetch("http://localhost:8888/.netlify/functions/app/data");
  const data = await res.json();
  wordsState = data.words.map((word: Word, idx: number) => ({
    id: idx,
    value: word,
    selected: false,
  }));
  filteredWordsState = wordsState;
  displayWords();

  const inputHandler = debounce((e) => {
    const searchValue = e.target.value;
    if (searchValue.length === 0) {
      filteredWordsState = wordsState;
      return displayWords();
    }
    const exactWords = wordsState.filter((word) => word.value === searchValue);
    const closeWords = wordsState.filter(
      (word) =>
        word.value.startsWith(searchValue) &&
        !exactWords.find((e) => e.id === word.id)
    );
    filteredWordsState = [...exactWords, ...closeWords];
    displayWords();
  }, 100);

  if (searchInputElement)
    searchInputElement.addEventListener("input", debounce(inputHandler, 500));
})();

export default {};
