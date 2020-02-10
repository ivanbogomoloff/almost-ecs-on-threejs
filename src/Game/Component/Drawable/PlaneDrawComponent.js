import * as THREE from "three";

const PlaneDrawComponent = {
    id: 'three_js.draw.plane',
    init: function () {
        let groundGeometry = new THREE.BoxBufferGeometry( 30, 0.01, 40 );
        let groundMaterial = new THREE.MeshLambertMaterial( { color: 'rgb(0,130,0)' } );
        let mesh = new THREE.Mesh( groundGeometry, groundMaterial );

        return {
            object3d: mesh
        };
    },
    draw: function () {

    }
};

export {PlaneDrawComponent}