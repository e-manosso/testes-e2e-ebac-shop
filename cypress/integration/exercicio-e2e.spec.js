/// <reference types="cypress" />
import EnderecoCliente from '../support/page_objects/enderecocliente.page'
const dadosEndereco = require('../fixtures/endereco.json')

context('Exercicio - Testes End-to-end - Fluxo de pedido', () => {
    /*  Como cliente 
        Quero acessar a Loja EBAC 
        Para fazer um pedido de 4 produtos 
        Fazendo a escolha dos produtos
        Adicionando ao carrinho
        Preenchendo todas opções no checkout
        E validando minha compra ao final */

    beforeEach(() => {
        cy.visit('produtos')
    });

    it('Deve fazer um pedido na loja Ebac Shop de ponta a ponta', () => {
        var quantidade = 2
        var quantidadecar =0

        //primeiro produto
        cy.addProdutos('Ariel Roll Sleeve Sweatshirt','S','Purple',quantidade)
        quantidadecar = quantidade
        cy.get('.dropdown-toggle > .mini-cart-items').should('contain', quantidadecar)
        cy.get('.woocommerce-message').should('contain', quantidade + ' × “Ariel Roll Sleeve Sweatshirt” foram adicionados no seu carrinho.')

        //segundo produto
        cy.get('#primary-menu > .menu-item-629 > a').click()
        cy.addProdutos('Abominable Hoodie','L','Red',quantidade)
        quantidadecar = quantidadecar + quantidade
        cy.get('.dropdown-toggle > .mini-cart-items').should('contain', quantidadecar)
        cy.get('.woocommerce-message').should('contain', quantidade + ' × “Abominable Hoodie” foram adicionados no seu carrinho.')

        //terceiro produto
        cy.get('#primary-menu > .menu-item-629 > a').click()
        cy.addProdutos('Atlas Fitness Tank','L','Blue',quantidade)
        quantidadecar = quantidadecar + quantidade
        cy.get('.dropdown-toggle > .mini-cart-items').should('contain', quantidadecar)
        cy.get('.woocommerce-message').should('contain', quantidade + ' × “Atlas Fitness Tank” foram adicionados no seu carrinho.')

        //quarto produto
        cy.get('#primary-menu > .menu-item-629 > a').click()
        cy.addProdutos('Apollo Running Short','36','Black',quantidade)
        quantidadecar = quantidadecar + quantidade
        cy.get('.dropdown-toggle > .mini-cart-items').should('contain', quantidadecar)
        cy.get('.woocommerce-message').should('contain', quantidade + ' × “Apollo Running Short” foram adicionados no seu carrinho.')

        cy.get('.woocommerce-message > .button').click()
        cy.get('.checkout-button').click()

        EnderecoCliente.editarEnderecoPagamento(
            dadosEndereco[1].nome,
            dadosEndereco[1].sobrenome,
            dadosEndereco[1].empresa,
            dadosEndereco[1].pais,
            dadosEndereco[1].endereconumero,
            dadosEndereco[1].complemento,
            dadosEndereco[1].cidade,
            dadosEndereco[1].estado,
            dadosEndereco[1].cep,
            dadosEndereco[1].telefone,
            dadosEndereco[1].email)

        cy.get('.woocommerce-notice').should('contain', 'Obrigado. Seu pedido foi recebido.')
    });


})
