import type { MinistryId } from '../types/ministries';

export type Ministry = {
  id: MinistryId;
  title: string;
  summary: string;
  body: string;
};

export const MINISTRIES: Ministry[] = [
  {
    id: 'worship',
    title: 'Worship Ministry',
    summary:
      'Our quality has grown tremendously to deliver great musical profile, stringent policies and discipline.',
    body: `Our quality has grown tremendously to deliver great musical profile, stringent policies and discipline. I would like also to thank...`,
  },
  {
    id: 'daughters-of-faith',
    title: 'Daughters Of Faith',
    summary: 'What an active and vibrant Daughters of Faith? By Gods Grace...',
    body: `What an active and vibrant Daughters of Faith? By Gods Grace...`,
  },
  {
    id: 'sunday-school',
    title: 'Sunday-School',
    summary:
      'Teach and train a child in the ways of the Lord and they shall not depart from it. (Proverbs 22:6)',
    body: `Teach and train a child in the ways of the Lord and they shall not depart from it" Proverbs 22:6.`,
  },
  {
    id: 'micro-churches',
    title: 'Micro-Churches',
    summary:
      'Welcome to the Micro Church page. All the believers devoted themselves ...',
    body: `I greet you in the name of Our Lord and Savior Jesus Christ. Welcome to the Micro Church page. All the believers devoted themselves ...`,
  },
  {
    id: 'house-of-prophets',
    title: 'House of Prophets',
    summary:
      "Welcome to our men's ministry. We convene together to fellowship with God, each other so as to mentor each other both spiritually and family wise..",
    body: `Welcome to our mens ministry.We convene together to fellowship with God, each other so as to mentor each other both spiritually and family wise..`,
  },
  {
    id: 'young-adults',
    title: 'Young Adults',
    summary:
      'A group of young people yearning for Christ, worshipping Him and influencing peers to follow Him through our Ministry...',
    body: `We are a group of young beautiful and handsome young people yearning for Christ, worshipping Him and striving to influence our fellow peers to follow Him through our Ministry...`,
  },
  {
    id: 'legacy-church',
    title: 'Legacy Church',
    summary:
      'An integral part of any growing church is the youth ministry. Deliverance Church Utawala has been imbued with congregants from this group which ..',
    body: `An integral part of any growing church is the youth ministry. Deliverance Church Utawala has been imbued with congregants from this group which ..`,
  },
  {
    id: 'media-team',
    title: 'Media Team',
    summary:
      'From the Camera to Sound team to Streaming and Production to website IT, we ensure that DC Utawala stays connected to the global world online...',
    body: `It is my priviledge to welcome you to DC UTAWALA MEDIA TEAM. From the Camera to Soundteam to the Streaming and Production until to the website IT , we ensure that DC UTAWALA stays connected to global world online...`,
  },
  {
    id: 'family-life',
    title: 'Family Life',
    summary:
      'The Family Life Ministry wishes to thank God for how far he has taken us as a ministry. FLM focuses on people in relationships and .....',
    body: `The Family Life Ministry wish to thank God for the far he has taken us as a ministry. FLM focuses on people in relationships and .....`,
  },
];

export const getMinistryById = (id: MinistryId) =>
  MINISTRIES.find((m) => m.id === id);

