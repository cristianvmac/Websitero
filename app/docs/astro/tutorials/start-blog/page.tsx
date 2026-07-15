"use client";

import Link from "next/link";
import { LuChevronRight } from "react-icons/lu";
import {
  Newspaper,
  Copy,
  Check,
  Clock,
  ArrowRight,
  Settings,
  Palette,
  Server,
  Database,
  FileText,
  Image as ImageIcon,
  Eye,
  Rocket,
  Info,
  FolderTree,
  FileCode,
  KeyRound,
  Github,
  Link2,
  ShieldCheck,
  UserPlus,
  PenLine,
  Terminal,
} from "lucide-react";
import { useState } from "react";

export default function StartBlog() {
  const [copiedStep, setCopiedStep] = useState<number | null>(null);

  const copyToClipboard = (text: string, stepIndex: number) => {
    navigator.clipboard.writeText(text);
    setCopiedStep(stepIndex);
    setTimeout(() => setCopiedStep(null), 2000);
  };

  // Fields defined by the blog collection in public/admin/config.yml
  const blogFields = [
    { label: "Title", name: "title", widget: "string", desc: "The post headline." },
    {
      label: "Description",
      name: "description",
      widget: "string",
      desc: "Short summary used in listings and SEO meta tags.",
    },
    { label: "Author", name: "author", widget: "string", desc: "Name shown as the byline." },
    { label: "Date", name: "date", widget: "datetime", desc: "Publish date, used for sorting." },
    {
      label: "Cover Image",
      name: "image",
      widget: "image",
      desc: "Uploaded to src/assets/images/blog and optimized by Astro.",
    },
    {
      label: "Image Caption",
      name: "imageAlt",
      widget: "string",
      desc: "Alt text for the cover image.",
    },
    {
      label: "Is it a featured post?",
      name: "isFeatured",
      widget: "boolean",
      desc: "Toggles whether the post is highlighted on the homepage.",
    },
    {
      label: "Body",
      name: "body",
      widget: "markdown",
      desc: "The post content, written in rich-text markdown.",
    },
  ];

  const configSnippet = `# Where uploaded media is stored (in src so Astro can optimize it)
media_folder: src/assets/images/blog
# Same folder via a path alias, used when referencing images in markdown
public_folder: "@assets/images/blog"

collections:
  - name: "blog"          # used in routes and when fetching the collection
    label: "Blog"         # shown in the admin dashboard UI
    folder: "src/content/blog"
    create: true          # let editors create new posts
    fields:
      - { label: "Title", name: "title", widget: "string" }
      - { label: "Description", name: "description", widget: "string" }
      - { label: "Author", name: "author", widget: "string" }
      - { label: "Date", name: "date", widget: "datetime" }
      - { label: "Cover Image", name: "image", widget: "image" }
      - { label: "Image Caption", name: "imageAlt", widget: "string" }
      - { label: "Is it a featured post?", name: "isFeatured", widget: "boolean", default: false }
      - { label: "Body", name: "body", widget: "markdown" }`;

  const schemaSnippet = `import { z, defineCollection } from "astro:content";
import { glob } from "astro/loaders";

// Every collection must reflect Decap's config.yml fields
const blogsCollection = defineCollection({
  loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: "./src/content/blog" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      author: z.string(),
      date: z.date(),
      image: image(),
      imageAlt: z.string(),
      isFeatured: z.boolean().optional().default(false),
    }),
});

export const collections = {
  blog: blogsCollection,
};`;

  const frontmatterSnippet = `---
title: My First Post
description: A short summary of what this post is about.
author: Your Name
date: 2026-06-24T12:00:00.000Z
image: "@assets/images/blog/placeholder.jpg"
imageAlt: Descriptive alt text
isFeatured: false
---

Write your post here using **markdown** or MDX.`;

  const backendSnippet = `# Use DecapBridge auth (required)
backend:
  name: git-gateway
  repo: your-name/your-blog # provided by decapbridge
  branch: main
  identity_url: https://auth.decapbridge.com/sites/<your-site-id> # provided by decapbridge
  gateway_url: https://gateway.decapbridge.com # provided by decapbridge

  # Quickly see who did what (optional)
  commit_messages:
    create: Create {{collection}} "{{slug}}" - {{author-name}} <{{author-login}}> via DecapBridge
    update: Update {{collection}} "{{slug}}" - {{author-name}} <{{author-login}}> via DecapBridge
    delete: Delete {{collection}} "{{slug}}" - {{author-name}} <{{author-login}}> via DecapBridge
    uploadMedia: Upload "{{path}}" - {{author-name}} <{{author-login}}> via DecapBridge
    deleteMedia: Delete "{{path}}" - {{author-name}} <{{author-login}}> via DecapBridge
    openAuthoring: Message {{message}} - {{author-name}} <{{author-login}}> via DecapBridge

# Better Decap + Bridge logo (optional)
logo_url: https://decapbridge.com/decapcms-with-bridge.svg

# Add site links in DecapCMS (optional)
site_url: https://your-site.netlify.app`;

  const scriptsSnippet = `"scripts": {
  "astro": "astro dev",
  "decap": "npx decap-server",
  "dev": "npm-run-all --parallel astro decap"
}`;

  return (
    <div className="min-h-full p-12">
      <div className="max-w-3xl ml-6">

      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-x-1 gap-y-1 text-base font-normal text-slate-900">
        <Link href="/docs/astro" className="rounded-full py-1 hover:text-slate-600 hover:underline">
          Astro
        </Link>
        <span><LuChevronRight /></span>
        <Link href="/docs/astro/tutorials" className="rounded-full py-1 hover:text-slate-600 hover:underline">
          Tutorials
        </Link>
        <span><LuChevronRight /></span>
        <span aria-current="page">Start a Blog</span>
      </nav>

      {/* Hero */}
      <div className="mb-12">
        <h1 className="text-5xl font-bold text-gray-900 mb-4 leading-tight">
          Configure Your Blog with Decap CMS
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed mb-6">
          This starter ships with a fully working, Git-based blog powered by{" "}
          <a
            href="https://decapcms.org/docs/basic-steps/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 underline font-semibold"
          >
            Decap CMS
          </a>
          . This guide shows how the blog is wired across Astro&apos;s content collections and the
          Decap admin, how to configure the post fields, how to connect a login for your client with{" "}
          <a
            href="https://decapbridge.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 underline font-semibold"
          >
            DecapBridge
          </a>
          , and how posts get published — every edit lands back in your GitHub repo as a commit.
        </p>
      </div>

      {/* Before You Start */}
      <div className="mb-12 p-6 bg-blue-50 border-2 border-blue-200 rounded-xl">
        <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
          <Clock className="w-5 h-5" />
          Before You Start
        </h3>
        <p className="text-gray-800 mb-4">
          Make sure you&apos;ve scaffolded the template and have the dev server running, with your
          repo pushed to GitHub and the site deployed. If not, start with the quick build tutorial
          first.
        </p>
        <Link
          href="/docs/astro/tutorials/build-in-5-minutes"
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 hover:bg-blue-100 text-gray-700 font-semibold rounded-lg transition-colors"
        >
          <ArrowRight className="w-4 h-4" />
          Build in 5 Minutes
        </Link>
      </div>

      {/* How it works overview */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">How Setup Works</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
          {[
            {
              icon: FolderTree,
              title: "Understand",
              desc: "See how the Decap config, the Astro schema, and markdown posts fit together",
            },
            {
              icon: Settings,
              title: "Configure",
              desc: "Set the collection fields and matching content schema",
            },
            {
              icon: KeyRound,
              title: "Connect",
              desc: "Wire up DecapBridge login with a GitHub token",
            },
            {
              icon: PenLine,
              title: "Publish",
              desc: "You and your client write posts from the /admin dashboard",
            },
          ].map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="relative bg-linear-to-br from-white to-gray-50 rounded-xl p-5 border-2 border-gray-200"
              >
                <div className="absolute -top-3 -left-3 w-9 h-9 bg-blue-50 text-gray-700 rounded-full flex items-center justify-center font-bold shadow-lg">
                  {index + 1}
                </div>
                <div className="flex items-center gap-2 mb-3 mt-1">
                  <div className="p-1.5 bg-blue-100 rounded-lg">
                    <Icon className="w-4 h-4 text-gray-600" />
                  </div>
                </div>
                <h3 className="font-bold text-gray-900 text-sm mb-1">{item.title}</h3>
                <p className="text-xs text-gray-600">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Section: How the blog works ── */}
      <div className="mb-12 bg-white rounded-2xl p-8 border-2 border-gray-200 shadow-sm">
        <div className="flex items-start gap-4 mb-6">
          <div className="shrink-0 w-12 h-12 bg-blue-50 text-gray-700 rounded-xl flex items-center justify-center shadow-lg">
            <FolderTree className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-1">How the Blog Works</h2>
            <p className="text-gray-600">
              Decap CMS is a Git-based CMS — there&apos;s no database. Every post is a markdown file
              in your repo, and a handful of files do all the work.
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-gray-900 rounded-lg p-4 font-mono text-xs text-gray-100 overflow-x-auto">
            <pre className="whitespace-pre">{`public/
└─ admin/
   ├─ config.yml                ← Decap CMS config (collection, fields, backend)
   └─ decap-preview-styles.css  ← styles the preview pane
src/
├─ content.config.ts           ← Zod schema that validates post frontmatter
├─ content/
│  └─ blog/
│     ├─ my-first-post.md       ← one markdown / MDX file per post
│     └─ ...
├─ assets/
│  └─ images/
│     └─ blog/                  ← cover images uploaded from the CMS
└─ pages/
   └─ admin.astro              ← loads the Decap dashboard + preview`}</pre>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 border-2 border-gray-200 rounded-lg">
              <FileCode className="w-5 h-5 text-gray-600 mb-2" />
              <p className="font-bold text-gray-900 text-sm mb-1">public/admin/config.yml</p>
              <p className="text-xs text-gray-600">
                Defines your collection, the fields each post has, and which backend handles login.
              </p>
            </div>
            <div className="p-4 border-2 border-gray-200 rounded-lg">
              <Database className="w-5 h-5 text-gray-600 mb-2" />
              <p className="font-bold text-gray-900 text-sm mb-1">src/content.config.ts</p>
              <p className="text-xs text-gray-600">
                A Zod schema that validates each post&apos;s frontmatter and enables image
                optimization.
              </p>
            </div>
            <div className="p-4 border-2 border-gray-200 rounded-lg">
              <FileText className="w-5 h-5 text-gray-600 mb-2" />
              <p className="font-bold text-gray-900 text-sm mb-1">src/content/blog/</p>
              <p className="text-xs text-gray-600">
                One <code className="bg-gray-100 px-1 rounded">.md</code> or{" "}
                <code className="bg-gray-100 px-1 rounded">.mdx</code> file per post. The CMS writes
                files here.
              </p>
            </div>
            <div className="p-4 border-2 border-gray-200 rounded-lg">
              <ImageIcon className="w-5 h-5 text-gray-600 mb-2" />
              <p className="font-bold text-gray-900 text-sm mb-1">src/assets/images/blog/</p>
              <p className="text-xs text-gray-600">
                Where cover images land when uploaded through the dashboard.
              </p>
            </div>
          </div>

          <div className="p-4 bg-blue-50 border-2 border-blue-200 rounded-lg">
            <p className="text-gray-900 font-medium mb-1 flex items-center gap-2">
              <Info className="w-4 h-4" />
              Edits become commits
            </p>
            <p className="text-sm text-gray-800">
              When someone saves a post in the dashboard, Decap commits the markdown change to your
              GitHub repo. That commit triggers a rebuild on your host, and the new post goes live —
              no manual deploy needed.
            </p>
          </div>
        </div>
      </div>

      {/* ── Section: Configure the blog collection ── */}
      <div className="mb-12 bg-white rounded-2xl p-8 border-2 border-gray-200 shadow-sm">
        <div className="flex items-start gap-4 mb-6">
          <div className="shrink-0 w-12 h-12 bg-blue-50 text-gray-700 rounded-xl flex items-center justify-center shadow-lg">
            <Settings className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-1">Configure the Blog Collection</h2>
            <p className="text-gray-600">
              The collection in{" "}
              <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">public/admin/config.yml</code>{" "}
              controls where posts are saved and the fields editors fill in.
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <p className="text-gray-700 text-sm">
            The starter already includes the blog collection below. The defaults work out of the
            box — adjust labels, add fields, or change the upload folders to fit your project. See{" "}
            <a
              href="https://decapcms.org/docs/configuration-options/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 underline"
            >
              Decap&apos;s configuration docs
            </a>{" "}
            for every available widget.
          </p>

          <div className="bg-gray-900 rounded-lg p-4 font-mono text-xs text-gray-100 relative max-h-96 overflow-y-auto">
            <pre className="whitespace-pre-wrap">{configSnippet}</pre>
            <button
              onClick={() => copyToClipboard(configSnippet, 1)}
              className="absolute right-3 top-3 p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
            >
              {copiedStep === 1 ? (
                <Check className="w-4 h-4 text-green-400" />
              ) : (
                <Copy className="w-4 h-4 text-gray-400" />
              )}
            </button>
          </div>

          <div>
            <h3 className="text-base font-bold text-gray-900 mb-3">What each field does</h3>
            <div className="grid sm:grid-cols-2 gap-3">
              {blogFields.map((field) => (
                <div
                  key={field.name}
                  className="p-3 border-2 border-gray-200 rounded-lg flex flex-col gap-1"
                >
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-bold text-gray-900 text-sm">{field.label}</span>
                    <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs text-gray-700">
                      {field.name}
                    </code>
                    <code className="bg-blue-50 text-gray-700 px-1.5 py-0.5 rounded text-xs">
                      {field.widget}
                    </code>
                  </div>
                  <p className="text-xs text-gray-600">{field.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 border-2 border-gray-200 rounded-lg">
              <p className="text-gray-900 font-medium mb-1 flex items-center gap-2">
                <Link2 className="w-4 h-4" />
                The filename is the slug
              </p>
              <p className="text-sm text-gray-700">
                There&apos;s no URL field — Astro uses each post&apos;s filename as its slug, so{" "}
                <code className="bg-gray-100 px-1.5 py-0.5 rounded">my-first-post.md</code> is served
                at <code className="bg-gray-100 px-1.5 py-0.5 rounded">/blog/my-first-post/</code>.
              </p>
            </div>
            <div className="p-4 bg-blue-50 border-2 border-blue-200 rounded-lg">
              <p className="text-gray-900 font-medium mb-1 flex items-center gap-2">
                <ImageIcon className="w-4 h-4" />
                Where images go
              </p>
              <p className="text-sm text-gray-800">
                <code className="bg-blue-100 px-1.5 py-0.5 rounded">public_folder</code> uses the{" "}
                <code className="bg-blue-100 px-1.5 py-0.5 rounded">@assets</code> path alias, so
                uploaded covers are referenced as{" "}
                <code className="bg-blue-100 px-1.5 py-0.5 rounded">@assets/images/blog/...</code>{" "}
                and Astro optimizes them at build time.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Section: Match the content collection schema ── */}
      <div className="mb-12 bg-white rounded-2xl p-8 border-2 border-gray-200 shadow-sm">
        <div className="flex items-start gap-4 mb-6">
          <div className="shrink-0 w-12 h-12 bg-blue-50 text-gray-700 rounded-xl flex items-center justify-center shadow-lg">
            <Database className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-1">
              Match the Content Collection Schema
            </h2>
            <p className="text-gray-600">
              Astro validates every post against a typed schema in{" "}
              <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">src/content.config.ts</code>.
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <p className="text-gray-700 text-sm">
            The schema uses a glob loader to pick up every{" "}
            <code className="bg-gray-100 px-1 rounded">.md</code> /{" "}
            <code className="bg-gray-100 px-1 rounded">.mdx</code> file in the blog folder, and the{" "}
            <code className="bg-gray-100 px-1 rounded">image()</code> helper so Astro can optimize the
            cover image. Each field here corresponds to a field in your{" "}
            <code className="bg-gray-100 px-1 rounded">config.yml</code>.
          </p>

          <div className="bg-gray-900 rounded-lg p-4 font-mono text-xs text-gray-100 relative max-h-96 overflow-y-auto">
            <pre className="whitespace-pre-wrap">{schemaSnippet}</pre>
            <button
              onClick={() => copyToClipboard(schemaSnippet, 2)}
              className="absolute right-3 top-3 p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
            >
              {copiedStep === 2 ? (
                <Check className="w-4 h-4 text-green-400" />
              ) : (
                <Copy className="w-4 h-4 text-gray-400" />
              )}
            </button>
          </div>

          <div className="p-4 bg-blue-50 border-2 border-blue-200 rounded-lg">
            <p className="text-gray-900 font-medium mb-1 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4" />
              Keep the schema and config.yml in sync
            </p>
            <p className="text-sm text-gray-800">
              This is the one rule that trips people up: if you add or rename a field in{" "}
              <code className="bg-blue-100 px-1.5 py-0.5 rounded">config.yml</code>, make the same
              change in <code className="bg-blue-100 px-1.5 py-0.5 rounded">content.config.ts</code>.
              If a post&apos;s frontmatter doesn&apos;t match the schema, Astro fails the build with a
              validation error.
            </p>
          </div>

          <div>
            <h3 className="text-base font-bold text-gray-900 mb-2">What a post file looks like</h3>
            <p className="text-gray-600 mb-3 text-sm">
              Each post the CMS creates is a markdown file whose frontmatter matches the schema,
              followed by the body. You can also create posts by hand using this shape:
            </p>
            <div className="bg-gray-900 rounded-lg p-4 font-mono text-xs text-gray-100 relative">
              <pre className="whitespace-pre-wrap">{frontmatterSnippet}</pre>
              <button
                onClick={() => copyToClipboard(frontmatterSnippet, 3)}
                className="absolute right-3 top-3 p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
              >
                {copiedStep === 3 ? (
                  <Check className="w-4 h-4 text-green-400" />
                ) : (
                  <Copy className="w-4 h-4 text-gray-400" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Section: Create a DecapBridge site ── */}
      <div className="mb-12 bg-white rounded-2xl p-8 border-2 border-gray-200 shadow-sm">
        <div className="flex items-start gap-4 mb-6">
          <div className="shrink-0 w-12 h-12 bg-blue-50 text-gray-700 rounded-xl flex items-center justify-center shadow-lg">
            <Server className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-1">Connect Login with DecapBridge</h2>
            <p className="text-gray-600">
              To let you and your client log in without the deprecated Netlify Identity, create a
              free DecapBridge site that bridges to your repo.
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <ul className="space-y-3 text-sm text-gray-700">
            <li className="flex gap-2">
              <span className="text-gray-600 font-bold">1.</span>
              <span>
                Navigate to{" "}
                <a
                  href="https://decapbridge.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 underline"
                >
                  decapbridge.com
                </a>{" "}
                and create an account. It&apos;s free.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-gray-600 font-bold">2.</span>
              <span>
                Open the dashboard and click <strong>Create New Site</strong>. You&apos;ll be asked
                to fill in three input fields.
              </span>
            </li>
          </ul>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 border-2 border-gray-200 rounded-lg">
              <Github className="w-5 h-5 text-gray-600 mb-2" />
              <p className="font-bold text-gray-900 text-sm mb-1">GitHub repository</p>
              <p className="text-xs text-gray-600">
                Must be in{" "}
                <code className="bg-gray-100 px-1 rounded">user-or-org/repository-name</code> format,
                e.g. <code className="bg-gray-100 px-1 rounded">your-name/your-blog</code>.
              </p>
            </div>
            <div className="p-4 border-2 border-gray-200 rounded-lg">
              <KeyRound className="w-5 h-5 text-gray-600 mb-2" />
              <p className="font-bold text-gray-900 text-sm mb-1">GitHub access token</p>
              <p className="text-xs text-gray-600">
                A fine-grained personal access token (see the next section for how to create one).
              </p>
            </div>
            <div className="p-4 border-2 border-gray-200 rounded-lg">
              <Link2 className="w-5 h-5 text-gray-600 mb-2" />
              <p className="font-bold text-gray-900 text-sm mb-1">Decap CMS URL</p>
              <p className="text-xs text-gray-600">
                The deployed URL of your admin dashboard, e.g.{" "}
                <code className="bg-gray-100 px-1 rounded">https://your-site.netlify.app/admin/#/</code>
                .
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Section: GitHub personal access token ── */}
      <div className="mb-12 bg-white rounded-2xl p-8 border-2 border-gray-200 shadow-sm">
        <div className="flex items-start gap-4 mb-6">
          <div className="shrink-0 w-12 h-12 bg-blue-50 text-gray-700 rounded-xl flex items-center justify-center shadow-lg">
            <Github className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-1">Create a GitHub Access Token</h2>
            <p className="text-gray-600">
              DecapBridge needs a fine-grained token to read your markdown and open pull requests
              with new content.
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <ol className="space-y-3 text-sm text-gray-700">
            {[
              "Log into your GitHub account.",
              "Click your profile picture (top right — not the repository profile) and click Settings.",
              "Scroll down and click Developer Settings.",
              "Click Personal access tokens and choose Fine-grained tokens.",
              "Click Generate new token and provide your password again if required.",
              "Provide a name for the token in the Note field.",
              'Set the token’s Expiration to "No expiration".',
              "Set Repository access to the desired repository only.",
            ].map((step, i) => (
              <li key={i} className="flex gap-3">
                <span className="shrink-0 w-6 h-6 bg-blue-50 text-gray-700 rounded-full flex items-center justify-center text-xs font-bold">
                  {i + 1}
                </span>
                <span className="pt-0.5">{step}</span>
              </li>
            ))}
          </ol>

          <div className="p-4 bg-blue-50 border-2 border-blue-200 rounded-lg">
            <p className="text-gray-900 font-medium mb-1 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4" />
              Repository permissions
            </p>
            <p className="text-sm text-gray-800">
              Under <strong>Permissions / Repository permissions</strong>, set{" "}
              <strong>Read and write</strong> access for this repository&apos;s{" "}
              <code className="bg-blue-100 px-1.5 py-0.5 rounded">Contents</code> and{" "}
              <code className="bg-blue-100 px-1.5 py-0.5 rounded">Pull requests</code>. This lets
              Decap CMS read your markdown and write new content via pull requests.
            </p>
          </div>

          <ol start={9} className="space-y-3 text-sm text-gray-700">
            {[
              "Double-check the permissions, then click Generate token.",
              "Copy your token now — you will not be able to see it again.",
            ].map((step, i) => (
              <li key={i} className="flex gap-3">
                <span className="shrink-0 w-6 h-6 bg-blue-50 text-gray-700 rounded-full flex items-center justify-center text-xs font-bold">
                  {i + 9}
                </span>
                <span className="pt-0.5">{step}</span>
              </li>
            ))}
          </ol>

          <div className="p-4 bg-blue-50 border-2 border-blue-200 rounded-lg">
            <p className="text-gray-900 font-medium mb-1 flex items-center gap-2">
              <Info className="w-4 h-4" />
              Don&apos;t lose the token
            </p>
            <p className="text-sm text-gray-800">
              The token is shown only once. Copy it before leaving the page and paste it straight
              into the DecapBridge <strong>GitHub access token</strong> field.
            </p>
          </div>
        </div>
      </div>

      {/* ── Section: Swap in the backend snippet ── */}
      <div className="mb-12 bg-white rounded-2xl p-8 border-2 border-gray-200 shadow-sm">
        <div className="flex items-start gap-4 mb-6">
          <div className="shrink-0 w-12 h-12 bg-blue-50 text-gray-700 rounded-xl flex items-center justify-center shadow-lg">
            <Settings className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-1">Swap in the Backend Snippet</h2>
            <p className="text-gray-600">
              Replace the backend block in your admin config with the snippet from your DecapBridge
              dashboard.
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <p className="text-gray-700 text-sm">
            In{" "}
            <code className="bg-gray-100 px-2 py-0.5 rounded text-sm">public/admin/config.yml</code>,
            replace the <code className="bg-gray-100 px-1 rounded">backend</code> block with the
            snippet from your DecapBridge dashboard. The{" "}
            <code className="bg-gray-100 px-1 rounded">repo</code>,{" "}
            <code className="bg-gray-100 px-1 rounded">identity_url</code>, and{" "}
            <code className="bg-gray-100 px-1 rounded">gateway_url</code> values are all generated
            for you. It should look something like this:
          </p>

          <div className="bg-gray-900 rounded-lg p-4 font-mono text-xs text-gray-100 relative max-h-96 overflow-y-auto">
            <pre className="whitespace-pre-wrap">{backendSnippet}</pre>
            <button
              onClick={() => copyToClipboard(backendSnippet, 4)}
              className="absolute right-3 top-3 p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
            >
              {copiedStep === 4 ? (
                <Check className="w-4 h-4 text-green-400" />
              ) : (
                <Copy className="w-4 h-4 text-gray-400" />
              )}
            </button>
          </div>

          <div className="p-4 bg-blue-50 border-2 border-blue-200 rounded-lg">
            <p className="text-gray-900 font-medium mb-1 flex items-center gap-2">
              <Rocket className="w-4 h-4" />
              Push and test
            </p>
            <p className="text-sm text-gray-800">
              Push the change to your repo and test the authentication system. As the admin of the
              site, your login credentials for the Decap dashboard are the same as your
              decapbridge.com credentials.
            </p>
          </div>
        </div>
      </div>

      {/* ── Section: Publish posts & invite the client ── */}
      <div className="mb-12 bg-white rounded-2xl p-8 border-2 border-gray-200 shadow-sm">
        <div className="flex items-start gap-4 mb-6">
          <div className="shrink-0 w-12 h-12 bg-blue-50 text-gray-700 rounded-xl flex items-center justify-center shadow-lg">
            <PenLine className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-1">Publish Posts from /admin</h2>
            <p className="text-gray-600">
              This is the day-to-day workflow your client will use — no code, no terminal.
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <ol className="space-y-3 text-sm text-gray-700">
            {[
              <>
                Go to{" "}
                <code className="bg-gray-100 px-1.5 py-0.5 rounded">https://your-site.com/admin/</code>{" "}
                and log in with the DecapBridge credentials.
              </>,
              <>
                Open the <strong>Blog</strong> collection and click <strong>New Blog</strong>.
              </>,
              <>
                Fill in the Title, Description, Author, and Date, upload a Cover Image, optionally
                flip <strong>Is it a featured post?</strong>, then write the body in the markdown
                editor.
              </>,
              <>
                Click <strong>Publish</strong>. Decap commits a new markdown file to{" "}
                <code className="bg-gray-100 px-1.5 py-0.5 rounded">src/content/blog/</code>, your
                host rebuilds, and the post appears at{" "}
                <code className="bg-gray-100 px-1.5 py-0.5 rounded">/blog/your-filename/</code>.
              </>,
            ].map((step, i) => (
              <li key={i} className="flex gap-3">
                <span className="shrink-0 w-6 h-6 bg-blue-50 text-gray-700 rounded-full flex items-center justify-center text-xs font-bold">
                  {i + 1}
                </span>
                <span className="pt-0.5">{step}</span>
              </li>
            ))}
          </ol>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-blue-50 border-2 border-blue-200 rounded-lg">
              <p className="text-gray-900 font-medium mb-1 flex items-center gap-2">
                <UserPlus className="w-4 h-4" />
                Invite your client
              </p>
              <p className="text-sm text-gray-800">
                In your DecapBridge dashboard, add your client as a collaborator. They get their own
                email and password — they never need a GitHub account to publish.
              </p>
            </div>
            <div className="p-4 bg-gray-50 border-2 border-gray-200 rounded-lg">
              <p className="text-gray-900 font-medium mb-1 flex items-center gap-2">
                <Eye className="w-4 h-4" />
                Preview before publishing
              </p>
              <p className="text-sm text-gray-700">
                The editor shows a live preview pane next to the form, so your client can see how the
                post will look before they hit Publish.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Section: Styling the preview pane ── */}
      <div className="mb-12 bg-white rounded-2xl p-8 border-2 border-gray-200 shadow-sm">
        <div className="flex items-start gap-4 mb-6">
          <div className="shrink-0 w-12 h-12 bg-blue-50 text-gray-700 rounded-xl flex items-center justify-center shadow-lg">
            <Palette className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-1">Styling the Decap Preview Pane</h2>
            <p className="text-gray-600">
              Custom styles make blog posts in the admin dashboard look similar to the live site.
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-base font-bold text-gray-900 mb-2">How it works</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex gap-2">
                <span className="text-gray-600 font-bold">1.</span>
                <span>
                  The preview styles are defined in{" "}
                  <code className="bg-gray-100 px-1.5 py-0.5 rounded">
                    public/admin/decap-preview-styles.css
                  </code>
                  .
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-gray-600 font-bold">2.</span>
                <span>
                  The CMS preview script in{" "}
                  <code className="bg-gray-100 px-1.5 py-0.5 rounded">src/pages/admin.astro</code>{" "}
                  pulls the props from the collection, creates the DOM elements, and registers them
                  and the styles for the preview panel to use.
                </span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-base font-bold text-gray-900 mb-2">How to update or customize</h3>
            <p className="text-gray-600 mb-3 text-sm">
              Edit{" "}
              <code className="bg-gray-100 px-1.5 py-0.5 rounded">
                public/admin/decap-preview-styles.css
              </code>{" "}
              and the preview pane script in{" "}
              <code className="bg-gray-100 px-1.5 py-0.5 rounded">src/pages/admin.astro</code> to
              match your site&apos;s branding or layout changes. See{" "}
              <a
                href="https://decapcms.org/docs/customization/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 underline"
              >
                Decap&apos;s documentation on customizing the preview pane
              </a>
              .
            </p>
          </div>
        </div>
      </div>

      {/* ── Section: Adding local backend ── */}
      <div className="mb-12 bg-white rounded-2xl p-8 border-2 border-gray-200 shadow-sm">
        <div className="flex items-start gap-4 mb-6">
          <div className="shrink-0 w-12 h-12 bg-blue-50 text-gray-700 rounded-xl flex items-center justify-center shadow-lg">
            <Terminal className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-1">Adding a Local Backend</h2>
            <p className="text-gray-600">
              Enable local backend settings to make content changes from the Decap dashboard during
              development.
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-base font-bold text-gray-900 mb-2">
              1. Enable the local backend in{" "}
              <code className="bg-gray-100 px-2 py-0.5 rounded text-sm">public/admin/config.yml</code>
            </h3>
            <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm text-gray-100 relative">
              <code className="text-green-400">+ local_backend: true</code>
              <button
                onClick={() => copyToClipboard("local_backend: true", 5)}
                className="absolute right-3 top-3 p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
              >
                {copiedStep === 5 ? (
                  <Check className="w-4 h-4 text-green-400" />
                ) : (
                  <Copy className="w-4 h-4 text-gray-400" />
                )}
              </button>
            </div>
          </div>

          <div>
            <h3 className="text-base font-bold text-gray-900 mb-2">
              2. Install the packages needed to run a local Decap server alongside Astro
            </h3>
            <p className="text-gray-600 mb-3 text-sm">
              We need to run a local Decap server in parallel with{" "}
              <code className="bg-gray-100 px-1.5 py-0.5 rounded">astro dev</code>. Install the
              helpers:
            </p>
            <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm text-gray-100 relative">
              <pre className="whitespace-pre-wrap">{`npm install npm-run-all --save-dev
npm install decap-server`}</pre>
              <button
                onClick={() =>
                  copyToClipboard(
                    "npm install npm-run-all --save-dev\nnpm install decap-server",
                    6
                  )
                }
                className="absolute right-3 top-3 p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
              >
                {copiedStep === 6 ? (
                  <Check className="w-4 h-4 text-green-400" />
                ) : (
                  <Copy className="w-4 h-4 text-gray-400" />
                )}
              </button>
            </div>
          </div>

          <div>
            <h3 className="text-base font-bold text-gray-900 mb-2">
              3. Update the scripts in{" "}
              <code className="bg-gray-100 px-2 py-0.5 rounded text-sm">package.json</code>
            </h3>
            <div className="bg-gray-900 rounded-lg p-4 font-mono text-xs text-gray-100 relative max-h-72 overflow-y-auto">
              <pre className="whitespace-pre-wrap">{scriptsSnippet}</pre>
              <button
                onClick={() => copyToClipboard(scriptsSnippet, 7)}
                className="absolute right-3 top-3 p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
              >
                {copiedStep === 7 ? (
                  <Check className="w-4 h-4 text-green-400" />
                ) : (
                  <Copy className="w-4 h-4 text-gray-400" />
                )}
              </button>
            </div>
          </div>

          <div className="p-4 bg-blue-50 border-2 border-blue-200 rounded-lg">
            <p className="text-gray-900 font-medium mb-1 flex items-center gap-2">
              <Eye className="w-4 h-4" />
              Run it
            </p>
            <p className="text-sm text-gray-800">
              Now when{" "}
              <code className="bg-blue-100 px-1.5 py-0.5 rounded">npm run dev</code> runs, a proxy
              server for the CMS spins up on{" "}
              <code className="bg-blue-100 px-1.5 py-0.5 rounded">localhost:8081</code>. Access the
              blog locally at{" "}
              <code className="bg-blue-100 px-1.5 py-0.5 rounded">http://localhost:4321/admin</code>
              . While running the local dev server, you won&apos;t need to log in to access the admin
              dashboard.
            </p>
          </div>
        </div>
      </div>

      {/* Next Steps */}
      <div className="bg-linear-to-br from-gray-50 to-gray-100 border border-gray-200 rounded-2xl p-8 text-gray-700">
        <div className="flex items-center gap-3 mb-4">
          <Newspaper className="w-8 h-8" />
          <h2 className="text-3xl font-bold">Your Blog Is Ready</h2>
        </div>
        <p className="text-xl text-gray-600 mb-6">
          You now have a CMS-powered blog your clients can manage themselves — content lives in
          markdown, media is optimized automatically, and everything is editable from the{" "}
          <code className="bg-gray-100 px-2 py-0.5 rounded">/admin</code> dashboard.
        </p>
        <div className="flex flex-wrap gap-4">
          <a
            href="https://decapcms.org/docs/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-50 hover:bg-blue-100 text-gray-700 font-bold rounded-lg transition-colors"
          >
            <Database className="w-5 h-5" />
            Decap CMS Docs
          </a>
          <Link
            href="/docs/astro/deployment"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white hover:bg-gray-100 text-gray-900 border border-gray-200 font-bold rounded-lg transition-colors"
          >
            <Rocket className="w-5 h-5" />
            Deployment Guide
          </Link>
        </div>
      </div>
      </div>
    </div>
  );
}
