import * as THREE from "three";

const CameraComponent = {
    id: 'three_js.camera',
    _instance: null,
    init: function () {
        this._instance = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

        return this._instance;
    },
    get: function () {
        return this._instance;
    }
};

export {CameraComponent}