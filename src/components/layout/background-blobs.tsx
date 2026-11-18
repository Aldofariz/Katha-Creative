export function BackgroundBlobs() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      <span className="blob-drift bg-pink/40 absolute -top-40 -left-48 size-[34rem] rounded-full blur-3xl" />
      <span className="blob-drift blob-drift-slow bg-sky/35 absolute top-[18%] -right-52 size-[36rem] rounded-full blur-3xl" />
      <span className="blob-drift blob-drift-reverse bg-lilac/40 absolute bottom-[-18rem] left-[22%] size-[38rem] rounded-full blur-3xl" />
      <span className="blob-drift blob-drift-slow bg-yellow/30 absolute right-[-12rem] bottom-[-14rem] size-[28rem] rounded-full blur-3xl" />
    </div>
  );
}
