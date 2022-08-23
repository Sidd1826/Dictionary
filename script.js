const wrapper = document.querySelector(".wrapper"),
searchInput = wrapper.querySelector("input"),
synonyms = wrapper.querySelector(".synonyms .list"),
example = wrapper.querySelector(".example .ex"),
block = wrapper.querySelector(".example .block")
infoText = wrapper.querySelector(".info-text"),
volume = document.querySelector("#volume"),
removeIcon = wrapper.querySelector(".search span"),
word = document.querySelector(".word p");
let audio;

function data(result, word){
    if(result.title){
        infoText.innerHTML = `Can't find the meaning of <span>"${word}"</span>. Please, try to search for another word`;
    }
    else{
        console.log(result);
        wrapper.classList.add("active");
        let def = result[0].meanings[0].definitions[0],
        phonetics = `${result[0].meanings[0].partOfSpeech} /${result[0].phonetics[0].text}`,
        sy = result[0].meanings[0];
        


        document.querySelector(".word p").innerText = result[0].word;
        document.querySelector(".word span").innerText = phonetics;
        document.querySelector(".meaning span").innerText = def.definition;
        // document.querySelector(".example span").innerText = def.example;

        // in production
        // IF ANY EXAMPLE IS NOT PRESENT
        if(def.example == undefined)
        {
            example.style.display = "none";
            // alert("Sorry,No examples are present");
            block.style.display = "block";

            block.innerText = "Sorry, No examples are present";
        }
        else{
            example.style.display = "block";
            example.innerHTML = "";
            block.style.display = "none"

            let tag = `<span> "${def.example}" </span>`
            example.insertAdjacentHTML("beforeend", def.example)

            // document.querySelector(".example span").innerText = def.example; 
        }

        // IF ANY EXAMPLE IS NOT PRESENT
        if(sy.synonyms[0] == undefined)
        {
            synonyms.parentElement.style.display = "none";

        }
        else{
            synonyms.parentElement.style.display = "block";
            synonyms.innerHTML = "";
            for(let i=0; i<5; i++)
            {
                let tag = `<span  onclick=search('${result[0].meanings[0].synonyms[i]}')>"${result[0].meanings[0].synonyms[i]}"</span>`;
                synonyms.insertAdjacentHTML("beforeend", tag);
            }
        }

    }
}

function fetchApi(word){
    infoText.style.color = "#000";
    infoText.innerHTML = `Seraching for the word <span>"${word}"</span>`;
    let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    fetch(url).then(res => res.json()).then(result => data(result, word));
}


searchInput.addEventListener("keyup", e => {
    if(e.key === "Enter" && e.target.value)
    {
        fetchApi(e.target.value);
    }
})

function search(word)
{
    searchInput.value = word;
    fetchApi(word);

}


volume.addEventListener("click", () => {
    let utterance = new SpeechSynthesisUtterance(`${word.innerText}`);
    speechSynthesis.speak(utterance);
})

removeIcon.addEventListener("click", () => {
    searchInput.value = "";
    searchInput.focus();
})