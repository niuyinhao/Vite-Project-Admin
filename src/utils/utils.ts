import { RouteObject } from '@/routers/interface'
import { saveAs } from "file-saver";
import { set } from 'immer/dist/internal';


/**
 * @description 获取需要展开的 subMenu
 * @param {String} path 当前访问地址
 * @returns array
 */
export const getOpenKeys = (path: string) => {
    let newStr: string = "";
    let newArr: any[] = [];
    let arr = path.split("/").map(i => "/" + i);
    for (let i = 1; i < arr.length - 1; i++) {
        newStr += arr[i];
        newArr.push(newStr);
    }
    return newArr;
};

/**
 * @description 递归查询当前路由
 * @param {String} path 当前访问的地址
 * @param {Array} Routers 路由列表
 * @returns 
 */


export const searchRoute = (path: string, Routers: RouteObject[] = []): RouteObject => {

    let result: RouteObject = {};
    for (let item of Routers) {
        if (item.path === path) return item;
        if (item.children) {
            let res = searchRoute(path, item.children)
            if (Object.keys(res).length) result = res
        }
    }
    return result

}


/**
 * @description 递归当前路由所有关联的路由 生成面包屑
 * @param path 当前访问地址
 * @param menuList 菜单列表
 */

export const getBreadcrumbList = (path: string, menuList: Menu.MenuOptions[]) => {
    let tempath: any[] = [];
    try {
        const getNodePath = (node: Menu.MenuOptions) => {
            tempath.push(node)

            //符合的地址
            if (node.path === path) {
                throw new Error('终止')
            }
            if (node.children && node.children.length > 0) {
                for (let i = 0; i < node.children.length; i++) {
                    getNodePath(node.children[i])

                }
                tempath.pop()
            } else {
                tempath.pop()
            }
        }
        for (let i = 0; i < menuList.length; i++) {
            getNodePath(menuList[i])

        }
    } catch (e) {
        return tempath.map(item => item.title)
    }



}


/**
 * @description 双重递归 找到所有面包屑生成对象存入redux
 * @param menuList 当前菜单列表
 * @returns 
 */



export const findBreadcrumb = (menuList: Menu.MenuOptions[]): { [key: string]: any } => {
    const handelBreadcrumbList: any = {};
    const loop = (menuItem: Menu.MenuOptions) => {
        if (menuItem?.children?.length) {
            menuItem.children.forEach(item => loop(item))
        } else {
            handelBreadcrumbList[menuItem.path] = getBreadcrumbList(menuItem.path, menuList)
        }
    }
    menuList.forEach(item => loop(item));
    return handelBreadcrumbList

}

// 默认的列宽
export const DEFAULT_COLUMN_WIDTH = 20;
// 默认行高
export const DEFAULT_ROW_HEIGHT = 20;
// 根据 antd 的 column 生成 exceljs 的 column
export function generateHeaders(columns: any[]) {

    return columns?.map(col => {
        const obj: any = {
            // 显示的 name
            header: col.title,
            // 用于数据匹配的 key
            key: col.dataIndex,
            // 列宽
            width: col.colSpan * 20 || DEFAULT_COLUMN_WIDTH,
            ...col
        };
        if (col.children) {
            obj.children = col.children?.map((item: any) => ({
                key: item.dataIndex,
                header: item.title,
                width: item.width,
                parentKey: col.dataIndex,
            }));
        }
        return obj;
    })
}


export function saveWorkbook(workbook, fileName: string) {
    // 导出文件
    workbook.xlsx.writeBuffer().then((data => {
        const blob = new Blob([data], { type: '' });
        saveAs(blob, fileName);
    }))
}

