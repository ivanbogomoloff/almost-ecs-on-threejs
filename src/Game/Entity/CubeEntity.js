
import * as THREE from "three";
import {IEntity} from "../../ECS/IEntity";
import {SystemHelper} from "../Helper/SystemHelper";
import {ShadowMesh} from "three/examples/jsm/objects/ShadowMesh";

class CubeEntity extends IEntity
{
    constructor(name){
        super(name || 'cube');
        this.supportSystems(['raycaster', 'render.web_gl.three_js']);

        let geometry = new THREE.BoxGeometry( 1, 1, 1 );
        this.material =  new THREE.MeshPhongMaterial({
            color: 0xb4b7f9
        });
        this.mesh = new THREE.Mesh( geometry, this.material  );
        this.mesh.position.set(0, 1 / 2, 0);

        this.shadow = new ShadowMesh(this.mesh);
    }

    onAttachToSystem(systemName, systemContext) {
        super.onAttachToSystem(systemName, systemContext);
        SystemHelper.attachToRenderWebGlThreeJs(systemContext, [
            this.mesh, this.shadow
        ]);
    }

    onIntersect(intersection) {
        //todo
    }

    updateShadow(mapEntity) {
        this.shadow.update(mapEntity.light.plane, mapEntity.light.vector4d);
    }

    update() {

    }
}

export  { CubeEntity }