import { Menu } from "@/components/menu";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-screen w-full">
      <Menu>{children}</Menu>
    </div>
  );
}
