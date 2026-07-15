import Link from "next/link";
import { LuChevronRight } from "react-icons/lu";

export default function Contact() {
  return (
    <div className="min-h-full p-12">
      <div className="max-w-3xl mx-auto">

        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-x-1 gap-y-1 text-base font-normal text-slate-900">
          <Link href="/docs/eleventy" className="rounded-full py-1 hover:text-slate-600 hover:underline">
            Eleventy
          </Link>
          <span><LuChevronRight /></span>
          <span aria-current="page">Contact</span>
        </nav>

        <h1 className="text-4xl font-bold mb-6">
          Contact Me
        </h1>

        <p className="text-lg text-slate-600 mb-12">
          Have questions, feedback, or want to chat? You can reach me through any of the following ways:
        </p>

        {/* Discord */}
        <div className="mb-10">
          <h2 className="text-2xl font-semibold mb-3">
            Discord
          </h2>
          <p className="text-slate-700">
            Join my Discord server to chat in real-time or send a direct message.  
            <a 
              href="https://discord.com/invite/your-invite-code" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-slate-600 hover:underline"
            >
              Click here to join
            </a>
          </p>
        </div>

        {/* Email */}
        <div className="mb-10">
          <h2 className="text-2xl font-semibold mb-3">
            Email
          </h2>
          <p className="text-slate-700">
            Send me a detailed message at:  
            <a 
              href="mailto:your-email@example.com" 
              className="text-slate-600 hover:underline"
            >
              your-email@example.com
            </a>
          </p>
        </div>

        {/* Chatbot */}
        <div className="mb-10">
          <h2 className="text-2xl font-semibold mb-3">
            Chatbot
          </h2>
          <p className="text-slate-700">
            Use the chatbot on this site to get instant answers or guidance.  
            Just click the chat icon at the bottom corner and start typing.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border mt-6">
          <h2 className="text-xl font-semibold mb-3">
            Quick Reminder
          </h2>
          <p className="text-slate-700">
            Whether it’s Discord, email, or the chatbot, I aim to respond as quickly as possible.
            Don’t hesitate to reach out!
          </p>
        </div>

      </div>
    </div>
  );
}
