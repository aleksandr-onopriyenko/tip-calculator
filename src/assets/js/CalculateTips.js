class Calculate {
  constructor(container) {
    this.container = document.querySelector(container);
    this.bill = 0;
    this.tip = 5;
    this.count = 1;
  }

  _getElements() {
    this.tipsEl = this.container.querySelector('.app-calculator-tips')
    this.billEl = this.container.querySelector('.app-calculator__input input')
    this.personEl = this.container.querySelector('.app-calculator__persons input')
    this.tipInputEl = this.tipsEl.querySelector('#tip-custom')
    this.selectedTag = this.tipsEl.querySelector('.app-calculator-tips .active');
    this.amount = this.container.querySelector('.app-calculator__total div:first-child .app-calculator__total-amount')
    this.totalAmount = this.container.querySelector('.app-calculator__total div:last-of-type .app-calculator__total-amount')
    this.btnReset = this.container.querySelector('.app-calculator__total button')
  }

  getTipAmount() {
    const amount = (this.bill / this.count) * this.tip / 100;
    return Number(amount.toFixed(2))
  }

  getTotalAmount() {
    const total = (this.bill / this.count) + this.getTipAmount()
    return Number(total.toFixed(2))
  }

  render() {
    this.amount.innerText = '$' + this.getTipAmount()
    this.totalAmount.innerText = '$' + this.getTotalAmount();
  }

  _listeners() {
    [this.billEl, this.tipInputEl, this.personEl].forEach((el) => {
      el.addEventListener('input', (e) => {
        if (el === this.billEl ) this.bill = +e.target.value
        if (el === this.tipInputEl ) this.tip = +e.target.value
        if (el === this.personEl ) this.count = +e.target.value
        this.render()
      })
    })

    this.btnReset.onclick = () => {
      this.amount.innerText = '$0'
      this.totalAmount.innerText = '$0'
    }

    this.tipsEl.addEventListener('click', (e) => {
      const target = e.target;
      if (target.classList.contains('app-calculator-tips__item')) {
        this.tip = +target.innerText.replace(/%$/, '')
        if (this.selectedTag) {
          this.selectedTag.classList.remove('active')
        }
        this.selectedTag = target
        this.selectedTag.classList.add('active')
        this.render()
      }
    })

  }

  init() {
    this._getElements()
    this._listeners()
    this.render()
  }
}

export default Calculate;
