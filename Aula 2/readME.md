# Manipulação de Estilos e Classes

Neste tópico, veremos como alterar o CSS das páginas web, dinamicamente, utilizando o JavaScript. De um modo geral, você verá que não difere muito daquilo que já vimos na manipulação do HTML, porém, existem algumas particularidades que valem a pena serem destacadas.

Alternativamente, você pode criar dois arquivos JS distintos: um deles para a lógica e outro para a estilização (index.js e styles.js, por exemplo).

## 1. Adicionando a tag **style**

Se você pensou no **appendChild**, você está certo! Portanto, uma das formas de adicionarmos estilos à nossa aplicação seria utilizando o script abaixo:

--> // Criando a tag style
const styleTag = document.createElement("style");

// Adicionando o conteúdo da tag style (aplicando estilos ao body)
styleTag.innerHTML = `
  body {
    background-color: #222222;
    color: #e7e7e7;
    margin: 2rem;
    width: 50%;
  }
`;

// Obtendo a tag head do HTML
const headTag = document.querySelector("head");
// Inserindo a tag style como filha da tag head (ao final)
headTag.appendChild(styleTag);

Pronto! Com o código acima, já estamos adicionando alguns estilos ao body do HTML. Observe que criamos a tag style e adicionamos os estilos utilizando o atributo innerHTML, que já estudamos anteriormente. Em seguida, obtivemos a tag head do HTML e adicionamos a tag style como filha (child) dela.

Podemos, inclusive adicionar mais estilos à nossa aplicação. Para isso, substitua o styleTag.innerHTML acima pelo o que é disposto abaixo:

--> styleTag.innerHTML = `
  body {
    background-color: #222222;
    color: #e7e7e7;
    margin: 2rem;
    width: 50%;
  }

  body > div {
    display: flex;
  }

  input#input {
    font-size: 1rem;
    height: 28px;
    border-radius: 5px;
    border: none;
    flex: 1;
  }

  button#add {
    font-size: 1rem;
    border: none;
    background-color: rgb(245, 179, 36);
    height: 30px;
    padding: 0 15px;
    border-radius: 5px;
    margin-left: 10px;
    cursor: pointer;
  }

  ul#lista {
    list-style: none;
    padding: 2rem 0;
  }

  li {
    padding: 0 0 1rem;
    display: flex;
    gap: 5px;
    align-items: center;
  }

  input[type="checkbox"] {
    height: 1.2rem;
    width: 1.2rem;
  }

  #lista > li > span {
    font-size: 1.2rem;
    font-weight: 500;
    flex: 1;
  }

  #lista > li > .checked {
    text-decoration: line-through;
		opacity: 0.6;
  }

  #lista > li > button {
    font-size: 0.85rem;
    border: none;
    background-color: red;
    color: white;
    padding: 4px 10px 5px;
    border-radius: 5px;
    margin-left: 10px;
    cursor: pointer;
  }
`;

No entanto, você pode utilizar essa primeira alternativa quando quiser adicionar estilos específicos/pontuais. De um modo geral, os dois próximos métodos que veremos são mais utilizados.

## 2. Adicionando estilos *inline*

Para adicionar um estilo inline em qualquer elemento, por meio do JS, podemos acessar o atributo style do elemento. Dentro dele, temos todos as propriedades CSS que já conhecemos, ou seja, o atributo style é um objeto por meio do qual conseguimos acessar todas essas propriedades CSS.

- 💡 Dica: Como se trata de um objeto, as propriedades são acessadas pelo padrão *camelCase*. Por exemplo, a propriedade **background-color** seria acessada pelo JavaScript da seguinte maneira: **elemento.style.backgroundColor**. Isso se aplica a quaisquer outras propriedades que apresentem nomes compostos, que são separados pelo “-” no CSS.

Sabendo disso, o que vamos fazer é riscar o texto referente ao nome do produto (que está dentro de uma tag **span**) quando o checkbox for marcado. Você deve lembrar que, no tópico anterior, ao criamos o **input**, apenas definimos o atributo **type** como sendo **checkbox**. Para alterarmos o estilo do texto do produto (riscando-o) quando o *checkbox* for marcado, vamos precisar adicionar, também, um event listener do tipo click nele.

Sendo assim, abaixo do setAttribute que é aplicando no input, você pode adicionar o event listener, como é ilustrado pelo código abaixo:

--> [...]

// Adicionando um novo atributo ao checkbox
checkboxItem.setAttribute("type", "checkbox");

/* Adicionando event listener: Ao clicar no input[type="checkbox"] o produto será marcado (riscado)
ou desmarcado (não riscado) como comprado*/
checkboxItem.addEventListener("click", (event) => {
  if (event.target.checked) {
    textItem.style.textDecoration = "line-through";
  } else {
    textItem.style.textDecoration = "none";
  }
});

[...]

Note que adicionamos o event listener ao checkboxItem, que ao observar que houve um evento de click, irá fazer uma verificação: caso o input (event.target) esteja marcado, o que é possível analisar por meio do atributo checked, será adicionado um estilo inline equivalente a style="text-decoration: line-through" ****na tag span que contém o texto do produto (textItem).

