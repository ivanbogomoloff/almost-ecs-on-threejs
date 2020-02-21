<template>
	<div id="controls-left" style="max-height: 800px; overflow: auto">
		<h1>Editor version {{ version }}</h1>
		<div class="controls-panel">
			<div id="controls-left_entities-container" class="controls-panel-container">
				<tree-view
					v-bind:tree_data="treeData"

				></tree-view>
			</div>
			<hr>
		</div>
	</div>

</template>
<script>
	import {Config} from "../../Game/Config";
    import {EDITOR} from "./../Component/EDITOR";
    import TreeView from "./TreeView/Tree.vue";

    export default {
        name: 'LeftPanel',
	    data: function(){
            return {
                config: Config,
	            version: EDITOR.version,
                treeData: EDITOR.tree.entities
            };
	    },
        components: {
            'tree-view': TreeView
        }
    }
</script>
<style>
	#controls-left {
		position: absolute;
		width: 200px;
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