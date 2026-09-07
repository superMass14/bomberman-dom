import { newElement } from "../../src/modules/dom.mjs";

export class Wall {
  constructor(props,x,y) {
    this.type = 'WALL'
    this.container = props
    this.position = {x:x||0,y:y||0}
    this.element = this.createElement()
    this.explositionDuration = this.getExplositionDuation()
    this.positionElement()
  }
  
  getExplositionDuation(){
    const element = document.documentElement;  // Generally, the root element
    const styles = getComputedStyle(element);
    // Retrieve the value of the CSS variable
    const varStyle = styles.getPropertyValue('--wall-explosition-transition');
    return parseInt(varStyle) || 1000 // 1s par defaut
  }
  createElement(){
    let element= this.element;
    if (!this.element) {
        element = newElement({
            tag: "div",
            attrs: {
              class: "game-wall",
            },
            children: [],
          },"game-container","class")
    }

    let {width,height} = this.container?.element?.getBoundingClientRect();
    element.style.width = `${height/this.container.cellsNumber}px`
    element.style.height = `${height/this.container.cellsNumber}px`
    return element
  }
  positionElement(){
    let {top,left,width,height} = this.container?.element?.getBoundingClientRect();
    let cageSize = height/this.container.cellsNumber
    let {x,y} = this.position
    this.element.style.left = `${left+(x*cageSize)}px`
    this.element.style.top = `${top+(y*cageSize)}px`
  }
  remove(){
    this.container.obstacles = this.container.obstacles.filter(obstacle => obstacle!== this)
    this.element.classList.replace('game-wall','brick-explosion')
    setTimeout(() => {
      this.element.remove()
    }, this.explositionDuration);
  }
}