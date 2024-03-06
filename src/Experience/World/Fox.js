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
        this.debug = this.experiences.debug
        this.setModel()
        if (this.debug.active) {
            this.debugFolder = this.debug.ui.addFolder("Fox")
        }
        this.setAnimation()

        // console.log(this.debugFolder);
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
        this.animation.actions = {}
        this.animation.actions.playIdle = this.animation.mixer.clipAction(this.resource.animations[0])
        this.animation.actions.playWalking = this.animation.mixer.clipAction(this.resource.animations[1])
        this.animation.actions.playRunning = this.animation.mixer.clipAction(this.resource.animations[2])
        this.animation.actions.current = this.animation.actions.playRunning
        this.animation.actions.current.play()
        // this.animation.actions["running"].play()
        this.animation.play = (name) => {
            const newAction = this.animation.actions[name]
            const oldAction = this.animation.actions.current
            newAction.reset()
            newAction.play()
            newAction.crossFadeFrom(oldAction, 1)
            this.animation.actions.current = newAction
        }

        if (this.debug.active) {
            const debugObject = {
                playIdle: () => this.animation.play("playIdle"),
                playWalking: () => this.animation.play("playWalking"),
                playRunning: () => this.animation.play("playRunning")
            }
            this.debugFolder.add(debugObject, "playIdle")
            this.debugFolder.add(debugObject, "playWalking")
            this.debugFolder.add(debugObject, "playRunning")
        }
        // this.animation.action = this.animation.mixer.clipAction(this.resource.animations[2])
        // this.animation.actions.play()

    }
    update() {
        this.animation.mixer.update(this.time.delta * .001)

    }
}