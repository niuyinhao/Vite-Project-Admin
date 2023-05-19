import React, { useState, useEffect } from 'react';
import { Table, Button } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { TableRowSelection } from 'antd/es/table/interface';
import * as ExcelJs from 'exceljs';
import { Worksheet } from "exceljs";
import { generateHeaders, saveWorkbook, getColumnNumber, addHeaderStyle, DEFAULT_COLUMN_WIDTH, mergeRowCell, mergeColumnCell } from '@/utils/utils'
import './index.less'
function proTable() {
    const [checkStrictly, setCheckStrictly] = useState(false);
    const [dataList, setData] = useState<any>([])
    const paginationProps = {
        current: 1, //当前页码
        pageSize: 10, // 每页数据条数
        // // showTotal: () => (
        // //   <span>总共{total}项</span>
        // // ),
        // total: 20, // 总条数
        onChange: () => { }, //改变页码的函数
        hideOnSinglePage: false,
        showSizeChanger: false,
    };
    interface DataType {
        key: React.ReactNode;
        name: string;
        age?: number;
        phone: number;
        tel: string;
        address: string;
        children?: DataType[];
    }




    // 事例表中第四行合并了五列，除了第一列设置 colSpan = 5 外
    // 其他列的第四行 colSpan = 0 (被合并掉，不会渲染)

    const renderContent = (_, index, type) => {
        // console.log(_[`${type}rowSpan`]);

        return {
            rowSpan: _[`${type}rowSpan`]
        }

    };

    const columns: ColumnsType<DataType> = [{
        title: '姓名',
        dataIndex: 'name',
        key: 'name'
    }, {
        title: '年龄',
        dataIndex: 'age',
        onCell: (_, index): any => {
            return renderContent(_, index, 'age')
        },
    }, {
        title: '家庭电话',
        colSpan: 2,
        dataIndex: 'tel',
        onCell: (_, index): any => {
            return renderContent(_, index, 'tel')
        },
    }, {
        title: '手机号',
        colSpan: 0,
        dataIndex: 'phone',
        onCell: (_, index): any => {
            return renderContent(_, index, 'phone')
        },
    }, {
        title: '住址',
        dataIndex: 'address',
        onCell: (_, index): any => {
            return renderContent(_, index, 'address')
        },
    }];

    const data: DataType[] = [{
        key: '1',
        name: '胡彦斌',
        age: 32,
        tel: '0571-22098333',
        phone: 1234567,
        address: '西湖区湖底公园1号',
    }, {
        key: '2',
        name: '胡彦祖',
        tel: '0571-22098333',
        phone: 1234567,
        age: 42,
        address: '西湖区湖底公园1号',
    }, {
        key: '3',
        name: '李大嘴',
        age: 32,
        tel: '0575-22098909',
        phone: 1234567,
        address: '西湖区湖底公园2号',
    }, {
        key: '4',
        name: '李夫人',
        age: 18,
        tel: '0575-22098909',
        phone: 7654321,
        address: '西湖区湖底公园2号',
    }, {
        key: '5',
        name: '习大大',
        age: 18,
        tel: '0575-22098909',
        phone: 7654321,
        address: '西湖区湖底公园2号',
    }, {
        key: '6',
        name: '习大一',
        age: 19,
        tel: '0575-22098909',
        phone: 7654321,
        address: '西湖区湖底公园2号',
    }, {
        key: '7',
        name: '习大二',
        age: 19,
        tel: '0575-21098909',
        phone: 7654321,
        address: '西湖区湖底公园2号',
    }, {
        key: '8',
        name: '习大三',
        age: 19,
        tel: '0575-21098909',
        phone: 7654321,
        address: '西湖区湖底公园2号',
    }, {
        key: '9',
        name: '习大四',
        age: 12,
        tel: '0575-21098909',
        phone: 7654321,
        address: '西湖区湖底公园2号',
    }, {
        key: '10',
        name: '习大s',
        age: 12,
        tel: '0575-21092909',
        phone: 7654321,
        address: '西区湖底公园2号',
    }, {
        key: '11',
        name: '习大w',
        age: 12,
        tel: '0575-21028909',
        phone: 7654321,
        address: '西湖湖底公园2号',
    }, {
        key: '12',
        name: '习大e',
        age: 12,
        tel: '0575-2',
        phone: 7654321,
        address: '西湖区底公园2号',
    }];

    /**
     * 
     * @param data 数据源
     * @param field 合并字段
     * @returns 新的数据
     */
    const changeData = (data, field: string) => {
        let count = 0
        let indexCount = 1;
        // let arr = ['phone', 'address']
        while (indexCount < data.length) {
            let item = data.slice(count, count + 1)[0];
            if (!item[`${field}rowSpan`]) {
                item[`${field}rowSpan`] = 1
            }

            if (item[field] === data[indexCount][field]) {
                item[`${field}rowSpan`]++;
                data[indexCount][`${field}rowSpan`] = 0
            } else {
                count = indexCount
            }
            indexCount++

        }
        return data
    }

    const strArr = ['address', 'phone', 'tel', 'age']

    useEffect(() => {
        let dataTableData = data
        strArr.map(item => {
            dataTableData = changeData(dataTableData, item)
        })
        setData(dataTableData)
    }, [])

    const onExportBasicExcel = () => {
        // 创建工作簿
        const workbook = new ExcelJs.Workbook();
        // 添加sheet
        const worksheet = workbook.addWorksheet('demo sheet');
        // 设置 sheet 的默认行高
        worksheet.properties.defaultRowHeight = 20;
        // // 设置列
        // worksheet.columns = generateHeaders(columns);
        // // 添加行
        // worksheet.addRows(dataList);
        // // 导出excel
        // saveWorkbook(workbook, 'simple-demo.xlsx');




        // 解析 AntD Table 的 columns
        const headers = generateHeaders(columns);
        console.log({ headers })
        // 第一行表头
        const names1: string[] = [];
        // 第二行表头
        const names2: string[] = [];
        // 用于匹配数据的 keys
        const headerKeys: string[] = [];

        headers.forEach((item: any) => {
            if (item.children) {
                // 有 children 说明是多级表头，header name 需要两行
                item.children.forEach(child => {
                    names1.push(item.header);
                    names2.push(child.header);
                    headerKeys.push(child.key);
                });
            } else {
                const columnNumber = getColumnNumber(item.width);

                for (let i = 0; i < columnNumber; i++) {
                    names1.push(item.header);
                    names2.push(item.header);
                    headerKeys.push(item.key);
                }
            }
        });


        handleHeader(worksheet, headers, names1, names2);
        // 添加数据
        addData2Table(worksheet, headerKeys, headers);
        // worksheet.mergeCells(2, 3, 3, 3);

        // 给每列设置固定宽度
        worksheet.columns = worksheet.columns.map(col => ({ ...col, width: DEFAULT_COLUMN_WIDTH }));
        console.log(worksheet, 'worksheet');

        // 导出excel
        // saveWorkbook(workbook, 'simple-demo.xlsx');

    }


    function handleHeader(
        worksheet: Worksheet,
        headers: any,
        names1: string[],
        names2: string[],
    ) {
        // 判断是否有 children, 有的话是两行表头
        const isMultiHeader = headers?.some(item => item.children);
        if (isMultiHeader) {
            // 加表头数据
            const rowHeader1 = worksheet.addRow(names1);
            const rowHeader2 = worksheet.addRow(names2);
            // 添加表头样式
            addHeaderStyle(rowHeader1, { color: 'dff8ff' });
            addHeaderStyle(rowHeader2, { color: 'dff8ff' });
            mergeColumnCell(headers, rowHeader1, rowHeader2, names1, names2, worksheet);
            return;
        }
        // 加表头数据
        const rowHeader = worksheet.addRow(names1);
        // 表头根据内容宽度合并单元格
        // mergeRowCell(headers, rowHeader, worksheet,'header');
        // 添加表头样式
        addHeaderStyle(rowHeader, { color: 'dff8ff' });
    }

    function addData2Table(worksheet: Worksheet, headerKeys: string[], headers: any) {
        // console.log(headerKeys);

        dataList?.forEach((item: any) => {
            // console.log(item['phone']);
            const rowData = headerKeys?.map(key => item[key]);
            // console.log('-----rowData', rowData);

            const row = worksheet.addRow(rowData);

            mergeRowCell(headers, row, worksheet, 'data', item);
            row.height = 26;
            // 设置行样式, wrapText: 自动换行
            row.alignment = { vertical: 'middle', wrapText: true, shrinkToFit: false };
            row.font = { size: 11, name: '微软雅黑' };
        })
    }

    console.log(dataList);

    const rowSelection: TableRowSelection<DataType> = {
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        onSelect: (record, selected, selectedRows) => {
            console.log(record, selected, selectedRows);
        },
        onSelectAll: (selected, selectedRows, changeRows) => {
            console.log(selected, selectedRows, changeRows);
        },
    };
    return (
        <div className='proTable'>
            <Button type={'primary'} style={{ marginBottom: 10 }} onClick={onExportBasicExcel}>导出excel</Button>
            <Table
                columns={columns}
                pagination={paginationProps}
                scroll={{ y: 500 }}
                rowSelection={{ ...rowSelection, checkStrictly }}
                dataSource={dataList}
            />
        </div>
    )
}

export default proTable