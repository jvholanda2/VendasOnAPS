class CarrinhoSubject {
    constructor() {
        this.observers = [];
        this.carrinho = [];
    }

    // adicionarItem(item) {
    //     this.carrinho.push(item);
    //     this.notificarObservers();
    // }

    adicionarItem(item) {
        const existingItem = this.carrinho.find(i => i.id === item.id);
    
        if (!existingItem) {
            this.carrinho.push(item);
            this.notificarObservers();
        } else {
            existingItem.quantity += 1; // Aumenta a quantidade se o item já existe
            this.notificarObservers();
        }
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

    // getTotal() {
    //     let total = 0;
    //     for (const item of this.carrinho) {
    //         total += item.price * item.quantity;
    //     }
    //     return total;
    // }

    getTotal() {
        let total = 0;
    
        for (const item of this.carrinho) {
            const itemPrice = parseInt(item.price);
            const itemQuantity = parseInt(item.quantity);
    
            if (!isNaN(itemPrice) && !isNaN(itemQuantity)) {
                total += itemPrice * itemQuantity;
            } else {
                console.error('Item com valores inválidos:', item);
            }
        }
    
        console.log('Total calculado:', total);
        return total.toString(); // Retornando como string
    }
    
    
}

export { CarrinhoSubject };
