import {
  Compass,
  FlaskConical,
  Headphones,
  Palette,
  Rocket,
  Search,
  Code2,
} from 'lucide-react';

export const processSteps = [
  { id: 'discovery', title: 'Discovery', icon: Search },
  { id: 'planning', title: 'Planning', icon: Compass },
  { id: 'design', title: 'Design', icon: Palette },
  { id: 'development', title: 'Development', icon: Code2 },
  { id: 'testing', title: 'Testing', icon: FlaskConical },
  { id: 'launch', title: 'Launch', icon: Rocket },
  { id: 'support', title: 'Support', icon: Headphones },
];

export const traditionalFlow = [
  { id: 'build', label: 'Build' },
  { id: 'deliver', label: 'Deliver' },
  { id: 'end', label: 'End' },
];

export const anantaFlow = [
  { id: 'strategy', label: 'Strategy' },
  { id: 'build', label: 'Build' },
  { id: 'automate', label: 'Automate' },
  { id: 'optimize', label: 'Optimize' },
  { id: 'scale', label: 'Scale' },
];
