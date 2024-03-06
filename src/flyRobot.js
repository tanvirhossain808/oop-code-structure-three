import Robot from "./Robot"

export default class FlyingRobot extends Robot {
    constructor(name, legs) {
        super(name, legs)
        this.sayHi()
    }
    sayHi() {
        console.log(`Hello my name is ${this.name}.Yo landing`)
    }
    takeOf() {
        console.log(`Have a good take of`)
    }
}