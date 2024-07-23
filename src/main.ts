import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import ArcoVue from "@arco-design/web-vue";
import "@arco-design/web-vue/dist/arco.css";
import "bytemd/dist/index.css";

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.use(ArcoVue);
app.use(router);

app.mount("#app");
