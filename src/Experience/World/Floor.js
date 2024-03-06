import * as THREE from "three"
import Experience from "../Experience";
export default class Floor {
    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources

        this.setGeometry()
        this.setTextures()
        this.setMaterials()
        this.setMesh()


    }

    setGeometry() {
        this.geometry = new THREE.CircleGeometry(5, 64)
    }

    setTextures() {
        this.textures = {}
        this.textures.color = this.resources.items.grassColorTexture
        this.textures.color.encoding = THREE.sRGBEncoding
        this.textures.color.repeat.set(1.5, 1.5)
        this.textures.color.wrapS = THREE.RepeatWrapping
        this.textures.color.wrapT = THREE.RepeatWrapping

        this.textures.normal = this.resources.items.grassNormalTexture
        // this.textures.normal.encoding = THREE.sRGBEncoding
        this.textures.normal.repeat.set(1.5, 1.5)
        this.textures.normal.wrapS = THREE.RepeatWrapping
        this.textures.normal.wrapT = THREE.RepeatWrapping
    }

    setMaterials() {
        this.material = new THREE.MeshStandardMaterial(
            {
                map: this.textures.color,
                normalMap: this.textures.normal
            }
        )
    }

    setMesh() {
        this.mesh = new THREE.Mesh(
            this.geometry,
            this.material,
        )
        this.mesh.rotation.x = -Math.PI * .5
        this.mesh.receiveShadow = true
        this.scene.add(this.mesh)
    }
}