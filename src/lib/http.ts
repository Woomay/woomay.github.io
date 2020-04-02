import axios from 'axios';

// 防止重复提交，利用axios的cancelToken
let pending: any[] = []; // 声明一个数组用来存储每个ajax请求取消函数和ajax标识
const CancelToken: any = axios.CancelToken;

const removePending: any = (config: any, f: any) => {
  const flagUrl = config.url; // 获取请求url
  // 判断请求是否在请求队列
  if (pending.indexOf(flagUrl) !== -1) {
    if (f) {
      f('取消重复请求')
    } else {
      pending.splice(pending.indexOf(flagUrl), 1); // 把这条记录从数组中移除
    }
  } else {
    f && pending.push(flagUrl)
  }
}

// 创建axios实例
const instance = axios.create({
  baseURL: '/',
  timeout: 30000,
})

// request拦截器
instance.interceptors.request.use((config: any) => {
  // neverCancel 配置项，允许多个请求
  if (!config.neverCancel) {
    // 生成cancelToken
    config.cancelToken = new CancelToken((c: any) => {
      removePending(config, c);
    });
  }
  return config
}, (error: any) => {
  Promise.reject(error);
})

// response拦截器
instance.interceptors.response.use((response: any) => {
  console.log('response', response)
  // 移除队列中的该请求，这时候没有第二个参数f
  removePending(response.config)
  // 获取返回数据，并处理；根据自己的业务码配置
  const res = response.data;
  if (response.status === 200) { // 成功
    return Promise.resolve(res);
  } else {
    return Promise.reject('error');
  }
}, (error: any) => {
  // 异常处理
  pending = []
  if (error.message === '取消重复请求') {
    return Promise.reject(error);
  }
  return Promise.reject(error);
});

export default instance