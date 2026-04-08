import { Node, mergeAttributes } from "@tiptap/react";

export interface EmbedOptions {
  HTMLAttributes: Record<string, string>;
}

declare module "@tiptap/react" {
  interface Commands<ReturnType> {
    embed: {
      setEmbed: (options: { src: string; platform: string; height?: number }) => ReturnType;
    };
  }
}

function parseMediaUrl(url: string): { platform: string; embedUrl: string; height: number } | null {
  // YouTube
  const ytMatch = url.match(
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/
  );
  if (ytMatch) {
    return {
      platform: "youtube",
      embedUrl: `https://www.youtube.com/embed/${ytMatch[1]}`,
      height: 400,
    };
  }

  // Spotify
  const spotifyMatch = url.match(
    /open\.spotify\.com\/(track|album|playlist|episode)\/([a-zA-Z0-9]+)/
  );
  if (spotifyMatch) {
    const type = spotifyMatch[1];
    const id = spotifyMatch[2];
    const height = type === "track" || type === "episode" ? 152 : 352;
    return {
      platform: "spotify",
      embedUrl: `https://open.spotify.com/embed/${type}/${id}`,
      height,
    };
  }

  // Apple Music
  const appleMatch = url.match(/music\.apple\.com\/(.+)/);
  if (appleMatch) {
    return {
      platform: "apple-music",
      embedUrl: `https://embed.music.apple.com/${appleMatch[1]}`,
      height: 175,
    };
  }

  // SoundCloud
  if (url.includes("soundcloud.com")) {
    return {
      platform: "soundcloud",
      embedUrl: `https://w.soundcloud.com/player/?url=${encodeURIComponent(url)}&color=%23FDC700&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false`,
      height: 166,
    };
  }

  return null;
}

export { parseMediaUrl };

export const EmbedExtension = Node.create<EmbedOptions>({
  name: "embed",
  group: "block",
  atom: true,

  addOptions() {
    return {
      HTMLAttributes: {},
    };
  },

  addAttributes() {
    return {
      src: { default: null },
      platform: { default: null },
      height: { default: 400 },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'div[data-embed]',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    const { src, platform, height } = HTMLAttributes;
    return [
      "div",
      mergeAttributes(this.options.HTMLAttributes, {
        "data-embed": platform,
        class: "embed-wrapper",
      }),
      [
        "iframe",
        {
          src,
          height: String(height),
          width: "100%",
          frameborder: "0",
          allow: "autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture",
          allowfullscreen: "true",
          loading: "lazy",
          style: "border-radius: 12px; border: none;",
        },
      ],
    ];
  },

  addCommands() {
    return {
      setEmbed:
        (options) =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs: {
              src: options.src,
              platform: options.platform,
              height: options.height || 400,
            },
          });
        },
    };
  },
});
