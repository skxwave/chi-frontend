import { useState } from 'react';
import axiosClient from '../../api/axiosClient';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });

    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosClient.post('/auth/register/', formData);
            setMessage('Register success!');
            console.log(response.data);
        } catch (error) {
            if (error.response && error.response.data) {
                const errorData = error.response.data;
                const errorMessages = Object.entries(errorData)
                    .map(([field, messages]) => `${field}: ${messages.join(', ')}`)
                    .join(' | ');
                setMessage(`${errorMessages}`);
            } else {
                setMessage('Something went wrong...');
            }
            console.error(error);
        }
    };

    return(
        <>
            <div className="mx-auto max-w-lg p-6 bg-white shadow-lg rounded-2xl">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Register account</h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label for="email" className="block text-sm/6 font-medium text-gray-900">Username</label>
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
                            <label for="email" className="block text-sm/6 font-medium text-gray-900">Email</label>
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
                            <label for="password" className="block text-sm/6 font-medium text-gray-900">Password</label>
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