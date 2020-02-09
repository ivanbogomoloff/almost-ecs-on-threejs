import {ISystem} from "../../ECS/ISystem";
import * as THREE from "three";
import {CubeDrawComponent} from "../Component/Drawable/CubeDrawComponent";
import {HightLightMeshComponent} from "../Component/HightLightMeshComponent";

class RayCasterSystem extends ISystem {
    constructor(id) {
        super(id);
        this.camera = null;
        this.rayCaster = null;
        this.mouseVector2 = null;
        this.renderingSystem = null;
        this.hightLightComponent = null;
    }

    init() {
        super.log('init start');
        this.rayCaster = new THREE.Raycaster();
        this.mouseVector2 = new THREE.Vector2( 1, 1 );
        this.hightLightComponent = super.getComponent(null, HightLightMeshComponent.ID);

        this.renderingSystem = super.getDependency('render');
        if(this.renderingSystem ) {
            this.camera = this.renderingSystem .camera;
            this.renderer = this.renderingSystem .renderer;
        }

        let self = this;
        let _ = this;

        document.addEventListener('mousemove', function (e) {
            e.preventDefault();
            if(self.camera != null
                && self.renderer != null
            )
            {
                _.getEntities().forEach(function (entity) {
                    if(_.renderingSystem)
                    {
                        let cubeSupport = _.renderingSystem.getComponent(entity, CubeDrawComponent.ID);
                        if(cubeSupport)
                        {
                            let obj = _.renderingSystem.getDrawableEntity(entity);
                            if(obj && _.hightLightComponent != null)
                            {
                                obj.components.forEach(function (drawableComponent) {
                                    _.hightLightComponent.load(entity.id, drawableComponent.init_material);
                                    _.findIntersection({
                                        id: entity.id,
                                        object3d: drawableComponent.object3d
                                    });
                                });
                            }
                        }
                    }
                });
            }
        });
    }

    findIntersection(entityForTest) {
        let self = this;
        self.hightLightComponent.restore(entityForTest.id, entityForTest.object3d);
        self.rayCaster.setFromCamera( self.mouseVector2, self.camera );

        self.mouseVector2.x = ( event.clientX / self.renderer.domElement.clientWidth ) * 2 - 1;
        self.mouseVector2.y = - ( event.clientY / self.renderer.domElement.clientHeight ) * 2 + 1;

        let intersects = self.rayCaster.intersectObject(entityForTest.object3d);
        if(intersects != null && intersects.length > 0)
        {
            let intersection = intersects[0];
            let intersectMesh = intersection.object;

            if(self.hightLightComponent) {
                self.hightLightComponent.highlight(entityForTest.id, intersectMesh);
            }

            self.log('[intersect for entity: ' + entityForTest.id);
        }
    }

    loop(){

    }
}

export {RayCasterSystem}