import { ProgressChecklist } from "@/components/ProgressChecklist";
import { modernOntologyLectures } from "@/lib/courseData";

export default function ModernOntologyPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="max-w-6xl mx-auto px-6 py-10">
        <div className="border-[6px] border-black bg-white p-8 shadow-[12px_12px_0_#000] mb-8">
          <p className="text-sm font-black uppercase mb-2">현대존재론</p>
          <h1 className="text-4xl font-black mb-4">바디우 존재와 사건 강해</h1>
          <p className="font-bold mb-3">백상현 교수님의 바디우 존재와 사건 책 강해 강의를 기반으로 학습합니다.</p>
          <p className="text-sm font-black">수업 시간, 화 수 KST 12시부터 14시</p>
        </div>

        <div className="grid lg:grid-cols-[1.5fr_1fr] gap-6">
          <div className="border-[5px] border-black bg-white p-5 shadow-[8px_8px_0_#000]">
            <h2 className="text-2xl font-black mb-4">강의 링크</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {modernOntologyLectures.map((lecture) => (
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

          <ProgressChecklist
            storageKey="daean-modern-ontology"
            items={modernOntologyLectures.map((lecture) => ({
              id: lecture.label,
              label: lecture.label,
              href: lecture.url,
            }))}
          />
        </div>

        <div className="border-[5px] border-black bg-white p-6 shadow-[8px_8px_0_#000] mt-8">
          <h2 className="text-2xl font-black mb-4">텍스트 발제 템플릿</h2>
          <p className="text-sm font-bold mb-4">
            아래 항목을 A4 1장 분량으로 작성합니다. 텍스트의 논증을 추적하고 자신의 질문을 만드는 데 집중합니다.
          </p>

          <div className="space-y-4 text-sm">
            <div className="border-2 border-black p-4">
              <h3 className="font-black text-base mb-1">1. 문제의식</h3>
              <p className="font-bold text-neutral-600">
                이 텍스트가 다루는 핵심 문제는 무엇인가? 저자는 왜 이 글을 써야 했는가?
              </p>
            </div>

            <div className="border-2 border-black p-4">
              <h3 className="font-black text-base mb-1">2. 핵심 명제</h3>
              <p className="font-bold text-neutral-600">
                저자의 중심 주장을 한 문장으로 정리한다.
              </p>
            </div>

            <div className="border-2 border-black p-4">
              <h3 className="font-black text-base mb-1">3. 핵심 구절 2–3개</h3>
              <p className="font-bold text-neutral-600">
                텍스트에서 논증의 뼈대가 되는 문장을 직접 인용하고, 각 구절이 왜 중요한지 한 줄로 설명한다.
              </p>
            </div>

            <div className="border-2 border-black p-4">
              <h3 className="font-black text-base mb-1">4. 논증 구조</h3>
              <ul className="list-none space-y-1 font-bold text-neutral-600 ml-2">
                <li><span className="font-black text-black">전제</span> — 저자가 출발점으로 삼는 가정 또는 사실</li>
                <li><span className="font-black text-black">추론</span> — 전제에서 결론으로 이어지는 논리적 단계</li>
                <li><span className="font-black text-black">결론</span> — 저자가 도달하는 최종 주장</li>
              </ul>
            </div>

            <div className="border-2 border-black p-4">
              <h3 className="font-black text-base mb-1">5. 반론 가능성</h3>
              <p className="font-bold text-neutral-600">
                이 논증에 제기할 수 있는 반론 또는 약점을 하나 이상 제시한다.
              </p>
            </div>

            <div className="border-2 border-black p-4">
              <h3 className="font-black text-base mb-1">6. 다음 질문</h3>
              <p className="font-bold text-neutral-600">
                이 텍스트를 읽고 난 뒤 추가로 탐구하고 싶은 질문을 적는다.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
