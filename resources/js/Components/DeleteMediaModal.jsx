import { useState } from 'react';
import { router } from '@inertiajs/react';

export default function DeleteMediaModal({ isOpen, onClose, media, onSuccess }) {
    const [processing, setProcessing] = useState(false);
    
        const handleDelete = () => {
            setProcessing(true);
            router.delete(`/media/${media.id}`, {
                onSuccess: () => {
                    onSuccess();
                },
                onFinish: () => setProcessing(false),
            });
        };

    if (!isOpen || !media) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-[#111317] border-[#EBFFF2] border-2 p-8 sm:rounded-lg max-w-md w-full">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="font-fustat-medium text-2xl text-[#EBFFF2]">Delete Media</h2>
                    <button onClick={onClose} className="text-[#EBFFF2] hover:text-[#B5446E]">
                        <i className="fa fa-times fa-xl"></i>
                    </button>
                </div>

                <p className="text-[#EBFFF2] font-fustat-medium mb-6">
                    Are you sure you want to delete <span className="font-fustat-bold">"{media.file_name}"</span>? 
                    This action cannot be undone.
                </p>

                <div className="flex justify-end space-x-4">
                    <button
                        onClick={onClose}
                        disabled={processing}
                        className="justify-center flex items-center rounded-full border-2 border-[#B5446E] text-[#EBFFF2] px-8 py-2 text-md"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleDelete}
                        disabled={processing}
                        className="justify-center flex items-center rounded-full border border-transparent bg-[#872328] px-8 py-2 text-md text-[#EBFFF2]"
                    >
                        {processing ? 'Deleting...' : 'Delete Media'}
                    </button>
                </div>
            </div>
        </div>
    );
}