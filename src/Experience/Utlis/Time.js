import EventEmitter from "./EventEmitter";

export default class Time extends EventEmitter {
    constructor() {
        super()
        // console.log(this)
        this.start = Date.now()
        this.current = this.start
        this.elapsed = 0
        this.delta = 16
        window.requestAnimationFrame(() => {
            this.tick()
        })

    }
    tick() {
        const currentTime = Date.now()
        this.delta = currentTime - this.current
        this.current = currentTime
        this.elapsed = this.current - this.start
        this.trigger("tick")
        // this.trigger("tick")
        // console.log(this.delta)
        // console.log(this)
        window.requestAnimationFrame(() => {
            this.tick()
        })
    }

}