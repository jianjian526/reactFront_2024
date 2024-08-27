import type { ProColumns } from '@ant-design/pro-components';
import {
  EditableProTable,
  ProCard,
  ProFormField,
} from '@ant-design/pro-components';
import { Button, Select } from 'antd';
import React, { useState, useEffect } from 'react';
import { getTableData } from '@/services/DemoSvc/EditableProTable4Services'

type DataSourceType = {
  id: React.Key;
  title?: string;
  decs?: string;
  state?: string;
  created_at?: number;
  children?: DataSourceType[];
};

const defaultData: DataSourceType[] = new Array(20).fill(1).map((_, index) => {
  return {
    id: (Date.now() + index).toString(),
    title: `活动名称${index}`,
    decs: 'good',
    state: 'open',
    created_at: 1590486176000,
  };
});


export default () => {
  const [selectedState, setSelectedState] = useState<{ [key: string]: any }>({});
  const [theValue, setTheValue] = useState('good');
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>(() =>
    defaultData.map((item) => item.id),
  );
  const [dataSource, setDataSource] = useState<readonly DataSourceType[]>(
    () => defaultData,
  );

  const columns: ProColumns<DataSourceType>[] = [
    {
      title: '活动名称',
      dataIndex: 'title',
      width: '30%',
      formItemProps: {
        rules: [
          {
            required: true,
            whitespace: true,
            message: '此项是必填项',
          },
          {
            message: '必须包含数字',
            pattern: /[0-9]/,
          },
          {
            max: 16,
            whitespace: true,
            message: '最长为 16 位',
          },
          {
            min: 6,
            whitespace: true,
            message: '最小为 6 位',
          },
        ],
      },
    },
    {
      title: '状态',
      key: 'state',
      dataIndex: 'state',
      valueType: 'select',
      // valueEnum: {
      //   all: { text: '全部', status: 'Default' },
      //   open: {
      //     text: '未解决',
      //     status: 'Error',
      //   },
      //   closed: {
      //     text: '已解决',
      //     status: 'Success',
      //   },
      // },
      renderFormItem: (item, { onChange, record }) => (
        <Select
          onChange={(value: any) => {
            // 当状态列的值改变时，执行以下操作
            const theKey = record!.id;
            selectedState[theKey as string] = value

            console.log('-------------- state is change!! ------------')
            setTheValue('bad')
            setSelectedState(selectedState);

            if (onChange) {
              onChange(value); // 如果存在 onChange 函数，调用它
            }
          }}
          options={[{label: '全部', value: 'all'},{label: '未解决', value: 'open'},{label: '已解决', value: 'closed'},]} 
        >
        </Select>
      ),
    },
    {
      title: '描述',
      dataIndex: 'decs',
      valueType: 'select',
      // valueEnum: {
      //   good: { text: '真好玩', status: 'Default' },
      //   bad: {
      //     text: '特别不好玩',
      //     status: 'Error',
      //   },
      //   normal: {
      //     text: '一般吧',
      //     status: 'Success',
      //   },
      // },
      renderFormItem: (item, { record }) => {
        // 根据选中的状态值动态更新描述列的 valueEnum
        const decsValueEnum = getDecsValueEnumByState(selectedState[record!.id as string]);
        return (
          <Select
            value={theValue}
            options={decsValueEnum}
          />
        );
      },
    },
    {
      title: '操作',
      valueType: 'option',
      width: 250,
      render: () => {
        return null;
      },
    },
  ];

  const getDecsValueEnumByState: any = (state: any) => {
    const result = getDecsValueEnumByState2(state);
    const newResult = [];
    for (const key in result) {
      newResult.push({label: result[key].text, value: key})
    }

    return newResult;
  }

  const getDecsValueEnumByState2: any = (state: any) => {
    if (state === 'open') {
      return {
        good: { text: '未解决 真好玩', status: 'Default' },
        bad: {
          text: '未解决 特别不好玩',
          status: 'Error',
        },
        normal: {
          text: '未解决 一般吧',
          status: 'Success',
        },
      }
    } else if (state === 'closed') {
      return {
        good: { text: '已解决 真好玩', status: 'Default' },
        bad: {
          text: '已解决 特别不好玩',
          status: 'Error',
        },
        normal: {
          text: '已解决 一般吧',
          status: 'Success',
        },
      }
    } else {
      return {
        good: { text: '真好玩', status: 'Default' },
        bad: {
          text: '特别不好玩',
          status: 'Error',
        },
        normal: {
          text: '一般吧',
          status: 'Success',
        },
      }
    }
  }
  
  return (
    <>
      <EditableProTable<DataSourceType>
        headerTitle="可编辑表格"
        columns={columns}
        rowKey="id"
        scroll={{
          x: 960,
        }}
        value={dataSource}
        controlled={true}
        onChange={(data) => {
          console.log('data[5] == ' + JSON.stringify(data[5]));
          setDataSource(data);
        }}
        recordCreatorProps={{
          newRecordType: 'dataSource',
          record: () => ({
            id: Date.now(),
          }),
        }}
        toolBarRender={() => {
          return [
            <Button
              type="primary"
              key="save"
              onClick={() => {
                // dataSource 就是当前数据，可以调用 api 将其保存
                console.log(dataSource);
              }}
            >
              保存数据
            </Button>,
          ];
        }}
        editable={{
          type: 'multiple',
          editableKeys,
          actionRender: (row, config, defaultDoms) => {
            return [defaultDoms.delete];
          },
          onValuesChange: (record, recordList) => {
            setDataSource(recordList);
          },
          onChange: setEditableRowKeys,
        }}
        onValuesChange={(allValues, changedValues) => {
          console.log('changedValues ================: ' + JSON.stringify(changedValues))
          console.log('allValues ================: ' + JSON.stringify(allValues))
          console.log('columns ================: ' + JSON.stringify(columns))

          // 取得修改前的数据
          const editBeforData = dataSource.filter(item => changedValues.id === item.id);

          // 对比state是否变化
          if (editBeforData.length === 1 && editBeforData[0].state !== changedValues.state) {

            // 不相等的情况下，根据state值取得decs选项
            const newDecsValueEnum = getDecsValueEnumByState(changedValues.state);

            // // 更新列配置
            // const newColumns = columns.map(column => {
            //   if (column.dataIndex === 'decs') {
            //     return {
            //       ...column,
            //       valueEnum: newDecsValueEnum,
            //     };
            //   }
            //   return column;
            // });
          }

          // if (changedValues.state) {
          //   const newState = changedValues.state;
          //   // 根据新的状态值更新描述列的选项
          //   const newDecsValueEnum = getDecsValueEnumByState(newState);
          //   // 更新列配置
          //   const newColumns = columns.map(column => {
          //     if (column.dataIndex === 'decs') {
          //       return {
          //         ...column,
          //         valueEnum: newDecsValueEnum,
          //       };
          //     }
          //     return column;
          //   });
          //   // 设置新的列配置
          //   setColumns(newColumns);
          // }
        }}
      />
      <ProCard title="表格数据" headerBordered collapsible defaultCollapsed>
        <ProFormField
          ignoreFormItem
          fieldProps={{
            style: {
              width: '100%',
            },
          }}
          mode="read"
          valueType="jsonCode"
          text={JSON.stringify(dataSource)}
        />
      </ProCard>
    </>
  );
};