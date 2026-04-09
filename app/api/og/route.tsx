import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { posts } from "@/lib/schema";
import { eq } from "drizzle-orm";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return new Response("Missing id", { status: 400 });
  }

  const result = await db
    .select()
    .from(posts)
    .where(eq(posts.id, Number(id)));
  const post = result[0];

  if (!post) {
    return new Response("Post not found", { status: 404 });
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          backgroundColor: "#F0EBE3",
        }}
      >
        {/* Left side — text content */}
        <div
          style={{
            width: "60%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "60px 50px",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {/* Tuché badge */}
            <div style={{ display: "flex" }}>
              <div
                style={{
                  backgroundColor: "#FDC700",
                  padding: "6px 18px",
                  borderRadius: "20px",
                  fontSize: "16px",
                  fontWeight: 700,
                  color: "#1A1A1A",
                }}
              >
                Tuché
              </div>
            </div>

            {/* Title */}
            <div
              style={{
                fontSize: "44px",
                fontWeight: 800,
                color: "#1A1A1A",
                lineHeight: 1.2,
                overflow: "hidden",
                display: "-webkit-box",
                WebkitLineClamp: 3,
                WebkitBoxOrient: "vertical",
              }}
            >
              {post.title}
            </div>

            {/* Subtitle */}
            {post.subtitle && (
              <div
                style={{
                  fontSize: "22px",
                  color: "#666",
                  lineHeight: 1.4,
                  overflow: "hidden",
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                }}
              >
                {post.subtitle}
              </div>
            )}

            {/* Author */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                marginTop: "6px",
              }}
            >
              <div
                style={{
                  width: "32px",
                  height: "2px",
                  backgroundColor: "#FDC700",
                }}
              />
              <div
                style={{
                  fontSize: "18px",
                  fontWeight: 600,
                  color: "#1A1A1A",
                }}
              >
                {post.author}
              </div>
            </div>
          </div>
        </div>

        {/* Right side — cover image or geometric shape */}
        <div
          style={{
            width: "40%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
            position: "relative",
          }}
        >
          {post.coverImage ? (
            <img
              src={post.coverImage}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          ) : (
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
              }}
            >
              {/* Dark rectangle */}
              <div
                style={{
                  width: "200px",
                  height: "260px",
                  backgroundColor: "#1A1A1A",
                  position: "absolute",
                  top: "160px",
                  right: "80px",
                  borderRadius: "4px",
                }}
              />
              {/* Yellow rectangle overlapping */}
              <div
                style={{
                  width: "180px",
                  height: "240px",
                  backgroundColor: "#FDC700",
                  position: "absolute",
                  top: "200px",
                  right: "120px",
                  borderRadius: "4px",
                }}
              />
            </div>
          )}
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
