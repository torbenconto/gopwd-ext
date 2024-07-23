import React from 'react';

function PasswordModal({ isOpen, onClose, onDecrypt, file }) {
    const [gpgPassword, setGpgPassword] = React.useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onDecrypt(file, gpgPassword);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-gopwd-gray text-white p-5 rounded-lg shadow-lg max-w-sm w-full">
                <button onClick={onClose} className="mb-4 px-4 py-2 rounded border border-black">Back</button>
                <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                    <input
                        type="password"
                        value={gpgPassword}
                        onChange={(e) => setGpgPassword(e.target.value)}
                        placeholder="Enter GPG Password"
                        required
                        className="px-4 py-2 border border-white rounded shadow-sm"
                    />
                    <button type="submit" className="px-4 py-2 text-white border border-black rounded">Decrypt</button>
                </form>
            </div>
        </div>
    );
}

export default PasswordModal;