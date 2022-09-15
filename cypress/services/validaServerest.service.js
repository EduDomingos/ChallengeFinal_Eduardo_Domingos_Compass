export default class ValidaServerest {
  /*Validações das ações que iremos realizar na API
  Validar a busca usuários
  Validar o cadastro de novos usuários
  Validar login*/

  static validarBuscaDeUsuarios(res) {
    expect(res).to.be.a('object')
    expect(res.body.quantidade).to.be.a('number')
    expect(res.body.quantidade).to.be.greaterThan(1)

  }

  static validaLoginComSucesso(res){
    expect(res).to.be.a('object')
    expect(res.body.message).to.be.a('string')
    expect(res.body).to.haveOwnProperty('authorization')

  }

  static validarbuscarProdutos(res){
    expect(res).to.be.a('object')
    expect(res.body.quantidade).to.be.a('number')
    expect(res.body.quantidade).to.be.greaterThan(2)
    expect(res.body.produtos[0]).to.haveOwnProperty('nome')
    expect(res.body.produtos[0]).to.haveOwnProperty('preco')
    expect(res.body.produtos[0]).to.haveOwnProperty('descricao')

  }

  static validarCadastroDeProdutoComSucesso(res){
    expect(res).to.be.a('object')
    expect(res.body.message).to.be.a('string')
    expect(res.body.message).to.be.equal('Cadastro realizado com sucesso')
    expect(res.body).to.haveOwnProperty('_id')

  }

}
