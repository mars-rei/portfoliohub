import { useForm } from '@inertiajs/react';
import { useEffect } from 'react';

export default function EditMediaModal({ isOpen, onClose, media, onSuccess }) {
    const { data, setData, put, processing, errors, reset } = useForm({
        caption: media?.caption || '',
    });

    useEffect(() => {
        if (media) {
            setData({
                caption: media.caption || '',
            });
        }
    }, [media]);

    useEffect(() => {
        if (!isOpen) {
            reset();
        }
    }, [isOpen]);

    const submit = (e) => {
        e.preventDefault();
        
        put(`/media/${media.id}`, {
            onSuccess: () => {
                onSuccess();
                onClose();
            }
        });
    };

    if (!isOpen || !media) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-[#111317] border-[#EBFFF2] border-2 p-4 sm:rounded-lg sm:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="font-fustat-medium text-2xl text-[#EBFFF2]">
                        Edit Media
                    </h2>
                    <button onClick={onClose} className="text-[#EBFFF2] hover:text-[#B5446E]">
                        <i className="fa fa-times fa-xl"></i>
                    </button>
                </div>

                <form onSubmit={submit} className="space-y-6">
                    <div className="space-y-2">
                        <p className="text-xl text-[#EBFFF2]">
                            Caption
                        </p>
                        <input
                            type="text"
                            value={data.caption}
                            onChange={e => setData('caption', e.target.value)}
                            className="text-[#EBFFF2] text-base font-fustat-medium bg-[#1F1F1F] w-full h-12 border-[#EBFFF2] border-2 rounded-md outline-none focus:outline-none focus:ring-0 focus:border-[#EBFFF2] px-3"
                            placeholder="Add a caption..."
                            maxLength="150"
                        />
                        {errors.caption && <div className="text-[#B5446E] text-sm mt-1">{errors.caption}</div>}
                        <div className="text-right text-[#EBFFF2] text-sm">
                            {data.caption?.length || 0}/150
                        </div>
                    </div>

                    {/* form buttons */}
                    <div className="flex justify-end space-x-4 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="justify-center flex items-center rounded-full border-2 border-[#B5446E] text-[#EBFFF2] px-8 py-2 text-md"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={processing}
                            className="justify-center flex items-center rounded-full border border-transparent bg-[#B5446E] px-8 py-2 text-md text-[#EBFFF2] disabled:opacity-25"
                        >
                            {processing ? 'Updating...' : 'Update media'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}