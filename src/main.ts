import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import ArcoVue from "@arco-design/web-vue";
import "@arco-design/web-vue/dist/arco.css";
import "bytemd/dist/index.css";

const app = createApp(App);
const pinia = createPinia();

app.use(router);
app.use(ArcoVue);
app.use(pinia);

app.mount("#app");
