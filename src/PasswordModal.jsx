import React from 'react';
import { FaTimes } from 'react-icons/fa';

function PasswordModal({ isOpen, onClose, onDecrypt, file }) {
    const [gpgPassword, setGpgPassword] = React.useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onDecrypt(file, gpgPassword);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-gopwd-gray text-white p-5 rounded-lg shadow-lg max-w-md w-full">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Decrypt File</h2>
                    <button onClick={onClose} className="text-xl p-1 rounded hover:bg-gray-200">
                        <FaTimes />
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                    <input
                        type="password"
                        value={gpgPassword}
                        onChange={(e) => setGpgPassword(e.target.value)}
                        placeholder="Enter GPG Password"
                        required
                        className="px-4 py-2 border border-white rounded shadow-sm text-black"
                    />
                    <button type="submit" className="px-4 py-2 text-white border rounded">Decrypt</button>
                </form>
            </div>
        </div>
    );
}

export default PasswordModal;