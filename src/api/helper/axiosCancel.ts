import axios, { AxiosRequestConfig, Canceler } from 'axios'
import { isFunction } from '@/utils/is'
import qs from 'qs'

//生明一个Map 用于存储每个请求的标识 和取消函数
let pendingMap = new Map<void, Canceler>();

//序列化参数
export const getPendingUrl = (config: AxiosRequestConfig) => {
    [config.method, config.url, qs.stringify(config.data), qs.stringify(config.params)].join("&");
}
export class AxiosCanceler {

    //添加请求
    addPending(config: AxiosRequestConfig) {

        this.removePending(config);
        const url = getPendingUrl(config);
        config.cancelToken = config.cancelToken ||
            new axios.CancelToken(cancel => {
                if (!pendingMap.has(url)) {
                    pendingMap.set(url, cancel)
                }
            })
    }
    //移除请求
    removePending(config: AxiosRequestConfig) {
        const url = getPendingUrl(config);
        if (pendingMap.has(url)) {
            const cancel = pendingMap.get(url);
            cancel && cancel();
            pendingMap.delete(url)
        }
    }
    //清空所有请求
    removeAllPending() {
        pendingMap.forEach(cancel => {
            cancel && isFunction(cancel) && cancel()
        })
        pendingMap.clear()
    }
    //重置
    reset(): void {
        pendingMap = new Map<void, Canceler>();
    }
}