import * as THREE from "three";

const SceneComponent = {
    id: 'three_js.scene',
    init: function () {
        return new THREE.Scene();
    }
};

export {SceneComponent}