import { getPastors } from "@/lib/pastors.server";
import PastorsWelcomeClient from "./PastorsWelcomeClient";

export default async function PastorsWelcomeSection() {
  const pastors = await getPastors({ limit: 1 });
  const leadPastor = pastors?.[0];

  if (!leadPastor) return null;

  return <PastorsWelcomeClient pastor={leadPastor} />;
}