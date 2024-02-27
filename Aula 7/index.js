
const endpoint = 'https://crudcrud.com/api/36f427744e174cc4b79090c0bcd0e225';

const listMovies = () => {
    let list = document.querySelector("#movieList")
    fetch(`${endpoint}/movies`)
        .then(response => response.json())
        .then(movies => {
                console.log(movies)
                movies.forEach(movie => {
                    let movieItemList = document.createElement('li');
                    movieItemList.innerHTML = `
                                        <span>ID: ${movie._id}</span><br>
                                        <span>Nome: ${movie.name}</span><br>
                                        <span>Nome: ${movie.year}</span><br>
                                        <span>Nome: ${movie.company}</span><br>
                                        <span>Nome: ${movie.genre}</span><br>
                                        <span>Nome: ${movie.director}</span><br>
                    `
                    list.appendChild(movieItemList);
                });

        });

}

const addMovie = (event) => {

    event.preventDefault();

    let name = document.querySelector('#name');
    let year = document.querySelector('#year');
    let company = document.querySelector('#company');
    let genre = document.querySelector('#genre');
    let director = document.querySelector('#director');

    fetch(`${endpoint}/movies`, {
        headers: {"Content-Type": "application/json; charset=utf-8"},
        method: 'POST',
        body: JSON.stringify({
            name: name.value,
            year: year.value,
            company: company.value,
            genre: genre.value,
            director: director.value,
        })
    })
    .then((response) => {
        if(response.status === 201){
            alert('Filme adicionado com sucesso!');
            name.value = '';
            year.value = '';
            company.value = '';
            genre.value = '';
            director.value = '';
        }
    });
}

const updateMovie = (id) => {
    fetch(`${endpoint}/movies/${id}`, {
        headers: {"Content-Type": "application/json; charset=utf-8"},
        method: 'PUT',
        body: JSON.stringify({
            name: 'Madame Teia',
            year: 2024,
            company: 'Sony',
            genre: 'Ação',
            director: 'S.J. Clarkson',
        })
    } )
}

const deleteMovie = () => {

    let movieIdInput = document.querySelector('#movieId');


    fetch(`${endpoint}/movies/${movieIdInput.value}`, {
        headers: {"Content-Type": "application/json; charset=utf-8"},
        method: 'DELETE'
    }).then(response => {
            if(response.status !== 404) {
                alert('Filme apagado com sucesso!')
            } else {
                throw Error("Id não existe")
            }
    }).catch(error => error.message);
}

listMovies();
//addMovie();
//updateMovie("65dce76e72109f03e8c7eef0");
//deleteMovie("65dceec772109f03e8c7ef06");