import Vue from 'vue/dist/vue.esm'
import LeftPanel from './../Component/LeftPanel.vue'
import RightPanel from './../Component/RightPanel.vue'
import {EDITOR} from "../Component/EDITOR";

class VueSystem
{
    init(id, entities)
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

    loop(){

    }
}

export {VueSystem}