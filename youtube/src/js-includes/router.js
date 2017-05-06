import controller from './controller.js';
export default {
  handle: (route, ...args) => {
    const routeName = route + 'Route';
    controller[routeName](...args);
  }
}
