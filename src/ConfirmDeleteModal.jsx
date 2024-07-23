
function ConfirmDeleteModal({ isOpen, onClose, onDelete, item }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-gopwd-gray text-white p-5 rounded-lg shadow-lg max-w-md w-full">
                <h2 className="font-bold text-lg mb-4">Confirm Delete</h2>
                <p className="mb-4">Are you sure you want to delete {item}? This action cannot be undone.</p>
                <div className="flex justify-end gap-4">
                    <button
                        className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button
                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                        onClick={() => onDelete(item)}
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ConfirmDeleteModal;