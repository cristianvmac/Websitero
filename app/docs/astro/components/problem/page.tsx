



import Link from "next/link";
import { LuChevronRight } from "react-icons/lu";

export default function Problem() {
    return (
        <div className="min-h-full p-12">
            <div className="max-w-3xl mx-auto">
                {/* Breadcrumb */}
                <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-x-1 gap-y-1 text-base font-normal text-slate-900">
                    <Link href="/docs/astro" className="rounded-full py-1 hover:text-slate-600 hover:underline">
                        Astro
                    </Link>
                    <span><LuChevronRight /></span>
                    <Link href="/docs/astro/components" className="rounded-full py-1 hover:text-slate-600 hover:underline">
                        Components
                    </Link>
                    <span><LuChevronRight /></span>
                    <span aria-current="page">Problem</span>
                </nav>

                <section className="bg-gray-50 border border-gray-200 py-20 px-4 relative overflow-hidden rounded-2xl">
                    {/* Background decoration */}
                    <div className="absolute inset-0 bg-linear-to-br from-blue-50/40 via-transparent to-transparent"></div>
                    <div className="absolute top-0 right-0 w-96 h-96 bg-blue-50/10 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-50/10 rounded-full blur-3xl"></div>

                    <div className="max-w-3xl mx-auto relative z-10">
                        {/* Section Header */}
                        <div className="text-center max-w-3xl mx-auto">
                            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                                To be continued
                            </h2>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}