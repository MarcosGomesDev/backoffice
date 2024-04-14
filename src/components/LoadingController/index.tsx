"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { Loading } from "../Loading";

export function LoadingController({
  initialLoading = false,
}: {
  initialLoading?: boolean;
}) {
  const [showLoading, setShowLoading] = useState<boolean>(initialLoading);
  const pathname = usePathname();

  useEffect(() => {
    if (!initialLoading) {
      setShowLoading(true);
    }
    const changeLoading = setTimeout(() => {
      setShowLoading(false);
    }, 800);

    return () => clearTimeout(changeLoading);
  }, [pathname]);

  return <>{showLoading && <Loading />}</>;
}
