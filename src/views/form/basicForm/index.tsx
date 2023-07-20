import React, { useState } from 'react';
import { Form, Input, Typography, Space, Button } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

const { Paragraph } = Typography;

interface FieldData {
    name: string | number | (string | number)[];
    value?: any;
}

interface CustomizedFormProps {
    onChange: (fields: FieldData[]) => void;
    fields: FieldData[];
}

const CustomizedForm: React.FC<CustomizedFormProps> = ({ onChange, fields }) => (
    <Form
        name="global_state"
        layout="inline"
        // onFinish={onFinish}
        onFieldsChange={(_, allFields) => {
            onChange(allFields);
        }}
        fields={fields}
        style={{ maxWidth: 600 }}
        autoComplete="off"
    >
        <Form.List name="users">
            {(fields, { add, remove }) => (
                <>
                    {fields.map(({ key, name, ...restField }) => (
                        <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                            <Form.Item
                                {...restField}
                                name={[name, 'first']}
                                rules={[{ required: true, message: 'Missing first name' }]}
                            >
                                <Input placeholder="First Name" />
                            </Form.Item>
                            <Form.Item
                                {...restField}
                                name={[name, 'last']}
                                rules={[{ required: true, message: 'Missing last name' }]}
                            >
                                <Input placeholder="Last Name" />
                            </Form.Item>
                            <MinusCircleOutlined onClick={() => remove(name)} />
                        </Space>
                    ))}
                    <Form.Item>
                        <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                            Add field
                        </Button>
                    </Form.Item>
                </>
            )}
        </Form.List>
        <Form.Item>
            <Button type="primary" htmlType="submit">
                Submit
            </Button>
        </Form.Item>
    </Form>
    // <Form
    //     name="global_state"
    //     layout="inline"
    //     fields={fields}
    //     onFieldsChange={(_, allFields) => {
    //         onChange(allFields);
    //     }}
    // >
    //     <Form.Item
    //         name="username"
    //         label="Username"
    //         rules={[{ required: true, message: 'Username is required!' }]}
    //     >
    //         <Input />
    //     </Form.Item>
    // </Form>
);

const App: React.FC = () => {
    const [fields, setFields] = useState<FieldData[]>([{ name: ['username'], value: 'Ant Design' }]);

    return (
        <>
            <CustomizedForm
                fields={fields}
                onChange={(newFields) => {
                    setFields(newFields);
                }}
            />
            <Paragraph style={{ maxWidth: 440, marginTop: 24 }}>
                <pre style={{ border: 'none' }}>{JSON.stringify(fields, null, 2)}</pre>
            </Paragraph>
        </>
    );
};

export default App;