import { EXTERNAL_LINKS } from '@/constants/links';
import collectionTreeImg from '@/assets/images/collection-tree.png';
import storeRadarImg from '@/assets/images/store-radar.png';

export const products = [
  {
    id: 'collection-tree',
    name: 'Collection Tree',
    description:
      'Organize and showcase your product collections with an intuitive tree-based navigation. Help customers discover products faster and boost conversion rates.',
    image: collectionTreeImg,
    appStoreUrl: EXTERNAL_LINKS.shopifyAppStore.collectionTree,
  },
  {
    id: 'store-radar',
    name: 'Store Radar',
    description:
      'Real-time store monitoring and analytics dashboard. Track performance metrics, identify issues, and optimize your Shopify store with actionable insights.',
    image: storeRadarImg,
    appStoreUrl: EXTERNAL_LINKS.shopifyAppStore.storeRadar,
  },
];
