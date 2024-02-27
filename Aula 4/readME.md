# Web Storage API: Local Storage e Session Storage

1. O armazenamento de dados é algo muito comum e necessário em páginas web. Normalmente, quando pensamos em armazenamento de dados, pensamos também em banco de dados. Mas é importante saber que os navegadores também oferecem suporte a armazenamentos de diferentes tipos no computador do usuário, para que esses dados possam ser recuperados quando necessário.

- Esse modelo de armazenamento de dados é conhecido como armazenamento no lado do cliente (ou, do inglês, Client-side Storage), enquanto o modelo de armazenamento que acontece em bancos de dados é conhecido como armazenamento no lado do servidor (ou, do inglês, Server-side Storage).

- Os tipos de Client-side Storage que existem nos navegadores são: Cookies, Local Storage e Session Storage. Neste material, veremos os dois últimos, uma vez que são mais simples e, além disso, os cookies têm aplicações mais específicas (armazenar session IDs ou access tokens, por exemplo) que, de um modo geral, são mais avançadas.

1.1. O Local Storage e Session Storage fazem parte do que conhecemos como a Web Storage API. Esta API nos fornece mecanismos para armazenar pares de chave/valor de uma maneira bastante intuitiva. Diante disso, neste tópico, vamos aprender a utilizar a Web Storage API. 

## Web Storage API

- A Web Storage API é composta pelos chamados **objetos Storage**. Esses objetos são conjuntos de chave/valor que irão permanecer salvos mesmo que a página seja recarregada. É importante destacar que as chaves e os valores devem estar no formato de **string**.

- Por se tratar de um objeto, é possível acessar os valores contidos no Storage usando a mesma notação de objetos ou, preferencialmente, utilizando os métodos **getItem** e **setItem**, que são utilizados para obter e definir valores em uma chave específica, respectivamente, os quais veremos com mais detalhes adiante.

- Como vimos, existem dois tipos de objetos Storage na Web Storage API, os quais são:

O **localStorage**: ele guarda os dados de cada aplicação de forma isolada, baseando-se na URL base da página. Todos esses dados continuam armazenados mesmo se o navegador for fechado e aberto novamente.
O **sessionStorage**: o armazenamento funciona da mesma forma nele, mas os dados ficam disponíveis apenas durante a sessão da página. Em outras palavras, enquanto a aba do navegador estiver aberta, o que inclui recarregamentos e restaurações de páginas, os dados serão guardados.

Você pode acessar ambos os objetos digitando os seus respectivos nomes em qualquer navegador. Ou seja, para que possamos utilizar os métodos getItem e setItem, por exemplo, sobre os quais comentamos anteriormente, poderíamos criar um script com o conteúdo abaixo, fazendo-o rodar no navegador:

--> localStorage.setItem("linguagemDeProgramacao", "JavaScript");

const linguagem = localStorage.getItem("linguagemDeProgramacao");

console.log(linguagem); // "JavaScript"

**O mesmo valeria para o sessionStorage.**

**setItem**

Método que já vimos anteriormente. Por meio dele, é possível salvar um conteúdo (valor) associado a uma chave. Lembrando que assim como a chave, o valor a ser armazenado precisa ser uma string.

💡 Você pode estar pensando: “Mas e se eu quiser armazenar um array, um número ou um objeto?” Bom, nesse caso, você pode utilizar o **JSON.stringify(objeto)** para converter o objeto para uma string. E para convertê-lo de uma string para um objeto, você pode utilizar o **JSON.parse(objetoEmFormatoDeString).**

Uma vez que você salvar algum item no localStorage ou sessionStorage, é possível visualizá-lo no próprio navegador, como é apresentado abaixo.

Note que, na aba Aplicativo (ou Application), você tem a opção de Armazenamento Local e Armazenamento de Sessão, que correspondem ao localStorage e o sessionStorage, respectivamente.

Caso queira salvar um array com uma lista de compras no localStorage, por exemplo, você poderia fazer algo semelhante ao que é feito no código abaixo:

--> const listaDeCompras = [
  { item: "Feijão", comprado: false },
  { item: "Arroz", comprado: true },
  { item: "Frango", comprado: false },
];

localStorage.setItem("listaDeCompras", JSON.stringify(listaDeCompras));

// 💡 Note a utilização do JSON.stringify para converter o array em string

**getItem**

