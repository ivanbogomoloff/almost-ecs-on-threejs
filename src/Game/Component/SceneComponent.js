import * as THREE from "three";

const SceneComponent = {
    ID: 'three_js.scene',
    init: function () {
        return new THREE.Scene();
    }
};

export {SceneComponent}