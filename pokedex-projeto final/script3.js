const poke_container = document.getElementById('poke-container');
const searchInput = document.getElementById('search');
const favoritesButton = document.getElementById('favorites-button');
const favoritesModal = document.getElementById('favorites-modal');
const favoritesList = document.getElementById('favorites-list');

const pokemon_count = 151;
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
    for(let i = 1; i<= pokemon_count; i++) {
        await getPokemon(i);
    }
};

searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.toLowerCase();
    const pokemonCards = document.querySelectorAll('.pokemon');

    pokemonCards.forEach(card => {
        const pokemonName = card.querySelector('.name').innerText.toLowerCase();
        const pokemonId = card.querySelector('.number').innerText.slice(1);

        if (pokemonName.includes(searchTerm) || pokemonId.includes(searchTerm)) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });
});


favoritesButton.addEventListener('click', () => {
    favoritesList.innerHTML = '';
    favorites.forEach(id => {
        const listItem = document.createElement('li');
        listItem.textContent = `Pokémon ID: ${id}`;
        listItem.dataset.id = id;
        
        const removeButton = document.createElement('button');

        removeButton.classList.add('remove-button');
        const icon = document.createElement('i');
        icon.classList.add('fa-solid', 'fa-trash');
        removeButton.appendChild(icon);

        removeButton.addEventListener('click', removeFromFavorites);

        listItem.appendChild(removeButton);
        favoritesList.appendChild(listItem);
    });
    favoritesModal.style.display = 'block';
});

const getPokemon = async (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    createPokemonCard(data);
};

const createPokemonCard = (pokemon) => {
    const pokemonEl = document.createElement('div');
    pokemonEl.classList.add('pokemon');

    const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
    const id = pokemon.id.toString().padStart(3, '0');

    const poke_types = pokemon.types.map(type => type.type.name);
    const type = main_types.find(type => poke_types.indexOf(type) > -1);
    const color = colors[type];

    pokemonEl.style.border = `10px solid ${color}`;

    const isFavorite = favorites.includes(id);
    const favoriteIcon = isFavorite ? '⭐' : '☆';

    const pokemonInnerHtml = `
        <div class="img-container">
            <img src="https://img.pokemondb.net/sprites/bank/normal/${pokemon.name}.png" alt="${pokemon.name}">
            <button class="favorite" data-id="${id}">${favoriteIcon}</button>
        </div>
        <div class="info">
            <span class="number">#${id}</span>
            <h3 class="name">${name}</h3>
            <small class="type">Type: <span>${type}</span></small>
        </div>
    `;

    pokemonEl.innerHTML = pokemonInnerHtml;

    pokemonEl.querySelector('.favorite').addEventListener('click', toggleFavorite);

    poke_container.appendChild(pokemonEl);
};

const toggleFavorite = (event) => {
    const button = event.target;
    const id = button.dataset.id;
    const index = favorites.indexOf(id.toString());

    if (index > -1) {
        favorites.splice(index, 1);
        button.textContent = '☆';
        button.style.color = 'black'; // Adicionado
    } else {
        favorites.push(id.toString());
        button.textContent = '⭐';
        button.style.color = 'yellow'; // Adicionado
    }

    localStorage.setItem('favorites', JSON.stringify(favorites));
};


const removeFromFavorites = (event) => {
    const button = event.currentTarget;
    const listItem = button.parentNode;
    const id = listItem.dataset.id;

    const index = favorites.indexOf(id);
    if (index > -1) {
        favorites.splice(index, 1);
    }

      // Encontre o botão de favorito correspondente ao Pokémon que está sendo removido
    const favoriteButton = document.querySelector(`.favorite[data-id="${id}"]`);
    if (favoriteButton) {
          // Altere o conteúdo e a cor do texto do botão
        favoriteButton.textContent = '☆';
        favoriteButton.style.color = 'black';
    }

    listItem.remove();

    localStorage.setItem('favorites', JSON.stringify(favorites));
};


const closeModal = document.getElementById('close-modal');

closeModal.addEventListener('click', () => {
    favoritesModal.style.display = 'none';
});


fetchPokemon();
