import Vue from 'vue/dist/vue.esm'
import LeftPanel from './../Component/LeftPanel.vue'
import RightPanel from './../Component/RightPanel.vue'
import {EDITOR} from "../Component/EDITOR";

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
                el: '#editor',
                data: {
                },
                components: {
                    'left-panel': LeftPanel,
                    'right-panel': RightPanel
                }
            });
        }

    }

    loop(){

    }
}

export {UiSystem}