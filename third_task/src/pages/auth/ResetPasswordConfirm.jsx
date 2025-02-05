import { useState, useEffect } from 'react';
import axiosClient from '../../api/axiosClient';
import { useNavigate, useLocation } from 'react-router-dom';

const ResetPasswordConfirm = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const { search } = useLocation();

    const queryParams = new URLSearchParams(search);
    const token = queryParams.get('token');

    useEffect(() => {
        if (!token) {
            setMessage('Token is missing.');
        }
    }, [token]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axiosClient.post(
                '/auth/reset-password/confirm/', 
                { 
                    new_password: password,
                    confirm_password: confirmPassword,
                },
                { params: { token } },
            );

            setMessage('Your password has been successfully reset.');
            navigate('/login');
        } catch (error) {
            if (error.response && error.response.data) {
                const errorData = error.response.data;
                const errorMessages = Object.entries(errorData)
                    .map(([field, messages]) => `${field}: ${messages.join(', ')}`)
                    .join(' | ');
                setMessage(`${errorMessages}`);
            } else {
                setMessage('Something went wrong.');
            }
            setMessage('');
        }
    };

    return(
        <>
            <div className="mx-auto max-w-lg p-6 bg-white shadow-lg rounded-2xl">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Confirm New Password</h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" onSubmit={handleSubmit}>

                        <div>
                            <label for="email" className="block text-sm/6 font-medium text-gray-900">New Password</label>
                            <div className="mt-2">
                                <input  
                                    type="password"
                                    name="password"
                                    onChange={(e) => setPassword(e.target.value)}
                                    value={password}
                                    required
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                />
                            </div>
                        </div>

                        <div>
                            <label for="email" className="block text-sm/6 font-medium text-gray-900">Confirm password</label>
                            <div className="mt-2">
                                <input  
                                    type="password"
                                    name="password"
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    value={confirmPassword}
                                    required
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                />
                            </div>
                        </div>

                        <div>
                            <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mb-6">Reset Password</button>
                            {message && <p style={{ color: 'red' }}>{message}</p>}
                        </div>

                    </form>
                </div>
            </div>
        </>
    );

};

export default ResetPasswordConfirm;
