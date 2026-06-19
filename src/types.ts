/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface FeatureItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  badge?: string;
  category: 'automation' | 'optimization' | 'intelligence' | 'collaboration';
}

export interface TestimonialItem {
  id: string;
  name: string;
  handle: string;
  role: string;
  company: string;
  content: string;
  avatarUrl?: string;
  rating: number;
  tag: 'All' | 'Engineering' | 'Product' | 'Founder';
}

export interface PricingPlan {
  name: string;
  priceMonthly: number;
  priceYearly: number;
  description: string;
  features: string[];
  popular: boolean;
  ctaText: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface TerminalSample {
  id: string;
  tabLabel: string;
  iconName: string;
  command: string;
  logs: string[];
  finalLang: string;
  finalCode: string;
}
