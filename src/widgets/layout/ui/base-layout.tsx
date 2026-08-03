import type { PropsWithChildren } from "react";
import { ConfirmDialog } from "@/features/confirm-dialog";

interface BaseLayoutProps extends PropsWithChildren {
  sidebar?: React.ReactNode;
  mainClassName?: string;
}

export const BaseLayout = ({ children, sidebar, mainClassName="" }: BaseLayoutProps) => {
  return (
    <div className="flex flex-1 min-h-full relative">
      {sidebar}

      <main className={`flex flex-col flex-1 ${mainClassName}`}>
        <div className="p-8 flex flex-col flex-1">
          {children}
        </div>
      </main>

      <ConfirmDialog />
    </div>
  );
};