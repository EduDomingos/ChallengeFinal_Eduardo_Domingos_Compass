/// <reference types="cypress" />

import Serverest from '../../services/serverest.service'
import ValidaServerest from '../../services/validaServerest.service'

describe('Casos de teste sobre a rota /carrinho da API Serverest', () => {
    context('Logar com sucesso', () => {
        beforeEach('Logar', () => {
            Serverest.buscarUsuarioParaLogin()
            cy.get('@usuarioLogin').then(usuario => {
                Serverest.logar(usuario).then(res => {
                    ValidaServerest.validaLoginComSucesso(res)
                    Serverest.salvarBearer(res)
                })
            })
        })

        it('Deve cadastrar um novo carrinho com sucesso', () => {
            Serverest.cadastrarCarrinhoComSucesso().then(res => {
                ValidaServerest.validarCadastrarCarrinhoComSucesso(res)
                cy.contractValidation(res, 'post-carrinho', 201)
            })
        })
    })
})
