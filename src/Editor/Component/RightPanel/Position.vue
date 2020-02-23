<template>
	<div>
		<table v-for="system in systems" class="entity-control-table">
			<tr><td colspan="2">Position for {{ system }}</td></tr>
			<tr><td>System:</td><td>{{ system }}</td></tr>
			<tr><td>X:</td><td><input v-on:change="onChangeX($event, system)"  style="width: 85%" type="number" step="1.0" :value="getPositionForSystem(system, 'x')"></td></tr>
			<tr><td>Y:</td><td><input v-on:change="onChangeY($event, system)" style="width: 85%" type="number" step="1.0" :value="getPositionForSystem(system, 'y')"></td></tr>
			<tr><td>Z:</td><td><input v-on:change="onChangeZ($event, system)" style="width: 85%" type="number" step="1.0" :value="getPositionForSystem(system, 'z')"></td></tr>
			<tr><td colspan="2">
				<hr></td></tr>
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
	            systems: systems
	        };

        },
		methods: {
            onChangeX: function(event, systemId){
                PositionComponent.changeX(systemId, this.entity_id, event.target.value.replace(/,/, '.'))
            },
            onChangeY: function(event, systemId){

            },
            onChangeZ: function(event, systemId){

            },
            getPositionForSystem: function (systemId, coordinate) {
                let pos = {x: 0.0, y: 0.0, z: 0.0};
                if(systemId) {
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
		components: {

		}
	}
</script>