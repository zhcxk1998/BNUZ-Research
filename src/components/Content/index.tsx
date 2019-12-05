import React, { Component } from 'react'
import { Input, Carousel, Icon } from 'antd'
import { Link } from 'react-router-dom'

const { Search } = Input

import './index.scss'

interface IProps {

}

interface IStates {
  cityList: Array<number>,
  cityContainerWidth: number,
  cityWrapWidth: number,
  cityWrapTranslateX: number
}

export default class Content extends Component<IProps, IStates>{
  constructor(props: IProps) {
    super(props)
    this.state = {
      cityList: [],
      cityContainerWidth: 0,
      cityWrapWidth: 0,
      cityWrapTranslateX: 0
    }
  }

  componentDidMount(): void {
    const length: number = 13
    const cityList: Array<number> = Array.from({ length }, (_: unknown, index: number): number => index + 1)
    const cityWrapWidth: number = length > 12 ? Math.ceil(length / 2) * 220 : 1320
    const cityWrapDom: HTMLElement | null = document.getElementById('city__wrap') as HTMLElement
    const cityContainerDom: HTMLElement | null = document.getElementById('city__container') as HTMLElement
    const cityContainerWidth: number = cityContainerDom.offsetWidth
    cityWrapDom && (cityWrapDom.style.width = `${cityWrapWidth}px`)

    this.setState({
      cityList,
      cityContainerWidth,
      cityWrapWidth
    })
  }

  handleArrowClick(direction: string): void {
    const { cityContainerWidth, cityWrapWidth, cityWrapTranslateX } = this.state
    const cityWrapDom: HTMLElement | null = document.getElementById('city__wrap') as HTMLElement
    /* 步长 */
    const translateStep: number = 440
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
    const { cityList } = this.state
    return (
      <div className="content__container">
        <div className="content__wrap">
          <div className="content__banner">Banner</div>
          <div className="content__search">
            <Search
              placeholder="请输入需要搜索的内容..."
              enterButton="立即搜索"
              size="large"
              onSearch={value => console.log(value)}
            />
            <div className="recommend-tag__container">
              <Link className="recommend-tag__item" to="#">历史</Link>
              <Link className="recommend-tag__item" to="#">地理</Link>
              <Link className="recommend-tag__item" to="#">红色</Link>
              <Link className="recommend-tag__item" to="#">自然</Link>
              <Link className="recommend-tag__item" to="#">科学</Link>
              <Link className="recommend-tag__item" to="#">文化</Link>
            </div>
          </div>
          <div className="content__main">
            <div className="carousel__container">
              <div className="carousel__wrap">
                <Carousel autoplay>
                  <div className="carousel__item">
                    1
                </div>
                  <div className="carousel__item">
                    2
                </div>
                  <div className="carousel__item">
                    3
                </div>
                  <div className="carousel__item">
                    4
                </div>
                </Carousel>
              </div>
              <div className="category__container">

              </div>
            </div>

            <div className="city">
              <div className="city__title">热门城市</div>
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
          </div>
        </div>
      </div>
    )
  }
}