Por outro lado, caso o input não esteja marcado, será adicionado um estilo inline equivalente a style="text-decoration: none" ****na tag span que contém o texto do produto (textItem), com o intuito de remover o "*line-through*", que foi adicionado quando o input estava marcado.

Utilizando o mesmo atributo style, podemos também adicionar outros estilos inline, dessa vez para alterar a opacidade do checkbox e do texto. Para tal, nosso código ficaria da seguinte maneira:

--> [...]

// Adicionando um novo atributo ao checkbox
checkboxItem.setAttribute("type", "checkbox");

checkboxItem.addEventListener("click", (event) => {
  if (event.target.checked) {
    textItem.style.textDecoration = "line-through";
    textItem.style.opacity = 0.6;
    checkboxItem.style.opacity = 0.6;
  } else {
    textItem.style.textDecoration = "none";
    textItem.style.opacity = 1;
    checkboxItem.style.opacity = 1;
  }
});

[...]

## 3. Alterando classes dos elementos HTML

Podemos adicionar ou remover classes dos nossos elementos por meio do JavaScript. Inclusive, faremos isso utilizando um método que já vimos anteriormente, o **setAttribute**.

Por meio desse método, podemos definir propriedades às tags HTML, lembra? Portanto, podemos adicionar uma classe na tag. No primeiro subtópico, adicionamos uma estilização específica dentro da tag **style** para quando houver uma classe **checked** dentro da tag **li**. Para facilitar, destacamos esse trecho do código abaixo:

--> styleTag.innerHTML = `
	[...]

  #lista > li > .checked {
    text-decoration: line-through;
		opacity: 0.6;
  }

  [...]
`;

Dessa forma, podemos adicionar essa classe no nosso input e span sempre que o checkbox for marcado. Vamos fazer isso utilizando o método setAttribute ao invés dos estilos inline que aplicamos no subtópico anterior:

--> [...]

// Adicionando um novo atributo ao checkbox
checkboxItem.setAttribute("type", "checkbox");

checkboxItem.addEventListener("click", (event) => {
  if (event.target.checked) {
    textItem.setAttribute("class", "checked");
    checkboxItem.setAttribute("class", "checked");
  } else {
    textItem.removeAttribute("class");
    checkboxItem.removeAttribute("class");
  }
});

[...]

Observe que estamos definindo o atributo class com o valor checked, quando o input está marcado; e estamos removendo a propriedade class quando o input está desmarcado. Essa solução funciona perfeitamente na nossa aplicação.

Inclusive, alternativamente, poderíamos utilizar o atributo className do elemento. Por meio dele conseguimos acessar todo o conteúdo que está contido na propriedade class da tag e, claro, podemos utilizá-lo para reatribuir um valor também.

No JS a palavra class já é uma palavra reservada, utilizada para a definição de classes (POO). Diante disso, para evitar confusões, definiu-se o atributo como sendo *className*.

Observe como ficaria o nosso código caso fosse utilizado o atributo className:

--> [...]

// Adicionando um novo atributo ao checkbox
checkboxItem.setAttribute("type", "checkbox");

checkboxItem.addEventListener("click", (event) => {
  if (event.target.checked) {
    textItem.className = "checked";
    checkboxItem.className = "checked";
  } else {
    textItem.className = "";
    checkboxItem.className = "";
  }
});

[...]

Porém, é necessário destacar um ponto delicado nessa solução: ao definir o class com o valor checked, ou remover a propriedade class da tag, ou mesmo defini-la como vazia, estamos desconsiderando todas as demais possíveis classes que estejam definidas previamente na tag.

Em outras palavras, caso houvesse outras classes no span ou no input, as duas últimas soluções iriam "apagá-las" dos elementos. Isso não estaria certo, concorda?

Para evitar esse problema, podemos acessar o atributo classList do elemento em questão. Por meio dele, conseguimos acessar uma lista com todas as classes do nosso elemento. E, ainda melhor, esse atributo contém vários métodos que facilitam o nosso trabalho, como os métodos add e remove, que nos permitem adicionar e remover, respectivamente, uma classe da tag.

O código a seguir apresenta a solução que leva em consideração a possibilidade da existência de outras classes, fazendo uso do classList:

--> [...]

// Adicionando um novo atributo ao checkbox
checkboxItem.setAttribute("type", "checkbox");

checkboxItem.addEventListener("click", (event) => {
  if (event.target.checked) {
    textItem.classList.add("checked");
    checkboxItem.classList.add("checked");
  } else {
    textItem.classList.remove("checked");
    checkboxItem.classList.remove("checked");
  }
});

[...]

Perfeito! Agora estamos adicionando ou removendo a classe checked, não alterando outras classes que possivelmente existissem nos nossos elementos ou fossem adicionadas futuramente. 

- 💡 Dica: Existe um método chamado toggle dentro do classList, que adiciona ou remove a classe que você passar como parâmetro. Se você passar a classe "checked”, por exemplo, caso ela exista no elemento, ele vai remover; caso ela não exista, ele irá adicionar. Pense em uma forma de otimizar o código com esse método.