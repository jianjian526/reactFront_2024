import { Cascader, Flex } from 'antd';
import React, { useEffect, useState } from 'react';

// type DefaultOptionType = GetProp<CascaderProps, 'options'>[number];

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

const App: React.FC = () => {
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
        (option.label as string)
          .toLowerCase()
          .indexOf(inputValue.toLowerCase()) > -1,
    );

  const onMultipleChange: any['onChange'] = (value: any) => {
    console.log(value);
  };

  return (
    <>
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
      <br />
      <br />
      <Flex vertical gap="small" align="flex-start">
        {/* <Cascader.Panel options={options} onChange={onChange} /> */}
        <Cascader.Panel
          multiple
          options={options}
          onChange={onMultipleChange}
        />
        <Cascader.Panel />
      </Flex>
    </>
  );
};

export default App;
