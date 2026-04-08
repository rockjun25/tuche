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

  return (
    <div className="min-h-screen pt-28 pb-32 px-6 md:px-12">
      <div className="max-w-2xl mx-auto">
        <div className="mb-12">
          <span className="inline-block text-xs font-medium tracking-widest uppercase text-ink/40 bg-ink/5 px-4 py-1.5 rounded-full mb-4">
            수정
          </span>
          <h1 className="text-3xl font-bold text-ink">수정하기</h1>
        </div>

        <EditForm post={post} />
      </div>
    </div>
  );
}
