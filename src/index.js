// Inicializando o Firebase
var firebaseConfig = {
    apiKey: "SUA_API_KEY",
    authDomain: "SEU_DOMINIO.firebaseapp.com",
    databaseURL: "https://SEU_DOMINIO.firebaseio.com",
    projectId: "SEU_PROJECT_ID",
    storageBucket: "SEU_STORAGE_BUCKET",
    messagingSenderId: "SEU_SENDER_ID",
    appId: "SEU_APP_ID"
};

firebase.initializeApp(firebaseConfig);

// Referenciando o nó de produtos no banco de dados
var produtosRef = firebase.database().ref('produtos');

// Manipulando o envio do formulário de cadastro
$('#produtoForm').submit(function(e) {
    e.preventDefault();

    // Obtendo os valores do formulário
    var nome = $('#nome').val();
    var descricao = $('#descricao').val();
    var preco = $('#preco').val();

    // Criando um novo produto no Firebase
    var novoProdutoRef = produtosRef.push();
    novoProdutoRef.set({
        nome: nome,
        descricao: descricao,
        preco: preco
    });

    // Limpando o formulário
    $('#produtoForm')[0].reset();
});

// Monitorando as alterações no banco de dados
produtosRef.on('value', function(snapshot) {
    var produtos = snapshot.val();
    $('#produtoTableBody').empty();

    for (var key in produtos) {
        if (produtos.hasOwnProperty(key)) {
            var produto = produtos[key];
            var row = `<tr>
                            <td>${produto.nome}</td>
                            <td>${produto.descricao}</td>
                            <td>${produto.preco}</td>
                            <td>
                                <button class="btn btn-primary">Editar</button>
                                <button class="btn btn-danger">Excluir</button>
                            </td>
                        </tr>`;
            $('#produtoTableBody').append(row);
        }
    }
});