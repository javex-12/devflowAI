/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { FeatureItem, TestimonialItem, PricingPlan, FaqItem, TerminalSample } from './types';

export const TERMINAL_SAMPLES: TerminalSample[] = [
  {
    id: 'query',
    tabLabel: 'DB Optimizer',
    iconName: 'Database',
    command: 'devflow optimize --file=get_users.sql --analyze',
    logs: [
      '🚀 DevFlow DB Engine active...',
      '🔍 Inspecting query get_users.sql (164 bytes)...',
      '⚠️ Warning: Unindexed Nested Loop Left Join on profiles table (Row cost: 42,910).',
      '🤖 Applying compound index suggestions & subquery elimination...',
      '⚡ Re-compiling AST with Planner Hints...',
      '✅ Done! Performance boost: +1,420% expected run-rate efficiency.'
    ],
    finalLang: 'sql',
    finalCode: `-- 🚀 Optimized Statement\n-- Original cost: 42,910 | DevFlow cost: 304\n\nSELECT \n  u.id, \n  u.name, \n  p.tier, \n  COALESCE(sub.usage_count, 0) as api_count\nFROM users u\nINNER JOIN profiles p ON u.id = p.user_id\nLEFT JOIN (\n  -- Materialized aggregation to avoid nested loop scan \n  SELECT user_id, COUNT(*) as usage_count \n  FROM logs \n  WHERE created_at > NOW() - INTERVAL '30 days'\n  GROUP BY user_id\n) sub ON u.id = sub.user_id\nWHERE u.status = 'active'\n  AND p.tier IN ('pro', 'enterprise');`
  },
  {
    id: 'api',
    tabLabel: 'API Builder',
    iconName: 'Cpu',
    command: 'devflow generate endpoint register-auth --with-rate-limit --zod',
    logs: [
      '⚡ DevFlow Scaffold CLI starting...',
      'Ingesting request body parameters (email, username, password)...',
      '🔒 Injecting argon2 hash validation algorithms...',
      '🛡️ Binding Express rate-limiter middleware (100reqs/15m)...',
      '🧬 Generating schema parser via Zod...',
      '💾 Output written automatically to /src/routes/auth.ts [Ready]'
    ],
    finalLang: 'typescript',
    finalCode: `import express from 'express';\nimport { z } from 'zod';\nimport { rateLimit } from 'express-rate-limit';\nimport { db } from '@/database';\n\nconst router = express.Router();\n\nconst RegisterSchema = z.object({\n  email: z.string().email(),\n  username: z.string().min(3).max(20),\n  password: z.string().min(12),\n});\n\nconst authLimit = rateLimit({ windowMs: 15 * 60 * 1000, max: 100 });\n\nrouter.post('/register-auth', authLimit, async (req, res) => {\n  const parsed = RegisterSchema.safeParse(req.body);\n  if (!parsed.success) {\n    return res.status(400).json({ errors: parsed.error.issues });\n  }\n  \n  const { email, username, password } = parsed.data;\n  const userExists = await db.user.findByEmail(email);\n  \n  if (userExists) {\n    return res.status(409).json({ error: 'Identity taken' });\n  }\n  \n  const newUser = await db.user.create({ email, username, password });\n  return res.status(201).json({ id: newUser.id, status: 'verified' });\n});`
  },
  {
    id: 'tests',
    tabLabel: 'Auto Testing',
    iconName: 'BadgeCheck',
    command: 'devflow verify --test-suite=useThrottle --coverage --react',
    logs: [
      '🧪 DevFlow Tester initialized for React hook...',
      '🧬 Pulling AST structure for src/hooks/useThrottle.ts...',
      '🔍 Found state: throttledValue, timerRef.',
      '⚡ Creating mocks for React renderHook and act APIs...',
      '💡 Scaffolding 4 scenarios: leading edge, trailing edge, fast spam, and timer cleanup...',
      '🟢 Success! Full unit coverage suite created with mock timers.'
    ],
    finalLang: 'typescript',
    finalCode: `import { describe, it, expect, vi } from 'vitest';\nimport { renderHook, act } from '@testing-library/react';\nimport { useThrottle } from './useThrottle';\n\ndescribe('useThrottle Hook spec', () => {\n  it('should throttle frequent updates under delay', () => {\n    vi.useFakeTimers();\n    const { result, rerender } = renderHook(\n      ({ value }) => useThrottle(value, 300),\n      { initialProps: { value: 'first' } }\n    );\n\n    expect(result.current).toBe('first');\n\n    // Rapidly update state props\n    rerender({ value: 'second' });\n    rerender({ value: 'third' });\n    expect(result.current).toBe('first'); // Throttled\n\n    act(() => {\n      vi.advanceTimersByTime(300);\n    });\n    expect(result.current).toBe('third'); // Caught final edge\n  });\n});`
  },
  {
    id: 'docs',
    tabLabel: 'Doc Generator',
    iconName: 'FileText',
    command: 'devflow document --file=src/middleware/auth.ts --format=markdown',
    logs: [
      '📖 DevFlow Doc Gen engine online...',
      '📄 Loading file: src/middleware/auth.ts',
      '🧬 Parsing JSDocs & route handlers...',
      '🔍 Identifying API endpoints, headers required, errors thrown...',
      '🧠 Synthesizing developer guide...',
      '✨ Markdown file created at documentation/auth_middleware.md!'
    ],
    finalLang: 'markdown',
    finalCode: `# Authentication Middleware\n\nSecures routes using Bearer JWT tokens with automatic session expansion.\n\n## Module Information\n- **Target path**: \`src/middleware/auth.ts\`\n- **Dependencies**: \`jose\`, \`cookie\`\n\n## Header Schema\n\`\`\`http\nAuthorization: Bearer <JWT_TOKEN>\n\`\`\`\n\n## Behaviors\n1. Reads \`Authorization\` header or \`session_token\` cookie.\n2. Verifies cryptography via \`jose.jwtVerify\` with \`process.env.JWT_SECRET\`.\n3. Appends parsed \`user_id\` and \`roles\` to route context.\n\n## Response Codes\n- \`401 Unauthorized\`: Missing token, signature mismatch, or expired validation.\n- \`403 Forbidden\`: Token validation pass, but role validation failed.`
  }
];

