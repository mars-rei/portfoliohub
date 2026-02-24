import { useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';

export default function CreateMediaModal({ isOpen, onClose, onUpload, selectedProjectId }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        caption: '',
        file: null,
        project_id: selectedProjectId || null,
    });

    const [preview, setPreview] = useState(null);

    useEffect(() => {
        if (!isOpen) {
            reset();
            setPreview(null);
        }
    }, [isOpen]);

    useEffect(() => {
        setData('project_id', selectedProjectId || null);
    }, [selectedProjectId]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setData('file', file);
        
        if (file && file.type.startsWith('image/')) {
            setPreview(URL.createObjectURL(file));
        } else {
            setPreview(null);
        }
    };

    const submit = (e) => {
        e.preventDefault();
        post('/media', {
            forceFormData: true,
            onSuccess: () => {
                onUpload();
                onClose();
            }
        });
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-[#111317] border-[#EBFFF2] border-2 p-4 sm:rounded-lg sm:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="font-fustat-medium text-2xl text-[#EBFFF2]">
                        Upload New Media
                    </h2>
                    <button onClick={onClose} className="text-[#EBFFF2] hover:text-[#B5446E]">
                        <i className="fa fa-times fa-xl"></i>
                    </button>
                </div>

                <form onSubmit={submit} className="space-y-4" encType="multipart/form-data">
                    {/* caption */}
                    <div className="space-y-2">
                        <p className="text-xl text-[#EBFFF2]">
                            Caption
                            <span className="text-[#B5446E]"> *</span>
                        </p>
                        <input
                            type="text"
                            value={data.caption}
                            onChange={e => setData('caption', e.target.value)}
                            className="text-[#EBFFF2] text-base font-fustat-medium bg-[#1F1F1F] w-full h-12 border-[#EBFFF2] border-2 rounded-md outline-none focus:outline-none focus:ring-0 focus:border-[#EBFFF2] px-3"
                            placeholder="Add a caption..."
                            maxLength="150"
                            required
                        />
                        {errors.caption && <div className="text-[#B5446E] text-sm mt-1">{errors.caption}</div>}
                        <div className="text-right text-[#EBFFF2] text-sm">
                            {data.caption?.length || 0}/150
                        </div>
                    </div>

                    {/* file upload */}
                    <div className="space-y-2">
                        <p className="text-xl text-[#EBFFF2]">
                            Choose File
                            <span className="text-[#B5446E]"> *</span>
                        </p>
                        
                        <div className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors
                            ${data.file ? 'border-[#B5446E] bg-[#1F1F1F]' : 'border-[#EBFFF2] hover:border-[#B5446E]'}`}
                        >
                            <input
                                type="file"
                                id="file"
                                onChange={handleFileChange}
                                className="hidden"
                                required
                            />
                            
                            {!data.file ? (
                                <label htmlFor="file" className="cursor-pointer block">
                                    <i className="fa fa-cloud-upload-alt text-4xl text-[#EBFFF2] mb-3"></i>
                                    <p className="text-[#EBFFF2]">Click to select a file</p>
                                    <p className="text-sm text-gray-400 mt-1">Or drag and drop it here</p>
                                </label>
                            ) : (
                                <div className="space-y-4">
                                    {preview ? (
                                        <img 
                                            src={preview} 
                                            alt="Preview" 
                                            className="max-h-48 mx-auto"
                                        />
                                    ) : (
                                        <div className="fa fa-file fa-4x text-[#EBFFF2]"></div>
                                    )}
                                    <div>
                                        <p className="font-medium text-[#EBFFF2]">{data.file.name}</p>
                                        <p className="text-sm text-gray-400">
                                            {(data.file.size / 1024).toFixed(2)} KB
                                        </p>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setData('file', null);
                                            setPreview(null);
                                            document.getElementById('file').value = '';
                                        }}
                                        className="text-base text-[#B5446E]"
                                    >
                                        Choose a different file
                                    </button>
                                </div>
                            )}
                        </div>
                        {errors.file && <div className="text-[#B5446E] text-sm mt-1">{errors.file}</div>}
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
                            disabled={processing || !data.file}
                            className={`justify-center flex items-center rounded-full border border-transparent px-8 py-2 text-md text-[#EBFFF2] ${
                                processing || !data.file
                                    ? 'bg-gray-600 opacity-50 cursor-not-allowed'
                                    : 'bg-[#B5446E]'
                            }`}
                        >
                            {processing ? 'Uploading...' : 'Upload Media'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}