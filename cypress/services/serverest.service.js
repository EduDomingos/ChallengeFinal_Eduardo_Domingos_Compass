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
      Cypress.env('bearer', res.body.authorization)
      cy.log("bearer: "+ Cypress.env('bearer').slice(7))
    }

// Produtos //

    static buscarProdutos(){
      return cy.rest(URL_PRODUTOS)
    }

}
