import Layout from '@/Layouts/Layout';

export default function About() {
    return (
        <Layout>
            <div className="flex h-full bg-[#111317] text-[#ebfff2] p-20 flex-col space-y-16">
                <p className="font-fustat-bold text-2xl">Hi, I'm <span className="text-[#B5446E]">Mars</span>, and this is <span className="text-[#003c66]">PortfolioHub</span>!</p>

                <p className="font-fustat-medium text-lg">It is likely you have been directed here for the official testing for my Final Year Project, so here are the instructions from my email in a bit more detail:</p>

                <div className="space-y-2">
                    <p className="font-fustat-semibold text-xl text-[#B5446E]">Usability Testing - 'PortfolioHub - Final Year Project Feedback' Questionnaire</p>

                    <p className="pt-4">In the first section of this questionnaire, you will be asked to based on your experience with completing the tasks below. You may want to duplicate this tab to come back to read each task.</p>

                    <p className="pt-4 font-fustat-semibold">1. Registration</p>
                    <p>Register for an account and verify your email. Make sure you can login or access the PortfolioHub dashboard. <span className="text-[#B5446E]">If you have problems doing so, please email me as soon as possible!</span></p>

                    <p className="pt-4 font-fustat-semibold">2. Profile settings</p>
                    <p>Try to find where the Profile Settings page is! Is it intuitive? Is there a place better suited to put this link? Note this down for a later question.</p>

                    <p className="pt-4 font-fustat-semibold">3. Creating a project</p>
                    <p>Create your first project!</p>

                    <p className="pt-4 font-fustat-semibold">4. Adding media to a project</p>
                    <p>Add a piece of media to your project (either a video or an image).</p>

                    <p className="pt-4 font-fustat-semibold">5. Creating a portfolio</p>
                    <p>Create a portfolio and have a little play with the builder so you have something to preview in the next task.</p>

                    <p className="pt-4 font-fustat-semibold">6. Previewing a portfolio</p>
                    <p>Preview the portfolio you have just made. Does the portfolio look exactly as it is portrayed in the builder? Note this down for a later question.</p>

                    <p className="pt-4 font-fustat-semibold">7. Downloading a portfolio</p>
                    <p>Now go back to the builder and download the portfolio. Did you find the download button easily? Does the portfolio zip file save to your device? If you unzip the folder and click on a html file in a browser, does it resemble a page that you have created? Note this down for a later question.</p>

                    <p className="pt-4">Answer <span><a href='https://forms.office.com/e/uipeptwhfH' className="text-[#B5446E]">here</a></span> (available until the end of Sunday the 26th of April)</p>
                
                    <p className="pt-4">Please come back to read onwards after finishing these tasks and question section.</p>
                </div>

                <div className="space-y-2">
                    <p className="font-fustat-semibold text-xl text-[#B5446E]">Exploring PortfolioHub</p>
                    <p>In my email I ask you to take some time to explore with the builder further and the platform in general.</p>

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
                                    <th scope="row" className="w-1/5">Links</th>
                                    <td className="w-2/5 text-base">Users can add external links with ease</td>
                                    <td className="w-2/5 text-base">Users cannot add links to other pages of their portfolio unless they download it and edit the link manually</td>
                                </tr>
                                <tr className="w-full">
                                    <th scope="row" className="w-1/5">Spotify Music Embed</th>
                                    <td className="w-2/5 text-base">Can be added to canvas and users can choose media for this component</td>
                                    <td className="w-2/5 text-base">If user downloads a portfolio containing the Spotify music component, it will show as 'Error.'</td>
                                </tr>
                                <tr className="w-full">
                                    <th scope="row" className="w-1/5">Media Uploads</th>
                                    <td className="w-2/5 text-base">Images and videos can be easily uploaded to project folders to be used as portfolio components</td>
                                    <td className="w-2/5 text-base">Cloud file storage is limited to 10MB for images and raw files, and 100MB for videos for each upload</td>
                                </tr>
                                <tr className="w-full">
                                    <th scope="row" className="w-1/5">Components</th>
                                    <td className="w-2/5 text-base">There are a range of customisable shapes, text and media to choose from</td>
                                    <td className="w-2/5 text-base">There was not enough time to add all of your suggestions from the initial questionnaire like I had hoped to so the range to choose from may seem quite limited</td>
                                </tr>
                                <tr className="w-full">
                                    <th scope="row" className="w-1/5">Industry Libraries</th>
                                    <td className="w-2/5 text-base">Initially intended to create component libraries tailored to participants' areas of study and expertise</td>
                                    <td className="w-2/5 text-base">Completing the core features such as the dashboard, builder, portfolio preview and downloads consumed most of this project's implementation time</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="space-y-2">
                    <p className="font-fustat-semibold text-xl text-[#B5446E]">The rest of the 'PortfolioHub - Final Year Project Feedback' Questionnaire</p>
                    <p>Please complete the rest of the form to the best of your ability!</p>

                    <p className="pt-4">If you've gotten this far, thank you so much again for helping test my Final Year Project! I wish you all the best!</p>
                </div>
                
            </div>
        </Layout>
    );
}