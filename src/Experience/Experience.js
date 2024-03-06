import * as THREE from "three"

import Sizes from "./Utlis/Sizes"
import Time from "./Utlis/Time"
import Camera from "./Camera"
import Renderer from "./Renderer"
import World from "./World/World"
import Resource from "./Utlis/Resources"
import sourcess from "./sourcess"
let instance = null

export default class Experience {
    constructor(canvas) {
        if (instance) return instance
        instance = this
        //global access
        window.experience = this
        this.canvas = canvas
        //sizes resize event
        this.sizes = new Sizes()
        this.time = new Time()
        this.scene = new THREE.Scene()
        this.resources = new Resource(sourcess)
        this.camera = new Camera()
        this.renderer = new Renderer()
        this.world = new World()


        this.sizes.on("resize", () => {
            this.resize()
        }
        )
        //time tick event
        this.time.on("tick", () => {
            this.update()
        })
    }

    resize() {
        // console.log('A resize occured');
        this.camera.resize()
        this.renderer.resize()
    }
    update() {
        this.camera.update()
        this.renderer.update()
    }
}