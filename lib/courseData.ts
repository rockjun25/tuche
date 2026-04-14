export interface LectureItem {
  id: string;
  label: string;
  url: string;
}

export const modernOntologyLectures: LectureItem[] = [
  { id: "1-1", label: "1부 1강", url: "https://youtu.be/2-ic8m6Hgpc?si=zsSEIGbE_RfMrzf3" },
  { id: "1-2", label: "1부 2강", url: "https://www.youtube.com/watch?v=J06PFY9Az98&list=PLHxjjIQyVOtuobMHMApE6ZueC8LWIQKIq&index=8" },
  { id: "1-3", label: "1부 3강", url: "https://youtu.be/FS3HlYWliKo?si=n47aytcMcuiCHEEb" },
  { id: "1-4", label: "1부 4강", url: "https://youtu.be/dO_c60LuLkI?si=Z8abT_-hjGkBc4q5" },
  { id: "1-5", label: "1부 5강", url: "https://youtu.be/xdEwEDh-Jko?si=BSCkbeE_4D_SbRL_" },
  { id: "1-6", label: "1부 6강", url: "https://youtu.be/kDuENceq9Bs?si=DxBEaZGfPQGhzJBe" },
  { id: "1-7", label: "1부 7강", url: "https://youtu.be/kEjhNvhytZM?si=B5xj7Frg7saT2VIO" },
  { id: "1-8", label: "1부 8강", url: "https://youtu.be/ahhmOMrzNHc?si=PGJwJri5zJSHtw-j" },
  { id: "1-9", label: "1부 9강", url: "https://youtu.be/TAakZJ3770s?si=QwsI67wQrZVWUV0N" },
  { id: "1-10", label: "1부 10강", url: "https://youtu.be/QxCPivzHo8s?si=lLXN4-AeQcbrg-mH" },
  { id: "2-1", label: "2부 1강", url: "https://youtu.be/mtt0DYt2i48?si=oCKMtc0NZVy5ABmM" },
  { id: "2-2", label: "2부 2강", url: "https://youtu.be/5lClYB0BPus?si=m7iWmrqBVnE7iUBz" },
  { id: "2-3", label: "2부 3강", url: "https://youtu.be/HY3Zbvn7nyE?si=0FIdoZ8tDDhu1FuO" },
  { id: "2-4", label: "2부 4강", url: "https://youtu.be/AO0inNFMboI?si=mXg5cWG9jEDEUiXd" },
  { id: "2-5", label: "2부 5강", url: "https://youtu.be/4Qi31hhD7XM?si=9srN42GpND4eMYac" },
  { id: "2-6", label: "2부 6강", url: "https://youtu.be/q8I0w0adXCM?si=ZVsCo_VOMx9gT1dL" },
  { id: "2-7", label: "2부 7강", url: "https://youtu.be/17A8PjPaNk4?si=f1GigYNVe3W4iwkN" },
  { id: "2-8", label: "2부 8강", url: "https://youtu.be/r5Yb3THdgbk?si=T5lxOeghAGunRXAS" },
  { id: "2-9", label: "2부 9강", url: "https://youtu.be/B5EhIolcQ-8?si=cbF7XWIMEhux78TX" },
  { id: "2-10", label: "2부 10강", url: "https://youtu.be/FzzNiTysuQg?si=hGNZt5fCG67FIw5Z" },
  { id: "3-1", label: "3부 1강", url: "https://youtu.be/FzzNiTysuQg?si=Q5WUQTcFpLAVn-rD" },
  { id: "3-2", label: "3부 2강", url: "https://youtu.be/li6LzZwRa18?si=VZ-BvofX9GVYJ3H3" },
  { id: "3-3", label: "3부 3강", url: "https://youtu.be/0QHQGoMBjdQ?si=ulcbV-GASwquNvFS" },
  { id: "3-4", label: "3부 4강", url: "https://youtu.be/v1nTSvl-KQA?si=uyGSlCaqBaLMlojP" },
  { id: "3-5", label: "3부 5강", url: "https://youtu.be/v1nTSvl-KQA?si=ZQIUgfIrI10llL5I" },
  { id: "3-6", label: "3부 6강", url: "https://youtu.be/nS0_-NPeNVg?si=fUeqn74Y3_Ky84jW" },
  { id: "3-7", label: "3부 7강", url: "https://youtu.be/M59gznghfDE?si=djzTs4-mYUKlg21C" },
];

export const criticismLectures: LectureItem[] = [
  { id: "c-1", label: "1강", url: "https://youtu.be/D6yopZcVdjU?si=fVCrcKe0vujSk9KE" },
  { id: "c-2", label: "2강", url: "https://youtu.be/Ib8TV3GIZp8?si=gjmCln12F4MW7EtR" },
  { id: "c-3", label: "3강", url: "https://youtu.be/2_ujSvTYcPA?si=4IQnKXj5euOeDCuy" },
  { id: "c-4", label: "4강", url: "https://youtu.be/qhKWvwFxgK0?si=liZ1Ro6udZz7ZVe7" },
];

export function getLectureById(
  classKey: string,
  lectureId: string
): LectureItem | null {
  const lectures =
    classKey === "modern-ontology"
      ? modernOntologyLectures
      : classKey === "criticism-practice"
        ? criticismLectures
        : null;
  if (!lectures) return null;
  return lectures.find((l) => l.id === lectureId) ?? null;
}

export function extractYouTubeId(url: string): string | null {
  const patterns = [
    /youtu\.be\/([^?&]+)/,
    /[?&]v=([^&]+)/,
  ];
  for (const p of patterns) {
    const m = url.match(p);
    if (m) return m[1];
  }
  return null;
}

export const criticismWorkshopTopics = [
  "소마이 신지 이사 비평문",
  "올리베르 라셰 시라트 비평문",
  "이시이 소고 경심 비평문",
];
