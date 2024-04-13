export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-w-screen w-full dark:bg-slate-700  md:dark:!bg-background px-8">
      {children}
    </div>
  );
}
