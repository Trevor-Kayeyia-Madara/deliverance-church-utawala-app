export type CoreValue = {
  title: string;
  description: string;
  icon?: 'faith' | 'word' | 'prayer' | 'community' | 'service' | 'excellence';
};

export const CORE_VALUES: CoreValue[] = [
  {
    title: 'Rooted in Faith',
    description:
      'We build everything on a living faith in Jesus Christ and a daily walk with God.',
    icon: 'faith',
  },
  {
    title: 'Biblical Teaching',
    description:
      "We honor God's Word through sound doctrine, discipleship, and practical teaching.",
    icon: 'word',
  },
  {
    title: 'Prayer & Worship',
    description:
      'We seek God in prayer and worship, making space for His presence and leading.',
    icon: 'prayer',
  },
  {
    title: 'Community',
    description:
      'We grow together through authentic relationships, care, and mutual support.',
    icon: 'community',
  },
  {
    title: 'Service',
    description:
      'We love our neighbors through compassion, outreach, and faithful stewardship.',
    icon: 'service',
  },
  {
    title: 'Excellence',
    description:
      'We serve with integrity, discipline, and excellence to honor God in all we do.',
    icon: 'excellence',
  },
];

