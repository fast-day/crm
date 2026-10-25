import type { PageType } from "@/entities/settings";
import { Plus2Icon } from "@/shared/icons"
import SvgBook from "@/shared/icons/Book";
import Cast from "@/shared/icons/Cast";
import SvgCustomer from "@/shared/icons/Customer";
import SvgSetting from "@/shared/icons/Setting";
import { cn } from "@/shared/utils";
import { Link, useLocation } from "@tanstack/react-router";
import { isRouteActive } from "../model/utils/navigation.util";

interface MenuItem {
  to: string;
  type?: PageType;
  label?: string;
  permission?: PermissionName | PermissionName[] | string[];
  icon: React.ReactNode;
  search?: Record<string, unknown>;
}

const menuItems: MenuItem[] = [
  {
    to: "/bookings",
    type: "BOOKINGS",
    label: "Записи",
    icon: <SvgBook width={24} height={24} />,
    permission: ["booking:*"],
  },
  {
    to: "/finance",
    type: "ORDERS",
    label: "Платежи",
    icon: <Cast width={24} height={24} />,
    permission: ["orders:*"],
  },
  {
    to: "/bookings/create",
    icon: (
      <div className="size-14 rounded-20 text-accent bg-card flex items-center justify-center">
        <Plus2Icon width={22} height={22} />
      </div>
    ),
    permission: ["booking:create"],
  },
  {
    to: "/customers",
    type: "CUSTOMERS",
    label: "Клиенты",
    icon: <SvgCustomer width={24} height={24} />,
    permission: ["company-customers:*"],
  },
  {
    to: "/settings",
    label: "Еще",
    icon: <SvgSetting width={24} height={24} />,
  },
];

export const MobileSidebar = () => {
  const { pathname } = useLocation();
  return (
    <div className="fixed bottom-0 left-0 w-full z-10 px-3 pb-3">
      <div className="flex items-center gap-1 rounded-full bg-white p-1.5">
        {menuItems.map((page) => {
          const active = isRouteActive(pathname, page.to, [page.to]);

          return (
            <Link
              key={page.to}
              to={page.to}
              aria-label={page.label}
              className={cn(
                "flex h-14 items-center justify-center rounded-full",
                "transition-[flex-grow,background-color,color] duration-300",
                active
                  ? "flex-[2.6] bg-accent text-white"
                  : "flex-1 text-accent/80"
              )}
            >
              <span className="shrink-0">{page.icon}</span>

              {page.label && (
                <span
                  className={cn(
                    "grid transition-[grid-template-columns,opacity,margin] duration-300",
                    active
                      ? "grid-cols-[1fr] opacity-100 ml-2"
                      : "grid-cols-[0fr] opacity-0 ml-0"
                  )}
                >
                  <span className="overflow-hidden whitespace-nowrap text-md font-semibold">
                    {page.label}
                  </span>
                </span>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  )
}
