import { LoadingController } from "@/components/LoadingController";

export default function Loading({
  initialLoading = false,
}: {
  initialLoading?: boolean;
}) {
  return <LoadingController initialLoading={initialLoading} />;
}
