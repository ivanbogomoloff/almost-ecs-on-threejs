import * as THREE from "three";

const SceneComponent = {
    id: 'three_js.scene',
    _instance: null,
    init: function () {
        if(this._instance) {
            return this._instance;
        }

        this._instance = new THREE.Scene();

        return this._instance;
    }
};

export {SceneComponent}