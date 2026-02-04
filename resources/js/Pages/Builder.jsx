export default function Builder() {
    return (
        <>
            <div>
                <div className="h-screen w-screen flex flex-row">
                    <div className="w-1/6 flex flex-col justify-between">
                        <div className="flex flex-row items-center w-full px-4 h-20 text-lg font-fustat-bold space-x-2 justify-between">
                            <div className="flex flex-row items-center space-x-2">
                            <i className="fa fa-xl fa-briefcase text-[#003c66]"></i>
                            <p>art</p>
                            </div>
                            <i className="fa fa-circle-user text-[#B5446E] fa-xl"></i>
                        </div>
                        <div className="h-full space-y-4 p-4 border-[#111317] border-y-2">

                            <div className="flex flex-row items-center w-full px-4 py-1 border-2 border-[#111317] rounded-md text-lg font-fustat-medium space-x-2">
                                <i className="fa fa-search fa-sm"></i>
                                <p>Search</p>
                            </div>

                            <div className="space-y-2 text-lg font-fustat-semibold">
                            <p>Layers</p>
                            <div className="text-base font-fustat-medium">
                                <p>Home</p>
                            </div>
                            </div>
                        </div>
                        <div className="flex flex-row items-center w-full px-4 py-2 text-lg font-fustat-medium space-x-2">
                            <i className="fa fa-folder fa-sm"></i>
                            <p>Project Media</p>
                        </div>
                        <div className="flex flex-row items-center w-full px-4 py-2 border-t-2 border-[#111317] text-lg font-fustat-medium space-x-2">
                            <i className="fa fa-shapes fa-sm"></i>
                            <p>Component Libraries</p>
                        </div>
                    </div>

                    <div className="w-2/3 h-full bg-[#111317] flex items-center justify-center">
                        <div className="w-216 flex flex-col space-y-2 text-[#EBFFF2] font-fustat-medium text-md">
                            <div className="w-full flex flex-row justify-between">
                                <p>Home</p>
                                <p>720 x 480</p>
                            </div>
                            <div className="w-216 h-144 bg-[#B5446E]"></div>
                        </div>
                    </div>

                    <div className="w-1/6 flex flex-col">
                        <div className="flex flex-row items-center w-full px-4 h-20 justify-between">
                            <div className="rounded-full px-4 h-8 text-md bg-[#B5446E] text-[#EBFFF2] font-fustat-medium items-center justify-center flex">
                            Publish Portfolio
                            </div>
                            <div className="rounded-full px-4 h-8 border-[#B5446E] border-2 text-[#B5446E] font-fustat-medium items-center justify-center flex">
                            <i className="fa fa-download fa-md"></i>
                            </div>
                        </div>
                        <div className="h-full space-y-4 p-4 border-[#111317] border-t-2">
                            <div className="space-y-2 text-lg font-fustat-semibold">
                            <p>Canvas</p>
                            <div className="flex flex-row items-center w-full px-2 py-1 border-2 border-[#111317] rounded-md text-base font-fustat-medium space-x-2">
                                <i className="fa fa-square fa-lg"></i>
                                <p>1F1F1F</p>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="relative">
                    <div className="w-1/3 absolute left-1/2 -translate-x-1/2 bottom-8">
                        <div className="py-2 px-8 bg-[#EBFFF2] text-[#1F1F1F] flex items-center justify-between rounded-2xl fa-xl">
                            <i className="fa fa-arrow-pointer"></i>
                            <i className="fa fa-hand"></i>
                            <i className="fa fa-file-circle-plus"></i>
                            <i className="fa fa-draw-polygon"></i>
                            <i className="fa fa-font"></i>

                            <div class="inline-block h-full min-h-[2em] w-1 self-stretch bg-[#1F1F1F] rounded-full"></div>

                            <div className="flex flex-row items-center px-2 py-1 border-3 border-[#111317] rounded-md text-lg font-fustat-semibold space-x-2">
                            <i className="fa-solid fa-magnifying-glass fa-sm"></i>
                            <p>60%</p>
                            </div>
                            <i className="fa fa-moon"></i>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}