import Link from "next/link";
import { notFound } from "next/navigation";
import { getLectureById, extractYouTubeId } from "@/lib/courseData";
import { getLectureNotes } from "@/lib/actions";
import { LectureNotesPanel } from "@/components/LectureNotesPanel";

const classNames: Record<string, string> = {
  "modern-ontology": "현대존재론",
  "criticism-practice": "비평의 이론과 실제",
};

export default async function StudyPage({
  params,
}: {
  params: Promise<{ classKey: string; lectureId: string }>;
}) {
  const { classKey, lectureId } = await params;

  const lecture = getLectureById(classKey, lectureId);
  if (!lecture) notFound();

  const videoId = extractYouTubeId(lecture.url);
  if (!videoId) notFound();

  const notes = await getLectureNotes(classKey, lectureId);
  const className = classNames[classKey] ?? classKey;

  return (
    <div className="min-h-screen bg-white">
      <section className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex items-center gap-3 mb-6">
          <Link
            href={`/classes/${classKey}`}
            className="border-2 border-black px-3 py-1.5 text-xs font-black uppercase hover:bg-black hover:text-white transition-colors"
          >
            &larr; {className}
          </Link>
          <h1 className="text-2xl font-black">{lecture.label}</h1>
          <a
            href={lecture.url}
            target="_blank"
            rel="noreferrer"
            className="ml-auto border-2 border-black px-3 py-1.5 text-xs font-black uppercase hover:bg-black hover:text-white transition-colors"
          >
            YouTube에서 열기 &nearr;
          </a>
        </div>

        <div className="grid lg:grid-cols-[1fr_380px] gap-6">
          <div className="border-[5px] border-black bg-black shadow-[8px_8px_0_#000]">
            <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
              <iframe
                className="absolute inset-0 w-full h-full"
                src={`https://www.youtube.com/embed/${videoId}`}
                title={lecture.label}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>

          <div className="lg:h-[calc(56.25vw*0.6)] lg:max-h-[600px] lg:min-h-[480px]">
            <LectureNotesPanel
              classKey={classKey}
              lectureId={lectureId}
              initialNotes={notes}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
