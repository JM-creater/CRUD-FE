import { Employee } from "../models/Employee";
import { axiosIntance } from "./axiosInstance";

export const getEmployees = async (): Promise<Employee[]> => {
    const response = await axiosIntance.get('/employee');
    return response.data;
};

export const createEmployee = async (emp: Omit<Employee, 'id'>): Promise<Employee> => {
    const response = await axiosIntance.post('/employee', emp);
    return response.data;
};

export const updateEmployee = async (emp: Employee): Promise<Employee> => {
    const response = await axiosIntance.put(`/employee/${emp.id}`);
    return response.data;
};

export const deleteEmployee = async (id: number): Promise<void> => {
    await axiosIntance.delete(`/employee/${id}`);
};