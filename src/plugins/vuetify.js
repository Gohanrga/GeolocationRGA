import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
    cons: {
        iconfont: 'mdi'
    },
    theme: {
        themes: {
            light: {
                primary: '#19456b',
                secondary: '#16c79a',
                tertiary: '#11698e',
                rose: '#e7d9ea',
                grayspace: '#ECEFF1'
            }
        }
    }
});
