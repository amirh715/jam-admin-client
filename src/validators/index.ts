import { helpers } from '@vuelidate/validators';
import { isValidPhoneNumber } from 'libphonenumber-js';

// library
const title = (value: string): boolean => value.length > 0 && value.length < 21;
const description = (value: string): boolean =>
  !helpers.req(value) || (value.length > 20 && value.length < 201);
const tag = (value: string): boolean =>
  !helpers.req(value) || (value.length > 0 && value.length < 40);
const tagList = (value: Array<typeof tag>): boolean =>
  !helpers.req(value) || (value.length > 0 && value.length < 6);
const flag = (value: string): boolean =>
  !helpers.req(value) || (value.length > 0 && value.length < 41);
const instagramId = (value: string) : boolean =>
  !helpers.req(value) || (value.length > 5 && value.length < 12);
const releaseDate = (value: Date): boolean =>
  !helpers.req(value);
const recordLabel = (value: string): boolean =>
  !helpers.req(value) || (value.length > 1 && value.length < 50);
const producer = (value: string): boolean =>
  !helpers.req(value) || (value.length > 1 && value.length < 50);

const library = {
  title,
  description,
  tag,
  tagList,
  flag,
  instagramId,
  releaseDate,
  recordLabel,
  producer,
};

// user
const mobile = (value: string): boolean =>
  isValidPhoneNumber(value);
const userName = (value: string): boolean =>
  value.length > 0 && value.length < 80;
const password = (value: string): boolean =>
  value.length >= 8 && value.length < 150;
const email = (value: string) =>
  !helpers.req(value) || RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
    .test(value);

const user = {
  mobile,
  userName,
  password,
  email,
};

// report
const reportMessage = (value: string): boolean =>
  value.length > 10 && value.length < 1000;
const reportProcessorNote = (value: string): boolean =>
  value.length > 10 && value.length < 1000;

const report = {
  message: reportMessage,
  processorNote: reportProcessorNote,
};

// notification
const notificationTitle = (value: string): boolean =>
  value.length > 0 && value.length < 50;
const notificationMessage = (value: string) =>
  value.length > 0 && value.length < 500;
const notificationRoute = (value: string): boolean =>
  value.length > 0;
const notificationRecipients = (value: string): boolean =>
  value.length >= 0 && value.length < 5000;
const notificationScheduledOn = (value: Date): boolean =>
  value > new Date() && value < new Date(new Date().setMinutes(new Date().getHours() + 168));

const notification = {
  title: notificationTitle,
  message: notificationMessage,
  route: notificationRoute,
  recipients: notificationRecipients,
  scheduledOn: notificationScheduledOn,
};

export {
  library,
  user,
  report,
  notification,
};
