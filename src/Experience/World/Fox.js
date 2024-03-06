import * as THREE from "three"
import Experience from "../Experience";

export default class Fox {
    constructor() {
        this.experiences = new Experience()
        this.scene = this.experiences.scene
        this.resources = this.experiences.resources
        this.resource = this.resources.items.foxModel
        this.setModel()
    }
    setModel() {
        this.model = this.resource.scene
        this.model.scale.set(.02, .02, .02)
        this.scene.add(this.model)
        this.model.traverse((child) => {
            if (child instanceof THREE.Mesh) {
                child.castShadow = true
            }
        })
    }
}