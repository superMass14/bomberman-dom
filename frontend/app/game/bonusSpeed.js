import { newElement } from "../../src/modules/dom.mjs";

export class BonusSpeed {
  constructor(props,x,y,color) {
    this.type = 'BONUS_SPEED'
    this.container = props
    this.color = color
    this.position = {x:x||0,y:y||0}
    this.wait = 2000 // en millisecondes
    this.element = this.createElement()
    this.positionElement()
  }
  
  createElement(){
    let element= this.element;
    if (!this.element) {
        element = newElement({
            tag: "div",
            attrs: {
              class: "game-bonus-speed",
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
    this.container.obstacles = this.container.obstacles.filter(obs => obs!== this)
    this.element.remove()
  }
}