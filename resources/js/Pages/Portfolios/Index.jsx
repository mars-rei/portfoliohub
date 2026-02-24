const Portfolios = ({ portfolios = [], onPortfolioClick, onCreateClick }) => {
    const portfolioCount = portfolios?.length || 0;
    const max_portfolios = 3;

    // custom icon for each industry to show on portfolio thumbnail
    const getIndustryIcon = (industry) => {
        const iconMap = {
            // visual arts
            'graphic_design': 'fa-bezier-curve',
            'illustration': 'fa-paint-brush',
            'animation': 'fa-person-walking',
            // 'comic_art': 'fa-paint-brush',
            // 'concept_art': 'fa-paint-brush',

            // digital design
            'ui/ux_design': 'fa-user-check',
            // 'web_design': 'fa-paint-brush',
            //'app_design': 'fa-window-restore',
            'software_design': 'fa-laptop-code',
            'game_design': 'fa-gamepad',
            // 'motion_graphics': 'fa-paint-brush',
            '3d_art/animation': 'fa-cube',

            // photography and video
            'photography': 'fa-camera',
            // 'videography': 'fa-paint-brush',
            'film_production': 'fa-film',
            // 'cinematography': 'fa-paint-brush',

            // fashion and beauty
            'fashion_design': 'fa-shirt',
            // 'textile_design': 'fa-paint-brush',
            // 'costume_design': 'fa-paint-brush',
            // 'makeup_artistry': 'fa-paint-brush',
            // 'hair_styling': 'fa-paint-brush',
            // 'jewellery_design': 'fa-paint-brush',

            // architecture
            'architecture': 'fa-archway',
            // 'interior_design': 'fa-paint-brush',
            // 'landscape_architecture': 'fa-paint-brush',

            // branding and marketing
            'product_design': 'fa-box-open',
            // 'brand_strategy': 'fa-paint-brush',
            'content_creation': 'fa-lightbulb',
            'marketing': 'fa-magnifying-glass-chart',
            'social_media_management': 'fa-hashtag',

            // publishing and creative writing
            'journalism': 'fa-book-newspaper',
            'screen_writing': 'fa-pen-clip',
            'creative_writing': 'fa-paint-book-bookmark',

            // crafts and trades
            // 'ceramics': 'fa-paint-brush',
            // 'woodworking': 'fa-paint-brush',
            // 'metalworking': 'fa-paint-brush',
            // 'glass_art': 'fa-paint-brush',
            // 'furniture_making': 'fa-paint-brush',
            // 'tattoo_artistry': 'fa-paint-brush',

            // culinary arts
            // 'culinary_arts': 'fa-paint-brush',
            // 'pastry_arts': 'fa-paint-brush',

            // performance arts
            // 'dance': 'fa-paint-brush',
            // 'theatre': 'fa-paint-brush',
            'music': 'fa-music',
            // 'choreography': 'fa-paint-brush',
        };

        // default icon for portfolio
        return iconMap[industry] || 'fa-briefcase';
    };

    const formatTimeAgo = (timestamp) => {
        if (!timestamp) return 'Recently';
        
        const now = new Date();
        const past = new Date(timestamp);
        const minsAgo = Math.floor((now - past) / (1000 * 60));
        
        if (minsAgo < 1) return 'Just now';
        if (minsAgo < 60) return `${minsAgo} min${minsAgo === 1 ? '' : 's'} ago`;
        
        const hoursAgo = Math.floor(minsAgo / 60);
        if (hoursAgo < 24) return `${hoursAgo} hour${hoursAgo === 1 ? '' : 's'} ago`;
        
        const daysAgo = Math.floor(hoursAgo / 24);
        return `${daysAgo} day${daysAgo === 1 ? '' : 's'} ago`;
    };

    const formatIndustry = (industry) => {
        return industry.split('_').map(word => 
            word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ');
    };

    if (portfolioCount === 0) {
        return (
            <div className="grid grid-cols-4 gap-8">
                <div 
                    onClick={onCreateClick}
                    className="w-full h-52 cursor-pointer"
                >
                    <div className="w-full h-40 bg-[#003C66] rounded-t-2xl flex items-center justify-center hover:bg-[#B5446E]">
                        <i className="text-[#EBFFF2] fa fa-plus fa-2x"></i>
                    </div>
                    <div className="w-full h-12 px-4 bg-[#EBFFF2] rounded-b-2xl flex items-center">
                        <p className="font-fustat-semibold text-[#111317]">Create new portfolio</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-4 gap-8">
            {portfolios.map((portfolio) => (
                <div 
                    key={portfolio.id} 
                    onClick={() => onPortfolioClick(portfolio)}
                    className="w-full h-52 cursor-pointer"
                >
                    <div className="w-full h-40 bg-[#003C66] hover:bg-[#B5446E] rounded-t-2xl flex items-center justify-center relative">
                        <i className={`text-[#EBFFF2] fa ${getIndustryIcon(portfolio.industry)} fa-3x`}></i>
                    </div>
                    <div className="w-full h-12 px-4 bg-[#EBFFF2] rounded-b-2xl flex justify-between items-center">
                        <div className="flex flex-col">
                            <p className="font-fustat-semibold text-sm truncate max-w-[100px] text-[#111317]">
                                {portfolio.title}
                            </p>
                            <p className="font-fustat-medium text-xs text-gray-600">
                                {formatIndustry(portfolio.industry)}
                            </p>
                        </div>
                        <div className="flex flex-col">
                            {portfolio.publish_status ? (
                                <p className="font-fustat-semibold text-sm">Published</p>
                            ) : (
                                <p className="font-fustat-semibold text-sm">Draft</p>
                            )}
                            <p className="text-xs font-fustat-medium text-gray-600">{formatTimeAgo(portfolio.updated_at)}</p>
                        </div>
                    </div>
                </div>
            ))}

            {portfolioCount < max_portfolios && (
                <div 
                    onClick={onCreateClick}
                    className="w-full h-52 cursor-pointer"
                >
                    <div className="w-full h-40 bg-[#003C66] rounded-t-2xl flex items-center justify-center hover:bg-[#B5446E] transition-colors">
                        <i className="text-[#EBFFF2] fa fa-plus fa-2x"></i>
                    </div>
                    <div className="w-full h-12 px-4 bg-[#EBFFF2] rounded-b-2xl flex items-center">
                        <p className="text-[#111317] font-fustat-semibold">Create new portfolio</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Portfolios;