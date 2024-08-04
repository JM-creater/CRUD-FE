import { useEffect, useState } from 'react'
import { Employee } from '../models/Employee'
import { createEmployee, deleteEmployee, getEmployees, updateEmployee } from '../api/employeeApi';

const useEmployee = () => {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchEmployees = async () => {
            setLoading(true);
            try {
                const response = await getEmployees();
                setEmployees(response);
            } catch (error) {
                setError('Failed to catch employees');
            } finally {
                setLoading(false);
            }
        }

        fetchEmployees();
    }, []);

    const createNewEmployee = async (emp: Omit<Employee, 'id'>) => {
        setLoading(true);
        try {
            const newEmployee = await createEmployee(emp);
            setEmployees([...employees, newEmployee]);
        } catch (error) {
            setError('Failed to add employees');
        } finally {
            setLoading(false);
        }
    };

    const editEmployee = async (emp: Employee) => {
        setLoading(true);
        try {
            const response = await updateEmployee(emp);
            setEmployees(employees.map(e => (e.id === response.id ? response : e)));
        } catch (error) {
            setError('Failed to update employees');
        } finally {
            setLoading(false);
        }
    };

    const removeEmployee = async (id: number) => {
        setLoading(true);
        try {
            await deleteEmployee(id);
            setEmployees(employees.filter(e => e.id !== id));
        } catch (error) {
            setError('Failed to delete employees');
        } finally {
            setLoading(false);
        }
    };

    return {
        employees,
        loading,
        error,
        createNewEmployee,
        editEmployee,
        removeEmployee
    };
 
}

export default useEmployee