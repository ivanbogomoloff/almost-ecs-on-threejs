import {IEntity} from "../../ECS/IEntity";
import * as THREE from "three";
import {PointerLockControls} from "three/examples/jsm/controls/PointerLockControls";

class CameraEntity extends IEntity
{
    constructor(){
        super('camera');
        this.supportComponents(['camera', 'controls.pointer_lock']);
        this.supportSystems(['render.web_gl.three_js']);
    }

    init() {
        this.camera = super.getLoadedComponent('camera').execute();

        this.camera.position.x = 2;
        this.camera.position.z = 2;
        this.camera.position.y = 3;

        this.pointerLock = new PointerLockControls(this.camera, document.body);
    }


    onAttachToSystem(systemName, systemContext) {
        super.onAttachToSystem(systemName, systemContext);
        /**
         * @type {PointerLockComponent}
         */
        let pointerLock = super.getLoadedComponent('controls.pointer_lock');
        if(pointerLock) {
            systemContext.scene.add(this.pointerLock.getObject());
            pointerLock.init(systemContext.renderer, this.pointerLock);
        }
        this.camera.lookAt(systemContext.scene.position);
        systemContext.scene.add(this.camera);
    }

    update() {
        super.getLoadedComponent('controls.pointer_lock')
            .execute(this.pointerLock, this.camera);
    }

    onGetBySystem(systemName, systemContext) {
        super.onGetBySystem(systemName, systemContext);
        return this.camera;
    }
}

export  { CameraEntity }