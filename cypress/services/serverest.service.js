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

  
}
