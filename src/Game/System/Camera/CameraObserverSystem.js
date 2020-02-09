import {ISystem} from "../../../ECS/ISystem";
import * as THREE from "three";
import {RenderComponent} from "../../Component/RenderComponent";
import {CameraComponent} from "../../Component/CameraComponent";
import {PointerLockControls} from "three/examples/jsm/controls/PointerLockControls";

class CameraObserverSystem extends ISystem
{
    init() {
        super.log('init start');
        this.pointerLockState = {
            lookUp: false,
            lookDown: false,
            moveForward: false,
            moveLeft: false,
            moveBackward: false,
            moveRight: false,
            canJump: false
        };
        this.pointerLock_velocity = new THREE.Vector2();
        this.pointerLock_velocity.x = 0.2;
        this.pointerLock_velocity.y = 0.1;
        this.pointerLock_direction = new THREE.Vector3();

        let _ = this;
        this.onKeyDown = function ( event ) {
            switch ( event.keyCode ) {
                case 38: // up
                case 87: // w
                    //console.log('pointerLockState.moveForward');
                    _.pointerLockState.moveForward = true;
                    break;
                case 37: // left
                case 65: // a
                    _.pointerLockState.moveLeft = true;
                    break;
                case 40: // down
                case 83: // s
                    _.pointerLockState.moveBackward = true;
                    break;
                case 39: // right
                case 68: // d
                    _.pointerLockState.moveRight = true;
                    break;
                case 32: // space
                    _.pointerLockState.canJump = false;
                    break;
            }
        };

        this.onKeyUp = function ( event ) {
            switch ( event.keyCode ) {
                case 38: // up
                case 87: // w
                    _.pointerLockState.moveForward = false;
                    break;
                case 37: // left
                case 65: // a
                    _.pointerLockState.moveLeft = false;
                    break;
                case 40: // down
                case 83: // s
                    _.pointerLockState.moveBackward = false;
                    break;
                case 39: // right
                case 68: // d
                    _.pointerLockState.moveRight = false;
                    break;
                case 32: // space
                    _.pointerLockState.canJump = false;
                    break;
            }
        };

        document.addEventListener('keydown', this.onKeyDown, false);
        document.addEventListener('keyup', this.onKeyUp, false);

        this.camera   = this.getComponent(null, CameraComponent.ID).get();
        this.pointerLock = new PointerLockControls(this.camera, document.body);

        let renderer = this.getComponent(null, RenderComponent.ID).get();

        if(renderer && this.pointerLock) {
            renderer.domElement.addEventListener('click', function() {
                _.pointerLock.lock();
            }, false);
        } else {
            console.log('error init camera observer system');
        }
    }

    loop() {
        let pointerLock = this.pointerLock;
        let camera = this.camera;
        if(pointerLock.isLocked === true)
        {
            //Тут bool преобразуются в 0 и 1 и удобно определять направление
            this.pointerLock_direction.z = Number( this.pointerLockState.moveForward ) - Number( this.pointerLockState.moveBackward );
            this.pointerLock_direction.x = Number( this.pointerLockState.moveRight ) - Number( this.pointerLockState.moveLeft );

            // Реализация перемещенаия по оси Y
            let cameraVector = new THREE.Vector3();
            //https://threejs.org/docs/index.html#examples/en/controls/PointerLockControls.getDirection
            pointerLock.getDirection(cameraVector);
            // pointerLock_direction.y - может быть -1 до +1
            if(cameraVector.y > 0) {
                this.pointerLockState.lookUp   = true;
                this.pointerLockState.lookDown = false;
            } else if(cameraVector.y < 0) {
                this.pointerLockState.lookUp = false;
                this.pointerLockState.lookDown = true;
            } else {
                this.pointerLockState.lookUp  = false;
                this.pointerLockState.lookDown = false;
            }
            this.pointerLock_direction.y = Math.abs(cameraVector.y);
            // это обеспечивает последовательные движения во всех направлениях
            // https://www.gamedev.ru/terms/Normalization
            this.pointerLock_direction.normalize();

            // Перемещение по X,Z
            pointerLock.moveForward(this.pointerLock_direction.z * this.pointerLock_velocity.x);
            pointerLock.moveRight(this.pointerLock_direction.x * this.pointerLock_velocity.x);
            // Перемещение по Y
            if(this.pointerLockState.moveForward || this.pointerLockState.moveBackward)
            {
                if(this.pointerLockState.moveForward && this.pointerLockState.lookUp)
                {
                    camera.position.y += this.pointerLock_direction.y * this.pointerLock_velocity.y;
                }
                else if(this.pointerLockState.moveForward && this.pointerLockState.lookDown) {
                    camera.position.y -= this.pointerLock_direction.y * this.pointerLock_velocity.y;
                }
                else if(this.pointerLockState.moveBackward && this.pointerLockState.lookDown) {
                    camera.position.y += this.pointerLock_direction.y * this.pointerLock_velocity.y;
                }
                else if(this.pointerLockState.moveBackward && this.pointerLockState.lookUp) {
                    camera.position.y -= this.pointerLock_direction.y * this.pointerLock_velocity.y;
                }
            }
            //console.log(pointerLock_direction.y);
        }
    }
}

export {CameraObserverSystem}