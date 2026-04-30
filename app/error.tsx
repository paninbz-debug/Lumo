"use client";

/**
 * Root error boundary. Recoverable UI with reset() to re-run the segment.
 */
export default function RootError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center gap-6 px-6 text-center">
      <h1 className="font-display text-2xl text-stone-900">
        Что-то пошло не так
      </h1>
      <p className="text-stone-600">
        Попробуйте обновить страницу. Если ошибка повторяется — напишите нам в
        контактах.
        {error.digest ? (
          <span className="mt-2 block text-xs text-stone-400">
            ID: {error.digest}
          </span>
        ) : null}
      </p>
      <button
        onClick={() => reset()}
        className="rounded-full bg-stone-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-stone-700"
      >
        Попробовать ещё раз
      </button>
    </div>
  );
}
