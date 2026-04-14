import Link from "next/link";
import { ProgressChecklist } from "@/components/ProgressChecklist";
import { criticismLectures, criticismWorkshopTopics } from "@/lib/courseData";

export default function CriticismPracticePage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="max-w-6xl mx-auto px-6 py-10">
        <div className="border-[6px] border-black bg-white p-8 shadow-[12px_12px_0_#000] mb-8">
          <p className="text-sm font-black uppercase mb-2">비평의 이론과 실제</p>
          <h1 className="text-4xl font-black mb-4">정신분석 기반 문화 비평문 실습</h1>
          <p className="font-bold mb-3">백상현 교수님 강의를 듣고 실제 비평문 작성까지 진행합니다.</p>
          <p className="text-sm font-black">수업 시간, 목 KST 12시부터 14시</p>
        </div>

        <div className="grid lg:grid-cols-[1.3fr_1fr] gap-6">
          <div className="space-y-6">
            <div className="border-[5px] border-black bg-white p-5 shadow-[8px_8px_0_#000]">
              <h2 className="text-2xl font-black mb-4">강의 링크</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {criticismLectures.map((lecture) => (
                  <a
                    key={lecture.label}
                    href={lecture.url}
                    target="_blank"
                    rel="noreferrer"
                    className="border-2 border-black p-3 text-sm font-black underline hover:bg-black hover:text-white transition-colors"
                  >
                    {lecture.label}
                  </a>
                ))}
              </div>
            </div>

            <div className="border-[5px] border-black bg-white p-5 shadow-[8px_8px_0_#000]">
              <h2 className="text-2xl font-black mb-4">실습 워크숍</h2>
              <ul className="space-y-2">
                {criticismWorkshopTopics.map((topic) => (
                  <li key={topic} className="border-2 border-black p-3 text-sm font-black">
                    {topic}
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-[5px] border-black bg-white p-5 shadow-[8px_8px_0_#000]">
              <h2 className="text-2xl font-black mb-2">비평문 작성</h2>
              <p className="font-bold mb-4">작성은 Tuché에서 진행하고, 링크를 제출 기록으로 남깁니다.</p>
              <Link
                href="/write"
                className="inline-flex border-4 border-black bg-white px-4 py-2 font-black hover:bg-black hover:text-white transition-colors"
              >
                Tuché에서 글쓰기
              </Link>
            </div>
          </div>

          <ProgressChecklist
            storageKey="daean-criticism"
            items={[
              ...criticismLectures.map((lecture) => ({
                id: `강의 ${lecture.label}`,
                label: `강의 ${lecture.label}`,
                href: lecture.url,
              })),
              ...criticismWorkshopTopics.map((topic) => ({
                id: `실습 ${topic}`,
                label: `실습 ${topic}`,
              })),
            ]}
          />
        </div>
      </section>
    </div>
  );
}
