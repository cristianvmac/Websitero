import Link from "next/link";
import { CheckCircle2, ExternalLink, ArrowRight } from "lucide-react";
import { LuChevronRight } from "react-icons/lu";
import { SiNodedotjs, SiGit } from "react-icons/si";
import { VscVscode } from "react-icons/vsc";

export default function Setup() {
    const prerequisites = [
        {
            name: "Node.js",
            href: "https://nodejs.org/en/download",
            description: "JavaScript runtime — required to run and build the project",
            icon: SiNodedotjs,
            iconColor: "text-[#5FA04E]",
            iconBg: "bg-[#5FA04E]/10",
            badge: "Required",
            badgeColor: "bg-blue-100 text-blue-700",
        },
        {
            name: "Git",
            href: "https://git-scm.com/install/",
            description: "Version control — needed to clone the template repository",
            icon: SiGit,
            iconColor: "text-[#F05032]",
            iconBg: "bg-[#F05032]/10",
            badge: "Required",
            badgeColor: "bg-blue-100 text-blue-700",
        },
        {
            name: "VS Code",
            href: "https://code.visualstudio.com/download",
            description: "Recommended code editor",
            icon: VscVscode,
            iconColor: "text-[#0098FF]",
            iconBg: "bg-[#0098FF]/10",
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
        <div className="min-h-full p-12 ">
            <div className="max-w-3xl ml-6">
                {/* Hero */}
                <div className="mb-12">
                    {/* Breadcrumb */}
                        <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-x-1 gap-y-1 text-base font-normal text-slate-900">
                            <Link href="/docs/eleventy" className="rounded-full py-1 hover:text-slate-600 hover:underline">
                                Eleventy
                            </Link>
                            <span><LuChevronRight /></span>
                            <span aria-current="page">Quick Setup</span>
                        </nav>
                
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
                                    <div className={`w-10 h-10 rounded-lg ${prereq.iconBg} flex items-center justify-center shrink-0`}>
                                        <Icon className={`w-6 h-6 ${prereq.iconColor}`} />
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
            <div className="mb-10 p-5 bg-gray-100 border-0.5 rounded-xl flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-slate-600 shrink-0 mt-0.5" />
                <div>
                    <p className="font-semibold text-slate-900 mb-0.5">Already have everything installed?</p>
                    <p className="text-sm text-slate-800">
                        You&apos;re good to go. Head over to the Get Started guide to clone the template and launch your project.
                    </p>
                    <Link
                        href="/docs/astro/get-started"
                        className="inline-flex items-center gap-2 mt-3 px-4 py-2 bg-blue-400 text-white font-semibold rounded-lg transition-colors text-sm"
                    >
                      {/*  <ArrowRight className="w-4 h-4" />*/}
                        Get Started
                    </Link>
                </div>
            </div>

            {/* Step-by-step install guides */}
            <div className="bg-gray-100 border-0.5 rounded-xl p-8  border border-blue-100">
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