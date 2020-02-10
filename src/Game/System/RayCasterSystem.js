import * as THREE from "three";
import {CubeDrawComponent} from "../Component/Drawable/CubeDrawComponent";
import {HightLightMeshComponent} from "../Component/HightLightMeshComponent";
import {CameraComponent} from "../Component/CameraComponent";
import {RenderComponent} from "../Component/RenderComponent";

class RayCasterSystem {
    constructor(renderingSystem) {
        this.camera = null;
        this.renderer = null;
        this.rayCaster = null;
        this.mouseVector2 = null;
        this.hightLightComponent = null;
        this.renderingSystem = renderingSystem;
    }

    init(id, entities) {
        let _ = this;
        this.rayCaster = new THREE.Raycaster();
        this.mouseVector2 = new THREE.Vector2( 1, 1 );
        this.camera = CameraComponent.init();
        this.renderer = RenderComponent.init();
        this.hightLightComponent = HightLightMeshComponent;

        if(this.renderer) {
            this.renderer.domElement.addEventListener('mousemove', function (e) {
                e.preventDefault();
                if(_.camera != null
                    && _.renderer != null
                )
                {
                    entities.forEach(function (entity) {
                        if(_.renderingSystem)
                        {

                            entity.components.forEach(function (component) {
                                switch (component.id) {
                                    case CubeDrawComponent.id:
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
                                        break;
                                }
                            });
                        }
                    });
                }
            });
        }

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
        }
    }

    loop(){

    }
}

export {RayCasterSystem}