export function addHeaderStyle(row, attr) {
    const { color, fontSize, horizontal, bold } = attr || {};
    // eslint-disable-next-line no-param-reassign
    row.height = DEFAULT_ROW_HEIGHT;
    row.eachCell((cell, colNumber) => {
        // eslint-disable-next-line no-param-reassign
        cell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: color },
        };
        // eslint-disable-next-line no-param-reassign
        cell.font = {
            bold: bold ?? true,
            size: fontSize ?? 11,
            name: '微软雅黑',
        };
        // eslint-disable-next-line no-param-reassign
        cell.alignment = { vertical: 'middle', wrapText: true, horizontal: horizontal ?? 'left' };
    });
}


export function getColumnNumber(width: number) {
    // 需要的列数，四舍五入
    return Math.round(width / DEFAULT_COLUMN_WIDTH);
}


// 行合并单元格
export function mergeRowCell(headers: any, row: any, worksheet: any, keys: string, data) {
    // 当前列的索引
    let colIndex = 1;
    let cellIndex = 1
    // worksheet.mergeCells(2, 3, 3, 3);
    // console.log('[][][][', headers, 'row====>>>', row, data);

    headers.forEach((header, index) => {
        let indx = index + 1
        // console.log(header);
        const findItem = headers.filter(e => e.dataIndex === header.dataIndex)[0]
        // console.log(findItem);

        const { width, children, key } = header;
        if (children) {
            children.forEach(child => {
                colIndex += 1;
            });
        } else {

            // 需要的列数，四舍五入
            const colNum = getColumnNumber(width);

            // // 如果 colNum > 1 说明需要合并
            if (colNum > 1) {
                // console.log(Number(row.number), colIndex, Number(row.number), colIndex + colNum - 1);

                if (keys === 'header') {
                    worksheet.mergeCells(Number(row.number), colIndex, Number(row.number), colIndex + colNum - 1);

                } else {
                    // worksheet.mergeCells(Number(row.number), colIndex, Number(row.number), colIndex + colNum - 1);

                }
            }
            colIndex += colNum;





            const rowSpanNum = data[`${key}rowSpan`]
            // console.log('rowSpanNum', key, rowSpanNum);
            if (rowSpanNum > 1) {
                // console.log('当前列', index + 1);

                console.log('>>>>', key, '当前列:', index + 1, '行:', row.number, '合并数----->>>', rowSpanNum);
                console.log(Number(row.number), indx, Number(row.number + rowSpanNum - 1), indx);

                // worksheet.mergeCells(Number(row.number), index + 1, Number(row.number + rowSpanNum), index + 1)
                // worksheet.mergeCells(Number(row.number), colIndex, Number(row.number), colIndex + colNum - 1);

            }
            // cellIndex += rowSpanNum || 0

        }
    });
}


// 合并行和列，用于处理表头合并
export function mergeColumnCell(
    headers: any,
    rowHeader1: any,
    rowHeader2: any,
    nameRow1: string[],
    nameRow2: string[],
    worksheet: any,
) {
    // 当前 index 的指针
    let pointer = -1;
    nameRow1.forEach((name, index) => {
        // 当 index 小于指针时，说明这一列已经被合并过了，不能再合并
        if (index <= pointer) return;
        // 是否应该列合并
        const shouldVerticalMerge = name === nameRow2[index];
        // 是否应该行合并
        const shouldHorizontalMerge = index !== nameRow1.lastIndexOf(name);
        pointer = nameRow1.lastIndexOf(name);
        if (shouldVerticalMerge && shouldHorizontalMerge) {
            // 两个方向都合并
            worksheet.mergeCells(
                Number(rowHeader1.number),
                index + 1,
                Number(rowHeader2.number),
                nameRow1.lastIndexOf(name) + 1,
            );
        } else if (shouldVerticalMerge && !shouldHorizontalMerge) {
            // 只在垂直方向上同一列的两行合并
            worksheet.mergeCells(Number(rowHeader1.number), index + 1, Number(rowHeader2.number), index + 1);
        } else if (!shouldVerticalMerge && shouldHorizontalMerge) {
            // 只有水平方向同一行的多列合并
            worksheet.mergeCells(
                Number(rowHeader1.number),
                index + 1,
                Number(rowHeader1.number),
                nameRow1.lastIndexOf(name) + 1,
            );
            // eslint-disable-next-line no-param-reassign
            const cell = rowHeader1.getCell(index + 1);
            cell.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
        }
    });
}


