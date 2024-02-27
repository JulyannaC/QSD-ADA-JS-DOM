

const listItems = () => {
    fetch('https://jsonplaceholder.typicode.com/posts/')
        .then(response => response.json())
        .then(json => console.log(json));
}

//listItems();


const searchById = (id) => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
        .then(response => response.json())
        .then(json => console.log(json));
}

//searchById(101);

const addToDo = (title, body, userId) => {
    fetch(`https://jsonplaceholder.typicode.com/posts/`, {
        method: 'POST',
        body: JSON.stringify({
            title: title,
            body: body,
            userId: userId,
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        },
    })
        .then(response => response.json())
        .then(json => console.log(json));
}

//addToDo('teste', 'corpo', 23);

const updateToDo = (id, title, body, userId) => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            id: id,
            title: title,
            body: body,
            userId: userId,
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        },
    })
        .then(response => response.json())
        .then(json => console.log(json));
}

//updateToDo(1, 'update', 'teste', 13);

const updateOnlyToDo = (id, title) => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({
            id: id,
            title: title,
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        },
    })
        .then(response => response.json())
        .then(json => console.log(json));
}

//updateOnlyToDo(1, 'novo título');

const deleteToDo = (id) => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`,
    {
        method: 'DELETE'
    });
}

deleteToDo(1);