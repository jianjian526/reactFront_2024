// import部分
import { ColumnsState, PageContainer } from '@ant-design/pro-components';
import ParentPage from '@/components/ParentPage';
import Header from '@/components/Header';
import React, { useRef, useState, useEffect } from 'react';
import {
  ProTable, ActionType, ProColumns, QueryFilter, ProFormText, ProFormDatePicker,
  ProFormRadio, ProFormDigit, ProFormSelect, ProForm
} from '@ant-design/pro-components';
import EmployeeDetail from '@/pages/EmployeeDetail';
import { getEmployeeStatusList_ai, getExportFile } from '@/services/EmployeeStatusListService';
import { selectEnum_gender, selectEnum_level, selectEnum_Department } from '@/constants';

import { Cascader, Flex, Button } from 'antd';
import { saveAs } from 'file-saver';
import { valuesIn } from 'lodash';

const EmployeeStatusListDemo: React.FC<unknown> = () => {


  /*********************************** 测试多选 */
  const { SHOW_CHILD } = Cascader;

  // option类型
  interface OptionType {
    value: string | number;
    label: string;
    children?: OptionType[];
  }
  // 初期测试值
  const initExpTypes: OptionType[] = [
    {
      label: '框架',
      value: 'framework',
      children: [
        {
          label: 'Struts',
          value: 'Struts',
        },
        {
          label: 'SpringMVC',
          value: 'SpringMVC',
        },
        {
          label: 'Nabrach',
          value: 'Nabrach',
        },
      ],
    },
    {
      label: '语言',
      value: 'language',
      children: [
        {
          label: 'JAVA',
          value: 'JAVA',
        },
        {
          label: 'C',
          value: 'C',
        },
        {
          label: '.NET',
          value: '.NET',
        },
        {
          label: 'GO',
          value: 'GO',
        },
        {
          label: 'Python',
          value: 'Python',
        },
      ],
    },
    {
      label: '数据库',
      value: 'DataBase',
      children: [
        {
          label: 'Oracle',
          value: 'Oracle',
        },
        {
          label: 'DB2',
          value: 'DB2',
        },
        {
          label: 'PostgreSQL',
          value: 'PostgreSQL',
        },
      ],
    },
  ];

  // options内容 （注意： 这里的数据从DB检索时，应该加上 自定义 的内容 （可以考虑把自定义内容在Nodejs端缓存起来？））
  const [options, setOptions] = useState<OptionType[]>([]);

  // 初期化
  useEffect(() => {
    setOptions(initExpTypes);
  }, []);

  const onChange: any['onChange'] = (value: any) => {
    console.log('value================= : ' + JSON.stringify(value));
  };

  const filter = (inputValue: string, path: any[]) =>
    path.some(
      (option) =>
        (option.label as string).toLowerCase().indexOf(inputValue.toLowerCase()) > -1
    );

  const onMultipleChange: any['onChange'] = (value: any) => {
    console.log(value);
  };
  /*********************************** 测试多选 */


  const actionRef = useRef<ActionType>();
  const [detailModalVisible, setDetailModalVisible] = useState<boolean>(false);

  // 在组件的state中添加一个key变量
  const [tableKey, setTableKey] = useState(0);

  // table数据
  const [tableData, setTableData] = useState([]);

  // 查询函数
  const handleFilterSubmit = async (values: any) => {
    const { expArray, ...valuesInput } = values;

    // 动态修改一下columns
    if (expArray && expArray.length > 0) {
      expArray.forEach((item: any) => {
        const newColumnName = item[1];

        columns.splice(2, 0, {
          // title: newColumnName,  // backgroundColor: '#e6f7ff'
          title: <div style={{ fontWeight: 'bold', color: 'blue'  }}> 
               {newColumnName}
             </div>,
          dataIndex: 'exp_' + newColumnName,
          tip: '1: 小于1年, 2: 1~3年 ... ',
          sorter: true,
          // render: (text) => (
          //   <div style={{ backgroundColor: '#e6f7ff' }}>
          //     {text}
          //   </div>
          // ),
        })
      });
    }

    console.log('handleFilterSubmit values : ============== ' + JSON.stringify(values));

    const { data, success } = await getEmployeeStatusList_ai(valuesInput);

    // 取得一览的集合并设定key
    const tableData_ = data?.list || [];
    const tableData = tableData_.map((element: API.EmployeeStatus) => {
      return {
        ...element,
        key: element.empId
      }
    });

    // 模拟插入所有人的经验等级
    if (expArray && expArray.length > 0) {
      tableData.forEach((element: any) => {
        // 每个经验都设定固定等级
        expArray.forEach((item: any) => {
          element['exp_' + item[1]] = '3';
        });
      });
    }

    // setTableKey(1);
    setColumns(columns);

    // 设值
    setTableData(tableData);
  };

  const [columns, setColumns] = useState<ProColumns<API.EmployeeStatus, "text">[]>([
  // const columns: ProColumns<API.EmployeeStatus, "text">[] = [
    {
      title: '员工ID',
      dataIndex: 'empId',
      tip: '员工ID是唯一的 key',
      sorter: true,
    },
    {
      title: '名字',
      dataIndex: 'empName',
      hideInSearch: true,
    },
    {
      title: '性别',
      dataIndex: 'gender',
      sorter: true,
      render: (text) => {
        if (text === 'MALE') {
          return '男';
        } else if (text === 'FEMALE') {
          return '女';
        }
        return text;
      },
    },
    {
      title: '年龄',
      dataIndex: 'age',
      sorter: true,
    },
    {
      title: '级别',
      dataIndex: 'level',
      sorter: true,
    },
    {
      title: '入社时间',
      dataIndex: 'joinDate',
      sorter: true,
    },
    {
      title: '所属部门',
      dataIndex: 'departmentName',
      tip: '目前包含 TIS一部 和 TIS二部',
      sorter: true,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <>
          <a
            onClick={() => {
              setDetailModalVisible(true);
            }}
          >
            详细
          </a>
        </>
      ),
    },
  ]);

  // 自定义列的状况
  const [columnsState, setColumnsState] = useState<Record<string, ColumnsState>>(() => {
    const states: any = {};
    columns.forEach((item: ProColumns<API.EmployeeStatus, "text">) => {
      states[item.dataIndex + ''] = { "show": true }
    });

    return states;
  });

  // 记录自定义列的状态
  const handleColumnsStateChange = (data: any) => {
    // 获取当前被自定义显示的列
    setColumnsState(data);
  };

  return (
    <ParentPage>
      <PageContainer
        header={{
          title: '员工状态一览',
          extra: [<Header key="header" />],
        }}
      >
        <QueryFilter onFinish={handleFilterSubmit}>
          <ProFormText name="empName" label="名字" />
          <ProFormRadio.Group name="gender" label="性别"
            options={[
              {
                value: 'MALE',
                label: '男',
              },
              {
                value: 'FEMALE',
                label: '女',
              },
              {
                value: '',
                label: 'ALL',
              }
            ]}
          />
          <ProFormDigit name="age" label="年龄" />
          <ProFormDatePicker name="joinDate" label="入社时间" />
          <ProFormSelect
            name="departmentId"
            label="所属部门"
            valueEnum={selectEnum_level}
          />

          <br />
          <ProForm.Item label="经验" name="expArray" >
            <Cascader
              style={{ width: '100%' }}
              options={options}
              onChange={onChange}
              multiple
              maxTagCount="responsive"
              showCheckedStrategy={SHOW_CHILD}
              defaultValue={[]}
              showSearch={{ filter }}
            />
          </ProForm.Item>

          <br />
          <br />
          <ProForm.Item label="经验" name="expTree" >
            <Flex vertical gap="small" align="flex-start" >
              <Cascader.Panel multiple options={options} onChange={onMultipleChange} />
            </Flex>
          </ProForm.Item>
        </QueryFilter>

        <ProTable<API.EmployeeStatus>
          headerTitle="查询结果"
          actionRef={actionRef}
          search={false}
          columns={columns}
          dataSource={tableData}
          key={tableKey}
          columnsState={{ value: columnsState, onChange: handleColumnsStateChange }}
          toolBarRender={() => [
            <Button
              key="1"
              type="primary"
              onClick={async () => {
                console.log('columns信息===== ： ' + JSON.stringify(columnsState))
                const { data, success } = await getExportFile({});
                console.log('data : ' + data)

                // 接受完文件，开始转换
                if (data) {
                  // 将base64编码的文件转换为Blob对象
                  const byteCharacters = atob(data);
                  const byteArrays = [];
                  for (let i = 0; i < byteCharacters.length; i++) {
                    byteArrays.push(byteCharacters.charCodeAt(i));
                  }
                  const blob = new Blob([new Uint8Array(byteArrays)], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

                  // 下载文件
                  saveAs(blob, 'invoice.xlsx');
                }
              }}
            >
              导出Excel
            </Button>
          ]}
        />
      </PageContainer>
      <EmployeeDetail
        empId={''} // 请传入ProTable一览区域当前行的empId
        onCancel={() => setDetailModalVisible(false)}
        modalVisible={detailModalVisible}
      />
    </ParentPage>
  );
};

export default EmployeeStatusListDemo;
