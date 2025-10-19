export function LoadingPopup({ isOpen, message = "Memproses..." }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>
            <div className="relative bg-white rounded-xl shadow-lg max-w-sm w-full mx-4 p-6 text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
                <p className="text-gray-600">{message}</p>
            </div>
        </div>
    );
}