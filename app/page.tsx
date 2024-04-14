import { redirect } from "next/navigation";

export default function root() {
  return (
    redirect("/patients")
  );
}
