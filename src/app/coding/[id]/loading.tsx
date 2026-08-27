export default function CodingQuestionLoading() {
  return (
    <div className="min-h-screen bg-background md:ml-64 p-6 pt-24 md:p-10 animate-pulse">
      <div className="h-14 rounded-2xl bg-surface-container-lowest border border-outline-variant mb-5" />
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
        <div className="h-[680px] rounded-2xl bg-surface-container-lowest border border-outline-variant p-8">
          <div className="h-8 w-2/3 rounded bg-surface-container mb-5" />
          <div className="h-4 w-full rounded bg-surface-container-low mb-3" />
          <div className="h-4 w-5/6 rounded bg-surface-container-low mb-8" />
          <div className="h-36 rounded-xl bg-surface-container-low" />
        </div>
        <div className="h-[680px] rounded-2xl bg-primary" />
      </div>
    </div>
  );
}
