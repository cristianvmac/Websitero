import Link from 'next/link';
import { LuChevronRight } from "react-icons/lu";

export default function Tutorials() {
    return (
        <div className="min-h-full p-12">
            <div className="max-w-3xl ml-6 text-center">
                {/* Breadcrumb */}
                <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-x-1 gap-y-1 text-base font-normal text-slate-900 text-left">
                    <Link href="/docs/astro" className="rounded-full py-1 hover:text-slate-600 hover:underline">
                        Astro
                    </Link>
                    <span><LuChevronRight /></span>
                    <span aria-current="page">Tutorials</span>
                </nav>
                <span className="inline-flex items-center rounded-full bg-slate-200 px-4 py-1 text-sm font-medium text-slate-700 mb-6">
                    Step-by-Step Guides
                </span>

                <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                    Learn by Doing
                </h1>

                <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto">
                    Follow practical tutorials that walk you through setup,
                    deployment, and advanced features.    
                </p>
                <p className="text-lg md:text-xxl text-slate-600 max-w-3xl mx-auto mt-20 mb-4">
                    Launch your first project
                    in minutes and gain confidence as you build.
                </p>

                <Link
                    href="/tutorials/build-in-5-minutes"
                    className="inline-flex items-center px-8 py-3 bg-blue-50 text-slate-700 rounded-lg text-base font-medium hover:opacity-90 transition"
                >
                    Get Started
                </Link>
            </div>
        </div>
    );
}