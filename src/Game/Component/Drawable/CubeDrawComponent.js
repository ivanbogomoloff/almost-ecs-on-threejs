import * as THREE from "three";
import {ShadowMesh} from "three/examples/jsm/objects/ShadowMesh";

const CubeDrawComponent = {
    id: 'three_js.draw.cube',
    init: function (params) {
        console.log('[component.'+this.id+'] init with params:');
        console.log(params);

        let geometry = new THREE.BoxGeometry(1, 1, 1);
        let material = function () {
            return new THREE.MeshPhongMaterial({
                color: params ? (params.hasOwnProperty('color') ? params.color : 0xb4b7f9) : 0xb4b7f9
            })
        };
        let mesh = new THREE.Mesh(geometry, material());
        let shadow = new ShadowMesh(mesh);

        return {
            object3d: mesh,
            shadow: shadow,
            init_material: material()
        };
    }
};

export {CubeDrawComponent}