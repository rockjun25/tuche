import { ProgressChecklist } from "@/components/ProgressChecklist";
import { modernOntologyLectures } from "@/lib/courseData";

export default function ModernOntologyPage() {
  return (
    <div className="min-h-screen bg-[#f3f3f3]">
      <section className="max-w-6xl mx-auto px-6 py-10">
        <div className="border-[6px] border-black bg-white p-8 shadow-[10px_10px_0_#000] mb-8">
          <p className="text-sm font-black uppercase mb-2">현대존재론</p>
          <h1 className="text-4xl font-black mb-4">바디우 존재와 사건 강해</h1>
          <p className="font-semibold mb-3">백상현 교수님의 바디우 존재와 사건 책 강해 강의를 기반으로 학습합니다.</p>
          <p className="text-sm font-bold">수업 시간, 화 수 KST 12시부터 14시</p>
        </div>

        <div className="grid lg:grid-cols-[1.5fr_1fr] gap-6">
          <div className="border-4 border-black bg-white p-5">
            <h2 className="text-2xl font-black mb-4">강의 링크</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {modernOntologyLectures.map((lecture) => (
                <a
                  key={lecture.label}
                  href={lecture.url}
                  target="_blank"
                  rel="noreferrer"
                  className="border-2 border-black p-3 text-sm font-semibold underline hover:bg-yellow-100"
                >
                  {lecture.label}
                </a>
              ))}
            </div>
          </div>

          <ProgressChecklist
            storageKey="daean-modern-ontology"
            items={modernOntologyLectures.map((lecture) => ({
              id: lecture.label,
              label: lecture.label,
              href: lecture.url,
            }))}
          />
        </div>
      </section>
    </div>
  );
}
