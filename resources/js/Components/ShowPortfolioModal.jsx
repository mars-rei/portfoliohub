export default function ShowPortfolioModal({ isOpen, onClose, portfolio, onEdit, onDelete }) {
    if (!isOpen || !portfolio) return null;

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const formatIndustry = (industry) => {
        return industry.split('_').map(word => 
            word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ');
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-[#111317] border-[#EBFFF2] border-2 p-4 sm:rounded-lg sm:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="font-fustat-medium text-2xl text-[#EBFFF2]">
                        {portfolio.title}
                    </h2>
                    <button onClick={onClose} className="text-[#EBFFF2] hover:text-[#B5446E]">
                        <i className="fa fa-times fa-xl"></i>
                    </button>
                </div>

                {/* portfolio preview - to configure and code still */}
                <div className="rounded-xl overflow-hidden mb-6">
                    <div className="h-96 bg-[#003C66] flex items-center justify-center">
                        <p className="text-[#EBFFF2] text-xl">Portfolio Preview</p>
                    </div>
                </div>

                {/* portfolio details */}
                <div className="grid grid-cols-2 gap-6 mb-6">
                    <div>
                        <p className="text-sm text-gray-400">Description</p>
                        <p className="text-[#EBFFF2] text-base font-fustat-medium">{portfolio.description}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-400">Industry</p>
                        <p className="text-[#EBFFF2] text-base font-fustat-medium">{formatIndustry(portfolio.industry)}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-400">Status</p>
                        <p className="text-[#EBFFF2] text-base font-fustat-medium">
                            {portfolio.publish_status ? 'Published' : 'Draft'}
                        </p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-400">Created</p>
                        <p className="text-[#EBFFF2] text-base font-fustat-medium">{formatDate(portfolio.created_at)}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-400">Last Updated</p>
                        <p className="text-[#EBFFF2] text-base font-fustat-medium">{formatDate(portfolio.updated_at)}</p>
                    </div>
                </div>

                {/* form buttons */}
                <div className="flex justify-end space-x-4">
                    <button
                        onClick={() => onDelete(portfolio)}
                        className="justify-center flex items-center rounded-full border border-transparent bg-[#872328] px-8 py-2 text-md text-[#EBFFF2]"
                    >
                        Delete
                    </button>
                    <button
                        onClick={() => window.location.href = `/portfolios/${portfolio.id}/build`}
                        className="justify-center flex items-center rounded-full border border-transparent bg-[#B5446E] px-8 py-2 text-md text-[#EBFFF2] disabled:opacity-25"
                    >
                        Open Builder
                    </button>
                    <button
                        onClick={() => onEdit(portfolio)}
                        className="justify-center flex items-center rounded-full border-2 border-[#B5446E] text-[#EBFFF2] px-8 py-2 text-md"
                    >
                        Edit Details
                    </button>
                </div>
            </div>
        </div>
    );
}