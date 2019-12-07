import React, { Component, ComponentType } from 'react'
import { Icon } from 'antd'

import './index.scss'

interface IProps {
  cityList: Array<number>,
  row: number,
  step: number
}

interface IStates {
  cityContainerWidth: number,
  cityWrapWidth: number,
  cityWrapTranslateX: number
}

class Slider extends Component<IProps, IStates> {
  constructor(props: IProps) {
    super(props)
    this.state = {
      cityContainerWidth: 0,
      cityWrapWidth: 0,
      cityWrapTranslateX: 0
    }
  }

  componentDidMount(): void {
    const { cityList, row } = this.props
    const cityWrapWidth: number = cityList.length > 12 ? Math.ceil(cityList.length / row) * 220 : 1320
    const cityWrapDom: HTMLElement | null = document.getElementById('city__wrap') as HTMLElement
    const cityContainerDom: HTMLElement | null = document.getElementById('city__container') as HTMLElement
    const cityContainerWidth: number = cityContainerDom.offsetWidth
    cityWrapDom && (cityWrapDom.style.width = `${cityWrapWidth}px`)

    this.setState({
      cityContainerWidth,
      cityWrapWidth
    })
  }

  handleArrowClick(direction: string): void {
    const { step } = this.props
    const { cityContainerWidth, cityWrapWidth, cityWrapTranslateX } = this.state
    const cityWrapDom: HTMLElement | null = document.getElementById('city__wrap') as HTMLElement
    /* 步长 */
    const translateStep: number = 220 * step
    const translateDistance: number = translateStep * (direction === 'left' ? 1 : -1)

    let newTranslateX: number = cityWrapTranslateX
    /* 相对移动距离 */
    const relativeTranslateX: number = cityContainerWidth - cityWrapTranslateX
    const isLeftEnd: boolean = relativeTranslateX <= cityContainerWidth
    const isLeftOverflow: boolean = relativeTranslateX - translateDistance <= cityContainerWidth
    const isRightEnd: boolean = relativeTranslateX + 10 >= cityWrapWidth // 这个10是代表右边距的10个像素，加上10隐藏
    const isRightOverflow: boolean = relativeTranslateX - translateDistance >= cityWrapWidth

    /* 点击左箭头 */
    if (translateDistance > 0) {
      /* 是否到达左边尽头 */
      if (isLeftEnd) return

      if (isLeftOverflow) {
        /* 超出范围，则滑动刚好到达左边末尾的距离 */
        newTranslateX = 0
      } else {
        /* 未超出范围，滑动距离直接与步长相加 */
        newTranslateX += translateDistance
      }

    } else if (translateDistance < 0) {
      /* 是否到达右边尽头 */
      if (isRightEnd) return

      if (isRightOverflow) {
        /* 超出范围，则滑动刚好到达右边末尾的距离 */
        newTranslateX += relativeTranslateX + 10 - cityWrapWidth
      } else {
        /* 未超出范围，滑动距离直接与步长相加 */
        newTranslateX += translateDistance
      }
    }

    const transformString: string = `translateX(${newTranslateX}px)`
    cityWrapDom && (cityWrapDom.style.transform = transformString)
    this.setState({
      cityWrapTranslateX: newTranslateX
    })
  }

  render() {
    const { cityList } = this.props
    return (
      <div className="city" >
        <div className="city__title">我是一个轮播图</div>
        <div className="city__container" id="city__container">
          <div className="city__arrow" onClick={() => this.handleArrowClick('left')}>
            <Icon className="icon" type="left" />
          </div>
          <div className="city__arrow city__arrow--right" onClick={() => this.handleArrowClick('right')}>
            <Icon className="icon" type="right" />
          </div>
          <div className="city__wrap" id="city__wrap">
            {cityList.map(item => (
              <div className="city__item" key={item}>{item}</div>
            ))}
          </div>
        </div>
      </div>
    )
  }
}

export default Slider as ComponentType<IProps>