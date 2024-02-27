const inputCEP = document. querySelector('input');
const buttonCEP = document.querySelector ('button');
const divCEP = document.querySelector('div');

const searchCEP = () => {
    let cepNumber = inputCEP.value;
    fetch(`https://viacep.com.br/ws/${cepNumber}/json/`)
        .then((response) => {
            response.json()
                .then((data) => {
                    console.log(data);
                    if (data.erro) {
                        console.log('error')
                    } else {
                        let address = `
                            Logradouro: ${data.logradouro}<br>
                            Complemento: ${data.complemento || 'N/A'}<br>
                            Bairro: ${data.bairro}<br>
                            Localidade: ${data.localidade}<br>
                            UF: ${data.uf}<br>
                        `;
                        let newDiv = document.createElement('div');
                        newDiv.innerHTML = address;
                        divCEP.innerHTML = ''; 
                        divCEP.appendChild(newDiv);
                    }
                }).catch((erro) => {
                    console.log("Algo deu errado:", error);
                })
        });

    } else {
        alert('O cep deve conter 8 dígitos');
    }

}

buttonCEP.addEventListener('click', searchCEP);
inputCEP.addEventListener('input', (event) => {
    if(event.target.value.length === 8 ) {
        buttonCEP.removeAttribute('disabled');
    }else {
        buttonCEP.setAttribute('disabled', true);
    }
})
