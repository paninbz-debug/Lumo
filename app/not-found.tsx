import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center gap-6 px-6 text-center">
      <p className="font-display text-6xl text-stone-300">404</p>
      <h1 className="font-display text-2xl text-stone-900">Страница не найдена</h1>
      <p className="text-stone-600">
        Возможно, ссылка устарела или была удалена.
      </p>
      <Link
        href="/"
        className="rounded-full bg-stone-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-stone-700"
      >
        На главную
      </Link>
    </div>
  );
}
