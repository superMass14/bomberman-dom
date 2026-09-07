import { newElement } from "../../src/modules/dom.mjs";

export class Block {
  constructor(props,x,y) {
    this.type = 'BLOCK'
    this.container = props
    this.position = {x:x||0,y:y||0}
    this.element = this.createElement()
    this.positionElement()
  }
  
  createElement(){
    let element= this.element;
    if (!this.element) {
        element = newElement({
            tag: "div",
            attrs: {
              class: "game-block",
            },
            children: [],
          },"game-container","class")
    }

    let {width,height} = this.container?.element?.getBoundingClientRect();
    element.style.width = `${height/14}px`
    element.style.height = `${height/14}px`
    return element
  }
  positionElement(){
    let {top,left,width,height} = this.container?.element?.getBoundingClientRect();
    let cageSize = height/this.container.cellsNumber
    let {x,y} = this.position
    this.element.style.left = `${left+(x*cageSize)}px`
    this.element.style.top = `${top+(y*cageSize)}px`
  }
}