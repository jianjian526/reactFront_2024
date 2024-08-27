import React, { useEffect, useState } from 'react';
import {
  Button,
  Cascader,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Switch,
  TreeSelect,
  Col,
  Row,
  Tag
} from 'antd';

interface CustomFormProps {
  itemObject: { [key: string]: any };
  onSubmit: Function;
}
type SizeType = Parameters<typeof Form>[0]['size'];

const CustomeForm: React.FC<CustomFormProps> = ({ itemObject, onSubmit }) => {
  const [componentSize, setComponentSize] = useState<SizeType | 'default'>('default');
  const [itemObjectValue, setItemObjectValue] = useState<Record<string, any>>(itemObject);
  const [changeValue, setChangeValue] = useState<Object>({});

  interface ItemObject {
    [key: string]: any;
  }

  const itemChange: ItemObject = {};

  useEffect(() => {
    console.log(itemObjectValue);

    for (const key in itemObjectValue) {
      itemChange[key] = itemObjectValue[key].value;
    }
    console.log(itemChange);
    
    setChangeValue(itemChange);
  }, [itemObjectValue]);

  
  const onFormLayoutChange = ({ size }: { size: SizeType }) => {
    setComponentSize(size);
  };
  // 使用onSubmit属性
  const handleSubmit = (changeValue: any) => {
    console.log(changeValue);
    onSubmit(changeValue)
  };

  const handleInputChange = (key: string, e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(11);
    
    const { value } = e.target;
    itemObjectValue[key].value = value;
    const valuecahgne = itemObjectValue[key];
    // setItemObjectValue({ ...itemObject, [key]: valuecahgne });
  }
  const handleChange = (value: string, key: string) => {
    itemObjectValue[key].value = value;
    const valuecahgne = itemObjectValue[key];
    setItemObjectValue({ ...itemObject, [key]: valuecahgne });
  };

  const onChangeRaio = (e: any, key: string) => {
    const value = e.target.value;
    itemObjectValue[key].value = value;
    const valuecahgne = itemObjectValue[key];
    setItemObjectValue({ ...itemObject, [key]: valuecahgne });
  }
  const itemType = (key: any) => {
    const keyType = itemObjectValue[key].type;
    if (keyType === "input") {
      const keyValue = itemObjectValue[key].value;
      const label = itemObjectValue[key].label;
      return (
        <Row>
          <Col span={24} style={{ marginTop: 16 }} />
          <Col span={4}>{label}</Col>
          <Col span={20}><Input defaultValue={keyValue} onChange={(e) => handleInputChange(key, e)} /></Col>
        </Row>
      )

    }

    if (keyType === "select") {
      const keyValue = itemObjectValue[key].value;
      const label = itemObjectValue[key].label;
      const option = itemObjectValue[key].option;
      return (
        <Row>
          <Col span={24} style={{ marginTop: 16 }} />
          <Col span={4}>{label}</Col>
          <Col span={20}>        <Select
            defaultValue={keyValue}
            style={{ width: 120 }}
            onChange={(value: string) => {
              handleChange(value, key)
            }}
            options={option} /></Col>
        </Row>

      )
    }

    if (keyType === "radio") {
      const keyValue = itemObjectValue[key].value;
      const option = itemObjectValue[key].option;
      const label = itemObjectValue[key].label;
      return (
        <Row>
          <Col span={24} style={{ marginTop: 16 }} />
          <Col span={4}>{label}</Col>
          <Col span={20}> <Radio.Group
          onChange={(e)=>{
            onChangeRaio(e,key)
          }} value={keyValue}
          >
            {
              option.map((item: any) => {
                return <Radio value={item.value}>{item.label}</Radio>
              })
            }
          </Radio.Group></Col>
        </Row>

      )
    }

    return (
      <Row>
        <Col span={24} style={{ marginTop: 16 }} />
        <Col span={24}>
          "item error"
        </Col>
      </Row>
    )

  }

  return (

    <Form
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 14 }}
      layout="horizontal"
      initialValues={{ size: componentSize }}
      onValuesChange={onFormLayoutChange}
      size={componentSize as SizeType}
      style={{ maxWidth: 600 }}
    >
      <Form.Item label="" name="size">
        {Object.keys(itemObjectValue).map((key) => (
          itemType(key)
        ))}
      </Form.Item>
      <Form.Item label="Button">
        <Button onClick={() => handleSubmit(changeValue)}>valueChange</Button>
      </Form.Item>
    </Form>
  );
};

export default CustomeForm;