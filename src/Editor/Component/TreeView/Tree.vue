<template>
	<ul id="three-view">
		<tree-item
			class="item"
			:item="tree_data"
			@editor-action-selected="onEditorActionSelected"
			@editor-action-de-selected="onEditorActionDeSelected"
		></tree-item>
	</ul>
</template>

<script>
    import Vue from 'vue/dist/vue.esm'
	import TreeItem from './Item.vue';


    export default {
        props: {
            tree_data: {
                name: '',
                children: Array
            }
        },
        methods: {
            onEditorActionSelected: function (data) {
                this.$emit('onEditorActionSelected', data);
            },
            onEditorActionDeSelected: function (data) {
                this.$emit('onEditorActionDeSelected', data);
            }
        },
        components: {
            'tree-item': TreeItem
        }
    }
</script>
<style>
	.item {
		cursor: pointer;
	}
	.bold {
		font-weight: bold;
	}
	.selected {
		color: #ffffff;
		border: 1px solid #ffe6e6;
		width: 90%;
	}
	ul {
		padding-left: 1em;
		line-height: 1.5em;
		list-style-type: dot;
	}
</style>