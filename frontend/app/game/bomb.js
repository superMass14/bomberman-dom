import { newElement } from "../../src/modules/dom.mjs";

export class Bomb {
  constructor(props,x,y,color) {
    this.type = 'BOMB'
    this.container = props
    this.color = color
    this.position = {x:x||0,y:y||0}
    this.wait = 2500 // en millisecondes
    this.explositionDuration = this.getExplositionDuation()
    this.explositionRange = this.getPlayerExplositionRange()
    this.element = this.createElement()
    if (this.element) {
      this.positionElement()
      this.startCountdown()
    }
  }
  getPlayerExplositionRange(){
    let player = this.container.players.find(p => p.color === this.color)
    return player?player.bonusFlames.length+1: 1 // 1 par defaut
  }
  getExplositionDuation(){
    const element = document.documentElement;  // Generally, the root element
    const styles = getComputedStyle(element);
    // Retrieve the value of the CSS variable
    const varStyle = styles.getPropertyValue('--bomb-explosition-transition');
    return parseInt(varStyle) || 1000 // 1s par defaut
  }
  
  createElement(){
    if (this.canCreateBomb()) {
      let element= this.element;
      if (!this.element) {
          element = newElement({
              tag: "div",
              attrs: {
                class: "bomb-exploding",
              },
              children: [],
            },"game-container","class")
      }
      let {width,height} = this.container?.element?.getBoundingClientRect();
      element.style.width = `${height/this.container.cellsNumber}px`
      element.style.height = `${height/this.container.cellsNumber}px`
      return element
    }
  }
  canCreateBomb(){
    let player = this.container.players.find(p => p.color === this.color)
    let createdBombs = this.container.bombs.filter(b=> b.color === this.color)
    if (player) {
      return player.bonusBombs.length >= createdBombs.length
    }
    return false
  }
  positionElement(){
    let {top,left,width,height} = this.container?.element?.getBoundingClientRect();
    let cageSize = height/this.container.cellsNumber
    let {x,y} = this.position
    this.element.style.left = `${left+(x*cageSize)}px`
    this.element.style.top = `${top+(y*cageSize)}px`
  }
  startCountdown(){
    setTimeout(() => {
      this.explose()
    }, this.wait);
  }
  explose() {
    //Remove the bomb from the game
    this.remove()
    //Supprimer les wall voisins
    // console.log('RIGHT');
    this.removeRange(this.position,0,function (x,y) {
      return {x:x+1,y,orientation:'x',side:'right'} //RIGHT
    })
    // console.log('LEFT');
    this.removeRange(this.position,0,function (x,y) {
      return {x:x-1,y,orientation:'x',side:'left'} //LEFT
    })
    // console.log('BOTTOM');
    this.removeRange(this.position,0,function (x,y) {
      return {x,y:y+1,orientation:'y',side:'down'} //BOTTOM
    })
    this.removeRange(this.position,0,function (x,y) {
      return {x,y:y-1,orientation:'y',side:'up'} //TOP
    })
  }
  removeRange({x,y,orientation,side},range,callback){
    let stop = false
    if (range <= this.explositionRange) {
      let obstacles = this.container.obstacles.filter(o=>o.position.x===x && o.position.y === y)
      obstacles.forEach(obstacle => {
        // console.log({x,y},obstacle.type);
        if (obstacle.type === 'WALL') {
          obstacle.remove()
          stop = true
        }
        if (obstacle.type === 'BOMB') {
          obstacle.explose()
          stop = true
        }
        if (obstacle.type === 'PLAYER') {
          obstacle.reduceLife()
          stop = true
        }
        if (obstacle.type === 'BLOCK') {
          stop = true
        }
      });
      // Fire explosition effect
      let cell = this.container.cells.find(c=>c.position.x===x && c.position.y === y)
      if (cell) cell.explose(orientation,side,range === this.explositionRange)

      if (!stop) {
        return this.removeRange(callback(x,y),range+1,callback)
      }
    }
  }
  remove(){
    this.container.bombs = this.container.bombs.filter(bomb => bomb!== this)
    this.container.obstacles = this.container.obstacles.filter(obs => obs!== this)
    // pour l'annimation
    this.element.classList.replace('bomb-exploding','bomb-explode')
    setTimeout(() => {
      this.element.remove()
    }, this.explositionDuration);
  }
}