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
  Github,
  Server,
  KeyRound,
  FileText,
  Link2,
  UserPlus,
  Eye,
  Rocket,
  Info,
  ShieldCheck,
  FolderTree,
  FileCode,
  PenLine,
  Terminal,
  Image as ImageIcon,
} from "lucide-react";
import { useState } from "react";

export default function StartBlog() {
  const [copiedStep, setCopiedStep] = useState<number | null>(null);

  const copyToClipboard = (text: string, stepIndex: number) => {
    navigator.clipboard.writeText(text);
    setCopiedStep(stepIndex);
    setTimeout(() => setCopiedStep(null), 2000);
  };

  // Fields defined by the blog collection in src/admin/config.yml
  const blogFields = [
    { label: "Title", name: "title", widget: "string", desc: "The post headline." },
    {
      label: "URL Slug",
      name: "url",
      widget: "string",
      desc: 'Where the post is written to — "My Post" becomes /blog/my-post/.',
    },
    {
      label: "Description",
      name: "description",
      widget: "string",
      desc: "Short summary used in listings and SEO meta tags.",
    },
    { label: "Author", name: "author", widget: "string", desc: "Name shown as the byline." },
    { label: "Date", name: "date", widget: "datetime", desc: "Publish date, used for sorting." },
    {
      label: "Tags",
      name: "tags",
      widget: "list",
      desc: 'Defaults to "post" so Eleventy collects it into the blog.',
    },
    {
      label: "Featured Image",
      name: "image",
      widget: "image",
      desc: "Uploaded to src/assets/images/blog.",
    },
    {
      label: "Image Caption",
      name: "imageAlt",
      widget: "string",
      desc: "Alt text for the featured image.",
    },
    {
      label: "Body",
      name: "body",
      widget: "markdown",
      desc: "The post content, written in rich-text markdown.",
    },
  ];

  const configSnippet = `# Image upload folders
media_folder: "src/assets/images/blog"
public_folder: "/assets/images/blog"

# The blog collection
collections:
  - name: "blog"
    label: "Blog"
    folder: "src/content/blog"
    create: true
    slug: "{{slug}}"
    fields:
      - { label: "Title", name: "title", widget: "string" }
      - { label: "URL Slug", name: "url", widget: "string", hint: 'Specify where the page will be written to. If you use "Blog Post", the post will be accessible from "blog/blog-post"' }
      - { label: "Description", name: "description", widget: "string" }
      - { label: "Author", name: "author", widget: "string" }
      - { label: "Date", name: "date", widget: "datetime" }
      - { label: "Tags", name: "tags", widget: "list", default: ["post"] }
      - { label: "Featured Image", name: "image", widget: "image" }
      - { label: "Image Caption", name: "imageAlt", widget: "string" }
      - { label: "Body", name: "body", widget: "markdown" }`;

  const dataFileSnippet = `{
  "layout": "layouts/post.html",
  "tags": "post",
  "eleventyComputed": {
    "preloadImg": "{{ image }}",
    "permalink": "/blog/{{ url | slugify }}/index.html"
  }
}`;

  const frontmatterSnippet = `---
title: My First Post
url: my-first-post
description: A short summary of what this post is about.
author: Your Name
date: 2026-06-24T12:00:00.000Z
tags:
  - post
image: /assets/images/blog/landing.jpg
imageAlt: Descriptive alt text
---

Write your post here using **markdown**.`;

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

  return (
    <div className="min-h-full p-12">
      <div className="max-w-3xl ml-6">

      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-x-1 gap-y-1 text-base font-normal text-slate-900">
        <Link href="/docs/eleventy" className="rounded-full py-1 hover:text-slate-600 hover:underline">
          Eleventy
        </Link>
        <span><LuChevronRight /></span>
        <Link href="/docs/eleventy/tutorials" className="rounded-full py-1 hover:text-slate-600 hover:underline">
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
          This starter ships with a Git-based blog powered by{" "}
          <a
            href="https://decapcms.org/docs/basic-steps/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 underline font-semibold"
          >
            Decap CMS
          </a>
          . This guide walks you through how the blog is wired, how to configure the post fields,
          how to connect a login for your client with{" "}
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
          Make sure your repo is pushed to GitHub and your site is deployed (it doesn&apos;t have to
          be Netlify) before moving on. If you haven&apos;t scaffolded and deployed the template yet,
          start with the quick build tutorial first.
        </p>
        <Link
          href="/docs/eleventy/tutorials/build-in-5-minutes"
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 hover:bg-gray-700 text-gray-700 font-semibold rounded-lg transition-colors"
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
              desc: "See how Decap CMS, markdown posts, and the admin config fit together",
            },
            {
              icon: Settings,
              title: "Configure",
              desc: "Set the blog collection and post fields in config.yml",
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
              in your repo, and three folders do all the work.
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-gray-900 rounded-lg p-4 font-mono text-xs text-gray-100 overflow-x-auto">
            <pre className="whitespace-pre">{`src/
├─ admin/
│  ├─ config.yml          ← CMS configuration (collection, fields, backend)
│  └─ index.html          ← loads the Decap dashboard at /admin
├─ content/
│  └─ blog/
│     ├─ blog.json        ← layout + permalink applied to every post
│     ├─ my-first-post.md ← one markdown file per post
│     └─ ...
└─ assets/
   └─ images/
      └─ blog/            ← featured images uploaded from the CMS`}</pre>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 border-2 border-gray-200 rounded-lg">
              <FileCode className="w-5 h-5 text-gray-600 mb-2" />
              <p className="font-bold text-gray-900 text-sm mb-1">src/admin/config.yml</p>
              <p className="text-xs text-gray-600">
                Defines your collection, the fields each post has, and which backend handles login.
              </p>
            </div>
            <div className="p-4 border-2 border-gray-200 rounded-lg">
              <FileText className="w-5 h-5 text-gray-600 mb-2" />
              <p className="font-bold text-gray-900 text-sm mb-1">src/content/blog/</p>
              <p className="text-xs text-gray-600">
                One markdown file per post. The CMS creates, updates, and deletes files here.
              </p>
            </div>
            <div className="p-4 border-2 border-gray-200 rounded-lg">
              <ImageIcon className="w-5 h-5 text-gray-600 mb-2" />
              <p className="font-bold text-gray-900 text-sm mb-1">src/assets/images/blog/</p>
              <p className="text-xs text-gray-600">
                Where featured images land when uploaded through the dashboard.
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
              <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">src/admin/config.yml</code>{" "}
              controls the folder posts are saved to and the fields editors fill in.
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <p className="text-gray-700 text-sm">
            The starter already includes the blog collection below. The defaults work out of the
            box — adjust labels, add fields, or change the upload folders to fit your project.
          </p>

          <div className="bg-gray-900 rounded-lg p-4 font-mono text-xs text-gray-100 relative max-h-96 overflow-y-auto">
            <pre className="whitespace-pre-wrap">{configSnippet}</pre>
            <button
              onClick={() => copyToClipboard(configSnippet, 2)}
              className="absolute right-3 top-3 p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
            >
              {copiedStep === 2 ? (
                <Check className="w-4 h-4 text-gray-400" />
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

          <div className="p-4 bg-blue-50 border-2 border-blue-200 rounded-lg">
            <p className="text-gray-900 font-medium mb-1 flex items-center gap-2">
              <ImageIcon className="w-4 h-4" />
              Where images go
            </p>
            <p className="text-sm text-gray-800">
              <code className="bg-blue-100 px-1.5 py-0.5 rounded">media_folder</code> is where
              uploaded files are stored in the repo, and{" "}
              <code className="bg-blue-100 px-1.5 py-0.5 rounded">public_folder</code> is the path
              written into your markdown. Keep them pointed at the same{" "}
              <code className="bg-blue-100 px-1.5 py-0.5 rounded">blog</code> folder so featured
              images resolve correctly on the live site.
            </p>
          </div>
        </div>
      </div>

      {/* ── Section: Post layout & permalink ── */}
      <div className="mb-12 bg-white rounded-2xl p-8 border-2 border-gray-200 shadow-sm">
        <div className="flex items-start gap-4 mb-6">
          <div className="shrink-0 w-12 h-12 bg-blue-50 text-gray-700 rounded-xl flex items-center justify-center shadow-lg">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-1">Post Layout &amp; Permalink</h2>
            <p className="text-gray-600">
              A directory data file gives every post its template and URL, so editors never have to
              think about it.
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <p className="text-gray-700 text-sm">
            Markdown files can&apos;t set their own layout or permalink, so{" "}
            <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">
              src/content/blog/blog.json
            </code>{" "}
            applies these settings to <strong>every</strong> post in the folder. It picks the{" "}
            <code className="bg-gray-100 px-1 rounded">post.html</code> layout, tags each entry{" "}
            <code className="bg-gray-100 px-1 rounded">post</code> so Eleventy collects it, and builds
            the URL from the post&apos;s <code className="bg-gray-100 px-1 rounded">url</code> field.
          </p>

          <div className="bg-gray-900 rounded-lg p-4 font-mono text-xs text-gray-100 relative">
            <pre className="whitespace-pre-wrap">{dataFileSnippet}</pre>
            <button
              onClick={() => copyToClipboard(dataFileSnippet, 3)}
              className="absolute right-3 top-3 p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
            >
              {copiedStep === 3 ? (
                <Check className="w-4 h-4 text-green-400" />
              ) : (
                <Copy className="w-4 h-4 text-gray-400" />
              )}
            </button>
          </div>

          <div>
            <h3 className="text-base font-bold text-gray-900 mb-2">What a post file looks like</h3>
            <p className="text-gray-600 mb-3 text-sm">
              Each post the CMS creates is a markdown file with frontmatter matching the fields you
              configured, followed by the body. You can also create posts by hand using this shape:
            </p>
            <div className="bg-gray-900 rounded-lg p-4 font-mono text-xs text-gray-100 relative">
              <pre className="whitespace-pre-wrap">{frontmatterSnippet}</pre>
              <button
                onClick={() => copyToClipboard(frontmatterSnippet, 4)}
                className="absolute right-3 top-3 p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
              >
                {copiedStep === 4 ? (
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
                Open the dashboard and click{" "}
                <strong>Create New Site</strong>. You&apos;ll be asked to fill in three input fields.
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
                e.g.{" "}
                <code className="bg-gray-100 px-1 rounded">your-name/your-blog</code>.
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
            <h2 className="text-2xl font-bold text-gray-900 mb-1">
              Create a GitHub Access Token
            </h2>
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

      {/* ── Section: Configure the backend ── */}
      <div className="mb-12 bg-white rounded-2xl p-8 border-2 border-gray-200 shadow-sm">
        <div className="flex items-start gap-4 mb-6">
          <div className="shrink-0 w-12 h-12 bg-blue-50 text-gray-700 rounded-xl flex items-center justify-center shadow-lg">
            <Settings className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-1">Swap in the Backend Snippet</h2>
            <p className="text-gray-600">
              Replace the placeholder backend in your admin config with the snippet from your
              DecapBridge dashboard.
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <p className="text-gray-700 text-sm">
            Out of the box,{" "}
            <code className="bg-gray-100 px-2 py-0.5 rounded text-sm">src/admin/config.yml</code>{" "}
            ships with a placeholder <code className="bg-gray-100 px-1 rounded">backend: git-gateway</code>{" "}
            so the CMS loads locally. Replace that whole <code className="bg-gray-100 px-1 rounded">backend</code>{" "}
            block with the snippet from your DecapBridge dashboard. The{" "}
            <code className="bg-gray-100 px-1 rounded">repo</code>,{" "}
            <code className="bg-gray-100 px-1 rounded">identity_url</code>, and{" "}
            <code className="bg-gray-100 px-1 rounded">gateway_url</code> values are all generated
            for you. It should look something like this:
          </p>

          <div className="bg-gray-900 rounded-lg p-4 font-mono text-xs text-gray-100 relative max-h-96 overflow-y-auto">
            <pre className="whitespace-pre-wrap">{backendSnippet}</pre>
            <button
              onClick={() => copyToClipboard(backendSnippet, 1)}
              className="absolute right-3 top-3 p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
            >
              {copiedStep === 1 ? (
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
                Fill in the Title, URL Slug, Description, Author, Date, and Tags, then upload a{" "}
                Featured Image and write the body in the markdown editor.
              </>,
              <>
                Click <strong>Publish</strong>. Decap commits a new markdown file to{" "}
                <code className="bg-gray-100 px-1.5 py-0.5 rounded">src/content/blog/</code>, your
                host rebuilds, and the post appears at{" "}
                <code className="bg-gray-100 px-1.5 py-0.5 rounded">/blog/your-slug/</code>.
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
                The editor shows a live preview pane next to the form, so your client can see exactly
                how the post will look before they hit Publish.
              </p>
            </div>
          </div>

          <div className="p-4 bg-blue-50 border-2 border-blue-200 rounded-lg">
            <p className="text-gray-900 font-medium mb-1 flex items-center gap-2">
              <Terminal className="w-4 h-4" />
              Editing locally (optional)
            </p>
            <p className="text-sm text-gray-800">
              The config keeps{" "}
              <code className="bg-blue-100 px-1.5 py-0.5 rounded">local_backend: true</code>, so you
              can edit content on your machine without logging in. In one terminal run{" "}
              <code className="bg-blue-100 px-1.5 py-0.5 rounded">npx decap-server</code>, start the
              site with <code className="bg-blue-100 px-1.5 py-0.5 rounded">npm start</code> in
              another, then open{" "}
              <code className="bg-blue-100 px-1.5 py-0.5 rounded">localhost:8080/admin/</code>.
            </p>
          </div>
        </div>
      </div>

      {/* Next Steps */}
      <div className="bg-white border-2 border-gray-200 shadow-sm rounded-2xl p-8 text-gray-700">
        <div className="flex items-center gap-3 mb-4">
          <Newspaper className="w-8 h-8" />
          <h2 className="text-3xl font-bold">Your Blog Is Live</h2>
        </div>
        <p className="text-xl text-gray-600 mb-6">
          Decap CMS now powers your blog and DecapBridge handles the logins. You and your clients can
          sign in at the{" "}
          <code className="bg-blue-100 px-2 py-0.5 rounded">/admin</code> dashboard, and every edit
          lands back in your GitHub repo as a commit.
        </p>
        <div className="flex flex-wrap gap-4">
          <a
            href="https://decapcms.org/docs/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-50 hover:bg-blue-100 text-gray-700 font-bold rounded-lg transition-colors"
          >
            <FileText className="w-5 h-5" />
            Decap CMS Docs
          </a>
          <Link
            href="/docs/eleventy/deployment"
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
