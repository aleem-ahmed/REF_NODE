// [IMPORT] //
import Vue from 'vue'
import 'bootstrap/dist/css/bootstrap.css'


// [IMPORT] Personal //
import App from './App.vue'


Vue.config.productionTip = false


// [EXPORT] Event Bus //
export const EventBus = new Vue()


new Vue({
  render: h => h(App),
}).$mount('#app')