export const FEATURES_DATA: FeatureItem[] = [
  {
    id: 'feat-1',
    title: 'Adaptive Code Refactoring',
    description: 'DevFlow constantly analyzes local file changes to suggest performance optimization, structure corrections, and safety fixes as you code.',
    icon: 'Terminal',
    badge: 'Real-time',
    category: 'optimization'
  },
  {
    id: 'feat-2',
    title: 'Automated CI/CD Workflows',
    description: 'Scaffold container build processes, multi-stage testing, and lint checks with simple inline triggers and localized build configurations.',
    icon: 'GitBranch',
    category: 'automation'
  },
  {
    id: 'feat-3',
    title: 'Zero-Config Doc Extraction',
    description: 'Keep documentation permanently synchronized. DevFlow reads export schemas, JSDocs, and tests to produce crystal clear Markdown guides.',
    icon: 'FileText',
    badge: 'Popular',
    category: 'intelligence'
  },
  {
    id: 'feat-4',
    title: 'Synthesized Test Suites',
    description: 'Generate fully-typed unit and integration test specs for Jest, Vitest, Playwright, or Cypress in seconds based on your component behaviors.',
    icon: 'ShieldAlert',
    category: 'optimization'
  },
  {
    id: 'feat-5',
    title: 'Natural Language Shell Exec',
    description: 'Translate natural commands to secure complex bash or system orchestrations. Runs safely in sandbox environments with visual safety previews.',
    icon: 'CommandLine',
    badge: 'Agentic',
    category: 'automation'
  },
  {
    id: 'feat-6',
    title: 'Automated Pull Request Reviews',
    description: 'Triage pending mergers inside Github or Gitlab. Summarizes commit structures, ranks risk index, and tags structural files with suggestions.',
    icon: 'GitPullRequest',
    category: 'collaboration'
  }
];

