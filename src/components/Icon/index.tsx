import clsx from "clsx";
import * as lucideIcons from "lucide-react";

export const { createLucideIcon, ...icons } = lucideIcons;

type Icon = keyof typeof icons;

interface LucideProps extends React.ComponentPropsWithoutRef<"svg"> {
  icon: Icon;
  title?: string;
}

export function Icon(props: LucideProps) {
  const { icon, className, ...computedProps } = props;
  const Component = lucideIcons[props.icon];
  return (
    // @ts-ignore
    <Component
      {...computedProps}
      className={clsx(["stroke-1.5", props.className])}
    />
  );
}
