/**
 * Represents a router for managing application routes.
 */

/**
 * Creates a new Router instance.
 * @param {object} [props={}] - The properties object containing route mappings.
 */
export class Router {
  constructor(props = {}) {
    this.routes = props;
  }
  /**
   * @method
   * it renders  the component associated with the current route, or a default one if no match is found
   */
  push(endpoint) {
    var url = window.location.href.split("#")[0],
      newUrl = `${url}#${endpoint}`;
    history.pushState({}, "", newUrl);
    this.loadCurrentView();
  }
  
  getCurrentView() {
    return window.location.href.split("#")[1];
  }

  loadCurrentView() {
    const currentRoute = this.getCurrentView();
    const viewName = this.routes[currentRoute];
    if (viewName) {
      this.routes[currentRoute]();
      console.log(` view: ${currentRoute} loaded`);
    } else {
      console.error("endpoint not found:", currentRoute);
    }
  }
}