export const TESTIMONIALS_DATA: TestimonialItem[] = [
  {
    id: 'test-1',
    name: 'Sarah Chen',
    handle: 'sarahcodes',
    role: 'Lead Architect',
    company: 'Vercel',
    content: 'DevFlow AI completely changed our engineering velocity. We migrated over 40 database endpoints in half the time. The DB Optimizer is like having a staff DBA developer permanently side-by-side.',
    rating: 5,
    tag: 'Engineering'
  },
  {
    id: 'test-2',
    name: 'Alex Rivera',
    handle: 'alex_rivera_sf',
    role: 'Staff Engineer',
    company: 'Stripe',
    content: 'Scaffolding TypeScript schemas with rate-limiting used to be a dull chore. DevFlow does it in 5 seconds. The generated code is pristine and Zod definitions are incredibly accurate!',
    rating: 5,
    tag: 'Engineering'
  },
  {
    id: 'test-3',
    name: 'Marcus Sterling',
    handle: 'marcus_founder',
    role: 'Founder & CTO',
    company: 'Linear Tech',
    content: 'As an early-stage founder, managing engineering sprint tasks can be overwhelming. DevFlow AI saved us hundreds of contract developer hours. It writes tests that actually match our real business edge cases.',
    rating: 5,
    tag: 'Founder'
  },
  {
    id: 'test-4',
    name: 'Elena Rostova',
    handle: 'elena_dev_ux',
    role: 'Principal Developer',
    company: 'Supabase',
    content: 'Docs are notoriously hard to keep updated. DevFlow AI seamlessly intercepts commits and syncs markdown guides without us even thinking about it. Truly an indispensable tool.',
    rating: 5,
    tag: 'Product'
  },
  {
    id: 'test-5',
    name: 'Liam Vance',
    handle: 'liam_vance_build',
    role: 'VP of Engineering',
    company: 'Retool',
    content: 'Our developers were spending 25% of their weeks on test chore backlog. By incorporating DevFlow AI, test coverage actually jumped by 40% while sprint deliverables were pushed 3 days early.',
    rating: 5,
    tag: 'Founder'
  },
  {
    id: 'test-6',
    name: 'Devon Takahashi',
    handle: 'devon_t',
    role: 'Senior Product Lead',
    company: 'Figma',
    content: 'We integrated DevFlow review systems into our pipeline hooks. It does a phenomenal job highlighting security vulnerabilities and type inconsistencies before manual reviews even start.',
    rating: 5,
    tag: 'Product'
  }
];

export const PRICING_PLANS: PricingPlan[] = [
  {
    name: 'Starter',
    priceMonthly: 0,
    priceYearly: 0,
    description: 'Perfect for solo developers, hackers, and side-projects looking to automate basic tasks.',
    features: [
      '1,000 optimization requests/mo',
      'Basic database optimizer',
      'API Scaffolding up to 5 models',
      'Standard markdown doc generator',
      'Community Discord support'
    ],
    popular: false,
    ctaText: 'Start Free'
  },
  {
    name: 'Pro',
    priceMonthly: 24,
    priceYearly: 19,
    description: 'The sweet spot for senior engineers, high-velocity builders, and professional teams.',
    features: [
      'Unlimited optimization requests',
      'Full CI/CD CLI pipeline automation',
      'Advanced compound SQL optimizer',
      'Vitest & Jest test harness generation',
      'Zod, rate-limiter, and auth decorators',
      'Priority slack & email support (1hr response)'
    ],
    popular: true,
    ctaText: 'Upgrade to Pro'
  },
  {
    name: 'Enterprise',
    priceMonthly: 99,
    priceYearly: 79,
    description: 'Custom tailored features, dedicated support, and enterprise-grade scale for organizations.',
    features: [
      'All features in Professional Tier',
      'On-premise secure VPC deployment',
      'Custom LLM fine-tuning on custom SDKs',
      'SOC-2 safety rules and code audits',
      'Dedicated engineering solutions architect',
      '99.9% Server SLA & uptime guarantees'
    ],
    popular: false,
    ctaText: 'Contact Enterprise'
  }
];

export const FAQ_DATA: FaqItem[] = [
  {
    id: 'faq-1',
    question: 'How is DevFlow AI different from Github Copilot?',
    answer: 'While Copilot excels at inline autocomplete predictions, DevFlow AI operates at the system level. We take a holistic view of your architecture—generating complete endpoints with rate-limiters, compound SQL queries, deep test harnesses, and keeping your documentation perfectly synced with your Git tree automatically.',
    category: 'Product'
  },
  {
    id: 'faq-2',
    question: 'Does my copyrighted code train your model?',
    answer: 'Absolutely not. DevFlow AI strictly implements enterprise-grade compliance. All Pro and Enterprise datasets are immediately discarded post-inference. Your source code files are never persisted on our machines nor are they utilized for base model training weights.',
    category: 'Security'
  },
  {
    id: 'faq-3',
    question: 'Can I self-host DevFlow AI inside our private network?',
    answer: 'Yes! Our Enterprise tier provides complete VPC deployment. You can host DevFlow on AWS, GCP, or Azure using your own private instances, ensuring zero bytes ever leave your internal security parameter.',
    category: 'Hosting'
  },
  {
    id: 'faq-4',
    question: 'What runtime languages and frameworks are supported?',
    answer: 'We natively support TypeScript, JavaScript, SQL (PostgreSql, MySql, Spanner), Python, Rust, Go, and Kotlin. Our automation and test generation modules recognize popular frameworks which include React, Express, NestJS, Vitest, Jest, and Github Actions.',
    category: 'Technology'
  },
  {
    id: 'faq-5',
    question: 'Is there a free trial for teams?',
    answer: 'Yes, teams can sign up for a 14-day premium Pro evaluation without requiring credit cards. If you choose not to subscribe, we will transition you to the Free Starter plan.',
    category: 'Billing'
  }
];
