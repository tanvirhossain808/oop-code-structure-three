import * as THREE from "three"
import Experience from "../Experience";
import Time from "../Utlis/Time";

export default class Fox {
    constructor() {
        this.experiences = new Experience()
        this.scene = this.experiences.scene
        this.resources = this.experiences.resources
        this.resource = this.resources.items.foxModel
        this.time = new Time()
        this.setModel()
        this.setAnimation()
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
    setAnimation() {
        this.animation = {}
        this.animation.mixer = new THREE.AnimationMixer(this.model)
        this.animation.action = this.animation.mixer.clipAction(this.resource.animations[2])
        this.animation.action.play()
    }
    update() {
        this.animation.mixer.update(this.time.delta * .001)

    }
}