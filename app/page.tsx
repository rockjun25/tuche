import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#f3f3f3]">
      <section className="max-w-6xl mx-auto px-6 py-10">
        <div className="border-[6px] border-black bg-[#FDC700] p-8 md:p-12 shadow-[12px_12px_0_#000]">
          <p className="text-sm font-black uppercase tracking-wider mb-3">대안학교</p>
          <h1 className="text-4xl md:text-6xl font-black leading-tight mb-4">공강 시간에 만드는 나만의 수업</h1>
          <p className="text-base md:text-lg font-semibold max-w-3xl">
            현대존재론과 비평의 이론과 실제를 주차별로 추적합니다. 비평문 작성은 Tuché에서 진행합니다.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mt-10">
          <Card
            title="현대존재론"
            schedule="화 수 12시부터 14시"
            desc="백상현 교수님의 바디우 존재와 사건 책 강해 강의 27강"
            href="/classes/modern-ontology"
            cta="클래스 보기"
          />
          <Card
            title="비평의 이론과 실제"
            schedule="목 12시부터 14시"
            desc="정신분석 기반 문화 비평문 실습 클래스"
            href="/classes/criticism-practice"
            cta="클래스 보기"
          />
        </div>

        <div className="mt-8 border-4 border-black bg-white p-6">
          <h2 className="text-2xl font-black mb-3">비평문 작성</h2>
          <p className="font-semibold mb-4">비평 클래스의 실제 글 작성은 Tuché에서 진행합니다.</p>
          <a
            href="/tuche"
            className="inline-flex border-4 border-black bg-white px-5 py-2 font-black hover:bg-black hover:text-white transition-colors"
          >
            Tuché 아카이브로 이동
          </a>
        </div>
      </section>
    </div>
  );
}

function Card({
  title,
  schedule,
  desc,
  href,
  cta,
}: {
  title: string;
  schedule: string;
  desc: string;
  href: string;
  cta: string;
}) {
  return (
    <article className="border-4 border-black bg-white p-6 shadow-[8px_8px_0_#000]">
      <p className="text-xs font-black uppercase mb-2">{schedule}</p>
      <h3 className="text-3xl font-black mb-3">{title}</h3>
      <p className="font-medium mb-5">{desc}</p>
      <Link href={href} className="inline-flex border-4 border-black px-4 py-2 font-black hover:bg-black hover:text-white transition-colors">
        {cta}
      </Link>
    </article>
  );
}
