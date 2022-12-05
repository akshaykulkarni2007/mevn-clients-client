import { createApp } from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
	faTrashAlt,
	faPenToSquare,
	faCircleXmark,
} from '@fortawesome/free-regular-svg-icons'

library.add([faTrashAlt, faPenToSquare, faCircleXmark])

import App from './App.vue'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'

createApp(App).component('font-awesome-icon', FontAwesomeIcon).mount('#app')
