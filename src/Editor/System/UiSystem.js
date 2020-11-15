import Vue from 'vue/dist/vue.esm'
import LeftPanel from './../Component/LeftPanel.vue'
import RightPanel from './../Component/RightPanel.vue'
import {EDITOR} from "../Component/EDITOR";
import {Config} from "../../Game/Config";

class UiSystem
{
    constructor(editorSystem) {
        this.editorSystem = editorSystem;
    }

    init(id, entities)
    {
        if(this.editorSystem != null)
        {
            Vue.config.productionTip = false;
            EDITOR.vue = new Vue({
                name: 'editor-ui',
                el: '#editor',
                data: {
                    config: Config,
                    version: EDITOR.version,
                    treeData: EDITOR.tree.entities,
                    rightPanelEntityActions: []
                },
                components: {
                    'left-panel': LeftPanel,
                    'right-panel': RightPanel
                },
                methods: {
                    onEditorActionSelected: function (editorTreeItemData) {
                        this.rightPanelEntityActions.push(editorTreeItemData);
                    },
                    onEditorActionDeSelected: function (editorTreeItemData) {
                        let a = this.rightPanelEntityActions;
                        this.rightPanelEntityActions = a.filter(function(item) {
                            if(item.entity_id === editorTreeItemData.entity_id
                                && item.editor_action === editorTreeItemData.editor_action) {
                                return false;
                            }
                            return true;
                        });
                    }
                },
                template: '<div><left-panel ' +
                    'v-bind:config="config" ' +
                    'v-bind:version="version"' +
                    'v-bind:treeData="treeData"' +
                    'v-on:onEditorActionSelected="onEditorActionSelected"' +
                    'v-on:onEditorActionDeSelected="onEditorActionDeSelected"' +
                    '></left-panel>\n' +
                    '\t<right-panel v-bind:rightPanelEntityActions="rightPanelEntityActions"></right-panel></div>'
            });
        }

    }

    loop(){

    }
}

export {UiSystem}