




const Performance = () => {


    return (
        <section id="performance" className="bg-base-100">
            <div className="py-12 max-md:px-8 max-w-3xl mx-auto md:space-y-8 space-y-6">
               <div className="mx-auto text-center flex justify-center"> 
                    <div className="relative">
                        {/* logo  */}
                        Boilerplate
                    </div>
                </div> 
            </div>
            <p className="text-center text-3xl md:text-4xl mt-5">+</p>
            <div className="flex flex-wrap justify-center gap-4 relative">
                <div className="relative" data-tooltip-id="tooltip" data-tooltip-content="Github Copilot">
                    {/*icon HTML  de exemplu */}
                </div>
                <div className="relative" data-tooltip-id="tooltip" data-tooltip-content="Github Copilot">
                    {/*icon CSS  de exemplu */}
                </div>
                <div className="relative" data-tooltip-id="tooltip" data-tooltip-content="Github Copilot">
                    {/*icon JS  de exemplu */}
                </div>
                <div className="relative" data-tooltip-id="tooltip" data-tooltip-content="Github Copilot">
                    {/*icon Namecheap  de exemplu */}
                </div>
                <div className="relative" data-tooltip-id="tooltip" data-tooltip-content="Github Copilot">
                    {/*icon Netlify  de exemplu */}
                </div>
                <div className="relative" data-tooltip-id="tooltip" data-tooltip-content="Github Copilot">
                    {/*icon Mobile First  de exemplu */}
                </div>
                <div className="relative" data-tooltip-id="tooltip" data-tooltip-content="Github Copilot">
                    {/*icon SEO  de exemplu */}
                </div>
            </div>
            <p className="text-center text-3xl md:text-4xl">=</p>
            <div className="mx-auto text-center">
                <p className="text-center text-2xl md:text-4xl font-bold">
                    Launch your website 
                    <span className="text-primary-content bg-primary px-1 md:px-1.5 tracking-wide">
                        INSTANTLY
                    </span>
                </p>
                {/* Image Performance 100 scores */}
            </div>
        </section>
    )
};

export default Performance;