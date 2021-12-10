import { createApp } from 'vue';
import PrimeVue from 'primevue/config';
import VueFeather from 'vue-feather';
import InputText from 'primevue/inputtext';
import Column from 'primevue/column';
import Accordion from 'primevue/accordion';
import AccordionTab from 'primevue/accordiontab';
import Card from 'primevue/card';
import Button from 'primevue/button';
import Avatar from 'primevue/avatar';
import BlockUI from 'primevue/blockui';
import PanelMenu from 'primevue/panelmenu';
import TriStateCheckbox from 'primevue/tristatecheckbox';
import Menubar from 'primevue/menubar';
import MultiSelect from 'primevue/multiselect';
import Rating from 'primevue/rating';
import Menu from 'primevue/menu';
import InputSwitch from 'primevue/inputswitch';
import DataTable from 'primevue/datatable';
import InputMask from 'primevue/inputmask';
import Dropdown from 'primevue/dropdown';
import Divider from 'primevue/divider';
import RadioButton from 'primevue/radiobutton';
import SelectButton from 'primevue/selectbutton';
import Chips from 'primevue/chips';
import FileUpload from 'primevue/fileupload';
import Textarea from 'primevue/textarea';
import Inplace from 'primevue/inplace';
import Chip from 'primevue/chip';
import Tag from 'primevue/tag';
import InputNumber from 'primevue/inputnumber';
import Toast from 'primevue/toast';
import ConfirmDialog from 'primevue/confirmdialog';
import Dialog from 'primevue/dialog';
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
import Panel from 'primevue/panel';
import Skeleton from 'primevue/skeleton';

import ToastService from 'primevue/toastservice';
import ConfirmationService from 'primevue/confirmationservice';

import Vue3PersianDatetimePicker from 'vue3-persian-datetime-picker';
import BaseInputText from './components/common/BaseInputText.vue';
import BaseTextarea from './components/common/BaseTextarea.vue';
import BaseTagsInput from './components/common/BaseTagsInput.vue';
import BaseImageInput from './components/common/BaseImageInput.vue';
import BaseMultiSelectInput from './components/common/BaseMultiSelectInput.vue';
import BaseImageCropper from './components/common/BaseImageCropper.vue';
import AppOfflineNotice from './components/core/AppOfflineNotice.vue';
import BaseImagePreview from './components/common/BaseImagePreview.vue';
import NoDataNotice from './components/common/NoDataNotice.vue';

import App from './App.vue';
// import './registerServiceWorker';
import router from './router';
import store from './store';

import './assets/styles.scss';

import 'primevue/resources/themes/vela-orange/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';

const app = createApp(App)
  .use(store)
  .use(router)
  .use(PrimeVue)
  .use(ConfirmationService)
  .use(ToastService);

app.component('InputText', InputText);
app.component('Card', Card);
app.component('Column', Column);
app.component('Rating', Rating);
app.component('Accordion', Accordion);
app.component('AccordionTab', AccordionTab);
app.component('Button', Button);
app.component('Menubar', Menubar);
app.component('Avatar', Avatar);
app.component('Dropdown', Dropdown);
app.component('InputMask', InputMask);
app.component('InputSwitch', InputSwitch);
app.component('BlockUI', BlockUI);
app.component('TriStateCheckbox', TriStateCheckbox);
app.component('PanelMenu', PanelMenu);
app.component('Menu', Menu);
app.component('MultiSelect', MultiSelect);
app.component('DataTable', DataTable);
app.component('RadioButton', RadioButton);
app.component('SelectButton', SelectButton);
app.component('Chips', Chips);
app.component('FileUpload', FileUpload);
app.component('Textarea', Textarea);
app.component('Divider', Divider);
app.component('Inplace', Inplace);
app.component('Chip', Chip);
app.component('Tag', Tag);
app.component('InputNumber', InputNumber);
app.component('Toast', Toast);
app.component('ConfirmDialog', ConfirmDialog);
app.component('Dialog', Dialog);
app.component('TabView', TabView);
app.component('TabPanel', TabPanel);
app.component('Panel', Panel);
app.component('Skeleton', Skeleton);

app.component('datetime-picker', Vue3PersianDatetimePicker);
app.component('BaseInputText', BaseInputText);
app.component('BaseTextarea', BaseTextarea);
app.component('BaseTagsInput', BaseTagsInput);
app.component('BaseImageInput', BaseImageInput);
app.component('BaseMultiSelectInput', BaseMultiSelectInput);
app.component('BaseImageCropper', BaseImageCropper);
app.component('AppOfflineNotice', AppOfflineNotice);
app.component('BaseImagePreview', BaseImagePreview);
app.component('NoDataNotice', NoDataNotice);

app.component(VueFeather.name || '', VueFeather);

app.mount('#app');

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('http://localhost:8080/sw.js', { scope: './' })
      .then((registeration) => console.log('registered', registeration))
      .catch((err) => console.log(err));
  });
  if (navigator.onLine) store.commit('online');
  window.addEventListener('online', () => store.commit('online'));
  window.addEventListener('offline', () => store.commit('offline'));
}
