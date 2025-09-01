import { cn } from "@kanban/config/tailwind/cn";
import { ElementType, PropsWithChildren } from "react";

type WithChildAndClassName = { className?: string } & PropsWithChildren;

type Props = { as?: ElementType } & WithChildAndClassName;
export const Card = ({
  className,
  children, as: Comp = 'div'
}: Props) => {

  return (
    <Comp
      className={cn('p-3 border rounded-lg bg-gray-50 shadow-sm', className)}
    >
      {children}
    </Comp>
  )
}