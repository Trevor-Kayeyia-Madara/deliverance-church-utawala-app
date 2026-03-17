import { useEffect, useMemo, useState } from 'react';
import { ChevronLeft, ExternalLink, Menu, Play } from 'lucide-react';
import type { Page } from '../types/page';

type YoutubeSearchItem = {
  id: { videoId?: string };
  snippet: {
    title: string;
    publishedAt: string;
    channelTitle: string;
    thumbnails?: {
      high?: { url: string; width?: number; height?: number };
      medium?: { url: string; width?: number; height?: number };
      default?: { url: string; width?: number; height?: number };
    };
  };
};

type SermonVideo = {
  id: string;
  title: string;
  publishedAt: string;
  channelTitle: string;
  thumbnailUrl: string;
};

export default function SermonsPage({ setPage }: { setPage: (p: Page) => void }) {
  const CHANNEL_ID = import.meta.env.VITE_CHANNEL_ID as string | undefined;
  const YOUTUBE_API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY as string | undefined;

  const [videos, setVideos] = useState<SermonVideo[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [status, setStatus] = useState<'idle' | 'loading' | 'ready' | 'error'>('idle');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const channelId = (CHANNEL_ID ?? '').trim();
    const apiKey = (YOUTUBE_API_KEY ?? '').trim();

    if (!channelId || !apiKey) {
      setStatus('error');
      setError('Missing YouTube configuration. Set VITE_CHANNEL_ID and VITE_YOUTUBE_API_KEY.');
      return;
    }

    const controller = new AbortController();

    const load = async () => {
      try {
        setStatus('loading');
        setError(null);

        const params = new URLSearchParams({
          part: 'snippet',
          channelId,
          maxResults: '18',
          order: 'date',
          type: 'video',
          key: apiKey,
        });

        const res = await fetch(`https://www.googleapis.com/youtube/v3/search?${params}`, {
          signal: controller.signal,
        });

        if (!res.ok) throw new Error(`YouTube API error (${res.status})`);

        const json = (await res.json()) as { items?: YoutubeSearchItem[] };
        const items = json.items ?? [];

        const mapped: SermonVideo[] = items
          .map((item) => {
            const id = item.id?.videoId;
            if (!id) return null;
            const thumbnailUrl =
              item.snippet.thumbnails?.high?.url ??
              item.snippet.thumbnails?.medium?.url ??
              item.snippet.thumbnails?.default?.url ??
              '';

            return {
              id,
              title: item.snippet.title,
              publishedAt: item.snippet.publishedAt,
              channelTitle: item.snippet.channelTitle,
              thumbnailUrl,
            };
          })
          .filter((v): v is SermonVideo => v !== null);

        setVideos(mapped);
        setSelectedId(mapped[0]?.id ?? null);
        setStatus('ready');
      } catch (e) {
        if ((e as { name?: string }).name === 'AbortError') return;
        setStatus('error');
        setError((e as Error).message);
      }
    };

    void load();
    return () => controller.abort();
  }, [CHANNEL_ID, YOUTUBE_API_KEY]);

  const selected = useMemo(
    () => videos.find((v) => v.id === selectedId) ?? null,
    [videos, selectedId],
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 pb-40">
      <div className="mb-12 flex flex-col gap-4">
        <button
          onClick={() => setPage('home')}
          className="flex items-center gap-2 text-primary font-bold text-sm hover:underline w-fit"
        >
          <ChevronLeft className="size-4" /> Back to Home
        </button>
        <h2 className="text-4xl font-extrabold mb-3">Sermons</h2>
        <p className="text-slate-600">
          Explore our latest messages from Deliverance Church Utawala.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-4 mb-10">
        <button className="flex items-center gap-2 px-6 py-2.5 bg-primary text-white rounded-full text-sm font-bold shadow-md">
          <Menu className="size-4" /> All Messages
        </button>
        {selected && (
          <a
            className="inline-flex items-center gap-2 text-primary font-bold text-sm hover:underline"
            href={`https://www.youtube.com/watch?v=${selected.id}`}
            target="_blank"
            rel="noreferrer"
          >
            Open on YouTube <ExternalLink className="size-4" />
          </a>
        )}
      </div>

      {status === 'loading' && (
        <div className="text-slate-600 font-medium">Loading sermons…</div>
      )}
      {status === 'error' && (
        <div className="bg-white border border-primary/10 rounded-2xl p-6 text-slate-700">
          <p className="font-black mb-2">Could not load sermons</p>
          <p className="text-sm text-slate-600">{error}</p>
        </div>
      )}
      {status === 'ready' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {videos.map((v) => (
            <button
              key={v.id}
              onClick={() => setSelectedId(v.id)}
              className="text-left group flex flex-col gap-5"
            >
              <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-200 shadow-sm transition-transform group-hover:scale-[1.02]">
                {v.thumbnailUrl ? (
                  <img
                    className="w-full h-full object-cover"
                    src={v.thumbnailUrl}
                    alt={v.title}
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    width="800"
                    height="450"
                  />
                ) : (
                  <div className="w-full h-full bg-slate-200" />
                )}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="size-16 rounded-full bg-primary text-white flex items-center justify-center shadow-2xl">
                    <Play className="size-8 fill-current ml-1" />
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-xl font-extrabold leading-snug group-hover:text-primary transition-colors line-clamp-2">
                  {v.title}
                </h3>
                <p className="text-sm text-slate-500 font-medium">
                  {v.channelTitle} • {new Date(v.publishedAt).toLocaleDateString()}
                </p>
              </div>
            </button>
          ))}
        </div>
      )}

      {selected && status === 'ready' && (
        <div className="fixed bottom-6 left-4 right-4 z-50">
          <div className="max-w-4xl mx-auto bg-white/90 backdrop-blur-xl border border-primary/20 rounded-3xl shadow-2xl p-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-4 flex-1 min-w-0">
              {selected.thumbnailUrl ? (
                <div
                  className="size-14 rounded-xl bg-cover bg-center shrink-0 shadow-lg"
                  style={{ backgroundImage: `url(${selected.thumbnailUrl})` }}
                />
              ) : (
                <div className="size-14 rounded-xl bg-slate-200 shrink-0" />
              )}
              <div className="min-w-0">
                <p className="text-sm font-black truncate">{selected.title}</p>
                <p className="text-xs text-slate-500 font-bold truncate">
                  {selected.channelTitle} •{' '}
                  {new Date(selected.publishedAt).toLocaleDateString()}
                </p>
              </div>
            </div>
            <a
              className="shrink-0 inline-flex items-center gap-2 h-10 px-4 rounded-xl bg-primary text-white font-black hover:bg-primary/90 transition-colors"
              href={`https://www.youtube.com/watch?v=${selected.id}`}
              target="_blank"
              rel="noreferrer"
            >
              Watch <ExternalLink className="size-4" />
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
