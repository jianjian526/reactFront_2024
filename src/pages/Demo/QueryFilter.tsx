import React, { useState } from 'react';
import { QueryFilter, ProFormText, ProFormDatePicker, ProTable, ProFormRadio, ProFormCheckbox } from '@ant-design/pro-components';

const MyQueryFilter = () => {
  const initData = [
    { id: 1, name: 'App 1', createDate: '2022-01-01', status: 'Active', key: '1' },
    { id: 2, name: 'App 2', createDate: '2022-02-01', status: 'Inactive', key: '2' },
    { id: 3, name: 'App 3', createDate: '2022-03-01', status: 'Active', key: '3' },
  ];
  const [tableData, setTableData] = useState(initData);

  const handleFilterSubmit = async (values: any) => {
    const filteredData = initData.filter((item) => {
      if (
        (!values.name || item.name.includes(values.name)) &&
        (!values.createDate || item.createDate === values.createDate) &&
        (!values.status || item.status.includes(values.status))
      ) {
        console.log('== return true')
        return true;
      }
      console.log('== return false')
      return false;
    });

    setTableData(filteredData);
  };

  const columns = [
    { title: 'ID', dataIndex: 'id' },
    { title: '应用名称', dataIndex: 'name' },
    { title: '创建时间', dataIndex: 'createDate' },
    { title: '应用状态', dataIndex: 'status' },
  ];

  return (
    <div>
      <QueryFilter onFinish={handleFilterSubmit}>
        <ProFormText name="name" label="应用名称" />
        <ProFormDatePicker name="createDate" label="创建时间" />
        <ProFormText name="status" label="应用状态" />
        <ProFormRadio.Group
        name="freq"
        label="查询频度"
        options={[
          {
            value: 'weekly',
            label: '每周',
          },
          {
            value: 'quarterly',
            label: '每季度',
          },
          {
            value: 'monthly',
            label: '每月',
          },
          {
            value: 'yearly',
            label: '每年',
          },
        ]}
      />
      <ProFormCheckbox.Group
        name="checkbox"
        label="行业分布"
        options={['农业', '制造业', '互联网']}
      />
      </QueryFilter>
      <ProTable dataSource={tableData} columns={columns} search={false}/>
    </div>
  );
};

export default MyQueryFilter;