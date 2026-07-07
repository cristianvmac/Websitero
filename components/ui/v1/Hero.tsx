import Image from 'next/image'
import Link from 'next/link'

const Hero = () => {
    return (
        <section id="hero" className="w-full bg-base-100 px-11 py-8 lg:py-20">
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-center gap-16 lg:gap-20">
                <div className="flex flex-col gap-10 lg:gap-14 items-center justify-center text-center lg:text-left lg:items-start">
                    <h1 className="font-extrabold text-4xl lg:text-6xl tracking-tight md:-mb-4 flex flex-col gap-3 items-center lg:items-start">
                        <span className="relative">Launch your website</span>
                        <span className="whitespace-nowrap relative">
                            <span className="mr-3 sm:mr-4 md:mr-5">in hours,</span>
                            <span className="relative whitespace-nowrap">
                                <span className="absolute bg-primary -left-2 -top-1 -bottom-1 -right-2 md:-left-3 md:top-0 md:bottom-0 md:-right-3 -rotate-1"></span>
                                <span className="relative text-primary-content">not days</span>
                            </span>
                        </span>
                    </h1> 
                    <p className="text-lg opacity-80 leading-relaxed">
                        The Eleventy boilerplate with all you need to build your website, deploy it and included Google Business Profile and SEO for your business.
                    </p>
                    <div className="space-y-4">
                        <Link
                            href="#cta"
                            className="btn btn-primary btn-wide rounded-full"
                            title="Get started with Websitero">
                            Get Websitero
                        </Link>
                    </div>
                </div>
                <div className="relative w-full lg:w-1/2 max-w-lg">
                    <Image
                        src="/images/hero-right-side.png"
                        width={1080}
                        height={1080}
                        alt="HTML + CSS + JS + SEO"
                        className="w-full h-auto"
                    />
                    {/* a video like in AdKit to explain */}
                </div>
            </div>
        </section>
    )
};

export default Hero;