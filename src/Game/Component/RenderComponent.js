import * as THREE from "three";

const RenderComponent = {
    ID: 'three_js.renderer',
    _instance: null,
    init: function () {
        this._instance = new THREE.WebGLRenderer();
        return this._instance;
    },
    get: function () {
        return this._instance;
    }
};

export { RenderComponent }