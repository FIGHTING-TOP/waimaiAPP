import Vue from 'vue'
import router from './router/'
import store from './store/'
import './config/rem'
import FastClick from 'fastclick'

if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function() {
        FastClick.attach(document.body);
    }, false);
}


new Vue({
  router,
	store,
}).$mount('#app')

