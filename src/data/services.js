import {
  Bot,
  Code2,
  Globe,
  Headphones,
  Layers,
  Plug,
  Rocket,
  ShieldCheck,
  ShoppingBag,
  Smile,
  Sparkles,
} from 'lucide-react';
import shopifyPartnerLogo from '@/assets/images/shopify-white.svg';
import shopifyAppStoreBadge from '@/assets/images/app-store.png';

export const trustBadges = [
  {
    id: 'shopify-partner',
    image: shopifyPartnerLogo,
    alt: 'Shopify Partner',
    className: 'h-8 sm:h-9',
  },
  {
    id: 'shopify-app-store',
    image: shopifyAppStoreBadge,
    alt: 'Find us on the Shopify App Store',
    className: 'h-9 sm:h-10',
  },
];

export const featuredServices = [
  {
    id: 'shopify-development',
    title: 'Shopify Development',
    description:
      'End-to-end Shopify store builds, migrations, and performance optimization tailored to your brand.',
    icon: ShoppingBag,
    iconBg: 'bg-emerald-500/10',
    iconColor: 'text-emerald-500',
  },
  {
    id: 'shopify-support',
    title: 'Shopify Support',
    description:
      'Reliable ongoing support, maintenance, and rapid bug fixes to keep your store running smoothly.',
    icon: Headphones,
    iconBg: 'bg-blue-500/10',
    iconColor: 'text-blue-500',
  },
  {
    id: 'custom-shopify-apps',
    title: 'Custom Shopify Apps',
    description:
      'Purpose-built Shopify apps that extend platform capabilities and solve unique business challenges.',
    icon: Layers,
    iconBg: 'bg-purple-500/10',
    iconColor: 'text-purple-500',
  },
  {
    id: 'ai-automation',
    title: 'AI Automation',
    description:
      'Intelligent workflows that eliminate repetitive tasks and scale operations without adding headcount.',
    icon: Bot,
    iconBg: 'bg-cyan-500/10',
    iconColor: 'text-cyan-500',
  },
  {
    id: 'ai-integrations',
    title: 'AI Integrations',
    description:
      'Seamlessly connect AI tools with your Shopify stack for smarter merchandising and support.',
    icon: Plug,
    iconBg: 'bg-violet-500/10',
    iconColor: 'text-violet-500',
  },
  {
    id: 'custom-development',
    title: 'Custom Development',
    description:
      'Full-stack custom software solutions — APIs, dashboards, and enterprise integrations.',
    icon: Code2,
    iconBg: 'bg-orange-500/10',
    iconColor: 'text-orange-500',
  },
];

export const stats = [
  { id: 'projects', value: '50+', label: 'Projects Delivered', icon: Rocket },
  { id: 'clients', value: '30+', label: 'Happy Clients', icon: Smile },
  { id: 'apps', value: '2', label: 'Shopify Apps', icon: ShoppingBag },
  { id: 'countries', value: '5+', label: 'Countries Served', icon: Globe },
  {
    id: 'focus',
    value: '100%',
    label: 'Client Satisfaction',
    icon: ShieldCheck,
  },
];

export const heroNodes = [
  {
    id: 'shopify',
    label: 'Shopify Development',
    angle: -90,
    icon: ShoppingBag,
    iconColor: 'text-emerald-400',
  },
  {
    id: 'ai-auto',
    label: 'AI Automation',
    angle: -30,
    icon: Sparkles,
    iconColor: 'text-cyan-400',
  },
  {
    id: 'custom-apps',
    label: 'Custom Shopify Apps',
    angle: 30,
    icon: Layers,
    iconColor: 'text-purple-400',
  },
  {
    id: 'ai-int',
    label: 'AI Integrations',
    angle: 90,
    icon: Plug,
    iconColor: 'text-blue-400',
  },
  {
    id: 'custom-dev',
    label: 'Custom Development',
    angle: 150,
    icon: Code2,
    iconColor: 'text-orange-400',
  },
  {
    id: 'wordpress',
    label: 'WordPress',
    angle: 210,
    icon: Globe,
    iconColor: 'text-indigo-400',
  },
];
