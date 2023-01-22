import { createApp } from 'vue';
import App from './App.vue';

import './assets/main.css';

// FONTAWESOME
/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core';

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

/* import specific icons */
import {
    faChevronLeft,
    faChevronRight,
    faMagnifyingGlassPlus,
    faMagnifyingGlassMinus,
    faFileArrowUp,
} from '@fortawesome/free-solid-svg-icons';

/* add icons to the library */
library.add(
    faChevronLeft,
    faChevronRight,
    faMagnifyingGlassPlus,
    faMagnifyingGlassMinus,
    faFileArrowUp
);

const app = createApp(App);

/* add font awesome icon component */
app.component('font-awesome-icon', FontAwesomeIcon);

app.mount('#app');
