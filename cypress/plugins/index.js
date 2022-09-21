/// <reference types="cypress" />
// ***********************************************************
const path = require('path')
const fs = require('fs-extra')

function buscarArquivoDeConfig(arquivo) {
    const caminhoDoArquivo = path.resolve(
        '.',
        'cypress',
        'config',
        `${arquivo}.json`
    )
    return fs.readJSON(caminhoDoArquivo)
}

module.exports = (on, config) => {
    require('cypress-mochawesome-reporter/plugin')(on)

    const arquivo = config.env.configFile || 'dev'
    return buscarArquivoDeConfig(arquivo)
}
