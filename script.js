const container = document.getElementById("container");
let wrongGuesses = parseInt(document.getElementById("wrong-guesses").textContent);
let correctGuesses = 0;
let words = document.getElementsByClassName("letterBox");
let targetWord = localStorage.getItem("targetWord");



for(let char of targetWord) {
    const letterBox = document.createElement("div");
    letterBox.classList.add("letterBox");
    letterBox.textContent = char;
    container.appendChild(letterBox);
}


for(let word of words) {
    word.style.textTransform = "uppercase";
    word.style.color = "bisque";
}

// Select ALL buttons inside button-container
document.querySelectorAll(".button-container button").forEach(btn => {
  btn.addEventListener("click", () => {

    let guess = btn.textContent;
    let found = false;

    // reveal correct letters
   for (let i = 0; i < targetWord.length; i++) {
      if (targetWord[i] === guess) {
        found = true;
        words[i].style.color = "purple"; // reveal the letter
        correctGuesses++;
      }
    }


    if (found) {
      btn.style.backgroundColor = "green";
      placeholder = -1; // reset placeholder for next guess

    } else {
        btn.style.backgroundColor = "red";
        wrongGuesses--; // decrement wrong guesses
    }

    // Update the display
    document.getElementById("wrong-guesses").textContent = wrongGuesses;

    btn.disabled = true; // prevent re-click

    if (wrongGuesses <= 0) {
      for (let word of words) {
        word.style.color = "orange"; // reveal all letters
      }
      // Optionally, disable all buttons
      document.querySelectorAll(".button-container button").forEach(btn => btn.disabled = true);
      alert("Game Over! You've run out of guesses.");
    } 

    if (correctGuesses === targetWord.length) {
      document.querySelectorAll(".button-container button").forEach(btn => btn.disabled = true);
      // Optionally, disable all buttons
      alert("Congratulations! You've guessed the word!");
    }

  });
});
