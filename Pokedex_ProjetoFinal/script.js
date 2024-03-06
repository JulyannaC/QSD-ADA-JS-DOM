const poke_container = document.getElementById('poke-container');
const searchInput = document.getElementById('search');
const searchButton = document.getElementById('search-button');
const favoritesButton = document.getElementById('favorites-button');
const favoritesModal = document.getElementById('favorites-modal');
const favoritesList = document.getElementById('favorites-list');
const closeModal = document.getElementById('close-modal');

const pokemon_count = 150;
const colors = {
    normal: '#aa9',
    fire: '#f42',
    water: '#39f',
    electric: '#fc3',
    grass: '#7c5',
    ice: '#6cf',
    fighting: '#b54',
    poison: '#a59',
    ground: '#db5',
    flying: '#89f',
    psychic: '#f59',
    bug: '#ab2',
    rock: '#ba6',
    ghost: '#66b',
    dragon: '#76e',
    dark: '#111',
    steel: '#aab',
    fairy: '#e9e'
};

const main_types = Object.keys(colors);

let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

const fetchPokemon = async () => {
    for (let i = 1; i <= pokemon_count; i++) {
        await getPokemon(i);
    }
};

searchButton.addEventListener('click', () => {
    const searchTerm = searchInput.value.toLowerCase();
    const pokemonCards = document.querySelectorAll('.pokemon');
    let found = false;

    pokemonCards.forEach(card => {
        const pokemonName = card.querySelector('.name').innerText.toLowerCase();
        const pokemonId = card.querySelector('.number').innerText.slice(1);

        if (pokemonName.includes(searchTerm) || pokemonId.includes(searchTerm)) {
            card.style.display = 'flex';
            found = true;
        } else {
            card.style.display = 'none';
        }
    });

    if (!found) {
        alert('Nenhum Pokémon encontrado com esse nome ou ID. Por favor, tente novamente.');
    }
});

searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.toLowerCase();
    const pokemonCards = document.querySelectorAll('.pokemon');

    if (searchTerm === '') {
        pokemonCards.forEach(card => {
            card.style.display = 'flex';
        });
    }
});


favoritesButton.addEventListener('click', () => {
    const oldFavoritesLocal = JSON.parse(localStorage.getItem('favorites'));
    favoritesModal.style.display = 'block';

    if (oldFavoritesLocal) {
        favoritesList.innerHTML = oldFavoritesLocal.map((pokemon) => {
            const color = colors[pokemon.type]
            return (
                `<div style="border: 10px solid ${color}" class="item">
                    <div class "img-container">
                        <img src="${pokemon.image}" alt="${pokemon.name}">
                    </div>
                    <div class="info">
                        <span class="number">#${pokemon.id}</span>
                        <h3 class="name">${pokemon.name}</h3>
                    </div>
                    <small class="type">Type: <span>${pokemon.type}</span></small>
                    <br>
                    <small class="weight">Weight: <span>${pokemon.weight}</span> hg</small>
                    <br>
                    <small class="height">Height: <span>${pokemon.height}</span> dm</small>
                    <button class="remove-button" onclick=removeFromFavorites(event) data-set="${pokemon.id}">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </div>`
            );
        }).join('');
    }
});

const getPokemon = async (id) => {
    if (!navigator.onLine) {
        console.log('Você não está conectado à internet. Por favor, verifique sua conexão e tente novamente.');
        showErrorModal('Você não está conectado à internet. Por favor, verifique sua conexão e tente novamente.');
        return;
    }

    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const res = await fetch(url);

    if (!res.ok) {
        console.log('Não foi possível obter os dados do Pokémon. Verifique sua conexão com a internet e tente novamente.');
        showErrorModal('Não foi possível obter os dados do Pokémon. Verifique sua conexão com a internet e tente novamente.');
        return;
    }

    const data = await res.json();
    const pokemon = {
        id: data.id,
        name: data.name,
        type: data.types[0].type.name,
        weight: data.weight,
        height: data.height,
        image: `https://img.pokemondb.net/sprites/bank/normal/${data.name}.png`
    };

    createPokemonCard(pokemon);
    return pokemon;
};

function showErrorModal(message) {
    const errorMessageElement = document.getElementById('error-message');
    errorMessageElement.innerText = message;
    const errorModal = document.getElementById('error-modal');
    errorModal.style.display = "block";
}

document.getElementById("close-error-modal").onclick = function() {
    document.getElementById('error-modal').style.display = "none";
};

const createPokemonCard = (pokemon) => {
    const pokemonEl = document.createElement('div');
    pokemonEl.classList.add('pokemon');

    const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
    const id = pokemon.id.toString().padStart(3, '0');

    const color = colors[pokemon.type];

    pokemonEl.style.border = `10px solid ${color}`;

    const isFavorite = favorites.some(favoritePokemon => favoritePokemon.id === pokemon.id);
    const favoriteIcon = isFavorite ? '⭐' : '☆';

    const pokemonInnerHtml = `
        <div class="img-container">
            <img src="${pokemon.image}" alt="${pokemon.name}">
            <label class="input-favorite">
                <input class="favorite-checkbox" type="checkbox" name="favorites-${pokemon.id}" id="favorite-${pokemon.id}" onclick=checkFavoritePokemon(${pokemon.id}) ${isFavorite ? 'checked' : ''}>
                <i class="fa-solid fa-star checkmark"></i>
            </label>
        </div>
        <div class="info">
            <span class="number">#${id}</span>
            <h3 class="name">${name}</h3>
        </div>
        <small class="type">Type: <span>${pokemon.type}</span></small>
        <br>
        <small class="weight">Weight: <span>${pokemon.weight}</span> hg</small>
        <br>
        <small class="height">Height: <span>${pokemon.height}</span> dm</small>
    `;

    pokemonEl.innerHTML = pokemonInnerHtml;

    poke_container.appendChild(pokemonEl);
};

const checkFavoritePokemon = async (id) => {
    const favoriteCheckbox = document.querySelector(`input[id="favorite-${id}"]`);

    const index = favorites.findIndex(pokemon => pokemon.id.toString() === id);

    if (favoriteCheckbox.checked == true) {
        const pokemon = await getPokemon(id);
        favorites.push(pokemon);
    } else {
        favorites.splice(index, 1);
    }
    localStorage.setItem('favorites', JSON.stringify(favorites));
};

const removeFromFavorites = (event) => {
    const button = event.target;
    const listItem = button.parentNode;

    const listItemCard = listItem.parentNode;
    const idPokemon = listItem.dataset.set;

    favorites.splice(favorites.findIndex(({ id }) => id == idPokemon), 1);

    const favoriteCheckbox = document.getElementById(`favorite-${idPokemon}`);

    if (favoriteCheckbox) {
        favoriteCheckbox.checked = false;
    }

    listItemCard.remove();

    localStorage.setItem('favorites', JSON.stringify(favorites));
};

closeModal.addEventListener('click', () => {
    favoritesModal.style.display = 'none';
});

fetchPokemon();
