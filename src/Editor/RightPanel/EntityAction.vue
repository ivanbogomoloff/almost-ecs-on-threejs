<template>
	<div>
		<h1>Entity action: {{ action }}</h1>
		<div class="controls-panel">
			<h2>Entity: {{ entity }}</h2>
			<hr>
			<h2>Position</h2>
			<div id="controls-left_entities-container" class="controls-panel-container">
				<table>
					<tr>
						<td width="30%">
							<input class="vector_value" type="text" name="righh_panel_entity_position_x" placeholder="x">
						</td>
						<td width="30%">
							<input class="vector_value" type="text" name="righh_panel_entity_position_y" placeholder="y">
						</td>
						<td width="30%">
							<input class="vector_value" type="text" name="righh_panel_entity_position_z" placeholder="z">
						</td>
					</tr>
				</table>
			</div>
			<hr>
		</div>
	</div>
</template>
<script>
	export default {
	    name: 'EntityAction',
		props: {
	        entity: '',
			action: '',
			show:false
		},
		data: function () {
			return {};
        }
	}
</script>
<style>
	.vector_value {
		width: 90%;
		text-align: center;
	}
</style>