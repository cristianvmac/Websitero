


import Link from "next/link";
import { LuChevronRight } from "react-icons/lu";

export default function Templates() {
    return (
        <div className="min-h-full p-12">
            <div className="max-w-3xl mx-auto text-center">
                {/* Breadcrumb */}
                <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-x-1 gap-y-1 text-base font-normal text-slate-900 text-left">
                    <Link href="/docs/astro" className="rounded-full py-1 hover:text-slate-600 hover:underline">
                        Astro
                    </Link>
                    <span><LuChevronRight /></span>
                    <span aria-current="page">Templates</span>
                </nav>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    Professional Templates
                </h2>
                <p className="text-gray-600 leading-relaxed">
                    Our templates are built for speed, accessibility, and modern design standards.
                    Each layout is carefully structured using semantic HTML and optimized styling,
                    making it easy to customize while maintaining performance and clean code.
                </p>
                <p className="text-gray-600 leading-relaxed mt-4">
                    Designed for static site generation with Astro, these templates provide
                    a strong foundation for scalable, secure, and maintainable websites —
                    without unnecessary complexity.
                </p>
            </div>
        </div>
    );
}
