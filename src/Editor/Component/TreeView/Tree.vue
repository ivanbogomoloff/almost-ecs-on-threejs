<template>
	<ul id="three-view">
		<tree-item
			class="item"
			:item="tree_data"
			@make-folder="makeFolder"
			@add-item="addItem"
			@editor-action-selected="onEditorActionSelected"
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
            makeFolder: function (item) {
                Vue.set(item, 'children', []);
                this.addItem(item);
            },
            addItem: function (item) {
                item.children.push({
                    name: 'new stuff'
                });
            },
            onEditorActionSelected: function (data) {
                this.$emit('onEditorActionSelected', data);
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