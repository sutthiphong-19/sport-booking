import { createApp } from "vue";
import { createPinia } from "pinia";

import PrimeVue from "primevue/config";
import Aura from "@primevue/themes/aura";

import Button from "primevue/button";
import Card from "primevue/card";
import InputText from "primevue/inputtext";
import Password from "primevue/password";
import Select from "primevue/select";
import DatePicker from "primevue/datepicker";
import Tag from "primevue/tag";
import ToastService from "primevue/toastservice";
import Toast from "primevue/toast";

import "primeicons/primeicons.css";
import "./style.css";

import App from "./App.vue";
import router from "./router";
import { i18n } from "./i18n";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(i18n);

app.use(PrimeVue, {
  theme: {
    preset: Aura,
  },
});

app.use(ToastService);

app.component("Button", Button);
app.component("Card", Card);
app.component("InputText", InputText);
app.component("Password", Password);
app.component("Select", Select);
app.component("DatePicker", DatePicker);
app.component("Tag", Tag);
app.component("Toast", Toast);

app.mount("#app");