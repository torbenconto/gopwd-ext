import {decryptPassword, deletePassword, fetchPasswords} from "./util/api.js";
import {useEffect, useState} from "react";
import PasswordModal from "./PasswordModal.jsx";
import ResultModal from "./ResultModal.jsx";
import {FaFolder, FaKey, FaPlus, FaTrash} from 'react-icons/fa';
import ConfirmDeleteModal from "./ConfirmDeleteModal.jsx";
import AddModal from "./AddModal.jsx";

function Directory({ directory, children, level }) {
    const [isOpen, setIsOpen] = useState(false);
    const indentStyle = { marginLeft: `${level * 20}px` };

    return (
        <div className="w-full py-2 px-4 border border-l-0 border-r-0" style={indentStyle}>
            <p className="flex items-center" onClick={() => setIsOpen(!isOpen)}>
                <span className="mr-2">
                    <FaFolder />
                </span>
                {directory}
            </p>
            {isOpen && <div>{children}</div>}
        </div>
    );
}

function ListPasswords({ host, port }) {
    const [decryptedPassword, setDecryptedPassword] = useState('');
    const [passwords, setPasswords] = useState([]);
    const [directoryStructure, setDirectoryStructure] = useState({});
    const [passwordModalOpen, setPasswordModalOpen] = useState(false);
    const [selectedFile, setSelectedFile] = useState('');
    const [showModalOpen, setShowModalOpen] = useState(false);
    const [confirmDeleteModalOpen, setConfirmDeleteModalOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState('');
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);


    useEffect(() => {
        async function doFetchPasswords() {
            const response = await fetchPasswords();
            setPasswords(response);
            const structure = buildDirectoryStructure(response);
            setDirectoryStructure(structure);
        }

        doFetchPasswords();
    }, []);

    const handleFileClick = (fullPath) => {
        setSelectedFile(fullPath);
        setPasswordModalOpen(true);
    };

    const handleDeleteClick = (fullPath, event) => {
        event.stopPropagation();  // Prevents the event from bubbling up
        setItemToDelete(fullPath);
        setConfirmDeleteModalOpen(true);
    };

    const refreshPasswords = async () => {
        const response = await fetchPasswords();
        setPasswords(response);
        const structure = buildDirectoryStructure(response);
        setDirectoryStructure(structure);
    }

    const confirmDelete = async () => {
        await deletePassword(host, port, itemToDelete);
        setConfirmDeleteModalOpen(false);
        // Refetch passwords to update the list
        const response = await fetchPasswords();
        setPasswords(response);
        const structure = buildDirectoryStructure(response);
        setDirectoryStructure(structure);
    };

    const toggleAddModal = () => setIsAddModalOpen(!isAddModalOpen);


    function buildDirectoryStructure(passwords) {
        const root = {};
        passwords.forEach((fullPath) => {
            const parts = fullPath.split('/');
            let current = root;
            parts.forEach((part, index) => {
                if (index === parts.length - 1) {
                    if (!current["files"]) {
                        current["files"] = [];
                    }
                    // Store the full path instead of just the part
                    current["files"].push(fullPath);
                } else {
                    if (!current[part]) {
                        current[part] = {};
                    }
                    current = current[part];
                }
            });
        });
        return root;
    }

    const handleDecrypt = async (file, password) => {
        setDecryptedPassword(await decryptPassword(host, port, file, password));
        setPasswordModalOpen(false);
        setShowModalOpen(true);
    }

    function renderDirectory(directory, contents, level = 0) {
        const elements = [];

        // Render files if present
        if (contents.files) {
            contents.files.forEach(fullPath => {
                elements.push(
                    <div key={fullPath} className="flex items-center px-4 py-2" style={{marginLeft: `${level * 20}px`}}
                         onClick={() => handleFileClick(fullPath)}>
                        <span className="mr-2"><FaKey/></span>
                        <span className="truncate">{fullPath.split('/').pop()}</span>
                        <div className="ml-auto flex">
                            <span onClick={(event) => handleDeleteClick(fullPath, event)}><FaTrash/></span>
                        </div>
                    </div>
                );
            });
        }

        // Recursively render subdirectories
        Object.entries(contents).forEach(([dir, cont]) => {
            if (dir !== "files") {
                elements.push(
                    <Directory key={dir} directory={dir} level={level}>
                        {renderDirectory(dir, cont, level + 1)}
                    </Directory>
                );
            }
        });

        return <>{elements}</>;
    }

    return (
        <div className="bg-gopwd-gray scrollable-container">
            {renderDirectory(null, directoryStructure)}
            <PasswordModal
                isOpen={passwordModalOpen}
                onClose={() => setPasswordModalOpen(false)}
                onDecrypt={handleDecrypt}
                file={selectedFile}
            />
            <ResultModal
                isOpen={showModalOpen}
                onClose={() => setShowModalOpen(false)}
                password={decryptedPassword}
            />
            <ConfirmDeleteModal
                isOpen={confirmDeleteModalOpen}
                onClose={() => setConfirmDeleteModalOpen(false)}
                onDelete={confirmDelete}
                item={itemToDelete}
            />
            <div className="fixed right-1 bottom-1 text-xl p-4" onClick={toggleAddModal}>
                <FaPlus />
            </div>
            <AddModal isOpen={isAddModalOpen} onClose={() => {setIsAddModalOpen(false); refreshPasswords()}} />
        </div>
    );
}

export default ListPasswords;
