<template>
	<div>
		<table v-for="system in cmp_data.systems" class="entity-control-table">
			<tr><td colspan="2">Position for {{ system }}</td></tr>
			<tr><td>System:</td><td>{{ system }}</td></tr>
			<tr><td>X:</td><td><input style="width: 85%" type="number" step="0.1" :value="getPositionForSystem(system, 'x')"></td></tr>
			<tr><td>Y:</td><td><input style="width: 85%" type="number" step="0.1" :value="getPositionForSystem(system, 'y')"></td></tr>
			<tr><td>Z:</td><td><input style="width: 85%" type="number" step="0.1" :value="getPositionForSystem(system, 'z')"></td></tr>
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
            cmp_data: {
                systems: Array
            },
            entity_id: String
	    },
	    data: function () {
		    return {
                componentSystem: ''
		    }
        },
		methods: {
            getPositionForSystem: function (systemId, coordinate) {
				let data =  EDITOR.getEntityComponentData(
				    this.entity_id,
					PositionComponent.id,
					systemId
				);
				return data[coordinate];
            }
		},
		components: {

		}
	}
</script>