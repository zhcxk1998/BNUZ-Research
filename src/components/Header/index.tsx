import React, { Component } from 'react'
import { Icon } from 'antd'
import { Link } from 'react-router-dom'

import './index.scss'

interface IProps {

}

interface IStates {
  currentPageIndex: number
}

export default class Header extends Component<IProps, IStates>{
  constructor(props: IProps) {
    super(props)
    this.state = {
      currentPageIndex: 1
    }
  }

  handleLinkClick = (currentPageIndex: number): void => {
    this.setState({
      currentPageIndex
    })
  }

  render() {
    const linkList: Array<{ icon?: string, name: string, link: string }> = [{
      icon: 'compass', name: '城市', link: '#'
    }, {
      name: '首页', link: '#'
    }, {
      name: '课程', link: '#'
    }, {
      name: '圈子', link: '#'
    }, {
      name: 'APP', link: '#'
    }, {
      name: '资讯', link: '#'
    }, {
      name: '关于我们', link: '#'
    }]
    return (
      <div className="header__container">
        <div className="header__wrap">
          <img className="logo" src={require('../../assets/img/logo.png')} />
          <div className="link__container">
            {linkList.map((item, index) => {
              const { icon, name, link } = item
              return (
                <div className="link__wrap" onClick={() => { this.handleLinkClick(index) }}>
                  <Link className="link__item" to={link} key={index}>
                    {icon && <Icon className="link__icon" type={icon} />}
                    {name}
                  </Link>
                </div>
              )
            })}
          </div>
          <div className="action__container">
            <button className="action__button">我要发布</button>
            <button className="action__button action__button--register">注册</button>
            <button className="action__button action__button--login">登录</button>
          </div>
        </div>
      </div>
    )
  }
}