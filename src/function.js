import { stringOne } from './data';

const alertingFunction = function alerting() {
  const message = `${stringOne} from function.js`;
  alert(message);
};

export default alertingFunction;
