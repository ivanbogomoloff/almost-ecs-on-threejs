import * as THREE from "three";

const PointLightComponent = {
    id: 'three_js.draw.point_light',
    init: function () {
        let light = new THREE.PointLight( 0xfffcdd, 2.3, 500 );
        light.position.set( 50, 100, 10 );

        return {
            object3d: light
        };
    },
    draw: function () {
        
    }
};

export {PointLightComponent}