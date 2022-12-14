/// <reference types="cypress" />

import Serverest from '../../services/serverest.service'
import ValidaServerest from '../../services/validaServerest.service'
import Factory from '../../fixtures/factory'

describe('Casos de teste sobre a rota /usuarios da API Serverest', () => {
    it('Deve retornar todos os usuários cadastrados na Serverest', () => {
        Serverest.buscarUsuarios().then(res => {
            cy.contractValidation(res, 'get-usuarios', 200)
            ValidaServerest.validarBuscaDeUsuarios(res)
            cy.log(JSON.stringify(res.body.usuarios))
        })
    })

    it('Não deve postar um novo usuário administrador existente', () => {
        cy.postarUsuarioSemSucesso().then(res => {
            cy.contractValidation(res, 'post-usuarios', 400)
            expect(res.body.message).to.be.equal(
                'Este email já está sendo usado'
            )
        })
    })

    it('Deve realizar login com sucesso', () => {
        Serverest.buscarUsuarioParaLogin()
        cy.get('@usuarioLogin').then(usuario => {
            Serverest.logar(usuario).then(res => {
                cy.contractValidation(res, 'post-login', 200)
                ValidaServerest.validaLoginComSucesso(res)
                Serverest.salvarBearer(res)
            })
        })
    })

    it('Deve buscar e salvar um usuário em um arquivo json', () => {
        const inteiro = Factory.gerarInteiroAleatorio()
        Serverest.buscarUsuarios().then(res => {
            cy.writeFile(
                './cypress/fixtures/usuario.json',
                res.body.usuarios[inteiro]
            )
            ValidaServerest.validarBuscaDeUsuarios(res)
        })
    })

    it('Deve buscar o usuário no arquivo json', () => {
        cy.fixture('usuario.json').then(json => {
            let usuario = {
                email: json.email,
                password: json.password
            }
            Serverest.logar(usuario).then(res => {
                ValidaServerest.validaLoginComSucesso(res)
                Serverest.salvarBearer(res)
            })
        })
    })

    it('Deve deletar o usuário salvo no arquivo json pelo id', () => {
        Serverest.deletarUsuario().then(res => {
            cy.contractValidation(res, 'delete-usuarios-by-id', 200)
            ValidaServerest.validarDeletarUsuario(res)
        })
    })
})
