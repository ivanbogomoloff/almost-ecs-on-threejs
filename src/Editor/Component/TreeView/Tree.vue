<template>
	<ul id="three-view">
		<tree-item
			class="item"
			:item="tree_data"
			@make-folder="makeFolder"
			@add-item="addItem"
		></tree-item>
	</ul>
</template>

<script>
    import Vue from 'vue/dist/vue.esm'
	import TreeItem from './Item.vue';

    // demo data
    // let treeData = {
    //     name: 'My Tree',
    //     children: [
    //         { name: 'hello' },
    //         { name: 'wat' },
    //         {
    //             name: 'child folder',
    //             children: [
    //                 {
    //                     name: 'child folder',
    //                     children: [
    //                         { name: 'hello' },
    //                         { name: 'wat' }
    //                     ]
    //                 },
    //                 { name: 'hello' },
    //                 { name: 'wat' },
    //                 {
    //                     name: 'child folder',
    //                     children: [
    //                         { name: 'hello' },
    //                         { name: 'wat' }
    //                     ]
    //                 }
    //             ]
    //         }
    //     ]
    // };

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
	ul {
		padding-left: 1em;
		line-height: 1.5em;
		list-style-type: dot;
	}
</style>