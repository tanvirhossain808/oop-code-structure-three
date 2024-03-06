import * as THREE from "three"

import Sizes from "./Utlis/Sizes"
import Time from "./Utlis/Time"
import Camera from "./Camera"
import Renderer from "./Renderer"
import World from "./World/World"
import Debug from "./Utlis/Debug"
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
        this.debug = new Debug()
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
        this.world.update()
        this.renderer.update()
    }
    destroy() {
        this.sizes.off("resize")
        this.time.off("tick")


        //Traverse the while scene
        this.scene.traverse((child) => {
            if (child instanceof THREE.Mesh) {
                console.log(child);
                child.geometry.dispose()
                for (const key in child.material) {
                    const value = child.material[key]
                    if (value && typeof value.dispose === "function") value.dispose()
                }
            }
        })
        this.camera.controls.dispose()
        this.renderer.instance.dispose()

        if (this.debug.active) this.debug.ui.destroy()
    }
}