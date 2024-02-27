const elementsByTagName = document.getElementsByTagName('p');

console.log(elementsByTagName);

const elementsByClassName = document.getElementsByClassName('paragrafo');

console.log(elementsByClassName);

const elementById = document.getElementById();

console.log(elementById);

const lista = document.querySelector('ul');

console.log(lista);

const novoItem = document.createElement('li');

novoItem.textContent = 'Item 04';

lista.appendChild(novoItem);

const itensDaLista = document.querySelectorAll('li');

console.log(itensDaLista);

const novoItem02 = document.createElement('li');
novoItem02.textContent = 'Item 05';

lista.insertBefore(novoItem02, itensDaLista[3]);
lista.removeChild(itensDaLista[1]);

lista.remove();

const botao = document.querySelector('button');
const inputValue = document.querySelector ('input#input');

const lista = document.querySelector('ul');

botao.addEventListener("click", () => {
    let elemento = document.createElement('li');
    elemento.innerHTML = inputValue.value
    lista.appendChild(elemento);
})


function alerta(){
    window.alert('O botao foi clicado');
}

botao.addEventListener("click, alerta");