Método que também vimos anteriormente, e que nos permite obter o valor associado a uma chave específica. Sendo assim, o seu único parâmetro é o nome da chave (string). Esse método vai retornar o conteúdo (valor) associado àquela chave (como string), caso a chave exista no Storage, ou null, caso a chave especificada não exista.

Caso você tenha salvado o array listaDeCompras no localStorage e quisesse obtê-lo, seria possível fazê-lo por meio do script abaixo:

--> const listaDeComprasLocalStorage = localStorage.getItem("listaDeCompras");

const listaDeCompras = JSON.parse(listaDeComprasLocalStorage || "[]");

console.log(listaDeCompras);
/*
[
	{ item: 'Feijão', comprado: false },
	{ item: 'Arroz', comprado: true },
	{ item: 'Frango', comprado: false }
]
*/

Observe que estamos obtendo o array listaDeCompras em formato de string e, por isso, convertemos ele para um array, utilizando o JSON.parse(). 

Além disso, caso não exista a chave ('listaDeCompras’) no localStorage, seria retornado null do método getItem; sendo assim, podemos colocar um fallback (array vazio em formato de string, '[]’) para garantir que não vamos ter um erro no JSON.parse().

**removeItem**

Este método te permite remover um item do Storage. Para isso, basta passar o nome da chave do item como parâmetro. Para ficar claro que todos os métodos que estamos vendo aqui funcionam no localStorage e no sessionStorage, vejamos agora um exemplo que envolve o sessionStorage.

O código abaixo salva dois itens no sessionStorage e, depois, remove apenas um deles, utilizando o método removeItem. Em seguida, ao tentar obter os dois itens, verificamos que apenas um deles está, de fato, armazenado: aquele que não foi removido (no caso, a altura).

--> const idade = 26;
const altura = 1.77;

// Salvando a idade no sessionStorage
sessionStorage.setItem("idade", String(idade));

// Salvando a altura no sessionStorage
sessionStorage.setItem("altura", String(altura));

// Removendo a idade do sessionStorage
sessionStorage.removeItem("idade");

// Obtendo a idade e altura do sessionStorage
const idadeSessionStorage = sessionStorage.getItem("idade");
const alturaSessionStorage = sessionStorage.getItem("altura");

console.log(idadeSessionStorage); // null
console.log(alturaSessionStorage); // '1.77'

**clear**

O método clear é útil para remover todos os itens do Storage. Lembre-se que, ao lidar com o localStorage ou sessionStorage, sempre estamos nos referenciando ao Storage associado à origem (URL base) da nossa aplicação. 

Isso quer dizer que, ao utilizar o método clear, apenas os itens do Storage da sua aplicação serão removidos; isso não irá impactar itens de outras páginas web.

Como o clear remove todos os itens, não é necessário passar parâmetros para esse método. Vejamos um exemplo de utilização por meio do código abaixo:

--> const idade = 26;
const altura = 1.77;

// Salvando a idade no sessionStorage
sessionStorage.setItem("idade", String(idade));

// Salvando a altura no sessionStorage
sessionStorage.setItem("altura", String(altura));

// Apagando todos os itens do sessionStorage
sessionStorage.clear();

// Obtendo a idade e altura do sessionStorage
const idadeSessionStorage = sessionStorage.getItem("idade");
const alturaSessionStorage = sessionStorage.getItem("altura");

console.log(idadeSessionStorage); // null
console.log(alturaSessionStorage); // null

Observe que adicionamos os mesmos dois itens do tópico anterior ao sessionStorage (idade e altura). Porém, desta vez, removemos todos os itens, utilizando o método clear. 

Dessa forma, ao tentar obter os dois armazenados inicialmente, vemos que ambos não estão salvos no sessionStorage, visto que, em ambos os casos, obtemos null.

## Conclusão

Como vimos, o sessionStorage e localStorage são tipos de armazenamento do lado do cliente (navegador) muito intuitivos e mais modernos, em comparação com os cookies, que são mais antigos e eram bem distantes do ideal.

Vimos também que é possível visualizar todos os itens do Armazenamento de Sessão ou Local associados ao domínio (origem ou URL base) da sua aplicação por meio da aba Aplicativo (Application) do navegador. 

Diante disso, aqui vai uma dica muito importante: não é recomendado gravar no storage do navegador aqueles dados que são sensíveis ou que não deveriam ser vistos pelos usuários da sua aplicação.


