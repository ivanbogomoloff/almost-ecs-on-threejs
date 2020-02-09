import {ThreeSystem} from "./Game/System/Render/Webgl/ThreeSystem";
import {FpsLoopHelper} from "./Helper/Loop/FpsLoopHelper";
import {SceneComponent} from "./Game/Component/SceneComponent";
import {CameraComponent} from "./Game/Component/CameraComponent";
import {RenderComponent} from "./Game/Component/RenderComponent";
import {PlaneDrawComponent} from "./Game/Component/Drawable/PlaneDrawComponent";
import {CubeDrawComponent} from "./Game/Component/Drawable/CubeDrawComponent";
import {PointLightComponent} from "./Game/Component/Drawable/Light/PointLightComponent";
import {CameraObserverSystem} from "./Game/System/Camera/CameraObserverSystem";
import {PlaneSurfaceComponent} from "./Game/Component/Math/PlaneSurfaceComponent";
import {Vector4dComponent} from "./Game/Component/Math/Vector4dComponent";
import {RayCasterSystem} from "./Game/System/RayCasterSystem";
import {HightLightMeshComponent} from "./Game/Component/HightLightMeshComponent";
import {PositionComponent} from "./Game/Component/PositionComponent";
import {MovementSystem} from "./Game/System/MovementSystem";
import {ECS} from "./ECS/ECS";
import {Config} from "./Game/Config";

let mapEntity        = ECS.createEntity('map');
ECS.entity.addComponent(mapEntity, PlaneDrawComponent);
ECS.entity.addComponent(mapEntity, PlaneSurfaceComponent);

let cubeEntity = ECS.createEntity('cube_1');
ECS.entity.addComponent(cubeEntity, CubeDrawComponent, {color: 0xB404AE });
//Purple
ECS.entity.addComponent(cubeEntity, PositionComponent, {x: 0, y: 1 / 2, z: 0});

let cubeEntity2 = ECS.createEntity('cube_2');
ECS.entity.addComponent(cubeEntity2, CubeDrawComponent, {color: 0xB40404 });
// Red
ECS.entity.addComponent(cubeEntity2 ,PositionComponent, {x: -5, y: 1 / 2, z: 0});

let lightEntity = ECS.createEntity('map_light');
ECS.entity.addComponent(lightEntity, PointLightComponent);
ECS.entity.addComponent(lightEntity, Vector4dComponent);

let movementSystem = new MovementSystem('movement');
ECS.system.registerEntity(movementSystem, cubeEntity);
ECS.system.registerEntity(movementSystem, cubeEntity2);
ECS.system.registerComponent(movementSystem, PositionComponent);

let rayCasterSystem = new RayCasterSystem('raycaster');
ECS.system.registerEntity(rayCasterSystem, cubeEntity);
ECS.system.registerEntity(rayCasterSystem, cubeEntity2);
ECS.system.registerComponent(rayCasterSystem, HightLightMeshComponent);

let cameraObserverSystem = new CameraObserverSystem('camera_observer');
ECS.system.registerComponent(cameraObserverSystem, CameraComponent);
ECS.system.registerComponent(cameraObserverSystem, RenderComponent);

let renderingSystem = new ThreeSystem('render', document.getElementById('render'));
ECS.system.registerComponent(renderingSystem, PositionComponent);
ECS.system.registerComponent(renderingSystem, PointLightComponent);
ECS.system.registerComponent(renderingSystem, Vector4dComponent);
ECS.system.registerComponent(renderingSystem, PlaneSurfaceComponent);
ECS.system.registerComponent(renderingSystem, CubeDrawComponent);
ECS.system.registerComponent(renderingSystem, PlaneDrawComponent);
ECS.system.registerComponent(renderingSystem, SceneComponent);
ECS.system.registerComponent(renderingSystem, CameraComponent);
ECS.system.registerComponent(renderingSystem, RenderComponent);

ECS.system.registerEntity(renderingSystem, mapEntity);
ECS.system.registerEntity(renderingSystem, lightEntity);
ECS.system.registerEntity(renderingSystem, cubeEntity);
ECS.system.registerEntity(renderingSystem, cubeEntity2);

ECS.systemsInitializer.add(renderingSystem);
ECS.systemsInitializer.add(cameraObserverSystem);

rayCasterSystem.addDependency('render', renderingSystem);
ECS.systemsInitializer.add(rayCasterSystem);

movementSystem.addDependency('render', renderingSystem);
ECS.systemsInitializer.add(movementSystem);

ECS.systemsInitializer.init();

let fps = Config.getFps();
let loop = new FpsLoopHelper(function () {
    ECS.systemsInitializer.loop();
}, fps);

loop.run();
