import Vue from 'vue'
import App from './App.vue'
import './styles/index.less'
import './rem'
import './assets/iconfont.css'
// Vue.use(ElementUI)
const app = new Vue({
    render: (h) => h(App)
})
app.$mount('#app')

window.addEventListener('message', function messageOn(event) {
    app.$emit('message', event)
})