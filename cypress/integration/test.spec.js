it('Deve realizar uma requesição GET na rota /usuarios', () => {
  cy.request('/usuarios').then(res => {
    expect(res).to.be.a('object')
    cy.log(JSON.stringify(res))
  })
})
