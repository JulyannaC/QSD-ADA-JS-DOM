REVISÃO AULA ANTERIOR --> EVENT LISTENER

const addButton = document.querySelector('button');

const inputField = document.querySelector('input');


console.log(addButton);

addButton.addEventListener("click", () =>{
    alert('Botão adicionar clicado');
})

addButton.addEventListener("mouseover", () => {
    alert('O mouse passou por cima do botão');
})

addButton.addEventListener("mouseleave", () => {
    console.log('O mouse saiu de cima do botão');
})

inputField.addEventListener("focus", () => {
    console.log("O input foi focado");
})

//////////////////////////////////////////////////////////

MANIPULAÇÃO DE ESTILOS E CLASSES

<!DOCTYPE html>
<html lang="pt-br">
    <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Escuta de Eventos</title>
    </head>
    <body>
    <h1>Lista de Compras</h1>

    <div>
        <input id="input" />
        <button id="add">Adicionar</button>
    </div>

    <ul id="lista"></ul>

    <script>
        const button = document.querySelector("button");
        button.addEventListener("click", () => {
            window.alert("Você clicou no botão Adicionar!");
});
    </script>
    </body>
</html>

const styleTag = document.createElement('style');

styleTag.innerHTML = `
    body {
        background-color: red
    }
`;

const headTag = document.querySelector('head');

headTag.appendChild(styleTag);

OU

const body = document.querySelector('body');

body.style.backgroundColor = 'red';

button.addEventListener('click', () => {
    body.style.backgroundColor = 'red';
})

button.addEventListener('mouseover', () => {
    body.style.backgroundColor = 'blue';
})

button.addEventListener('mouseleave', () => {
    body.style.backgroundColor = 'lightgrey';
})



const addButton = document.querySelector('button');

const inputField = document.querySelector('input');

const list = document.querySelector('ul');

const removeItem = (event) => {
    list.removeChild(event.target.parentElement);
}

let audio = new Audio('mouse-click.mp3');

addButton.addEventListener('click' () => {
    if(inputField.value.length <= 2){
        alert('O nome do item deve ter pelo menos 3 letras')
    } else{

        let item = document.createElement('li');
        let checkBoxItem = document.createElement('input');
        let textItem = document.createElement('span');
        //ex:pão, a caixa de texto;
        let removeButton = document.createElement('button');
        let audioSource = document.querySelector('audio'); (bia)

        textItem.textContent = inputField.value;
        //inputField:a caixa que o usuário escreve os itens
        checkBoxItem.setAttribute('type', 'checkbox');
        checkBoxItem.addEventListener('click', (event)=> {
            if (event.target.checked){
                textItem.style.textDecoration = 'line-through';
                audio.play();
                //audioSource.play(); (bia)
            } else {
                textItem.style.textDecoration = 'none';
                audio.play();
                //audioSource.play(); (bia)
            }
        })
        removeButton.textContent = 'Remover';
        removeButton.addEventListener('click', removeItem)
        //para quando clicar o botão funcionar

        item.insertAdjacentElement('beforeend', checkBoxItem);
        item.insertAdjacentElement('beforeend', textItem);
        item.insertAdjacentElement('beforeend', removeButton);
        list.appendChild(item);

        inputField.value = "";

    }
});





