import React, { createContext, useCallback, useContext, useEffect, useLayoutEffect, useRef, useState, type PropsWithChildren } from "react";
import type { IDropdownContext, TDropdownComponent, TDropdownContentProps, TDropdownProps } from "../model/types/types.type";
import { cn, lockBodyScroll } from "@/shared/utils";
import { createPortal } from "react-dom";
import { Button } from "../../button";
import { useMediaQuery } from "react-responsive";

const DropdownContext = createContext<IDropdownContext>(null);

const Dropdown: TDropdownComponent = ({ children, className }: TDropdownProps) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const onClose = useCallback(() => setOpen(false), []);
  const onOpen = useCallback(() => setOpen(true), []);

  useEffect(() => {
    if (!open) return;

    function handleClickOutside(e: MouseEvent) {
      const t = e.target as Node;
      if (ref.current?.contains(t) || contentRef.current?.contains(t)) return;
      setOpen(false);
    }
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <DropdownContext.Provider value={{ open, setOpen, close: onClose, mainRef: ref, contentRef }}>
      <div
        ref={ref}
        className={cn("relative", className)}
        data-dropdown
        onClick={(e) => {
          if (e.currentTarget.contains(e.target as Node)) onOpen();
        }}
      >{children}</div>
    </DropdownContext.Provider>
  )
}

Dropdown.Trigger = function Trigger({ children }) {
  return <>{children}</>;
}

const DropdownTrigger = ({ children }: PropsWithChildren) => {
  return (
    <Dropdown.Trigger>
      {children}
    </Dropdown.Trigger>
  )
}

const MOBILE_QUERY = "(max-width: 767px)";

const DropdownContent = ({ align="center", side="bottom", children, className, cancelLabel="Отмена" }: TDropdownContentProps) => {
  const ctx = useContext(DropdownContext);
  const isMobile = useMediaQuery({ query: MOBILE_QUERY });
  const [coords, setCoords] = useState<{ top: number; left: number } | null>(null);

  useLayoutEffect(() => {
    if (!ctx?.open || isMobile) {
      setCoords(null);
      return;
    }

    const update = () => {
      const trigger = ctx.mainRef.current;
      const content = ctx.contentRef.current;
      if (!trigger || !content) return;

      const r = trigger.getBoundingClientRect();
      const w = content.offsetWidth;
      const h = content.offsetHeight;
      const GAP = 8;

      const alignY = align === "start" ? r.top : align === "end" ? r.bottom - h : r.top + r.height / 2 - h / 2;
      const alignX = align === "start" ? r.left : align === "end" ? r.right - w : r.left + r.width / 2 - w / 2;

      const pos = { top: 0, left: 0 };

      switch (side) {
        case "left":         pos.left = r.left - GAP - w; pos.top = alignY; break;
        case "right":        pos.left = r.right + GAP;    pos.top = alignY; break;
        case "top":          pos.top = r.top - GAP - h;   pos.left = alignX; break;
        case "bottom":       pos.top = r.bottom + GAP;    pos.left = alignX; break;
        case "top_right":    pos.left = r.right + GAP;    pos.top = r.top; break;
        case "center_right": pos.left = r.right + GAP;    pos.top = r.top + r.height / 2 - h / 2; break;
        case "bottom_right": pos.left = r.right + GAP;    pos.top = r.bottom - h; break;
      }

      setCoords(pos);
    };

    update();
    window.addEventListener("scroll", update, true);
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update, true);
      window.removeEventListener("resize", update);
    };
  }, [ctx?.open, side]);

  useEffect(() => {
    if (!ctx?.open || !isMobile) return;
    return lockBodyScroll();
  }, [ctx?.open, isMobile]);

  if (!ctx || !ctx.open) return null;

  const body = typeof children === "function" ? children({ close: ctx.close }) : children;

  if (isMobile) {
    return createPortal(
      <div
        className="fixed inset-0 z-50 flex flex-col justify-end bg-card-accent/30 animate-in fade-in-0"
        onClick={(e) => { if (e.target === e.currentTarget) ctx.close(); }}
      >
        <div
          ref={ctx.contentRef}
          data-ui="dropdown-content"
          className="flex flex-col gap-2.5 p-5 animate-in slide-in-from-bottom"
        >
          <div className={cn("bg-white rounded-2xl p-2 max-h-[70dvh] overflow-y-auto", className)}>
            {body}
          </div>
          <Button
            type={"button"}
            variant={"accent"}
            animation={"toggle_sm"}
            size={"size_56"}
            className={"w-full font-semibold hover:bg-primary! active:bg-primary! active:opacity-100!"}
            onClick={ctx.close}
          >{cancelLabel}</Button>
        </div>
      </div>,
      document.body,
    );
  }

  return createPortal(
    <div
      ref={ctx.contentRef}
      data-ui="dropdown-content"
      data-state={ctx?.open ? "open" : "closed"}
      style={coords ? { top: coords.top, left: coords.left } : undefined}
      className={cn(`
        fixed z-10 animate-in fade-in-0 zoom-in-95 data-[state=open]:animate-in data-[state=closed]:animate-out
        data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0
        data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95
        data-[side=bottom]:slide-in-from-top-2 data-[side=top]:slide-in-from-bottom-2
        data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2
      `,
      )}
    >
      <div className={cn("bg-white min-w-30 rounded-12 w-auto overflow-hidden p-2", className)}>{body}</div>
    </div>,
    document.body,
  )
}

type TDropdownItemProps = {
  icon?: React.ReactNode;
} & React.ComponentProps<"div">;

const DropdownItem = ({ children, className, icon, onClick, ...props }: TDropdownItemProps) => {
  const ctx = useContext(DropdownContext);
  if (!ctx) return null;

  const handleClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
    ctx.close();
    onClick?.(e);
  }

  return (
    <div
      data-ui={"dropdown-item"}
      data-action={"dropdown-item"}
      onClick={handleClick}
      className={cn("flex items-center gap-2.5 md:px-2.5 md:py-1.5 md:text-xs text-md px-5! py-4! font-medium hover:bg-card text-foreground active:opacity-55 duration-200 cursor-pointer rounded-12", className)}
      {...props}
    >
      {icon && <span className="size-4">{icon}</span>}
      {children}
    </div>
  )
}

const DropdownItemTrigger = ({ children, onClick, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  const ctx = useContext(DropdownContext);
  if (!ctx) return null;

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    ctx.close();
    onClick?.(e);
  }

  return (
    <Button 
      data-ui="dropdown-button"
      data-action="dropdown-button"
      onClick={handleClick}
      size={"none"}
      type={"button"}
      variant={"location_dropdown"}
      classNameChild={"flex-1 flex items-center gap-3"}
      {...props}
    >
      {children}
    </Button>
  )
}

const DropdownSeparator = ({ className }: { className?: string }) => {
  return <div data-ui="dropdown-separator" className={cn("h-px bg-primary my-1", className)} />;
}

const DropdownLabel = ({ children, className, ...props }: React.ComponentProps<"div">) => {
  return (
    <div
      data-ui="hover-dropdown-label"
      className={cn("opacity-70 px-3 py-1.5 text-xs", className)}
      {...props}
    >
      {children}
    </div>
  )
}

export {
  Dropdown,
  DropdownTrigger,
  DropdownContent,
  DropdownItem,
  DropdownItemTrigger,
  DropdownSeparator,
  DropdownLabel,
}
