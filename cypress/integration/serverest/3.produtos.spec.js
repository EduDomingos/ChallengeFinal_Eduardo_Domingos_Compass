/// <reference types="cypress" />

import Serverest from '../../services/serverest.service'
import ValidaServerest from '../../services/validaServerest.service'

describe('Casos de teste sobre a rota /produtos da API Serverest', () => {

  it.only('Deve buscar todos os produtos cadastrados', () => {
    Serverest.buscarProdutos().then(res =>{
      ValidaServerest.validarbuscarProdutos(res)
    })
  })

  it('Deve postar um novo produto com sucesso', ()=>{
    Serverest.cadastrarProdutoComSucesso().then(res =>{
      ValidaServerest.validarCadastroDeProdutoComSucesso(res)
    })
  })

})