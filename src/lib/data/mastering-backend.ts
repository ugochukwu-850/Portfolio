import type { Topic } from './topics';

export type ExternalArticle = {
	slug: string;
	title: string;
	date: string;
	topics: Topic[];
	excerpt: string;
	likes: number;
};

export const MB_BASE = 'https://blog.masteringbackend.com';

// Published on Mastering Backend (blog.masteringbackend.com/authors/chizaram).
export const masteringBackend: ExternalArticle[] = [
	{
		slug: 'understanding-from-and-into-traits-in-rust',
		title: 'Rust From and Into Traits: How Type Conversion Works',
		date: '2026-08-27',
		topics: ['Traits & Types'],
		excerpt: "Rust's From and Into traits are the standard way to convert one type into another.",
		likes: 164
	},
	{
		slug: 'rust-slices-cutting-into-references-the-safe-way',
		title: 'Rust Slices: How to Borrow Part of an Array, Vec, or String',
		date: '2026-08-27',
		topics: ['Memory', 'Collections'],
		excerpt:
			'A Rust slice is a borrowed view into a run of contiguous memory: a pointer plus a length, and no ownership.',
		likes: 79
	},
	{
		slug: 'atomic-primitives-in-rust-you-don-t-need-a-mutex',
		title: "Atomic Primitives in Rust: You don't need a mutex",
		date: '2025-09-16',
		topics: ['Concurrency'],
		excerpt:
			'Lock-free shared state with Rust’s atomic primitives, and when you don’t need a mutex at all.',
		likes: 176
	},
	{
		slug: 'the-rust-advantage-building-bulletproof-systems-when-ai-writes-half-your-code',
		title: 'The Rust Advantage: Building Bulletproof Systems When AI Writes Half Your Code',
		date: '2025-09-15',
		topics: ['Systems & AI'],
		excerpt:
			"Welcome to the age of AI-assisted development, where the question isn't whether machines can write code (they can), but whether they can write code that won't bite you later.",
		likes: 169
	},
	{
		slug: 'what-is-a-weak-pointer-in-rust-and-why-it-matters',
		title: 'What Is a Weak Pointer in Rust (and Why It Matters)?',
		date: '2025-09-12',
		topics: ['Memory'],
		excerpt:
			"If you've been wrestling with Rust's ownership system and wondering why sometimes you can't just point things at each other, you're in the right place.",
		likes: 131
	},
	{
		slug: 'collections-in-rust-the-essentials',
		title: 'Collections in Rust: The Essentials',
		date: '2025-09-09',
		topics: ['Collections'],
		excerpt: 'The collections you’ll use most in Rust, and the essentials of using them well.',
		likes: 156
	},
	{
		slug: 'python-devs-beware-the-operator-lies-in-rust',
		title: 'Python Devs Beware: The % Operator Lies in Rust',
		date: '2025-09-08',
		topics: ['Fundamentals'],
		excerpt:
			'In this article, we’ll explore the differences, why Rust does it the way it does, and the correct way to get a true modulo in Rust while preserving signs.',
		likes: 88
	},
	{
		slug: 'rust-doesn-t-need-a-garbage-collector-here-s-why',
		title: 'Rust Doesn’t Need a Garbage Collector — Here’s Why',
		date: '2025-08-11',
		topics: ['Memory'],
		excerpt:
			"If you're coming from a language like Python or JavaScript, you're used to not worrying about memory.",
		likes: 59
	},
	{
		slug: 'declarative-macros-in-rust-are-they-just-elegant-match-arms',
		title: 'Declarative Macros in Rust: Are They Just Elegant Match Arms?',
		date: '2025-07-07',
		topics: ['Macros & Compiler'],
		excerpt:
			"Today, we're diving into one of Rust's most powerful and sometimes intimidating features: declarative macros.",
		likes: 201
	},
	{
		slug: 'rust-extension-traits-in-5-minutes',
		title: 'Rust Extension Traits in 5 Minutes',
		date: '2025-06-26',
		topics: ['Traits & Types'],
		excerpt:
			'Adding methods to types you don’t own with extension traits, and why Rust’s coherence rules make them necessary.',
		likes: 142
	},
	{
		slug: 'ensuring-trait-constants-are-validated-at-compile-time',
		title: 'Ensuring Trait Constants Are Validated at Compile Time',
		date: '2025-06-24',
		topics: ['Traits & Types', 'Macros & Compiler'],
		excerpt:
			"You've probably written trait constants before, but have you ever needed to validate them?",
		likes: 96
	},
	{
		slug: 'looping-through-enum-variants-in-rust-using-strum',
		title: 'Looping Through Enum Variants in Rust Using strum',
		date: '2025-06-05',
		topics: ['Traits & Types'],
		excerpt:
			'Rust enums are incredibly powerful for modeling data, but newcomers quickly discover a frustrating limitation: you cannot iterate through enum variants natively.',
		likes: 187
	},
	{
		slug: 'understanding-the-as-keyword-in-rust-type-casting-renaming-and-trait-disambiguation',
		title: 'Understanding the as Keyword in Rust: Type Casting, Renaming, and Trait Disambiguation',
		date: '2025-06-04',
		topics: ['Fundamentals', 'Traits & Types'],
		excerpt:
			'The as keyword in Rust serves three critical purposes that every developer should master.',
		likes: 59
	},
	{
		slug: 'how-rust-knows-when-you-re-not-using-a-variable-the-prefix-trick',
		title: "How Rust Knows When You're Not Using a Variable: The _ Prefix Trick",
		date: '2025-06-02',
		topics: ['Fundamentals', 'Macros & Compiler'],
		excerpt:
			'In Rust, aside from variables and struct fields, you can also bind memory to patterns.',
		likes: 122
	},
	{
		slug: 'sized-and-sized-a-beginners-guide',
		title: "Sized & ?Sized: A Beginner's Guide",
		date: '2025-05-31',
		topics: ['Traits & Types', 'Memory'],
		excerpt:
			'Understanding Sized unlocks deeper comprehension of why Rust behaves the way it does with generics, function parameters, and memory management.',
		likes: 114
	},
	{
		slug: 'understanding-the-cow-t-copy-on-write',
		title: 'Understanding Cow<T>: Clone on Write',
		date: '2025-05-18',
		topics: ['Memory'],
		excerpt:
			'How Cow<T> works, how to use it in structs and functions, and the trade-offs and pitfalls to avoid.',
		likes: 176
	},
	{
		slug: 'rust-send-and-sync-in-simple-terms',
		title: 'Rust Send and Sync in Simple Terms',
		date: '2025-05-16',
		topics: ['Concurrency', 'Traits & Types'],
		excerpt:
			'What Send and Sync actually mean, and how to read the compiler errors that mention them.',
		likes: 114
	},
	{
		slug: 'how-to-use-the-default-trait-in-rust',
		title: 'How to Use the Default Trait in Rust',
		date: '2025-05-13',
		topics: ['Traits & Types'],
		excerpt:
			'When working with structs or enums in Rust, we often need a way to create a "standard" or "initial" instance without specifying all the fields every time.',
		likes: 157
	},
	{
		slug: 'how-to-use-the-matches-macro-pattern-matching',
		title: 'Pattern Matching with the matches! Macro',
		date: '2025-05-13',
		topics: ['Macros & Compiler', 'Fundamentals'],
		excerpt: 'Concise boolean checks against a pattern with the matches! macro.',
		likes: 226
	},
	{
		slug: 'rust-error-handling-80-20-guide',
		title: 'Rust Error Handling: 80 / 20 Guide',
		date: '2025-05-09',
		topics: ['Fundamentals'],
		excerpt: 'The small part of Rust’s error-handling system that covers most real-world code.',
		likes: 150
	},
	{
		slug: 'understanding-lifetime-elision-in-rust',
		title: 'Understanding Lifetime Elision in Rust',
		date: '2025-04-22',
		topics: ['Memory'],
		excerpt:
			"This topic builds directly on the concept of lifetimes, so if you're not familiar with them, it’s worth reviewing the fundamentals before diving deeper.",
		likes: 219
	},
	{
		slug: 'why-rust-is-the-most-readable-language',
		title: 'Why Rust Is the Most Readable Language',
		date: '2025-04-20',
		topics: ['Fundamentals'],
		excerpt:
			'Ever tried contributing to an open-source project or even worked on a large code base with neck-breaking documentation?',
		likes: 134
	},
	{
		slug: 'setting-up-a-rust-development-environment',
		title: 'Setting Up a Rust Development Environment',
		date: '2025-04-20',
		topics: ['Fundamentals'],
		excerpt: 'Getting a Rust toolchain in place with rustup, cargo and clippy.',
		likes: 79
	},
	{
		slug: 'building-a-validator-system-in-rust',
		title: 'Building a Validator System in Rust',
		date: '2025-04-09',
		topics: ['Systems & AI', 'Traits & Types'],
		excerpt:
			"In this article, we'll explore how to build a type-safe and flexible validator system in Rust, taking cues from DRF's elegant design.",
		likes: 127
	},
	{
		slug: 'introducing-async-closures-rust',
		title: 'Are Async Blocks Dead? Introducing Async Closures (Rust 1.85)',
		date: '2025-03-12',
		topics: ['Concurrency'],
		excerpt:
			'Rust 1.85 shipped async closures. What they are, and whether async blocks still earn their place.',
		likes: 126
	},
	{
		slug: '3-powerful-features-in-rust-s-reqwest-library',
		title: "3 Powerful Features in Rust's Reqwest Library",
		date: '2025-02-22',
		topics: ['Systems & AI'],
		excerpt: 'Three powerful features in reqwest: JSON handling, multipart forms and streaming.',
		likes: 240
	},
	{
		slug: 'building-a-simple-rag-system-application-with-rust',
		title: 'Building a Simple RAG System Application with Rust',
		date: '2025-02-21',
		topics: ['Systems & AI'],
		excerpt:
			'Building a chatbot that queries documents on your local machine, using Gemini for embeddings.',
		likes: 244
	},
	{
		slug: 'asynchronous-recursion-in-rust',
		title: 'Asynchronous Recursion in Rust',
		date: '2025-02-21',
		topics: ['Concurrency'],
		excerpt:
			'Why recursive async functions are harder in Rust than in Python or JavaScript, and how to write them.',
		likes: 221
	},
	{
		slug: 'when-to-use-arrays-and-vectors-in-rust-array-vs-vectors',
		title: 'When to Use Arrays and Vectors in Rust',
		date: '2025-01-30',
		topics: ['Collections'],
		excerpt: 'Fixed-size arrays or growable vectors: when to reach for each in Rust.',
		likes: 81
	},
	{
		slug: 'cfg-conditional-compilation-in-rust',
		title: '#[cfg]: Conditional Compilation in Rust',
		date: '2025-01-16',
		topics: ['Macros & Compiler'],
		excerpt: 'Targeting each operating system with #[cfg] and conditional compilation.',
		likes: 148
	}
];
