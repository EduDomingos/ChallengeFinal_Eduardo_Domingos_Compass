const URL_USUARIOS = '/usuarios'
const URL_LOGIN = '/login'
const URL_PRODUTOS = '/produtos'
const URL_CARRINHOS = '/carrinhos'

export default class Serverest {
    /*Ações que iremos realizar na API
  Buscar usuários
  Cadastrar novos usuários
  Efetuar login*/

  static buscarUsuarios() {
      return cy.rest(URL_USUARIOS)
  }

  static buscarUsuarioParaLogin() {
    cy.request(URL_USUARIOS).then( res => {
      cy.wrap({
        email: res.body.usuarios[2].email,
        password: res.body.usuarios[2].password
      }).as('usuarioLogin')
    })
  }

  static logar(usuario){
    return cy.rest(URL_LOGIN, 'POST', usuario)
  }

  static salvarBearer(res){
    Cypress.env('bearer', res.body.authorization.slice(7))
    cy.log("bearer: "+ Cypress.env('bearer').slice(7))
  }

// Produtos //

  static buscarProdutos(){
    return cy.rest(URL_PRODUTOS)
  }

  // static cadastrarProdutoComSucesso(){
  //   return cy.request({
  //     method: 'POST',
  //     url: URL_PRODUTOS,
  //     failOnStatusCode: true,
  //     headers: {
  //       authorization: Cypress.env('bearer')
  //     },
  //     body: {
  //       nome: "Telescópio x1000",
  //       preco: "1000",
  //       descricao: "lentes 56pkm",
  //       quantidade: 12
  //     }
  //   })
  // }

  static cadastrarProdutoComSucesso(){
    return cy.request({
      method: 'POST',
      url: URL_PRODUTOS,
      body: {
        "nome": "Almofada top",
        "preco": 33,
        "descricao": "Almofada",
        "quantidade": 195
      },
      failOnStatusCode: true,
      auth: {
        bearer: Cypress.env('bearer')
      }

    })
  }

}
