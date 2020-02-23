<template>
	<div>
		<table v-for="system in systems" class="entity-control-table">
			<tr>
				<td colspan="4">Position for system: <b>{{ system }}</b></td>
			</tr>
			<tr >
				<td>X:</td>
				<td><input :id="id(system, 'x')" v-on:change="onChangeX($event, system)" style="width: 95%"
				           :value="getPositionForSystem(system, 'x')"></td>
				<td><button v-on:click="onClick($event, system, 'x', '+')">+</button></td>
				<td><button v-on:click="onClick($event, system, 'x', '-')">-</button></td>
			</tr>
			<tr >
				<td>Y:</td>
				<td><input :id="id(system, 'y')" v-on:change="onChangeY($event, system)" style="width: 95%"
				           :value="getPositionForSystem(system, 'y')"></td>
				<td><button v-on:click="onClick($event, system, 'y', '+')">+</button></td>
				<td><button v-on:click="onClick($event, system, 'y', '-')">-</button></td>
			</tr>
			<tr >
				<td>Z:</td>
				<td><input :id="id(system, 'z')" v-on:change="onChangeZ($event, system)" style="width: 95%"
				           :value="getPositionForSystem(system, 'z')"></td>
				<td><button :id="id(system)" v-on:click="onClick($event, system, 'z', '+')">+</button></td>
				<td><button v-on:click="onClick($event, system, 'z', '-')">-</button></td>
			</tr>
			<tr >
				<td colspan="4">
					<hr>
				</td>
			</tr>
		</table>
	</div>
</template>
<script>
    import {EDITOR} from "../EDITOR";
    import {PositionComponent} from "../../../Game/Component/PositionComponent";

    export default {
        props: {
            entity_id: String
        },
        data: function () {
            let systems = PositionComponent.getSystemsForEntity(this.entity_id);
            return {
                systems: systems,
	            show: []
            };

        },
        methods: {
            id: function(sid, coord){
                return 'position_' + coord + '_' + this.entity_id+'_'+sid;
            },
	        findById: function(sid, coord){
                return document.getElementById('position_'+coord+'_'+this.entity_id+'_'+sid);
	        },
            onClick: function(event, systemId, coord, dir){
                let pos = PositionComponent.get(systemId, this.entity_id);
                let step = 1;
                switch (coord) {
	                case 'x':
                        this.onChangeX(null, systemId, dir === '+' ? pos.x + step : pos.x - step);
	                    break;
                    case 'y':
                        this.onChangeY(null, systemId, dir === '+' ? pos.y + step : pos.y - step);
                        break;
                    case 'z':
                        this.onChangeZ(null, systemId, dir === '+' ? pos.z + step : pos.z - step);
                        break;
                }

            },
            onChangeX: function (event, systemId, valueX) {
                let val = valueX !== null ? valueX : event.target.value.replace(/,/, '.');
                PositionComponent.changeX(systemId, this.entity_id, val);
	            this.findById(systemId,'x').value = val;
            },
            onChangeY: function (event, systemId, valueY) {
                let val = valueY !== null ? valueY : event.target.value.replace(/,/, '.');
                PositionComponent.changeY(systemId, this.entity_id, val);
                this.findById(systemId,'y').value = val;
            },
            onChangeZ: function (event, systemId, valueZ) {
                let val = valueZ !== null ? valueZ : event.target.value.replace(/,/, '.');
                PositionComponent.changeZ(systemId, this.entity_id, val);
                this.findById(systemId,'z').value = val;
            },
            getPositionForSystem: function (systemId, coordinate) {
                let pos = {x: 0.0, y: 0.0, z: 0.0};
                if (systemId) {
                    pos = PositionComponent.get(systemId, this.entity_id);
                }
                let data = {
                    x: pos.x,
                    y: pos.y,
                    z: pos.z
                };

                return data[coordinate];
            }
        },
        components: {}
    }
</script>