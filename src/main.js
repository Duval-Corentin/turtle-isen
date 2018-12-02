import Vue from 'vue'
import App from './App'
import SuiVue from 'semantic-ui-vue';
import VueResource from 'vue-resource';
import SVGgenerator from './js/SVGplugin'

import 'semantic-ui-css/semantic.min.css';

Vue.use(SVGgenerator);
Vue.use(SuiVue);
Vue.use(VueResource);

new Vue({
  el: '#app',
  components: {
    App
  },
  methods: {
  },
  template: '<App/>'
});
