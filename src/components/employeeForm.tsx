import { useState } from "react";
import { Employee } from "../models/Employee";
import { Button, Form, Input, InputNumber } from "antd";

interface EmployeeFormProps {
    onSubmit: (emp: Omit<Employee, 'id'>) => void;
}

const EmployeeForm: React.FC<EmployeeFormProps> = ({ onSubmit }) => {
    const [name, setName] = useState<string>('');
    const [address, setAddress] = useState<string>('');
    const [salary, setSalary] = useState<number>(0);

    const handleSubmit = () => {
        onSubmit({ name, address, salary });
        setName('');
        setAddress('');
        setSalary(0);
    };

    return (
        <Form layout="vertical" onFinish={handleSubmit}>
            <Form.Item label="Name" required>
                <Input value={name} onChange={e => setName(e.target.value)} />
            </Form.Item>
            <Form.Item label="Address" required>
                <Input value={address} onChange={e => setAddress(e.target.value)} />
            </Form.Item>
            <Form.Item label="Salary" required>
                <InputNumber value={salary} onChange={e => setSalary(e ?? 0)} />
            </Form.Item>
            <Button type="primary" htmlType="submit">
                Add Item
            </Button>
        </Form>
    )
}

export default EmployeeForm;