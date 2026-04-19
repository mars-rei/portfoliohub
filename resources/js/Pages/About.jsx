import Layout from '@/Layouts/Layout';

export default function About() {
    return (
        <Layout>
            <div className="flex h-full bg-[#111317] text-[#ebfff2] p-20 flex-col space-y-12">
                <p className="font-fustat-bold text-2xl">Hi, I'm <span className="text-[#B5446E]">Mars</span>, and this is <span className="text-[#003c66]">PortfolioHub</span>!</p>

                <p className="font-fustat-medium text-lg">It is likely you have been directed here for the official testing for my Final Year Project, so here are the things I'd like you to note before you get started:</p>

                <div className="space-y-2">
                    <p className="font-fustat-semibold text-xl text-[#B5446E]">Usability Testing with Maze</p>
                    <p>Link <span><a href='https://t.maze.co/524868946' className="text-[#B5446E]">here</a></span> (available until the end of Sunday the 26th of April)</p>

                    <p className="pt-4">The link above will take you to a testing platform called Maze. Here, you will be asked to complete simple tasks such as registration and navigating this platform.</p>
                    <p className="pt-4">Maze will ask for your permission to share your screen to record snippets of you completing each task. Please allow screen sharing for these tasks; it'll help me get an insight into how you as users interact with my platform, and if there are any problems regarding navigability.</p>
                
                    <p className="pt-4">Please finish the Maze testing in the link above before reading onwards.</p>
                </div>

                <div className="space-y-2">
                    <p className="font-fustat-semibold text-xl text-[#B5446E]">Exploring PortfolioHub</p>
                    <p>In my email I ask you to take some time to play around with thebuilder and the platform in general.</p>

                    <p className="font-fustat-semibold text-lg text-[#B5446E] pt-6">Disclaimer!</p>
                    <p>As this platform is a prototype, there are still improvements to be made. Here is a table of things you should be aware of:</p>

                    <div className="flex justify-center bg-[#1f1f1f] rounded-lg p-8">
                        <table className="w-2/3 font-fustat-medium text-lg text-center">
                            <caption className="pb-4 font-fustat-semibold">
                                Functional Status of Core Components, Pages and Functions to be Improved
                            </caption>
                            <thead>
                                <tr className="text-[#B5446E] font-fustat-semibold">
                                    <th scope="col">Name</th>
                                    <th scope="col">Pros</th>
                                    <th scope="col">Cons</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="w-full">
                                    <th scope="row" className="w-1/5">Builder - Position of components</th>
                                    <td className="w-2/5 text-base">Components can be added to pages</td>
                                    <td className="w-2/5 text-base">There is an issue regarding position rendering - you may have to wait a second after adding each component to ensure the correct position (if you reload or check the preview it may have jumped)</td>
                                </tr>
                                <tr className="w-full">
                                    <th scope="row" className="w-1/5">Preview</th>
                                    <td className="w-2/5 text-base">Accurately shows position of compatible rendered components</td>
                                    <td className="w-2/5 text-base">If the size of your page is larger than your browser's size in pixels, the page will overflow (it shows the preview accurate to the pixel)</td>
                                </tr>
                                <tr className="w-full">
                                    <th scope="row" className="w-1/5">Slides</th>
                                    <td className="w-2/5 text-base">Can be added to canvas and users can choose media for this component</td>
                                    <td className="w-2/5 text-base">It was complex to put this into pure HTML, CSS, and JavaScript for download - if user downloads a portfolio containing the slides component, it will show as 'Error.'</td>
                                </tr>
                                <tr className="w-full">
                                    <th scope="row" className="w-1/5">Spotify Music Embed</th>
                                    <td className="w-2/5 text-base">Can be added to canvas and users can choose media for this component</td>
                                    <td className="w-2/5 text-base">It was complex to put this into pure HTML, CSS, and JavaScript for download - if user downloads a portfolio containing the Spotify music component, it will show as 'Error.'</td>
                                </tr>
                                <tr className="w-full">
                                    <th scope="row" className="w-1/5">Components</th>
                                    <td className="w-2/5 text-base">There are a range of customisable shapes, text and media to choose from</td>
                                    <td className="w-2/5 text-base">There was not enough time to add all of your suggestions in the initial questionnaire like I had hoped to so the range to choose from may seem quite limited</td>
                                </tr>
                                <tr className="w-full">
                                    <th scope="row" className="w-1/5">Industry Libraries</th>
                                    <td className="w-2/5 text-base">Initially intended to create component libraries tailored to participants' areas of study and expertise</td>
                                    <td className="w-2/5 text-base">Completing the core features such as the dashboard, builder, portfolio preview and download consumed most of this project's implementation time</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="space-y-2">
                    <p className="font-fustat-semibold text-xl text-[#B5446E]">The 'PortfolioHub - Final Year Project Feedback' Questionnaire</p>
                    <p>Link <span><a href='https://forms.office.com/e/uipeptwhfH' className="text-[#B5446E]">here</a></span> (available until the end of Sunday the 26th of April)</p>
                    <p>Please complete this form to the best of your ability!</p>

                    <p className="pt-4">If you've gotten this far, thank you so much again for helping test my Final Year Project! I wish you all the best!</p>
                </div>
                
            </div>
        </Layout>
    );
}