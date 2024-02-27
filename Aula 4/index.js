// function exterior(){

//     let mensagem = 'mensagem da funçao exterior';

//     function interior(){ //função de closure
//         console.log('Função interior');
//         console.log(mensagem);
//     }

//     return interior;
// }

// let minhaFuncao = exterior();

// minhaFuncao();

// /////////////////

// function criarContador(){

//     let contador = 0;

//     function incrementar(){
//         contador++;
//         console.log('Contador incrementado para: ', contador);
//     }

//     function decrementar(){
//         contador--;
//         console.log('Contador decrementado para ', contador);
//     }

//     function obterValor(){
//         return contador;
//     }

//     return{
//         incrementar : incrementar,
//         decrementar : decrementar,
//         obterValor : obterValor
//     };

// }

// let meuContador = criarContador();

// console.log(meuContador.obterValor());
// //obtém o valor

// meuContador.incrementar();
// meuContador.incrementar();

// console.log(meuContador.obterValor());

// meuContador.decrementar();

// console.log(meuContador.obterValor());

// let meuContador02 = criarContador();

// console.log(meuContador02.obterValor());

// //////////////////////////////

// CONTINUANDO LOCAL E SESSION STORAGE

// let nome = 'Francisco';

// let sobrenome = 'Fagundes';

// localStorage.setItem('nome', nome);

// console.log(localStorage.getItem('nome') + " " + sobrenome);

// let idade = 45;

// localStorage.setItem('idade', idade);

// console.log(localStorage.getItem('idade'));

// let idadeGuardada = parseInt(localStorage.getItem('idade'));

// let professor = {
//     nome: 'Francisco',
//     idade: 45
// }

// //JSON.stringify------JSON para string

// localStorage.setItem('professor', JSON.stringify(professor));

// let professorGuardado = localStorage.getItem('professor');

// console.log(JSON.parse(professorGuardado).idade);

////////////////////////
// EXERCÍCIO LISTA DE COMPRAS

const addButton = document.querySelector('button');
const input = document.querySelector('input');
const list = document.querySelector('ul');

let shopList = [];

const addItem = () => {
    let item = document.createElement('li');
    let removeButton = document.createElement('button');
    let itemText = document.createElement('span');

    removeButton.textContent = 'Remover'
    itemText.textContent = input.value

    removeButton.addEventListener('click', removeItem);

    item.insertAdjacentElement('beforeend', itemText);
    item.insertAdjacentElement('beforeend', removeButton);

    list.appendChild(item);

    shopList.push(input.value);

    localStorage.setItem('shopList', JSON.stringify(shopList));

    input.value = '';
}


const removeItem = (event) => {
    list.removeChild(event.target.parentElement);
}

const getShopList = () => {
    let shopListStored = localStorage.getItem('shopList');
    if(shopListStored) {
    shopList = JSON.parse(shopListStored || []);
    }
}

const showList = (itemList) => {

    list.innerHTML = "";
    itemList.forEach(element => {
        let item = document.createElement('li');
        let removeButton = document.createElement('button');
        let itemText = document.createElement('span');
    
        removeButton.textContent = 'Remover'
        itemText.textContent = element;
    
        removeButton.addEventListener('click', removeItem);
    
        item.insertAdjacentElement('beforeend', itemText);
        item.insertAdjacentElement('beforeend', removeButton);
    
        list.appendChild(item);
    });
}

addButton.addEventListener('click', addItem);

getShopList();

showList(shopList);











