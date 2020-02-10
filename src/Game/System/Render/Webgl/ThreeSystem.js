import * as THREE from "three";
import {CameraComponent} from "../../../Component/CameraComponent";
import {SceneComponent} from "../../../Component/SceneComponent";
import {RenderComponent} from "../../../Component/RenderComponent";
import {PlaneDrawComponent} from "../../../Component/Drawable/PlaneDrawComponent";
import {CubeDrawComponent} from "../../../Component/Drawable/CubeDrawComponent";
import {PointLightComponent} from "../../../Component/Drawable/Light/PointLightComponent";
import {PlaneSurfaceComponent} from "../../../Component/Math/PlaneSurfaceComponent";
import {Vector4dComponent} from "../../../Component/Math/Vector4dComponent";
import {PositionComponent} from "../../../Component/PositionComponent";
import {PointerLockControls} from "three/examples/jsm/controls/PointerLockControls";

class ThreeSystem {
    constructor(renderDom) {
        this.viewPort = renderDom;
        this.window = window;
        this.renderWidth = window.innerWidth - 10;
        this.renderHeight = window.innerHeight - 10;

        this.renderableEntites = [];
        this.renderableEntites_indexMap = {};
        this.renderableEntites_index = 0;
        this.camera = null;
        this.renderer = null;
        this.scene = null;

        this.mapLightVector = null;
        this.mapLightMesh = null;
        this.mapShadowsSurface = null;
        this.mapMesh = null;

        this.updatePositionData = {};
        this.mapMesh = null;
        this.mapLightVector = null;
        this.mapLightMesh = null;
    }

    init(systemId, entities) {
        this.scene      = SceneComponent.init();
        this.camera     = CameraComponent.init();
        this.camera.position.set(0, 2, -1);
        this.renderer = RenderComponent.init();
        this.renderer.setSize(this.renderWidth, this.renderHeight);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.viewPort.appendChild(this.renderer.domElement);

        let _ = this;
        entities.forEach(function (entity) {
            switch (entity.id) {
                case 'map':
                    entity.components.forEach(function (mapComponent) {
                        switch (mapComponent.id) {
                            case PlaneDrawComponent.id:
                                _.mapMesh = PlaneDrawComponent.init();
                                _.scene.add(_.mapMesh.object3d);
                                break;
                            case PlaneSurfaceComponent.id:
                                _.mapShadowsSurface = PlaneSurfaceComponent.init();
                                break;
                        }
                    });
                    break;
                case 'map_light':
                    entity.components.forEach(function (mapLightComponent) {
                       switch (mapLightComponent.id) {
                           case Vector4dComponent.id:
                               _.mapLightVector = Vector4dComponent.init();
                               break;
                           case PointLightComponent.id:
                               _.mapLightMesh = PointLightComponent.init();
                               break;
                       }
                    });

                    if(_.mapLightMesh != null && _.scene != null && _.mapLightVector != null)
                    {
                        _.mapLightMesh.object3d.lookAt(_.scene.position);
                        _.scene.add(_.mapLightMesh.object3d);
                        _.mapLightVector.x = _.mapLightMesh.object3d.position.x;
                        _.mapLightVector.y = _.mapLightMesh.object3d.position.y;
                        _.mapLightVector.z = _.mapLightMesh.object3d.position.z;
                        _.mapLightVector.w = 0.001;
                    }

                    break;
                default:
                    //console.log()
                    break;
            }
            /**
             * Drawable entites
             */
            if(entity.id !== 'map' && entity.id !== 'map_light') {
                entity.components.forEach(function (component) {
                    switch (component.id) {
                        case CubeDrawComponent.id:
                            let cubeInstance = CubeDrawComponent.init(component.args);
                            let positionComponent = entity.components.filter(o => o.id === PositionComponent.id);
                            if(positionComponent.length > 0) {
                                positionComponent = positionComponent[0];
                                PositionComponent.init(entity.id, positionComponent.args);
                                cubeInstance.object3d.position.set(
                                    positionComponent.args.x,
                                    positionComponent.args.y,
                                    positionComponent.args.z
                                );
                            }

                            _.scene.add(cubeInstance.object3d);
                            _.scene.add(cubeInstance.shadow);
                            //
                            _.storeDrawableEntity(entity, [cubeInstance]);
                            console.log('[system.' + systemId + '] entity = ' + entity + ' finish init');
                            break;
                    }
                });
            }
        });

        if(this.camera && this.scene) {
            this.camera.lookAt(this.scene.position);

            if(this.renderer && this.window)
            {
                this.window.addEventListener('resize', function (e) {
                    _.camera.aspect = _.window.innerWidth / _.window.innerHeight;
                    _.camera.updateProjectionMatrix();

                    _.renderer.setSize(_.window.innerWidth, _.window.innerHeight);
                });
            }
        }
    }

    storeDrawableEntity(entity, components) {
        this.renderableEntites.push({entity: entity, components: components});
        this.renderableEntites_indexMap[entity.id] = this.renderableEntites_index;
        this.renderableEntites_index++;
    }

    /**
     * {
     *     entity: entity,
     *     components: [
     *         ...
     *     ]
     * }
     * @param entity
     * @returns {*}
     */
    getDrawableEntity(entity) {
        let index = this.renderableEntites_indexMap[entity.id];

        return this.renderableEntites[index];
    }

    loop() {
        let _ = this;
        _.renderableEntites.forEach(function (r) {
            let entity = r.entity;
            r.components.forEach(function (drawableComponent) {
                //Update positions
                if (_.isEntityPositionChanged(entity)) {
                    let p = _.getEntityPosition(entity);
                    drawableComponent.object3d.position.set(p.x, p.y, p.z);
                }
                //Update shadows
                if (_.mapShadowsSurface && _.mapLightVector) {
                    drawableComponent.shadow.update(_.mapShadowsSurface, _.mapLightVector);
                }
            });

        });
        if(this.renderer) {
            this.renderer.render(this.scene, this.camera);
        }
    }

    getEntityPosition(entity) {
        let p = this.updatePositionData[entity.id];

        return p.pop();
    }

    isEntityPositionChanged(entity) {
        return this.updatePositionData.hasOwnProperty(entity.id)
            && this.updatePositionData[entity.id].length > 0;
    }

    updatePosition(entityId, x, y, z, fromSystemId) {
        this.updatePositionData[entityId] = [{
            entity_id: entityId,
            x: x,
            y: y,
            z: z
        }];
    }
}

export {ThreeSystem}