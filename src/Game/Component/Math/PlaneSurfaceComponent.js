import * as THREE from "three";

const PlaneSurfaceComponent = {
    id: 'three_js.math.plane_surface',
    init: function () {
        let normalVector = new THREE.Vector3( 0, 1, 0 );
        let planeConstant = 0.01; // this value must be slightly higher than the groundMesh's y position of 0.0

        return new THREE.Plane( normalVector, planeConstant );
    }
};

export {PlaneSurfaceComponent}