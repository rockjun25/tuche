import Link from "next/link";
import { ProgressChecklist } from "@/components/ProgressChecklist";
import { ClassTabs } from "@/components/ClassTabs";
import { modernOntologyLectures } from "@/lib/courseData";

export default function ModernOntologyPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
        <div className="border-[6px] border-black bg-white p-5 sm:p-8 shadow-[12px_12px_0_#000] mb-8">
          <p className="text-sm font-black uppercase mb-2">현대존재론</p>
          <h1 className="text-3xl sm:text-4xl font-black mb-4">바디우 존재와 사건 강해</h1>
          <p className="font-bold mb-3">백상현 교수님의 바디우 존재와 사건 책 강해 강의를 기반으로 학습합니다.</p>
          <p className="text-sm font-black">수업 시간, 화 수 KST 12시부터 14시</p>
        </div>

        <ClassTabs>
          {{
            강의계획서: (
              <div className="border-[5px] border-black bg-white p-6 shadow-[8px_8px_0_#000]">
                <h2 className="text-2xl font-black mb-4">강의계획서</h2>

                <div className="space-y-5">
                  <div className="border-2 border-black p-4">
                    <h3 className="font-black text-base mb-2">수업 목표</h3>
                    <p className="text-sm font-bold text-neutral-700">
                      알랭 바디우의 &lsquo;존재와 사건&rsquo;을 정밀하게 강해하며, 집합론적 존재론과
                      사건 개념을 통해 현대 존재론의 핵심 쟁점을 이해한다.
                      텍스트 발제와 토론을 통해 철학적 논증 능력을 기른다.
                    </p>
                  </div>

                  <div className="border-2 border-black p-4">
                    <h3 className="font-black text-base mb-2">수업 일정</h3>
                    <ul className="text-sm font-bold text-neutral-700 space-y-1 list-disc list-inside">
                      <li>1부: 존재와 다수 (1강–10강)</li>
                      <li>2부: 사건과 개입 (1강–10강)</li>
                      <li>3부: 진리와 주체 (1강–7강)</li>
                      <li>매주 화·수 12:00–14:00 KST</li>
                    </ul>
                  </div>

                  <div className="border-2 border-black p-4">
                    <h3 className="font-black text-base mb-2">운영 방식</h3>
                    <ul className="text-sm font-bold text-neutral-700 space-y-1 list-disc list-inside">
                      <li>주차별로는 영상 강의 시청 중심으로 진행</li>
                      <li>주차 발제문은 작성하지 않음</li>
                      <li>중간고사와 기말고사는 모두 발제문 제출로 진행</li>
                      <li>Tuché 플랫폼에서 진도 관리 및 시험 발제문 제출</li>
                    </ul>
                  </div>
                </div>
              </div>
            ),

            주차학습: (
              <div className="grid lg:grid-cols-[1.5fr_1fr] gap-6">
                <div className="border-[5px] border-black bg-white p-5 shadow-[8px_8px_0_#000]">
                  <h2 className="text-2xl font-black mb-4">강의 링크</h2>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {modernOntologyLectures.map((lecture) => (
                      <Link
                        key={lecture.id}
                        href={`/study/modern-ontology/${lecture.id}`}
                        className="border-2 border-black p-3 text-sm font-black underline hover:bg-black hover:text-white transition-colors"
                      >
                        {lecture.label}
                      </Link>
                    ))}
                  </div>
                </div>

                <ProgressChecklist
                  storageKey="daean-modern-ontology"
                  classKey="modern-ontology"
                  items={modernOntologyLectures.map((lecture) => ({
                    id: lecture.id,
                    label: lecture.label,
                    href: `/study/modern-ontology/${lecture.id}`,
                  }))}
                />
              </div>
            ),

            과제: (
              <div className="border-[5px] border-black bg-white p-6 shadow-[8px_8px_0_#000]">
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

                <div className="border-2 border-black p-4 mt-6 bg-neutral-50">
                  <h3 className="font-black text-base mb-2">중간 기말 발제문 제출 흐름</h3>
                  <ol className="text-sm font-bold text-neutral-700 space-y-1 list-decimal list-inside">
                    <li>주차별 강의를 시청하며 핵심 개념 메모 누적</li>
                    <li>중간고사 기간에 위 템플릿으로 중간 발제문 작성</li>
                    <li>기말고사 기간에 위 템플릿으로 기말 발제문 작성</li>
                    <li>Tuché에서 최종본 글로 제출</li>
                  </ol>
                </div>
              </div>
            ),

            자료실: (
              <div className="border-[5px] border-black bg-white p-6 shadow-[8px_8px_0_#000]">
                <h2 className="text-2xl font-black mb-4">자료실</h2>
                <div className="space-y-4">
                  <div className="border-2 border-black p-5">
                    <h3 className="font-black text-base mb-2">발제문 템플릿</h3>
                    <p className="text-sm font-bold text-neutral-600 mb-3">
                      텍스트 발제 작성 시 사용하는 표준 양식입니다. 문제의식 → 핵심 명제 → 핵심 구절 → 논증 구조 → 반론 → 질문 순서로 A4 1장 분량을 작성합니다.
                    </p>
                    <div className="text-xs font-bold bg-neutral-100 border border-black p-3 whitespace-pre-line">
{`제목: [텍스트 제목 / 해당 강차]
작성자:
날짜:

1. 문제의식 —
2. 핵심 명제 —
3. 핵심 구절 (2–3개, 직접 인용) —
4. 논증 구조 — 전제 / 추론 / 결론
5. 반론 가능성 —
6. 다음 질문 —`}
                    </div>
                  </div>

                  <div className="border-2 border-black p-5">
                    <h3 className="font-black text-base mb-2">논증 지도 템플릿</h3>
                    <p className="text-sm font-bold text-neutral-600 mb-3">
                      텍스트의 논증 흐름을 시각적으로 정리하는 도구입니다. 전제에서 결론까지의 논리적 경로를 도식화합니다.
                    </p>
                    <div className="text-xs font-bold bg-neutral-100 border border-black p-3 whitespace-pre-line">
{`텍스트: [제목]
저자: [저자명]

[전제 1] ─────┐
[전제 2] ─────┼──→ [추론 단계] ──→ [결론]
[전제 3] ─────┘
              │
        [숨은 전제 / 가정]

반론 지점:
  ① 전제 ( )에 대한 반론 —
  ② 추론 과정의 약점 —`}
                    </div>
                  </div>

                  <div className="border-2 border-black p-5">
                    <h3 className="font-black text-base mb-2">주차별 학습 노트 템플릿</h3>
                    <p className="text-sm font-bold text-neutral-600 mb-3">
                      매 강의 후 핵심 내용을 정리하고 자신의 이해도를 점검하는 노트 양식입니다.
                    </p>
                    <div className="text-xs font-bold bg-neutral-100 border border-black p-3 whitespace-pre-line">
{`강의: [부/강 번호]
날짜:

핵심 개념 (3개):
  ①
  ②
  ③

이해된 부분:

이해 안 된 부분 / 질문:

다음 강의 전 준비할 것:`}
                    </div>
                  </div>
                </div>
              </div>
            ),
          }}
        </ClassTabs>
      </section>
    </div>
  );
}
