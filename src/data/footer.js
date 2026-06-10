import {
  Camera,
  Globe,
  Mail,
  MapPin,
  Phone,
  Share2,
  Video,
} from 'lucide-react';
import { EXTERNAL_LINKS } from '@/constants/links';
import { BRAND } from '@/constants/theme';

export const contactDetails = [
  {
    id: 'email',
    label: BRAND.email,
    href: `mailto:${BRAND.email}`,
    icon: Mail,
  },
  // {
  //   id: 'phone',
  //   label: BRAND.phone,
  //   href: `tel:${BRAND.phone.replace(/\s/g, '')}`,
  //   icon: Phone,
  // },
  // {
  //   id: 'location',
  //   label: BRAND.location,
  //   href: null,
  //   icon: MapPin,
  // },
];

export const socialLinks = [
  {
    id: 'linkedin',
    label: 'LinkedIn',
    href: EXTERNAL_LINKS.social.linkedin,
    icon: Share2,
  },
  {
    id: 'twitter',
    label: 'Twitter',
    href: EXTERNAL_LINKS.social.twitter,
    icon: Globe,
  },
  {
    id: 'youtube',
    label: 'YouTube',
    href: EXTERNAL_LINKS.social.youtube,
    icon: Video,
  },
  {
    id: 'instagram',
    label: 'Instagram',
    href: EXTERNAL_LINKS.social.instagram,
    icon: Camera,
  },
];
