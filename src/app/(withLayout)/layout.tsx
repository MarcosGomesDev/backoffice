import { Menu } from "@/components/menu";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-screen w-full px-4 md:px-8">
      <Menu>{children}</Menu>
    </div>
  );
}
