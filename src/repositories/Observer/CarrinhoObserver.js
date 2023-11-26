// src/repositories/Observer/CarrinhoObserver.js

class CarrinhoObserver {
    constructor() {
      this.carrinho = [];
    }
  
    atualizar(carrinho) {
      this.carrinho = carrinho;
      this.mostrarCarrinho();
    }
  
    mostrarCarrinho() {
      console.log('Carrinho Atualizado:', this.carrinho);
      // Adicione aqui lógica para atualizar a interface do usuário, por exemplo, usando socket.io ou outros mecanismos.
    }
  }
  
  export { CarrinhoObserver };  // Exporte a classe CarrinhoObserver desta forma
  