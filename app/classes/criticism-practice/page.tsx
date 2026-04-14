import Link from "next/link";
import { ProgressChecklist } from "@/components/ProgressChecklist";
import { ClassTabs } from "@/components/ClassTabs";
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

        <ClassTabs>
          {{
            강의계획서: (
              <div className="border-[5px] border-black bg-white p-6 shadow-[8px_8px_0_#000]">
                <h2 className="text-2xl font-black mb-4">강의계획서</h2>

                <div className="space-y-5">
                  <div className="border-2 border-black p-4">
                    <h3 className="font-black text-base mb-2">수업 목표</h3>
                    <p className="text-sm font-bold text-neutral-700">
                      정신분석 이론(라캉, 지젝)을 바탕으로 영화 문학 대중문화를 비평적으로 분석하는 능력을 기른다.
                      강의 시청 후 실제 비평문을 작성하고 자기 피드백 기반으로 개정한다.
                    </p>
                  </div>

                  <div className="border-2 border-black p-4">
                    <h3 className="font-black text-base mb-2">수업 일정</h3>
                    <ul className="text-sm font-bold text-neutral-700 space-y-1 list-disc list-inside">
                      <li>이론 강의 (1강–4강)</li>
                      <li>실습 워크숍 3회 — 비평문 작성 및 합평</li>
                      <li>매주 목 12:00–14:00 KST</li>
                    </ul>
                  </div>

                  <div className="border-2 border-black p-4">
                    <h3 className="font-black text-base mb-2">운영 방식</h3>
                    <ul className="text-sm font-bold text-neutral-700 space-y-1 list-disc list-inside">
                      <li>영상 강의 시청 후 주제별 비평문 작성</li>
                      <li>워크숍에서 비평문 발표 및 자기 피드백</li>
                      <li>총 3편의 비평문 완성을 목표로 진행</li>
                      <li>Tuché 플랫폼에서 비평문 작성 및 제출</li>
                    </ul>
                  </div>
                </div>
              </div>
            ),

            주차학습: (
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
            ),

            과제: (
              <div className="space-y-6">
                <div className="border-[5px] border-black bg-white p-6 shadow-[8px_8px_0_#000]">
                  <h2 className="text-2xl font-black mb-4">비평문 과제</h2>
                  <p className="text-sm font-bold mb-4">
                    아래 세 편의 비평문을 작성합니다. 각 워크숍 주제에 대해 정신분석 관점의 비평문을 완성하세요.
                  </p>

                  <div className="space-y-4">
                    {criticismWorkshopTopics.map((topic, i) => (
                      <div key={topic} className="border-2 border-black p-4">
                        <h3 className="font-black text-base mb-1">과제 {i + 1}</h3>
                        <p className="text-sm font-bold text-neutral-700 mb-2">{topic}</p>
                        <ul className="text-xs font-bold text-neutral-500 space-y-1 list-disc list-inside">
                          <li>작품의 핵심 갈등 또는 증상을 정신분석 개념으로 분석</li>
                          <li>라캉/지젝의 이론적 틀을 명시적으로 적용</li>
                          <li>분량: A4 2–3장</li>
                        </ul>
                      </div>
                    ))}
                  </div>
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
            ),

            자료실: (
              <div className="border-[5px] border-black bg-white p-6 shadow-[8px_8px_0_#000]">
                <h2 className="text-2xl font-black mb-4">자료실</h2>
                <div className="space-y-4">
                  <div className="border-2 border-black p-5">
                    <h3 className="font-black text-base mb-2">비평문 초고 템플릿</h3>
                    <p className="text-sm font-bold text-neutral-600 mb-3">
                      비평문 작성 시 기본 구조로 활용하는 양식입니다. 작품 선정 이유부터 결론까지 체계적으로 작성합니다.
                    </p>
                    <div className="text-xs font-bold bg-neutral-100 border border-black p-3 whitespace-pre-line">
{`제목:
작성자:
날짜:
대상 작품:

1. 작품 선정 이유 —
2. 작품 요약 (줄거리/핵심 장면) —
3. 정신분석적 독해 —
   적용 개념:
   분석:
4. 비평적 판단 —
5. 결론 및 열린 질문 —`}
                    </div>
                  </div>

                  <div className="border-2 border-black p-5">
                    <h3 className="font-black text-base mb-2">정신분석 개념 정리 템플릿</h3>
                    <p className="text-sm font-bold text-neutral-600 mb-3">
                      강의에서 다룬 정신분석 핵심 개념을 정리하고 비평 적용 사례를 기록하는 양식입니다.
                    </p>
                    <div className="text-xs font-bold bg-neutral-100 border border-black p-3 whitespace-pre-line">
{`개념명:
이론가: [라캉 / 지젝 / 기타]
강의 출처: [해당 강차]

정의 (한 문장):

핵심 설명 (3–5문장):

관련 개념:

비평 적용 예시:
  작품:
  적용:`}
                    </div>
                  </div>

                  <div className="border-2 border-black p-5">
                    <h3 className="font-black text-base mb-2">워크숍 자기 피드백 템플릿</h3>
                    <p className="text-sm font-bold text-neutral-600 mb-3">
                      워크숍 직후 본인 비평문을 점검할 때 사용하는 양식입니다.
                    </p>
                    <div className="text-xs font-bold bg-neutral-100 border border-black p-3 whitespace-pre-line">
{`작성자:
비평 대상 작품:
날짜:

강점 (2가지):
  ①
  ②

개선 제안 (2가지):
  ①
  ②

정신분석 개념 적용 점검:

다음 개정에서 고칠 포인트:`}
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
