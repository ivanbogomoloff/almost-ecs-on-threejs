import {IEntity} from "../../../ECS/IEntity";
import * as THREE from "three";
import {SystemHelper} from "../../Helper/SystemHelper";

class AxisHelperEntity extends IEntity
{
    constructor(){
        super('axis.helper');
        this.supportSystems(['render.web_gl.three_js']);
        this.mesh = new THREE.AxisHelper( 20 );
    }

    onAttachToSystem(systemName, systemContext) {
        super.onAttachToSystem(systemName, systemContext);
        SystemHelper.attachToRenderWebGlThreeJs(systemContext, [this.mesh]);
    }
}

export {AxisHelperEntity}
