export type UpcomingEvent = {
  id: number;
  title: string;
  category: string;
  date: string;
  description: string;
  image: string;
};

export type Sermon = {
  id: number;
  title: string;
  speaker: string;
  date: string;
  duration: string;
  category: string;
  image: string;
};

export const UPCOMING_EVENTS: UpcomingEvent[] = [
  {
    id: 1,
    title: 'Sunday Morning Worship',
    category: 'Worship',
    date: 'Every Sunday · 10:00 AM',
    description:
      'Join us for a morning of powerful worship, biblical teaching, and fellowship.',
    image:
      'https://images.unsplash.com/photo-1438032005730-c779502df39b?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 2,
    title: 'Youth Night Out',
    category: 'Youth',
    date: 'Friday · 7:00 PM',
    description:
      'A night filled with high-energy games, music, and deep conversations for teens.',
    image:
      'https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 3,
    title: 'Community Food Drive',
    category: 'Service',
    date: 'Monthly · Sat 9:00 AM',
    description:
      'Helping our neighbors in need. Come and serve with us this Saturday.',
    image:
      'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=800',
  },
];

export const LATEST_SERMONS: Sermon[] = [
  {
    id: 1,
    title: 'The Architecture of Faith: Building on Solid Rock',
    speaker: 'Pastor John Doe',
    date: 'Nov 12, 2023',
    duration: '42:15',
    category: 'The Book of Acts',
    image:
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 2,
    title: 'Finding Peace in a Restless World',
    speaker: 'Pastor Sarah Jane',
    date: 'Nov 5, 2023',
    duration: '38:40',
    category: 'Grace Alone',
    image:
      'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 3,
    title: 'Living with Purpose and Compassion',
    speaker: 'Pastor Mike Smith',
    date: 'Oct 29, 2023',
    duration: '45:22',
    category: 'Walk in Truth',
    image:
      'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=800',
  },
];

