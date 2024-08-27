import React, { useRef, useState } from 'react';
import CustomForm from '@/components/CustomeForm';

const ComponentCreate: React.FC<unknown> = () => {

    const itemObject = {
        item1: {
            type: "input",
            label: "项目1",
            value:"text1 input"
        }, item2: {
            type: "select",
            label: "项目2",
            option: [
                {
                    value: 'jack',
                    label: 'Jack',
                },
                {
                    value: 'lucy',
                    label: 'Lucy',
                },
                {
                    value: 'tom',
                    label: 'Tom',
                },
            ],
            value:''
        }, item3: {
            type: "radio",
            label: "项目3",
            option:  [{
                label: "radio",
                value: "radio"
            }, {
                label: "radio1",
                value: "radio1"
            }, {
                label: "radio2",
                value: "radio2"
            }],
            value:''
        }
    }

    const [itemObjectValue, setItemObjectValue] = useState<Record<string, any>>({});
    const changeVlaue = (itemObjectValue: any) => {
        console.log(itemObjectValue);
        setItemObjectValue(itemObjectValue)
    };
    return (
        <div>
            <div>传递值</div>
            <div style={{ marginBottom: 16 }}>{JSON.stringify(itemObject)}</div>
            <div>修改值</div>
            <div>{JSON.stringify(itemObjectValue)}</div>
            <CustomForm itemObject={itemObject} onSubmit={changeVlaue} />
        </div>

    );
};

export default ComponentCreate;
