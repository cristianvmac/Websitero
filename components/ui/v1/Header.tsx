"use client";

import { useState } from "react";
import Link from 'next/link';
import Image from "next/image";
import logo from "@/app/logo.svg";
import { HiOutlineXMark, HiBars3 } from 'react-icons/hi2';
import { Transition } from '@headlessui/react';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <header className="bg-[#506060] fixed top-0 left-0 right-0 z-50 mx-auto w-full">
            <div className="px-10 w-full max-w-7xl mx-auto">
                 <nav className="shadow-md md:shadow-none bg-background md:bg-transparent mx-auto flex justify-between items-center md:py-6 px-5">
                    <Link href="/" className="flex items-center gap-2">
                       {/* <Image
                            src={logo}
                            alt="boiler logo"
                            className="w-8"
                            priority={true}
                            width={32}
                            height={32}
                        />*/}
                        <span className="font-extrabold text-white text-3xl">Websitero</span>
                    </Link>

                   {/* Desktop menu */} 
                    <ul className="hidden md:flex space-x-6 items-center gap-10 md:justify-center lg:justify-center">
                        <li>
                            <Link href="/" className="text-foreground hover:text-foreground-accent transition-colors">
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link href="/#features" className="text-foreground hover:text-foreground-accent transition-colors">
                                Features
                            </Link>
                        </li>
                        <li>
                            <Link href="/#pricing" className="text-foreground hover:text-foreground-accent transition-colors">
                                Pricing
                            </Link>
                        </li>
                        <li>
                            <Link href="/#faq" className="text-foreground hover:text-foreground-accent transition-colors">
                                FAQ
                            </Link>
                        </li>
                        <li>
                            <Link href="/docs/eleventy" className="text-foreground hover:text-foreground-accent transition-colors">
                                Docs
                            </Link>
                        </li>
                        <li>
                            <Link href="#cta" className="text-white bg-primary hover:bg-primary-accent px-7 py-2 rounded-full transition-colors">
                                Start Your Website
                            </Link>
                        </li>
                    </ul>
                    
                    {/* Mobile menu button */}
                    <div className="bg-transparent md:hidden flex items-center">
                        <button
                            onClick={toggleMenu}
                            type="button"
                            className="bg-background text-foreground focus:outline-none rounded-full w-10 h-10 flex items-center justify-center"
                            aria-controls="mobile-menu"
                            aria-expanded={isOpen}                        
                        >
                            {isOpen ? (
                                <HiOutlineXMark className="h-6 w-6" aria-hidden="true" />
                            ) : (
                                <HiBars3 className="h-6 w-6" aria-hidden="true" />
                            )}
                            <span className="sr-only">Toggle navigation</span>
                        </button>
                    </div>
                 </nav>
            </div>

            {/* Mobile menu with Transition */}
            <Transition
                show={isOpen}
                enter="transition ease-out duration-200 transform"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="transition ease-in duration-150 transform"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
            >
            
            <div className="fixed inset-0 z-50 flex items-start justify-center md:hidden pt-24">
            {/* Optional overlay */}
                <div 
                    className="absolute inset-0 bg-black/40"
                    onClick={toggleMenu}
                />

                {/* Centered menu box */}
                <div className="relative w-[90%] max-w-sm bg-background shadow-xl rounded-2xl px-6 py-8">
                    <ul className="flex flex-col space-y-4 pt-1 pb-6 px-6 text-center items-center">
                        <li>
                            <Link href="/" onClick={toggleMenu} className="text-foreground hover:text-primary">
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link href="/#features" onClick={toggleMenu} className="text-foreground hover:text-primary">
                                Features
                            </Link>
                        </li>
                        <li>
                            <Link href="/#pricing" onClick={toggleMenu} className="text-foreground hover:text-primary">
                                Pricing
                            </Link>
                        </li>
                        <li>
                            <Link href="/#faq" onClick={toggleMenu} className="text-foreground hover:text-primary">
                                FAQ
                            </Link>
                        </li>
                         <li>
                            <Link href="/docs/eleventy" className="text-foreground hover:text-foreground-accent transition-colors">
                                Docs
                            </Link>
                        </li>
                        <li className="pt-4">
                            <Link
                                href="#cta"
                                onClick={toggleMenu}
                                className="text-white bg-primary hover:bg-primary-accent px-4 py-2 rounded-full inline-block"
                            >
                                Get Started
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
            </Transition>

        </header>
    )
};

export default Header;