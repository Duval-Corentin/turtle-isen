import Vue from 'vue'
import App from './App'
import SuiVue from 'semantic-ui-vue';
import 'semantic-ui-css/semantic.min.css';

Vue.use(SuiVue);


new Vue({
  el: '#app',
  components: {
    App
  },
  methods: {
  },
  template: '<App/>'
});
