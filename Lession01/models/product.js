let products = [];

module.exports = class Product {
    constructor(id,title,imageUrl,description,price){
        this.id = id;
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
    }

    save(){
        if(this.id){
            //update
            const existingProductIndex = products.findIndex(product => product.id == this.id);
            const updatePro = [...products];//copy in array
            updatePro[existingProductIndex] = {...this} // copy value of object
            products = updatePro;
        } else{
            //insert new product
            this.id = Math.random();
            products.push(this);
        }
        
    }

    static fetchAll() {
        return products;
    }

    static findById(id){
        return products.find(product => product.id == id);
    }
    
    static delete(id) {
        const index = products.findIndex(i => i.id == id);
        if (index > -1) {
            products.splice(index, 1);
        }
    }
}