const paragraphs = [

    "The Clockmaker's Conundrum: Intricate cogs and delicate springs lay scattered across the mahogany workbench, each piece a testament to the clockmaker's meticulous craft. As the pendulum swung with a hypnotic precision, he pondered over the paradox of time – an endless cycle, yet always fleeting.",

    "The Cartographer's Quest: With a quill dipped in ink the color of the midnight sky, the cartographer charted lands that whispered of untold stories. Mountains rose like spires on the parchment, valleys dipped into unseen depths, and rivers meandered like silver threads weaving through an emerald tapestry.",

    "The Alchemist's Elixir: Amidst vials of iridescent liquids and ancient tomes bound in leather, the alchemist sought the elusive formula that would transmute base metals into gold. Each experiment was a dance with elemental forces, a delicate balance between ethereal energies and earthly substances.",

    "The Linguist's Lexicon: A myriad of phonemes danced on the linguist's tongue as she deciphered scripts from civilizations long forgotten. Her study was an atlas of human expression, where every syllable was a key to unlocking the rich tapestry of cultural heritage and linguistic evolution.",

    "The Botanist's Eden: Beneath the glass dome of the conservatory, exotic flora from every corner of the globe thrived. Orchids unfurled their spotted petals, carnivorous plants snapped at unsuspecting flies, and ancient ferns unfurled fronds that brushed against the verdant canopy overhead.",

    "The Astronomer's Odyssey: Through the lens of his ancient brass telescope, the astronomer gazed into the abyss of space, where celestial bodies danced in an eternal ballet. Nebulae bloomed like cosmic flowers, galaxies spiraled in silent grace, and comets blazed trails across the void.",

    "The Composer's Symphony: Notes cascaded from the composer's pen as he orchestrated a symphony that told of both triumph and tragedy. Violins sang with aching sweetness, trumpets declared with bold fanfare, and the timpani rumbled like distant thunder on a stormy night.",

    "The Archaeologist's Discovery: Brush in hand, the archaeologist revealed relics of a bygone era, each artifact whispering tales of ancient glory and human endeavor. Hieroglyphs etched in stone spoke of pharaohs and deities, while pottery shards painted with intricate designs hinted at daily life in a civilization lost to time.",

    "The Philosopher's Musings: Surrounded by volumes of age-old wisdom, the philosopher contemplated the intricacies of existence. His thoughts meandered through abstract concepts and logical paradoxes, seeking to unravel the threads that weave the fabric of reality.",

    "The Aviator's Voyage: With a leather cap snugly fitted and goggles set against the brisk wind, the aviator soared above cloud-kissed peaks and verdant valleys. The biplane's engine hummed a tune of adventure as it cut through the sky, leaving a trail of freedom in its wake."
]
const pg = document.getElementById('pg');
const userinput = document.querySelector('.textinput');
const resetbtn = document.querySelector('.continer button');
const totaltime = document.querySelector('.time .txt2');
const totalwpm = document.querySelector('.wpm .txt2');
const totalmistake = document.querySelector('.mistake .txt2');
const totalcpm = document.querySelector('.cpm .txt2');
let timer;
let maxtime = 120;
let timeRemaining = maxtime;
let charIndex = 0;
let mistakes = 0;
let isTypying = 0;

const setparagraph = () => {
    const randIndex = Math.floor(Math.random() * paragraphs.length);
    pg.innerText = "";
    paragraphs[randIndex].split("").forEach(char => {
        // console.log(char);
        pg.innerHTML += `<span>${char}</span>`
    })
    pg.querySelectorAll('span')[0].classList.add('active');
    document.addEventListener("keydown", () => userinput.focus());
    pg.addEventListener("click", () => userinput.focus());

    totalmistake.innerText = 0;
    totalcpm.innerText = 0;
    totalwpm.innerText = 0;
    totaltime.innerText = timeRemaining + 's';
}

const startTyping = () => {
    let characters = pg.querySelectorAll('span');
    // console.log(characters);
    let typedChar = userinput.value.split("")[charIndex];
    if (charIndex < characters.length - 1 && timeRemaining > 0) {
        if (!isTypying) {
            //0 or false case
            timer = setInterval(startTimer, 1000);
            isTypying = true;
        }
        if (typedChar == null) {
            if (charIndex > 0) {
                charIndex--;
                if (characters[charIndex].classList.contains("inncorrect")) {
                    mistakes--;
                }
                characters[charIndex].classList.remove("incorrect", "correct");
            }
        } else {
            if (characters[charIndex].innerText == typedChar) {
                characters[charIndex].classList.add("correct");
            } else {
                characters[charIndex].classList.add("incorrect");
                mistakes++;
            }
            charIndex++;
        }
        characters.forEach(char => {
            char.classList.remove("active");
        })
        characters[charIndex].classList.add("active");

        //wpm is calculated by dividing the number of charecters typed correctly(charindex-mistakes)/5 (the avg no of charecters per words) and dividing that result by the time it took to type those words(maxtime-timeremaining), and then multiply the results by 60 to convert to minutes
        let wpm = Math.round(((charIndex - mistakes) / 5) / (maxtime - timeRemaining) * 60)
        wpm = wpm < 0 || !wpm|| wpm == Infinity ? 0 : wpm;
        totalwpm.innerText = wpm;
        totalmistake.innerText = mistakes;
        totalcpm.innerText = charIndex - mistakes;
    }else{
        clearInterval(timer);
        isTypying = false;
    }

}
const startTimer = () => {
    if(timeRemaining>0){
        timeRemaining--;
        totaltime.innerText=timeRemaining;
        let wpm=Math.round(((charIndex-mistakes)/5)/(maxtime-timeRemaining)*60)
        totalwpm.innerHTML=wpm;
    }else{
        clearInterval(timer);
        isTypying=false;
    }
}
const resetGame = () => {
    setparagraph();
    clearInterval(timer);
    timeRemaining = maxtime;
    charIndex = 0;
    mistakes = 0;
    isTypying = 0;
    userinput.value = "";
    totaltime.innerText = timeRemaining;
    totalwpm.innerText = "0";
    totalmistake.innerText = "0";
    totalcpm.innerText = "0";
}
setparagraph();
resetbtn.addEventListener('click', resetGame);
userinput.addEventListener('input', startTyping);