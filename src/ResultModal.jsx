import React from 'react';
import QRCode from 'qrcode.react';
import { FaTimes } from 'react-icons/fa';

function ResultModal({ isOpen, onClose, password }) {
    const [activeTab, setActiveTab] = React.useState('plaintext');

    if (!isOpen) return null;

    const copyToClipboard = () => {
        navigator.clipboard.writeText(password);
        alert('Password copied to clipboard!');
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-gopwd-gray text-white p-5 rounded-lg shadow-lg max-w-md w-full">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Result</h2>
                    <button onClick={onClose} className="text-xl p-1 rounded">
                        <FaTimes />
                    </button>
                </div>
                <div className="border border-gray-700">
                    <nav className="flex space-x-4" aria-label="Tabs">
                        <button
                            className={`px-3 py-2 font-medium text-sm rounded-t-lg ${activeTab === 'plaintext' ? 'bg-gray-700 text-white' : 'text-gray-300 hover:text-white'}`}
                            onClick={() => setActiveTab('plaintext')}
                        >
                            Plaintext
                        </button>
                        <button
                            className={`px-3 py-2 font-medium text-sm rounded-t-lg ${activeTab === 'copy' ? 'bg-gray-700 text-white' : 'text-gray-300 hover:text-white'}`}
                            onClick={() => setActiveTab('copy')}
                        >
                            Copy
                        </button>
                        <button
                            className={`px-3 py-2 font-medium text-sm rounded-t-lg ${activeTab === 'qr' ? 'bg-gray-700 text-white' : 'text-gray-300 hover:text-white'}`}
                            onClick={() => setActiveTab('qr')}
                        >
                            QR Code
                        </button>
                    </nav>
                </div>
                <div className="mt-4">
                    {activeTab === 'plaintext' && (
                        <textarea
                            readOnly
                            className="w-full h-32 p-2 text-black border-none rounded"
                            value={password}
                        ></textarea>
                    )}
                    {activeTab === 'copy' && <button onClick={copyToClipboard} className="px-4 py-2 border border-white rounded">Copy to Clipboard</button>}
                    {activeTab === 'qr' && <QRCode value={password} />}
                </div>
            </div>
        </div>
    );
}

export default ResultModal;