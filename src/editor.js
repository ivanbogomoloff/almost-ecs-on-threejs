import Vue from 'vue/dist/vue.esm'
import LeftPanel from './Editor/LeftPanel.vue'
import {Config} from "./Game/Config";

Vue.config.productionTip = false;
Config.EDITOR_VERSION = '1.0';
//TODO change/update and control FPS from editor!
/* eslint-disable no-new */
const p = new Vue({
    el: '#left-panel',
    template: '<LeftPanel/>',
    components: {
        LeftPanel
    }
});