import anime from 'animejs'
const getMousePos = (e) => {
  let posx = 0;
  let posy = 0;
  if (!e) e = window.event;
  if (e.pageX || e.pageY) 	{
    posx = e.pageX;
    posy = e.pageY;
  }
  else if (e.clientX || e.clientY) 	{
    posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
    posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
  }
  return { x : posx, y : posy }
};
export default class MouseMove {
  constructor (el) {
    this.DOM = {el}
    this.init()
    this.CONFIG = {
      tilt: {maxTranslationX: 5, maxTranslationY: 10}
    };
  }

  init () {
    this.DOM.activeNav = this.DOM.el.querySelector('.b-auth__nav-item--active > a')
    this.DOM.form = this.DOM.el.querySelector('.b-auth-forms')
    this.DOM.background = this.DOM.el.querySelector('.b-auth-background')
    this.DOM.navIndicator = this.DOM.el.querySelector('.b-auth__nav-indicator')
    this.DOM.navIndicator.style.width = this.DOM.activeNav.offsetWidth + 'px'
    this.DOM.navIndicator.style.transform = `translateX(${ this.DOM.activeNav.offsetLeft}px)`
    this.win = {width: window.innerWidth, height: window.innerHeight};
    this.initEvents()
  }


  initEvents () {
    // this.DOM.el.addEventListener('mousemove', this.mousemoveFn.bind(this));
  }

  mousemoveFn(e) {
    const mousepos = getMousePos(e)
    const transX = 2*this.CONFIG.tilt.maxTranslationX/this.win.width*mousepos.x - this.CONFIG.tilt.maxTranslationX;
    const transY = 2*this.CONFIG.tilt.maxTranslationY/this.win.height*mousepos.y - this.CONFIG.tilt.maxTranslationY;
    this.DOM.form.style.transform = `translate(${transX}px, ${transY}px)`
    this.DOM.background.style.transform = `translate(${transX*0.3}px, ${transY*0.3}px) skew(5deg, 5deg)`
  }
}
