const eNumero = (numero) => /^[ 0-9]+$/.test(numero);

const cepValido = (cep) => cep.length = 8 && eNumero(cep);

const pesquisarCep = async() => {
    limparFormulario();
    const cep = document.getElementById('cep').value;
    const url = `http://viacep.com.br/ws/${cep}/json/`;
    if (cepValido(cep)){
        const dados = await fetch(url);
        const endereco = await dados.json();
        if (endereco.hasOwnProperty('erro')){
            documente.getElementById("endereco").value = 'CEP não encontrado!'
        }else{
            documente.getElementById("endereco").value = 'CEP incorreto!'
        }
    }
}