const searchInput = document.querySelector('#search-input');
const searchButton = document.querySelector('#search-button');
const digimonDetails = document.querySelector('#digimon-details');
const digimonList = document.querySelector('#digimon-list');

let digimonArray = [];


const addToList = (digimon) => {
    let newDigimon = {
        name: digimon.name,
        level: digimon.levels[0].level,
        attribute: digimon.attributes[0].attribute,
        type: digimon.types[0].type,
        image: digimon.images[0].href
    }


    digimonArray.push(newDigimon);

    localStorage.setItem('digimonList', JSON.stringify(digimonArray));

    location.reload();


}



const callApi = (name) => {
    fetch('https://digi-api.com/api/v1/digimon/' + name)
        .then(response => response.json())
        .then(result => {
            digimonDetails.innerHTML = `<span>Nome: ${result.name}</span><br>
                                    <span>Level: ${result.levels[0].level}</span><br>
                                    <span>Atributo: ${result.attributes[0].attribute}</span><br>
                                    <span>Tipo: ${result.types[0].type}</span><br>
                                    <img src='${result.images[0].href}' />
                                    <button id='button-add'>Adicionar</button>

        `
            let addButton = document.querySelector("#button-add");
            addButton.addEventListener('click', () => { addToList(result) });
        }

        );

}

const showList = () => {
    let digimonListFromStorage = localStorage.getItem('digimonList');
    digimonListFromStorage ? digimonArray = JSON.parse(digimonListFromStorage) : [];

    
    digimonArray.forEach(digimon => {
        let newLi = document.createElement('li');
        newLi.innerHTML = `
                            <span>Nome: ${digimon.name}</span><br>
                            <span>Level: ${digimon.level}</span><br>
                            <span>Atributo: ${digimon.attribute}</span><br>
                            <span>Tipo: ${digimon.type}</span><br>
                            <img src='${digimon.image}' />

        `
        digimonList.appendChild(newLi);
    });

}

searchButton.addEventListener('click', () => callApi(searchInput.value));


showList();
