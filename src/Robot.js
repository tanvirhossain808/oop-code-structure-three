export default class Robot {
    constructor(name, legs) {
        this.name = name
        this.legs = legs
        console.log(`I am ${this.name}.Thank you creator`);
    }
    sayHi() {
        console.log(`Hello! My name is ${this.name}.I am a flying robot`)
    }

}