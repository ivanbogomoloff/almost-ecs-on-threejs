<template>
	<div id="controls-left" style="max-height: 800px; overflow: auto">
		<h1>Editor version {{ version }}</h1>
		<div class="controls-panel">
			<EntitiesPanel v-on:entity-changed="onEntityChanged" />
			<ComponentsPanel />
			<SystemsPanel/>
			<hr>
			<div>
				<div id="controls-config" class="controls-panel-container">
					<h2>Config data</h2>
					<table>
						<tr>
							<td>FPS</td>
							<td>{{ config.FPS }}</td>
						</tr>
					</table>
				</div>
				<hr>
			</div>
		</div>
	</div>
</template>
<script>
	import EntitiesPanel from './LeftPanel/EntitiesPanel.vue'
	import ComponentsPanel from './LeftPanel/ComponentsPanel.vue'
	import SystemsPanel from './LeftPanel/SystemsPanel.vue'
	import {Config} from "../Game/Config";
    import {EDITOR} from "./EDITOR";

    export default {
        name: 'LeftPanel',
	    data: function(){
            return {
                config: Config,
	            version: EDITOR.version
            };
	    },
	    methods: {
            onEntityChanged: function () {
	            alert('1');
            }
	    },
        components: {
            EntitiesPanel,
            ComponentsPanel,
            SystemsPanel
        }
    }
</script>
<style>
	#controls-left {
		position: absolute;
		width: 200px;
		height: 100%;
		background: black;
		opacity: 0.6;
		color: white;
		font-size: 13px;
	}

	#controls-left:hover {
		opacity: 1;
	}

	.controls-panel {
		background: #0083b5;
	}

	table , table td {
		border-collapse: collapse;
		border: 1px solid white
	}

	.controls-panel-container {
		max-height: 150px;
		overflow: auto;
	}
	a {
		color: white;
		text-decoration: none;
	}

	h1, h2 {
		font-size: 13px;
	}

	hr {
		height: 2px;
		background: black;
	}
</style>