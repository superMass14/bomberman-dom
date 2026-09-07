import { newElement } from "../../src/modules/dom.mjs";

export class Cell {
  constructor(props,x,y) {
    this.type = 'CELL'
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
              class: "game-cell",
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
  explose(orientation,side,isEnd) {
    let className = ''
    if (isEnd) className = `fire-end-explode-${orientation}-${side}`
    else className = `fire-explode-${orientation}`
    this.element.classList.add(className)
    setTimeout(() => {
      this.element.classList.remove(className)
    }, 1000);
  }
}