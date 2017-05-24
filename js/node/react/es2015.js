class Animal{
    constructor(){
        this.type="dog";
    }

    says(say){
        console.log(say)
    }
}

let animal=new Animal();
animal.says("hello");

class Cat extends Animal{
    constructor(){
        super()
        this.type="cat"
    }
}

let cat=new Cat()
cat.says('heoo')