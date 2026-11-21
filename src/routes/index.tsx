import { createFileRoute } from "@tanstack/react-router";
import { RpfApp } from "@/components/rpf/app";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return <RpfApp />;
}
