import * as THREE from "three";

const RenderComponent = {
    id: 'three_js.renderer',
    _instance: null,
    init: function () {
        if(this._instance != null) {
            return this._instance;
        }

        this._instance = new THREE.WebGLRenderer();
        return this._instance;
    },
    get: function () {
        return this._instance;
    }
};

export { RenderComponent }