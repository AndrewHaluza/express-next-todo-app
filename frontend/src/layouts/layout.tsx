export default function DefaultLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] justify-items-center min-h-screen p-8 pb-20 gap-1 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        {children}
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        Copyright &copy; 2025
      </footer>
    </div>
  );
}
