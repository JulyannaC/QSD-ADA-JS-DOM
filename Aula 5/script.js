PROGRAMAÇÃO ASSÍNCRONA

//setTimeout: fornece um tempo para uma determinada função ser executada;

const delayHello = () => {
    setTimeout(() => {
        console.log('Hello Delay');
    }, 2000);

    console.log('Hello');
}

delayHello();

const somarAsync = function (numero01, numero02, callback) {
    setTimeout(() => {
        if (callback) callback(a + b);
    }, 1000);
};

const callback = (resultado) => console.log(resultado);
somarAsync(5, 4, callback);

somarAsync(10, 20, (res1) => {
    somarAsync(res1, 30, (res2) => {
        somarAsync(res2, 40, (res3) => {
            somarAsync(res3, 50, (resultadoFinal) => {
                console.log(resultadoFinal);
            });
        });
    });
});

PROMISES- três estados: pendente, resolvida, rejeitada

const myPromise = new Promise((resolve, reject) => {

    setTimeout(() => {
        let success = true;
        if (success) {
            resolve('Operação concluída com sucesso!');
        } else{
            reject('Houve um erro na operação');
        }
    }, 2000);
});

myPromise.then((resultado) => {
    console.log('Sucesso: ', resultado);
}).catch((erro)=> {
    console.log('Erro: ',erro);
})

// -- SOMARASYNC VERSÃO PROMISE -- //

const somarAsync = (numero01, numero02) => {

    return new Promise((resolve, reject) => {
        if(isNaN(numero01) || isNaN(numero02)){
            reject('Parâmetros de numero 01 e numero02 devem ser números')
        }else {
            try {
                setTimeout(() => {
                    resolve(numero01 + numero02);
                    console.log(numero01 + numero02)
                },1000)                
            }catch (error) {
                reject(error);
            }
        } 
    })

};

// -- ASYNC/AWAIT -- espera a função ser executada//

const calcular = async () => {
    const result = await somarAsync(10,20);
    console.log("resultado", result);
}

// calcular();

// const consultarPokemon = async () => {
//     const pokemon = await getPokemon();
//     console.log(pokemon);
// }

const calcular = async function () {
    const result = await somarAsync(10, 20);
    console.log(result);
};

const calcular = async () => {
    const res1 = await somarAsync(10, 20);
    const res2 = await somarAsync(res1, 30);
    const res3 = await somarAsync(res2, 40);
    const result = await somarAsync(res3, 50);
    console.log(result);
};

calcular();

console.log("invocando o somarAsync");

somarAsync(10, 20)
.then((res) => somarAsync(res, 30))
.then((res) => somarAsync(res, 40))
.then((res) => somarAsync(res, 50))
.then((resultadoFinal) => console.log(resultadoFinal))
.catch((error) => console.log(error));

console.log("depois do somar async");


fetch('https://viacep.com.br/ws/01001000/json/')
    .then((response) => {
        response.json()
        .then((data) => {
            console.log(data);
        })
    })



