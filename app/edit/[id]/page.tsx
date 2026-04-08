import { getPostById } from "@/lib/actions";
import { notFound } from "next/navigation";
import { EditForm } from "./EditForm";

interface EditPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditPage({ params }: EditPageProps) {
  const { id } = await params;
  const post = await getPostById(Number(id));

  if (!post) {
    notFound();
  }

  return <EditForm post={post} />;
}
