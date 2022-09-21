import Factory from '../fixtures/factory'

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
        cy.request(URL_USUARIOS).then(res => {
            let inteiro = Factory.gerarInteiroAleatorio()
            cy.wrap({
                email: res.body.usuarios[inteiro].email,
                password: res.body.usuarios[inteiro].password
            }).as('usuarioLogin')
        })
    }

    static logar(usuario) {
        return cy.rest(URL_LOGIN, 'POST', usuario)
    }

    static salvarBearer(res) {
        Cypress.env('bearer', res.body.authorization.slice(7))
        cy.log('bearer: ' + Cypress.env('bearer').slice(7))
    }

    // Produtos //

    static buscarProdutos() {
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

    static cadastrarProdutoComSucesso() {
        const produto = Factory.gerarProduto()

        return cy.request({
            method: 'POST',
            url: URL_PRODUTOS,
            body: produto,
            failOnStatusCode: true,
            auth: {
                bearer: Cypress.env('bearer')
            }
        })
    }

    static deletarUsuario() {
        return cy.fixture('usuario.json').then(json => {
            cy.rest(URL_USUARIOS + '/' + json._id, 'DELETE')
        })
    }

    static cadastrarCarrinhoComSucesso() {
        return cy.fixture('produtos.json').then(produtos => {
            cy.request({
                method: 'POST',
                url: URL_CARRINHOS,
                body: produtos,
                failOnStatusCode: true,
                auth: {
                    bearer: Cypress.env('bearer')
                }
            })
        })
    }
}
