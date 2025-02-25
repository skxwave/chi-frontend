import { useState, ChangeEvent, FormEvent } from 'react';
import axiosClient from '../../api/axiosClient';
import axios from 'axios';
import Navbar from '../../components/Navbar';

interface FormData {
    username: string,
    email: string,
    password: string,
}

const Register: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        username: '',
        email: '',
        password: '',
    });

    const [message, setMessage] = useState<string>('');

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const response = await axiosClient.post('auth/register/', formData);
            setMessage('Register success!');
            console.log(response.data);
        } catch (error: unknown) {
            if (axios.isAxiosError(error) && error.response?.data) {
                const errorData = error.response.data;

                if (typeof errorData === 'object' && errorData !== null) {
                    const errorMessages = Object.entries(errorData)
                        .map(([field, messages]) => {
                            const messageText = Array.isArray(messages)
                                ? messages.join(', ')
                                : String(messages);
                            return `${field}: ${messageText}`;
                        })
                        .join(' | ');

                    setMessage(errorMessages);
                    return;
                }
            }
            setMessage('Something went wrong...');
        }
    };

    return(
        <>
            <Navbar />
            <div className="mx-auto max-w-lg p-6 bg-white shadow-lg rounded-2xl">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Register account</h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">Username</label>
                            <div className="mt-2">
                                <input  
                                    type="text"
                                    name="username"
                                    onChange={handleChange}
                                    value={formData.username}
                                    required
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">Email</label>
                            <div className="mt-2">
                                <input  
                                    type="email"
                                    name="email"
                                    onChange={handleChange}
                                    value={formData.email}
                                    required
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">Password</label>
                            <div className="mt-2">
                                <input
                                    type="password"
                                    name="password"
                                    onChange={handleChange}
                                    value={formData.password}
                                    required
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                />
                            </div>
                        </div>

                        <div>
                            <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mb-6">Register</button>
                            {message && <p style={{ color: "red" }}>{message}</p>}
                        </div>
                    </form>
                </div>
            </div>
        </>
    );

};

export default Register;