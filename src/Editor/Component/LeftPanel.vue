<template>
	<div id="controls-left" style="max-height: 800px; overflow: auto">
		<h1>Editor version {{ version }}</h1>
		<div class="controls-panel">
			<div id="controls-left_entities-container" class="controls-panel-container">
				<a href="">Add New entity (+)</a>
				<hr>
				<tree-view
					v-bind:tree_data="treeData"
					v-on:onEditorActionSelected="onEditorActionSelected"
					v-on:onEditorActionDeSelected="onEditorActionDeSelected"
				></tree-view>

			</div>
			<hr>
		</div>
	</div>

</template>
<script>
    import TreeView from "./TreeView/Tree.vue";

    export default {
        name: 'LeftPanel',
	    props: {
            config: Object,
            version: '',
            treeData: Object
        },
	    methods: {
            onEditorActionSelected: function (editorTreeItemData) {
                this.$emit('onEditorActionSelected', editorTreeItemData);
            },
            onEditorActionDeSelected: function (editorTreeItemData) {
                this.$emit('onEditorActionDeSelected', editorTreeItemData);
            }
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