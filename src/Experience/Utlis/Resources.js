import * as THREE from "three"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import EventEmitter from "./EventEmitter";
export default class Resource extends EventEmitter {
    constructor(sources) {
        super()
        //option
        this.sources = sources

        //setup
        this.items = {
        }
        this.toLoad = this.sources.length
        this.loaded = 0

        this.setLoaders()
        this.startLoading()
    }

    setLoaders() {
        this.loaders = {

        }
        this.loaders.gltfLoader = new GLTFLoader()
        this.loaders.textureLoader = new THREE.TextureLoader()
        this.loaders.cubeTextureLoader = new THREE.CubeTextureLoader()
    }
    startLoading() {
        //load each source
        for (const source of this.sources)
            if (source.type === "gltfModel") {
                this.loaders.gltfLoader.load(
                    source.path,
                    (file) => {
                        console.log(source, file)
                    }
                )
            }
            else if (source.type === "texture") {
                this.loaders.textureLoader.load(
                    source.path,
                    (file) => {
                        console.log(source, file)
                    }
                )
            }
            else if (source.type === "cubeTexture") {
                console.log(source.path);
                // console.log(this.load);
                this.loaders.cubeTextureLoader.load(
                    source.path,
                    (file) => {
                        console.log(source, file)
                    }
                )
            }
    }
}