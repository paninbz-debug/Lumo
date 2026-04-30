/**
 * Root-level loading UI — shown by Next.js while a route segment streams.
 * Lumo is image-heavy, so this prevents a blank flash when navigating from
 * /collections to /material/[slug] etc.
 */
export default function RootLoading() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div
        className="h-10 w-10 animate-spin rounded-full border-2 border-stone-300 border-t-stone-900"
        role="status"
        aria-label="Загрузка"
      />
    </div>
  );
}
