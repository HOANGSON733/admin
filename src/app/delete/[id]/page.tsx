// src/app/delete/[id]/page.tsx
import { deleteData } from "../../../lib/api";
import { redirect } from "next/navigation";

export default async function DeleteGallery({ params }: { params: { id: string } }) {
  await deleteData(Number(params.id));
  redirect("/");
}