//手写实现Promise
export class MyPromise {
    private state: string = 'pending'//判断状态';
    private value: any = undefined;
    private resason: any = undefined;
    private onResolveCallbacks: any[] = [];
    private onRejectCallbacks: any[] = [];
    constructor(fn) {
        let resolve = (value) => {
            if (this.state === 'pending') {
                this.state = 'fulfilled';
                this.value = value;
                this.onResolveCallbacks.forEach(fn => fn());
            }
        }
        let reject = (reason) => {
            if (this.state === 'pending') {
                this.state = 'rejected';
                this.resason = reason;
                this.onRejectCallbacks.forEach(fn => fn());
            }
        }
        try {
            fn(resolve, reject);
        } catch (error) {
            reject(error);
        }
    }
    resolvePromise(x, resolve, reject, promise2) {
        if (promise2 === x) {
            return reject(new TypeError('多一次封装'));
        }
        if (x instanceof MyPromise) {
            x.then(value => {
                resolve(value);
            }, error => {
                reject(error);
            })
        } else {
            resolve(x)
        }
    }

    then(onFulfilled, onRejected: any = null) {
        let promise2 = new MyPromise((resolve, reject) => {
            if (this.state === 'fulfilled') {
                setTimeout(() => {
                    try {
                        let x = onFulfilled(this.value);
                        this.resolvePromise(x, resolve, reject, promise2)
                    } catch (error) {
                        reject(error);
                    }
                }, 0)
            }
            if (this.state === 'rejected') {
                setTimeout(() => {
                    try {
                        let x = onRejected(this.resason);
                        this.resolvePromise(x, resolve, reject, promise2)
                    } catch (error) {
                        reject(error);
                    }
                }, 0)
            }

            if (this.state === 'pending') {
                this.onResolveCallbacks.push(() => {
                    setTimeout(() => {
                        try {
                            let x = onFulfilled(this.value);
                            this.resolvePromise(x, resolve, reject, promise2)
                        } catch (error) {
                            reject(error);
                        }
                    }, 0)
                })
                this.onRejectCallbacks.push(() => {
                    setTimeout(() => {
                        try {
                            let x = onRejected(this.resason);
                            this.resolvePromise(x, resolve, reject, promise2)
                        } catch (error) {
                            reject(error);
                        }
                    }, 0)
                })
            }
        })
        return promise2
    }

    static resolve(value) {
        return new MyPromise((resolve, reject) => {
            resolve(value);
        })
    }

    static reject(reason) {
        return new MyPromise((resolve, reject) => {
            reject(reason);
        })

    }
    static race(promise) {
        return new MyPromise((resolve, reject) => {
            for (let i = 0; i < promise.length; i++) {
                const current = promise[i];
                current.then(resolve, reject)
            }
        })
    }

    static all(promise) {
        let arr: any[] = [];
        let i = 0;
        function procesDassData(index, data, resolve) {
            arr[index] = data;
            i++;
            if (i === promise.length) {
                resolve(arr);
            }
        }
        return new MyPromise((resolve, reject) => {
            for (let j = 0; j < promise.length; j++) {
                promise[j].then(data => {
                    procesDassData(j, data, resolve);

                }, reject)
            }
        })

    }
}
//测试
const p = new MyPromise((resolve, reject) => {
    setTimeout(() => {
        resolve(100)
    }, 1000)
})
p.then((res: any) => {
    console.log(res)
    return new MyPromise((resolve: any) => {
        resolve(200 + res)

    })
}).then((res: any) => {
    console.log(res)
})





