import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui"
import { cn } from "@/shared/utils";

interface IContentPanelProps {
  className?: string;
  actionClassName?: string;
  title?: React.ReactNode;
  headerExtra?: React.ReactNode;
  content?: React.ReactNode;
  actions?: React.ReactNode;
}

export const ContentPanel = ({ className="", actionClassName="", title, headerExtra, content, actions }: IContentPanelProps) => {
  return (
    <div className={cn("h-full max-w-180 w-full 1100:mx-0 mx-auto 1100:w-auto", className)}>
      <Card className={cn("flex h-full flex-col relative 1100:min-w-95 min-w-auto")}>
        {title && (
          <CardHeader className="pb-0">
            <CardTitle className="flex items-center justify-between w-full">
              {title}
              {headerExtra}
            </CardTitle>
          </CardHeader> 
        )}

        <CardContent className="flex-1 flex flex-col">

          {content}

          {actions && <div className={cn("1100:sticky 1100:bottom-6 mt-6", actionClassName)}>{actions}</div>}

        </CardContent>
      </Card>
    </div>
  )
}
