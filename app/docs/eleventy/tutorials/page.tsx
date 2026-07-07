import Link from 'next/link';

export default function Tutorials() {
    return (
        <section className="bg-gray-50 py-32 px-12">
            <div className="max-w-5xl mx-auto text-center">
                <span className="inline-flex items-center rounded-full bg-gray-200 px-4 py-1 text-sm font-medium text-gray-700 mb-6">
                    Step-by-Step Guides
                </span>

                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                    Learn by Doing
                </h1>

                <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
                    Follow practical tutorials that walk you through setup,
                    deployment, and advanced features.    
                </p>
                <p className="text-lg md:text-xxl text-gray-600 max-w-3xl mx-auto mt-20 mb-4">
                    Launch your first project
                    in minutes and gain confidence as you build.
                </p>

                <Link
                    href="/tutorials/build-in-5-minutes"
                    className="inline-flex items-center px-8 py-3 bg-black text-white rounded-lg text-base font-medium hover:opacity-90 transition"
                >
                    Get Started
                </Link>
            </div>
        </section>
    );
}