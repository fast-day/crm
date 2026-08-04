import type { PageType } from "@/entities/settings";
import { AddFillIcon } from "@/shared/icons"
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
    icon: <SvgBook width={20} height={20} />,
    permission: ["booking:*"],
  },
  {
    to: "/orders",
    type: "ORDERS",
    label: "Платежи",
    icon: <Cast width={20} height={20} />,
    permission: ["orders:*"],
  },
  {
    to: "/bookings/create",
    icon: (
      <div className="size-12 rounded-xl text-primary bg-white flex items-center justify-center">
        <AddFillIcon width={22} height={22} />
      </div>
    ),
    permission: ["booking:create"],
  },
  {
    to: "/customers",
    type: "CUSTOMERS",
    label: "Клиенты",
    icon: <SvgCustomer width={20} height={20} />,
    permission: ["company-customers:*"],
  },
  {
    to: "/settings",
    label: "Еще",
    icon: <SvgSetting width={20} height={20} />,
  },
];

export const MobileSidebar = () => {
  const { pathname } = useLocation();
  return (
    <div className="fixed bottom-0 left-0 w-full z-10 px-4 pb-2.5">
      <div className="bg-card-accent p-4 rounded-2xl grid grid-cols-5 items-center gap-2.5">
        
        {menuItems.map((page, idx) => {
          return (
            <Link to={page.to} key={idx} className={cn("flex flex-col items-center gap-1")}>
              <span>{page.icon}</span>
              {page.label && <span className={cn("text-xs leading-3 opacity-50", isRouteActive(pathname, page.to) ? "opacity-100" : "")}>{page.label}</span>}
            </Link>
          )
        })}
      </div>
    </div>
  )
}
