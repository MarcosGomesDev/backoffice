import { Menu } from "@/components/menu";
import Loading from "./loading";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-screen w-full px-4 md:px-8">
      <Loading initialLoading />
      <Menu>{children}</Menu>
    </div>
  );
}
