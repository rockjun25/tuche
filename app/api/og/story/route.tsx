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
          flexDirection: "column",
          backgroundColor: "#1A1A1A",
        }}
      >
        {/* Top half — cover image or abstract background */}
        <div
          style={{
            width: "100%",
            height: "50%",
            display: "flex",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {post.coverImage ? (
            <>
              <img
                src={post.coverImage}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
              {/* Dark gradient overlay */}
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: "200px",
                  background:
                    "linear-gradient(to top, #1A1A1A, rgba(26,26,26,0))",
                  display: "flex",
                }}
              />
            </>
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
              {/* Geometric accents */}
              <div
                style={{
                  width: "320px",
                  height: "400px",
                  backgroundColor: "#FDC700",
                  position: "absolute",
                  top: "120px",
                  left: "100px",
                  borderRadius: "6px",
                  opacity: 0.9,
                  transform: "rotate(-6deg)",
                }}
              />
              <div
                style={{
                  width: "280px",
                  height: "360px",
                  backgroundColor: "#2A2A2A",
                  position: "absolute",
                  top: "160px",
                  left: "260px",
                  borderRadius: "6px",
                  transform: "rotate(3deg)",
                }}
              />
              <div
                style={{
                  width: "240px",
                  height: "300px",
                  backgroundColor: "#FDC700",
                  position: "absolute",
                  top: "200px",
                  right: "120px",
                  borderRadius: "6px",
                  opacity: 0.5,
                  transform: "rotate(-3deg)",
                }}
              />
            </div>
          )}
        </div>

        {/* Bottom half — cream background with text */}
        <div
          style={{
            width: "100%",
            height: "50%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            backgroundColor: "#F0EBE3",
            padding: "60px 60px 50px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "24px",
            }}
          >
            {/* Tuché badge */}
            <div style={{ display: "flex" }}>
              <div
                style={{
                  backgroundColor: "#FDC700",
                  padding: "8px 22px",
                  borderRadius: "24px",
                  fontSize: "20px",
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
                fontSize: "56px",
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

            {/* Author */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "14px",
              }}
            >
              <div
                style={{
                  width: "36px",
                  height: "2px",
                  backgroundColor: "#FDC700",
                }}
              />
              <div
                style={{
                  fontSize: "24px",
                  fontWeight: 600,
                  color: "#1A1A1A",
                }}
              >
                {post.author}
              </div>
            </div>
          </div>

        </div>
      </div>
    ),
    {
      width: 1080,
      height: 1920,
    }
  );
}
