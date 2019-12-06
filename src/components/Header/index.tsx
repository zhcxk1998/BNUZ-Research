import React, { Component } from 'react'
import { Icon } from 'antd'
import { Link, withRouter, RouteComponentProps } from 'react-router-dom'

import './index.scss'

interface IProps extends RouteComponentProps {

}

interface IStates {
  currentPageIndex: number
}

const linkList: Array<{ icon?: string, name: string, link: string }> = [{
  icon: 'compass', name: '城市', link: '#'
}, {
  name: '首页', link: '/home/index'
}, {
  name: '课程', link: '/home/test'
}, {
  name: '圈子', link: '#'
}, {
  name: 'APP', link: '#'
}, {
  name: '资讯', link: '#'
}, {
  name: '关于我们', link: '#'
}]

class Header extends Component<IProps, IStates>{
  constructor(props: IProps) {
    super(props)
    this.state = {
      currentPageIndex: 1
    }
  }

  componentDidMount(): void {
    const { location: { pathname } } = this.props
    const currentLinkIndex: number = linkList.findIndex(({ link }) => link === pathname)
    this.setState({
      currentPageIndex: currentLinkIndex
    })
  }

  componentDidUpdate(preProps: IProps) {
    const pathIsChanged: boolean = preProps.location.pathname !== this.props.location.pathname
    if (pathIsChanged) {
      const { location: { pathname } } = this.props
      const currentLinkIndex: number = linkList.findIndex(({ link }) => link === pathname)
      this.setState({
        currentPageIndex: currentLinkIndex
      })
    }
  }

  handleLinkClick(currentPageIndex: number): void {
    this.props.history.push(linkList[currentPageIndex].link)
  }

  render() {
    const { currentPageIndex } = this.state
    return (
      <div className="header__container">
        <div className="header__wrap">
          <img className="logo" src={require('../../assets/img/logo.png')} />
          <div className="link__container">
            {linkList.map((item, index) => {
              const { icon, name, link } = item
              return (
                <div className="link__wrap" onClick={() => this.handleLinkClick(index)} key={index}>
                  <Link className={`link__item ${index === currentPageIndex && 'link__item--active'}`} to={link}>
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

export default withRouter(Header)