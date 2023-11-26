class CarrinhoSubject {
    constructor() {
        this.observers = [];
        this.carrinho = [];
    }

    adicionarItem(item) {
        this.carrinho.push(item);
        this.notificarObservers();
    }

    getItens() {
        return this.carrinho;
    }

    notificarObservers() {
        for (const observer of this.observers) {
            observer.atualizar(this.carrinho);
        }
    }

    registrarObserver(observer) {
        this.observers.push(observer);
    }

    removerObserver(observer) {
        const index = this.observers.indexOf(observer);
        if (index !== -1) {
            this.observers.splice(index, 1);
        }
    }

    removerItem(itemId) {
        const index = this.carrinho.findIndex(item => item.id === itemId);
        if (index !== -1) {
            this.carrinho.splice(index, 1);
            this.notificarObservers();
        }
    }

    getTotal() {
        let total = 0;
        for (const item of this.carrinho) {
            total += item.price * item.quantity;
        }
        return total;
    }
}

export { CarrinhoSubject };
