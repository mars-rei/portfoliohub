import { useForm } from '@inertiajs/react';
import { useEffect } from 'react';

import Checkbox from '@/Components/Checkbox';

export default function EditPortfolioModal({ isOpen, onClose, portfolio, industries, onSuccess }) {
    const { data, setData, put, processing, errors } = useForm({
        title: portfolio?.title || '',
        description: portfolio?.description || '',
        industry: portfolio?.industry || '',
        publish_status: portfolio?.publish_status || false,
    });

    useEffect(() => {
        if (portfolio) {
            setData({
                title: portfolio.title,
                description: portfolio.description,
                industry: portfolio.industry,
                publish_status: portfolio.publish_status,
            });
        }
    }, [portfolio]);

    const submit = (e) => {
        e.preventDefault();
        put(`/portfolios/${portfolio.id}`, {
            onSuccess: () => {
                onSuccess();
            },
        });
    };

    if (!isOpen || !portfolio) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-[#111317] border-[#EBFFF2] border-2 p-4 sm:rounded-lg sm:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="font-fustat-medium text-2xl text-[#EBFFF2]">
                        Edit Portfolio
                    </h2>
                    <button onClick={onClose} className="text-[#EBFFF2] hover:text-[#B5446E]">
                        <i className="fa fa-times fa-xl"></i>
                    </button>
                </div>

                <form onSubmit={submit} className="space-y-6">
                    {/* portfolio name */}
                    <div className="space-y-2">
                        <p className="text-xl text-[#EBFFF2]">
                            Title
                            <span className="text-[#B5446E]"> *</span>
                        </p>
                        <input
                            type="text"
                            value={data.title}
                            onChange={e => setData('title', e.target.value)}
                            className="text-[#EBFFF2] text-base font-fustat-medium bg-[#1F1F1F] w-full h-12 border-[#EBFFF2] border-2 rounded-md outline-none focus:outline-none focus:ring-0 focus:border-[#EBFFF2]"
                            placeholder="My Portfolio"
                            maxLength="60"
                        />
                        {errors.title && <div className="text-[#B5446E] text-sm mt-1">{errors.title}</div>}
                    </div>

                    {/* portfolio description */}
                    <div className="space-y-2">
                        <p className="text-xl text-[#EBFFF2]">
                            Description
                            <span className="text-[#B5446E]"> *</span>
                        </p>
                        <textarea
                            value={data.description}
                            onChange={e => setData('description', e.target.value)}
                            rows="4"
                            className="text-[#EBFFF2] text-base font-fustat-medium bg-[#1F1F1F] w-full h-28 border-[#EBFFF2] border-2 rounded-md outline-none focus:outline-none focus:ring-0 focus:border-[#EBFFF2]"
                            placeholder="Give your portfolio a description"
                            maxLength="500"
                        />
                        {errors.description && <div className="text-[#B5446E] text-sm mt-1">{errors.description}</div>}
                    </div>

                    {/* portfolio industry */}
                    <div className="space-y-2">
                        <p className="text-xl text-[#EBFFF2]">
                            Industry
                            <span className="text-[#B5446E]"> *</span>
                        </p>
                        <select
                            value={data.industry}
                            onChange={e => setData('industry', e.target.value)}
                            className="text-[#EBFFF2] text-base font-fustat-medium bg-[#1F1F1F] w-full h-12 border-[#EBFFF2] border-2 rounded-md outline-none focus:outline-none focus:ring-0 focus:border-[#EBFFF2]"
                        >
                            <option value="" className="">Select an industry</option>
                            {Object.entries(industries).map(([key, value]) => (
                                <option key={key} value={key}>
                                    {value}
                                </option>
                            ))}
                        </select>
                        {errors.industry && <div className="text-[#B5446E] text-sm mt-1">{errors.industry}</div>}
                    </div>

                    {/* publish status toggle */}
                    <div className="flex items-center space-x-2 text-[#EBFFF2]">
                        <Checkbox
                            name="remember"
                            id="publish_status"
                            checked={data.publish_status}
                            onChange={e => setData('publish_status', e.target.checked)}
                        />
                        <label htmlFor="publish_status">
                            Published
                        </label>
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
                            {processing ? 'Updating...' : 'Update Portfolio'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}