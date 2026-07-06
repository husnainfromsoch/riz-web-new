import { getAllGuides } from "@/lib/guides";
import GuidesClient from "./GuidesClient";

export const metadata = {
  title: "Guides — Rizwan Mahmood",
  description: "Automation guides for engineers and founders — practical, no fluff.",
};

export default function GuidesPage() {
  const guides = getAllGuides();
  return <GuidesClient guides={guides} />;
}
