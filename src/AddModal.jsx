import { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import {generatePassword, insertPassword} from "./util/api.js";

function AddModal({ isOpen, onClose, host, port }) {
    const [activeTab, setActiveTab] = useState('create');
    const [service, setService] = useState('');
    const [password, setPassword] = useState('');
    const [length, setLength] = useState(16);
    const [humanized, setHumanized] = useState(false);
    const [symbols, setSymbols] = useState(true);
    const [numbers, setNumbers] = useState(true);
    const [lowercase, setLowercase] = useState(true);
    const [uppercase, setUppercase] = useState(true);

    if (!isOpen) return null;

    const handleGenerate = async (e) => {
        e.preventDefault();

        await generatePassword(host, port , service, length, humanized, symbols, numbers, lowercase, uppercase);
        onClose();
    }

    const handleCreate = async (e) => {
        e.preventDefault();

        await insertPassword(host, port, service, password);
        onClose();
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-gopwd-gray text-white p-5 rounded-lg shadow-lg max-w-md w-full">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Add Password</h2>
                    <button onClick={onClose} className="text-xl p-1 rounded">
                        <FaTimes/>
                    </button>
                </div>
                <div className="border-b border-gray-700">
                    <nav className="flex space-x-4" aria-label="Tabs">
                        <button
                            className={`px-3 py-2 font-medium text-sm rounded-t-lg ${activeTab === 'create' ? 'bg-gray-700 text-white' : 'text-gray-300 hover:text-white'}`}
                            onClick={() => setActiveTab('create')}
                        >
                            Create
                        </button>
                        <button
                            className={`px-3 py-2 font-medium text-sm rounded-t-lg ${activeTab === 'generate' ? 'bg-gray-700 text-white' : 'text-gray-300 hover:text-white'}`}
                            onClick={() => setActiveTab('generate')}
                        >
                            Generate
                        </button>
                    </nav>
                </div>
                <div className="mt-4">
                    {activeTab === 'create' && (
                        <form onSubmit={handleCreate} className="space-y-4">
                            <input
                                type="text"
                                value={service}
                                onChange={(e) => setService(e.target.value)}
                                placeholder="Service Name"
                                required
                                className="input-text w-full px-4 py-2 border border-gray-300 rounded shadow-sm text-black"
                            />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password"
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded shadow-sm text-black"
                            />
                            <button type="submit"
                                    className="w-full px-4 py-2 text-white border rounded">Save
                            </button>
                        </form>
                    )}
                    {activeTab === 'generate' && (
                        <form onSubmit={handleGenerate} className="space-y-4">
                            <input
                                type="text"
                                value={service}
                                onChange={(e) => setService(e.target.value)}
                                placeholder="Service Name"
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded shadow-sm text-black"
                            />
                            <div className="flex items-center space-x-2">
                                <label htmlFor="length" className="text-white">Length:</label>
                                <input
                                    id="length"
                                    type="range"
                                    min="8"
                                    max="128"
                                    value={length}
                                    onChange={(e) => setLength(parseInt(e.target.value, 10))}
                                    className="form-range h-2 w-full flex-1 cursor-pointer accent-blue-600"
                                />
                                <span className="text-white">{length}</span>
                            </div>
                            <div className="flex flex-col">
                                <label className="inline-flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={humanized}
                                        onChange={(e) => setHumanized(e.target.checked)}
                                        className="form-checkbox h-5 w-5 text-blue-600"
                                    /><span className="ml-2 text-white">Humanized</span>
                                </label>
                                <label className="inline-flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={symbols}
                                        onChange={(e) => setSymbols(e.target.checked)}
                                        className="form-checkbox h-5 w-5 text-blue-600"
                                    /><span className="ml-2 text-white">Symbols</span>
                                </label>
                                <label className="inline-flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={numbers}
                                        onChange={(e) => setNumbers(e.target.checked)}
                                        className="form-checkbox h-5 w-5 text-blue-600"
                                    /><span className="ml-2 text-white">Numbers</span>
                                </label>
                                <label className="inline-flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={lowercase}
                                        onChange={(e) => setLowercase(e.target.checked)}
                                        className="form-checkbox h-5 w-5 text-blue-600"
                                    /><span className="ml-2 text-white">Lowercase</span>
                                </label>
                                <label className="inline-flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={uppercase}
                                        onChange={(e) => setUppercase(e.target.checked)}
                                        className="form-checkbox h-5 w-5 text-blue-600"
                                    /><span className="ml-2 text-white">Uppercase</span>
                                </label>
                            </div>
                            <button type="submit"
                                    className="w-full px-4 py-2 text-white border rounded">Generate
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}

export default AddModal;