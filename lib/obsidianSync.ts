import { getLectureById } from "@/lib/courseData";
import type { LectureNote } from "@/lib/schema";

const classLabelMap: Record<string, string> = {
  "modern-ontology": "현대존재론",
  "criticism-practice": "비평의 이론과 실제",
};

function toKstString(date: Date) {
  const parts = new Intl.DateTimeFormat("ko-KR", {
    timeZone: "Asia/Seoul",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).formatToParts(date);

  const pick = (type: string) => parts.find((part) => part.type === type)?.value ?? "00";

  const y = pick("year");
  const m = pick("month");
  const d = pick("day");
  const hh = pick("hour");
  const mm = pick("minute");
  const ss = pick("second");

  return `${y}-${m}-${d} ${hh}:${mm}:${ss} KST`;
}

function safeName(input: string) {
  return input.replace(/[\\/:*?"<>|]/g, "_").trim();
}

function buildMarkdown(classKey: string, lectureId: string, notes: LectureNote[]) {
  const lecture = getLectureById(classKey, lectureId);
  const className = classLabelMap[classKey] ?? classKey;
  const lectureName = lecture?.label ?? lectureId;

  const sorted = [...notes].sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );

  const header = [
    "---",
    `class: ${className}`,
    `classKey: ${classKey}`,
    `lecture: ${lectureName}`,
    `lectureId: ${lectureId}`,
    `updatedAt: ${new Date().toISOString()}`,
    "---",
    "",
    `# ${className} ${lectureName}`,
    "",
  ];

  if (sorted.length === 0) {
    return `${header.join("\n")}아직 기록된 노트가 없습니다.\n`;
  }

  const body = sorted
    .map((note) => {
      const time = toKstString(new Date(note.createdAt));
      return [`## ${time}`, "", note.content, ""].join("\n");
    })
    .join("\n");

  return `${header.join("\n")}${body}`;
}

function encodeRepoPath(path: string) {
  return path
    .split("/")
    .map((segment) => encodeURIComponent(segment))
    .join("/");
}

async function getExistingSha(
  owner: string,
  repo: string,
  path: string,
  token: string
): Promise<string | null> {
  const res = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/contents/${encodeRepoPath(path)}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github+json",
      },
      cache: "no-store",
    }
  );

  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`GitHub read failed: ${res.status}`);

  const data = (await res.json()) as { sha?: string };
  return data.sha ?? null;
}

export async function syncLectureNotesToObsidian(
  classKey: string,
  lectureId: string,
  notes: LectureNote[]
) {
  const token = process.env.OBSIDIAN_GITHUB_TOKEN;
  const owner = process.env.OBSIDIAN_GITHUB_OWNER;
  const repo = process.env.OBSIDIAN_GITHUB_REPO;
  const rootPath = process.env.OBSIDIAN_GITHUB_ROOT_PATH ?? "Tuche";

  if (!token || !owner || !repo) {
    return { ok: false as const, reason: "env_missing" as const };
  }

  const lecture = getLectureById(classKey, lectureId);
  const className = classLabelMap[classKey] ?? classKey;
  const lectureName = lecture?.label ?? lectureId;

  const folder = `${safeName(rootPath)}/${safeName(className)}`;
  const filePath = `${folder}/${safeName(`${className} - ${lectureName}`)}.md`;

  const content = buildMarkdown(classKey, lectureId, notes);
  const base64 = Buffer.from(content, "utf8").toString("base64");
  const sha = await getExistingSha(owner, repo, filePath, token);

  const res = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/contents/${encodeRepoPath(filePath)}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github+json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: `chore: sync ${className} ${lectureName} 강의노트`,
        content: base64,
        sha: sha ?? undefined,
      }),
    }
  );

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`GitHub write failed: ${res.status} ${text}`);
  }

  return { ok: true as const };
}
