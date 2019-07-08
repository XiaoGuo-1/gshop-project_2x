/*
一个能发送ajax请求的函数
1.统一处理请求异常
2.异步请求成功的数据不足response,而是response.data
3.对post请求参数进行ulencode处理，而不使用默认的json方式（后台接口不支持）
4.请求超时的时间
*/

import axios from 'axios'
// qs = require('qs')
import qs from 'qs'


//请求超时的全局配置
axios.defaults.timeout = 20000

//添加请求拦截器

axios.interceptors.request.use((config)=>{

  const {method,data} = config
  //如果携带数据post请求，那就进行处理
  if(method.toLowerCase()==='post' && data && typeof data==='object'){
    config.data = qs.stringify(data)
  }

  return config;

});

//添加一个响应拦截器
axios.interceptors.response.use(response => {
  // 返回response中的data数据, 这样请求成功的数据就是data了
  return response.data
}, error => {// 请求异常
  alert('请求异常: ' + error.message)

  // return error
  // return Promise.reject(error)
  return new Promise(() => {})  // 中断promise链
})

export default axios



/* axios.get('/api/test_get',{
  params:{name:'李四',pwd:'123'}
}) */
 /*
axios.post('/api/test_post',{name:'Tom',pwd:'456'})
    .then(data=>{
    console.log('请求成功',data)
  }) */

/*
axios.post('/baidu/test_post',{name:'Tom',pwd:'456'})
  .then(data=>{})
  .catch(error=>{
    comsole.log('请求异常',error.message)
  })
 */

