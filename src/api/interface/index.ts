//请求响应参数(不含data)
export interface Result {
    code: string,
    msg: string
}

//请求响应参数(含data)
export interface ResultData<T = any> extends Result {
    data?: T
}
export interface ResPage<T> {
    datalist: T[];
    pageNum: number;
    pageSize: number;
    total: number
}
export namespace Login {
    export interface ReqLoginForm {
        username: string;
        password: string
    }
    export interface ResLogin {
        access_token: string
    }
    export interface ResAuthButtons {
        [propName: string]: any
    }
}