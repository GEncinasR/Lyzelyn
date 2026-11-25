
import type { Metadata } from "next";
import CitasManager from "../components/CitasManager";

export const metadata: Metadata = {
  title: "Citas",
};

export default function CitasPage() {
  return <CitasManager />;
}
