"use client";

import { useState } from 'react';

type FeatureKey = 'development' | 'domains' | 'hosting' | 'mobile' | 'seo' | 'google' | 'more';

interface FeatureContent {
    title: string;
    items: string[];
    tools?: string;
}

const Features = () => {
    const [activeTab, setActiveTab] = useState<FeatureKey>('development');

    const features: Record<FeatureKey, FeatureContent> = {
        development: {
            title: 'Development',
            items: [
                'Custom-coded websites tailored to your needs',
                'Modern, responsive design that works everywhere',
                'Clean, maintainable code built to last'
            ],
            tools: 'HTML + CSS + JS'
        },
        domains: {
            title: 'Domains',
            items: [
                'Help finding the perfect domain name',
                'Domain registration and setup',
                'DNS configuration and management'
            ],
            tools: 'Namecheap'
        },
        hosting: {
            title: 'Hosting',
            items: [
                'Fast, reliable hosting solutions',
                'SSL certificates included',
                '99.9% uptime guarantee'
            ],
            tools: 'Netlify'
        },
        mobile: {
            title: 'Mobile First',
            items: [
                'Optimized for mobile devices',
                'Touch-friendly interfaces',
                'Fast loading on all connections'
            ]
        },
        seo: {
            title: 'SEO Services',
            items: [
                'Search engine optimization',
                'Keyword research and strategy',
                'Performance optimization'
            ]
        },
        google: {
            title: 'Google Business Profile',
            items: [
                'Profile setup and optimization',
                'Review management',
                'Local SEO enhancement'
            ],
            tools: 'Google Business Profile'
        },
        more: {
            title: 'More',
            items: [
                'Ongoing maintenance and support through our Discord group',
                'Analytics and reporting',
                'Content updates and improvements'
            ],
            tools: 'Discord'
        }
    };

    const tabs: { id: FeatureKey; label: string }[] = [
        { id: 'development', label: 'Development' },
        { id: 'domains', label: 'Domains' },
        { id: 'hosting', label: 'Hosting' },
        { id: 'mobile', label: 'Mobile First' },
        { id: 'seo', label: 'SEO Services' },
        { id: 'google', label: 'Google Business Profile' },
        { id: 'more', label: 'More' }
    ];

    return (
        <section id="features" className="pt-24 pb-12">
            <div className="max-w-3xl mx-auto">
                <div className="bg-base-100 max-md:px-8 max-w-3xl">
                    <h2 className="font-bold text-3xl lg:text-5xl tracking-tight mb-8">
                        Boost your business instantly, launch faster, make money
                    </h2>
                    <div className="text-base-content/80 leading-relaxed mb-8 lg:text-lg">
                        Custom websites that convert, delivered without the headaches. Skip the DIY builders and generic templates—get a tailored site built to your exact needs. Launch with confidence while we handle the code, design, and technical complexity.
                    </div>
                    <div>
                        <div className="grid grid-cols-4 md:flex justify-start gap-4 md:gap-12 max-md:px-8 max-w-3xl mx-auto mb-8">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    type="button"
                                    onClick={() => setActiveTab(tab.id)}
                                    aria-pressed={activeTab === tab.id}
                                    className={`flex flex-col items-center justify-center gap-3 select-none cursor-pointer rounded-lg p-2 duration-100 ${
                                        activeTab === tab.id
                                            ? 'bg-primary text-primary-content'
                                            : 'bg-base-200 text-base-content/60 hover:bg-base-300 hover:text-base-content'
                                    }`}
                                >
                                    <span>
                                        {/* svg */}
                                    </span>
                                    <span className="font-medium text-sm">{tab.label}</span>
                                </button>
                            ))}
                        </div>
                        <div className="bg-base-200">
                            <div className="max-w-3xl mx-auto flex flex-col md:flex-row justify-center md:justify-start md:items-center gap-12">
                                <div className="text-base-content/80 leading-relaxed space-y-4 px-12 md:px-0 py-12 max-w-xl animate-opacity">
                                    <p className="font-medium text-base-content text-lg">
                                        {features[activeTab].title}
                                    </p>
                                    <ul className="space-y-1">
                                        {features[activeTab].items.map((item, index) => (
                                            <li key={index} className="flex items-center gap-2">
                                                {/*svg*/}
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>    
        </section>
    );
};

export default Features;