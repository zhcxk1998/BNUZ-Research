import axios from 'axios'
import { message } from 'antd'

const instance = axios.create({
  timeout: 10000,
  headers: {
    'Content-Type': "application/json;charset=utf-8"
  },
  withCredentials: true
})

const post = (url: string, params: object, options?: object): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    instance.post(url, params, options).then(res => {
      resolve(res)
    }).catch(err => {
      /* data: { status: false, errcode: 5303, message: "验证失败", data: null } */
      const { response: { data } } = err
      message.error(data.message)
      return reject()
    })
  })
}

export default {
  post
}