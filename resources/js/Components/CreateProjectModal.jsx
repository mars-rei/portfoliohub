import { useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';

export default function CreateProjectModal({ isOpen, onClose, onSuccess }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        title: '',
        description: '',
        started_on: '',
        ended_on: '',
    });

    const [isCurrentlyWorking, setIsCurrentlyWorking] = useState(false);

    useEffect(() => {
        if (!isOpen) {
            reset();
            setIsCurrentlyWorking(false);
        }
    }, [isOpen]);

    const handleCurrentlyWorkingChange = (e) => {
        const checked = e.target.checked;
        setIsCurrentlyWorking(checked);
        if (checked) {
            setData('ended_on', '');
        }
    };

    const submit = (e) => {
        e.preventDefault();
        
        if (isCurrentlyWorking) {
            setData('ended_on', null);
        }
        
        post('/projects', {
            onSuccess: () => {
                onSuccess();
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
                        Create New Project
                    </h2>
                    <button onClick={onClose} className="text-[#EBFFF2] hover:text-[#B5446E]">
                        <i className="fa fa-times fa-xl"></i>
                    </button>
                </div>

                <form onSubmit={submit} className="space-y-4">
                    {/* project name */}
                    <div className="space-y-2">
                        <p className="text-xl text-[#EBFFF2]">
                            Title
                            <span className="text-[#B5446E]"> *</span>
                        </p>
                        <input
                            type="text"
                            value={data.title}
                            onChange={e => setData('title', e.target.value)}
                            className="text-[#EBFFF2] text-base font-fustat-medium bg-[#1F1F1F] w-full h-12 border-[#EBFFF2] border-2 rounded-md outline-none focus:outline-none focus:ring-0 focus:border-[#EBFFF2] px-3"
                            placeholder="My Project"
                            maxLength="60"
                        />
                        {errors.title && <div className="text-[#B5446E] text-sm mt-1">{errors.title}</div>}
                        <div className="text-right text-[#EBFFF2] text-sm">
                            {data.title.length}/60
                        </div>
                    </div>

                    {/* project description */}
                    <div className="space-y-2">
                        <p className="text-xl text-[#EBFFF2]">
                            Description
                            <span className="text-[#B5446E]"> *</span>
                        </p>
                        <textarea
                            value={data.description}
                            onChange={e => setData('description', e.target.value)}
                            rows="4"
                            className="text-[#EBFFF2] text-base font-fustat-medium bg-[#1F1F1F] w-full h-28 border-[#EBFFF2] border-2 rounded-md outline-none focus:outline-none focus:ring-0 focus:border-[#EBFFF2] px-3 py-2"
                            placeholder="Give your project a description"
                            maxLength="500"
                        />
                        {errors.description && <div className="text-[#B5446E] text-sm mt-1">{errors.description}</div>}
                        <div className="text-right text-[#EBFFF2] text-sm">
                            {data.description.length}/500
                        </div>
                    </div>

                    {/* checkbox if user is currently working on project */}
                    <div className="flex items-center space-x-2 mt-4">
                        <input
                            type="checkbox"
                            id="currentlyWorking"
                            checked={isCurrentlyWorking}
                            onChange={handleCurrentlyWorkingChange}
                            className="w-5 h-5 bg-[#1F1F1F] border-[#EBFFF2] border-2 rounded text-[#B5446E] focus:ring-[#B5446E] focus:ring-offset-0 focus:ring-1"
                        />
                        <label htmlFor="currentlyWorking" className="text-[#EBFFF2] text-lg">
                            I'm currently working on this project
                        </label>
                    </div>

                    {/* started on */}
                    <div className="space-y-2">
                        <p className="text-xl text-[#EBFFF2]">
                            Started On
                            <span className="text-[#B5446E]"> *</span>
                        </p>
                        <input
                            type="date"
                            value={data.started_on}
                            onChange={e => setData('started_on', e.target.value)}
                            className="text-[#EBFFF2] text-base font-fustat-medium bg-[#1F1F1F] w-full h-12 border-[#EBFFF2] border-2 rounded-md outline-none focus:outline-none focus:ring-0 focus:border-[#EBFFF2] px-3"
                        />
                        {errors.started_on && <div className="text-[#B5446E] text-sm mt-1">{errors.started_on}</div>}
                    </div>

                    {/* ended on */}
                    <div className="space-y-2">
                        <p className="text-xl text-[#EBFFF2]">
                            Ended On
                        </p>
                        <input
                            type="date"
                            value={data.ended_on}
                            onChange={e => setData('ended_on', e.target.value)}
                            disabled={isCurrentlyWorking}
                            className={`text-[#EBFFF2] text-base font-fustat-medium bg-[#1F1F1F] w-full h-12 border-[#EBFFF2] border-2 rounded-md outline-none focus:outline-none focus:ring-0 focus:border-[#EBFFF2] px-3 ${
                                isCurrentlyWorking ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                        />
                        {errors.ended_on && !isCurrentlyWorking && (
                            <div className="text-[#B5446E] text-sm mt-1">{errors.ended_on}</div>
                        )}
                    </div>

                    {/* form buttons */}
                    <div className="flex justify-end space-x-4 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="justify-center flex items-center rounded-full border-2 border-[#B5446E] text-[#EBFFF2] px-8 py-2 text-md hover:bg-[#B5446E] hover:text-[#EBFFF2] transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={processing}
                            className="justify-center flex items-center rounded-full border border-transparent bg-[#B5446E] px-8 py-2 text-md text-[#EBFFF2] disabled:opacity-25 hover:bg-[#903b58] transition-colors"
                        >
                            {processing ? 'Creating...' : 'Create Project'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}