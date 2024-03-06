import * as THREE from "three"
import Experience from "../Experience";
import Environment from "./Environment";

export default class World {
    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        // console.log("The world")
        const testMesh = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshStandardMaterial({
                // wireframe: true
            })
        )
        this.scene.add(testMesh)
        this.resources.on("ready", () => {
            console.log("resources are ready")
            this.environment = new Environment()
        })

    }
}