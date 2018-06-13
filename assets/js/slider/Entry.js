import anime from 'animejs'
import charming from 'charming'

// some animation settings.
const settings = {
  cover: {duration: 900, delay: 0, easing: [0.8, 0, 0.2, 1]},
  title: {duration: 700, delay: 200, easing: [0.8, 0, 0.2, 1]},
  description: {duration: 900, delay: 400, easing: 'easeOutExpo'},
  media: {duration: 1000, delay: 50, easing: [0.8, 0, 0.2, 1]}
};

export default class Entry {
  constructor(el) {
    this.DOM = {el};
    this.init()
  }

  init() {
    // headings
    this.DOM.title = this.DOM.el.querySelector('.b-carousel__item-title')
    // if(this.DOM.title)  {
    //   charming(this.DOM.title)
    //   this.DOM.titleLetters = this.DOM.title.querySelectorAll('span')
    // }
    this.DOM.description = this.DOM.el.querySelector('.b-carousel__item-description')

    this.DOM.media = this.DOM.el.querySelector('.b-carousel__item-cover-wrapper')

    // this.DOM.newsTitle = this.DOM.el.querySelector('.section__news-description')
    // imgs
    this.DOM.cover = this.DOM.el.querySelector('.b-carousel__item-background img')
    // this.initCells()
    // this.DOM.coverCells = Array.from(this.DOM.cover.querySelectorAll('span'))
    // this.createSlidingCells()
  }

  initCells() {
    const source = this.DOM.cover.dataset.source
    for (let i = 0; i < 10; i++) {
      const template = `<span class="b-carousel__item-background-cell"
          style="
          background-image: url(${source});
          background-position:top center;
          background-repeat:no-repeat;
          background-size: cover"></span>`
      const span = new DOMParser().parseFromString(template, 'text/html').body.childNodes[0]
      this.DOM.cover.appendChild(span)
    }
  }

  createSlidingCells() {
    const slideHeight = this.DOM.cover.getBoundingClientRect().height
    this.DOM.coverCells.forEach((cell, i) => {
      cell.style.height = `${slideHeight / 10}px`
      const y = -(slideHeight / 10) * i;
      cell.style.backgroundPosition = `50% ${y}px`
    })

  }

  show(direction) {
    this.isHidden = false
    return this.toggle(direction)
  }

  hide(direction) {
    this.isHidden = true
    return this.toggle(direction)
  }

  toggle(direction) {
    this.direction = direction
    return Promise.all([
      this.toggleTitle(),
      this.toggleDescription(),
      this.toggleCover(),
      this.toggleMedia()
    ])
  }

  toggleTitle() {
    anime.remove(this.DOM.title)
    return anime({
      targets: this.DOM.title,
      duration: settings.description.duration,
      delay: !this.isHidden ? settings.description.duration * 0.5 + settings.description.delay : settings.description.delay,
      easing: settings.description.easing,
      translateY: this.isHidden ? [0, this.direction === 'next' ? '-10%' : '10%'] : [this.direction === 'next' ? '20%' : '-20%', 0],
      opacity: this.isHidden ? 0 : 1
    }).finished
    // anime.remove(this.DOM.titleLetters)
    // return anime({
    //   targets: this.DOM.titleLetters,
    //   duration: settings.title.duration,
    //   delay: (target, index) => index * 30 + settings.title.delay,
    //   easing: settings.title.easing,
    //   translateY: this.isHidden ? [0, this.direction === 'next' ? '-100%' : '100%'] : [this.direction === 'next' ? '100%' : '-100%', 0],
    //   opacity: {
    //     value: this.isHidden ? 0 : 1,
    //     duration: 1,
    //     delay: (target, index) => this.isHidden ? settings.title.duration + settings.title.delay : settings.title.delay
    //   }
    // }).finished;
  }

  toggleDescription() {
    anime.remove(this.DOM.description)
    return anime({
      targets: this.DOM.description,
      duration: settings.description.duration,
      delay: !this.isHidden ? settings.description.duration * 0.5 + settings.description.delay : settings.description.delay,
      easing: settings.description.easing,
      translateY: this.isHidden ? [0, this.direction === 'next' ? '-10%' : '10%'] : [this.direction === 'next' ? '20%' : '-20%', 0],
      opacity: this.isHidden ? 0 : 1
    }).finished
  }

  toggleNews() {
    anime.remove(this.DOM.newsTitle)
    return anime({
      targets: this.DOM.newsTitle,
      duration: settings.description.duration,
      delay: !this.isHidden ? settings.description.duration * 0.5 + settings.description.delay : settings.description.delay,
      easing: settings.description.easing,
      translateY: this.isHidden ? [0, this.direction === 'next' ? '-10%' : '10%'] : [this.direction === 'next' ? '20%' : '-20%', 0],
      opacity: this.isHidden ? 0 : 1
    }).finished
  }

  toggleMedia() {
    this.DOM.media.style.transformOrigin =
      !this.isHidden ? `${this.direction === 'next' ? 0 : 100}% ${this.direction === 'next' ? 0 : 100}%` : `50% 50%`;

    anime.remove(this.DOM.media)
    return anime({
      targets: this.DOM.media,
      duration: settings.media.duration,
      delay: settings.media.delay,
      easing: settings.media.easing,
      translateX: this.isHidden ? ['0%', this.direction === 'next' ? '-100%' : '100%'] : [this.direction === 'next' ? '100%' : '-100%', '0%'],
      // scale: !this.isHidden ? [1.8, 1] : 1,
      opacity: {
        value: this.isHidden ? 0 : 1,
        duration: 1,
        delay: this.isHidden ? settings.media.duration + settings.media.delay : settings.media.delay
      }
    }).finished
  }

  toggleCover() {
    this.DOM.cover.style.transformOrigin =
      !this.isHidden ? ` ${this.direction === 'next' ? 0 : 100}% ${this.direction === 'next' ? 0 : 100}%` : `50% 50%`;

    anime.remove(this.DOM.cover)
    return anime({
      targets: this.DOM.cover,
      duration: settings.cover.duration,
      // delay: (target, index) => index * 30 + settings.cover.delay,
      easing: settings.cover.easing,
      scale: !this.isHidden ? [0.9, 1.1] : 1.1,
      // opacity: {
      //   value: this.isHidden ? 0 : 0.3,
      //   duration: 1,
      //   delay: this.isHidden ? settings.cover.duration + settings.cover.delay : settings.cover.delay
      // }
    }).finished
  }
}