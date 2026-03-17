export type ServiceTime = {
  name: string;
  day: string;
  time: string;
  note?: string;
};

export const SERVICE_TIMES: ServiceTime[] = [
  {
    name: 'Sunday First Service',
    day: 'Sunday',
    time: '6:30 AM & 9:00 AM',
  },
  {
    name: 'Sunday Second Service',
    day: 'Sunday',
    time: '9:30 AM & 12:00 PM',
  },
  {
    name: 'Tuesday Fellowship',
    day: 'Tuesday',
    time: '6:30 PM',
  },
  {
    name: 'Wednesday Anchored Service',
    day: 'Wednesday',
    time: '6:30 PM - 8:00 PM',
  },
  {
    name: 'Friday Ignite Service',
    day: 'Friday',
    time: '6:30 PM - 8:00 PM',
  },
];

