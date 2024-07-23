import React from 'react';
import QRCode from 'qrcode.react';

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
                <button onClick={onClose} className="mb-4 px-4 py-2 rounded border border-white">Close</button>
                <div className="flex justify-around mb-4">
                    <button onClick={() => setActiveTab('plaintext')} className="px-4 py-2 rounded border border-white">Plaintext</button>
                    <button onClick={() => setActiveTab('copy')} className="px-4 py-2 rounded border border-white">Copy</button>
                    <button onClick={() => setActiveTab('qr')} className="px-4 py-2 rounded border border-white">QR Code</button>
                </div>
                {activeTab === 'plaintext' && <p>{password}</p>}
                {activeTab === 'copy' && <button onClick={copyToClipboard} className="px-4 py-2 text-black border border-white rounded">Copy to Clipboard</button>}
                {activeTab === 'qr' && <QRCode value={password} />}
            </div>
        </div>
    );
}

export default ResultModal;