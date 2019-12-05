import React, { Component } from 'react'
import { Input, Carousel, Icon } from 'antd'
import { Link } from 'react-router-dom'

import Slider from '../Slider'

const { Search } = Input

import './index.scss'

interface IProps {

}

interface IStates {
  cityList: Array<number>,
}

export default class Content extends Component<IProps, IStates>{
  constructor(props: IProps) {
    super(props)
    this.state = {
      cityList: [],
    }
  }

  async componentDidMount(): Promise<void> {
    const cityList = await this.getCityList()

    this.setState({
      cityList
    })
  }

  getCityList(): Promise<Array<number>> {
    return new Promise(async (resolve, reject) => {
      const length: number = 21
      const cityList: Array<number> = Array.from({ length }, (_: unknown, index: number): number => index + 1)
      resolve(cityList)
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
            {cityList.length !== 0 && <Slider cityList={cityList} />}
          </div>
        </div>
      </div>
    )
  }
}