<template>
	<div>
		<table class="entity-control-table">
			<tr><td colspan="2">Highlight</td></tr>
			<tr><td>OFF/ON</td><td>
				<input v-on:change="onChange" type="checkbox" v-model="checked">
			</td></tr>
		</table>
	</div>
</template>
<script>
	import {EDITOR} from "../EDITOR";

    export default {
	    props: {
	        entity_id: String
	    },
	    data: function () {
		    return {
                checked: false
		    };
        },
		methods: {
            onChange: function () {
	            if(this.checked) {
					EDITOR.entityAction('high_light_on', this.entity_id)
	            } else {
	                EDITOR.entityAction('high_light_off', this.entity_id)
	            }
            }
		},
		components: {}
	}
</script>