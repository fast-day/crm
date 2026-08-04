import type { PropsWithChildren } from "react";
import { ConfirmDialog } from "@/features/confirm-dialog";

interface BaseLayoutProps extends PropsWithChildren {
  sidebar?: React.ReactNode;
  mainClassName?: string;
}

export const BaseLayout = ({ children, sidebar, mainClassName="" }: BaseLayoutProps) => {
  return (
    <div className="flex flex-1 relative">
      {sidebar}

      <main className={`flex flex-col flex-1 1100:pb-0 pb-20 ${mainClassName}`}>
        <div className="px-5 md:px-8 py-8 flex flex-col flex-1">
          {children}
        </div>
      </main>

      <ConfirmDialog />
    </div>
  );
};