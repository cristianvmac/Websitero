import Link from "next/link";
import { CheckCircle2, ExternalLink, Rocket, ArrowRight, Package, GitBranch, Code2 } from "lucide-react";

export default function Setup() {
    const prerequisites = [
        {
            name: "Node.js",
            href: "https://nodejs.org/en/download",
            description: "JavaScript runtime — required to run and build the project",
            icon: Package,
            badge: "Required",
            badgeColor: "bg-blue-100 text-blue-700",
        },
        {
            name: "Git",
            href: "https://git-scm.com/install/",
            description: "Version control — needed to clone the template repository",
            icon: GitBranch,
            badge: "Required",
            badgeColor: "bg-blue-100 text-blue-700",
        },
        {
            name: "VS Code",
            href: "https://code.visualstudio.com/download",
            description: "Recommended code editor",
            icon: Code2,
            badge: "Optional",
            badgeColor: "bg-gray-100 text-gray-600",
        },
    ];

    const installGuides = [
        { label: "Install Node.js", href: "./quick-setup/install-node", step: 1 },
        { label: "Install Git", href: "./quick-setup/install-git", step: 2 },
        { label: "Install VS Code", href: "./quick-setup/install-vscode", step: 3 },
    ];

    return (
        <div className="min-h-screen p-6 md:p-10">
        <div className="max-w-5xl mx-auto">

            {/* Hero */}
            <div className="mb-12">
                 {/* Breadcrumb */}
                <div className="flex items-center gap-3 mb-4 flex-wrap">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-linear-to-r from-orange-50 to-yellow-50 text-orange-700 rounded-full text-sm font-bold border-2 border-orange-200">
                        Eleventy
                    </div>
                    <span className="text-3xl font-semibold text-gray-400">/</span>
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-linear-to-r from-blue-50 to-purple-50 text-blue-700 rounded-full text-sm font-bold border-2 border-blue-200">
                        Quick Setup
                    </div>
                </div>
                
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                    Quick Setup
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                    Before you build anything with Websitero, make sure you have the right tools installed.
                    This takes less than 5 minutes and you only need to do it once.
                </p>
            </div>

            {/* What you need */}
            <div className="mb-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    What You Need
                </h2>
                <p className="text-gray-600 mb-6">
                     Three tools — two required, one recommended. Click any card to go to the official download page.
                </p>

                <div className="grid gap-4">
                    {prerequisites.map((prereq) => {
                        const Icon = prereq.icon;
                        return (
                            <Link
                                key={prereq.name}
                                href={prereq.href}
                                className="group flex items-center justify-between p-5 rounded-xl border-2 border-gray-200 hover:border-blue-400 hover:shadow-md transition-all bg-white"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-lg bg-gray-100 group-hover:bg-blue-50 flex items-center justify-center transition-colors shrink-0">
                                        <Icon className="w-5 h-5 text-gray-500 group-hover:text-blue-600 transition-colors" />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2 mb-0.5">
                                            <span className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                                                {prereq.name}
                                            </span>
                                            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${prereq.badgeColor}`}>
                                                {prereq.badge}
                                            </span>
                                        </div>
                                        <p className="text-sm text-gray-500">
                                            {prereq.description}
                                        </p>
                                    </div>
                                </div>
                                <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-blue-600 shrink-0 ml-4 transition-colors" />
                            </Link>
                        );
                    })}
                </div>
            </div>

            {/* Already have everything? */}
            <div className="mb-10 p-5 bg-green-50 border-2 border-green-200 rounded-xl flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                <div>
                    <p className="font-semibold text-green-900 mb-0.5">Already have everything installed?</p>
                    <p className="text-sm text-green-800">
                        You&apos;re good to go. Head over to the Get Started guide to clone the template and launch your project.
                    </p>
                    <Link
                        href="/docs/astro/get-started"
                        className="inline-flex items-center gap-2 mt-3 px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors text-sm"
                    >
                      {/*  <ArrowRight className="w-4 h-4" />*/}
                        Get Started
                    </Link>
                </div>
            </div>

            {/* Step-by-step install guides */}
            <div className="bg-linear-to-br from-blue-50 to-indigo-50 p-8 rounded-2xl border border-blue-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Need help installing?
                </h3>
                <p className="text-gray-600 mb-6">
                    Follow these step-by-step guides — each one walks you through the install from scratch.
                </p>

                <div className="grid gap-3">
                    {installGuides.map((guide) => (
                        <Link
                            key={guide.href}
                            href={guide.href}
                            className="flex items-center gap-4 p-4 rounded-xl bg-white hover:bg-blue-50 border-2 border-transparent hover:border-blue-200 transition-all group"
                        >
                            <div className="w-9 h-9 rounded-full bg-blue-100 group-hover:bg-blue-600 flex items-center justify-center transition-colors shrink-0">
                                <span className="text-sm font-bold text-blue-600 group-hover:text-white transition-colors">
                                    {guide.step}
                                </span>
                            </div>
                            <span className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors flex-1">
                                {guide.label}
                            </span>
                            <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
                        </Link>
                    ))}
                </div>
            </div>
        </div>
        </div>
    );
}