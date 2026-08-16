import { accountSelector, type PermissionName } from "@/entities/account"
import { usePermissions } from "@/features/auth/model/hooks/permission.hook"
import { AsideItem } from "@/features/sidebar"
import { PaletteIcon } from "@/shared/icons"
import SvgBook from "@/shared/icons/Book"
import SvgCalendar from "@/shared/icons/Calendar"
import SvgCustomer from "@/shared/icons/Customer"
import SvgNotification from "@/shared/icons/Notification"
import { Link, useLocation } from "@tanstack/react-router"
import { isRouteActive } from "../model/utils/navigation.util"
import { useSelector } from "react-redux"
import type { PageType } from "@/entities/settings"
import Cast from "@/shared/icons/Cast"
import { useState } from "react"
import { cn } from "@/shared/utils"

export interface MenuItem {
  to: string;
  type: PageType;
  label: string;
  permission?: PermissionName | PermissionName[] | string[];
  icon: React.ReactNode;
  search?: Record<string, unknown>;
  isMultiple?: boolean;
  multiple?: MenuItem[];
}

const menuItems: MenuItem[] = [
  // {
  //   to: "/",
  //   type: "DASHBOARD",
  //   label: "Дашбоард",
  //   icon: <SvgDashboard width={20} height={20} />,
  // },
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
    search: { limit: 20 },
    icon: <Cast width={20} height={20} />,
    permission: ["orders:*"],
    isMultiple: true,
    multiple: [
        {
          to: "/orders",
          type: "ORDERS",
          label: "Платежи",
          search: { limit: 20 },
          icon: <Cast width={20} height={20} />,
          permission: ["orders:*"],
        },
        {
          to: "/orders/invoices",
          type: "ORDERS",
          label: "Чеки",
          icon: <SvgBook width={20} height={20} />,
          permission: ["invoices:*"],
        },
    ]
  },
  {
    to: "/schedule",
    type: "CALENDAR",
    label: "Расписание",
    icon: <SvgCalendar width={20} height={20} />,
    permission: ["schedule:*"],
  },
  {
    to: "/customers",
    type: "CUSTOMERS",
    label: "Клиенты",
    search: { limit: 20 },
    icon: <SvgCustomer width={20} height={20} />,
    permission: ["company-customers:*"],
  },
  // {
  //   to: "/employees/users",
  //   type: "EMPLOYEES",
  //   label: "Сотрудники",
  //   search: { limit: 20 },
  //   icon: <SvgUsersGroup width={20} height={20} />,
  //   permission: ["employee:*"],
  // },
  {
    to: "/business/services",
    type: "SERVICES",
    label: "Услуги",
    search: { limit: 20 },
    icon: <PaletteIcon width={20} height={20} />,
    permission: ["service:*"],
  },
  {
    to: "/notifications",
    type: "NOTIFICATIONS",
    label: "Уведомления",
    icon: <SvgNotification width={20} height={20} />,
    permission: [],
  },
];

export const SidebarAside = () => {
  const { pathname } = useLocation();
  const { hasWildcard } = usePermissions();
  const { account } = useSelector(accountSelector);
  
  const [openGroup, setOpenGroup] = useState<number | null>(null);
  
  const isPageVisible = (type: PageType): boolean => {
    const pages = account?.settings?.pages;
    if (!pages || pages.length === 0) return true;
    const setting = pages.find(p => p.page === type);
    return setting ? setting.is_visible : true;
  };

  const hasAccess = (permission?: PermissionName | PermissionName[] | string[]): boolean => {
    if (!permission) return true;
    const list = Array.isArray(permission) ? permission : [permission];
    if (list.length === 0) return true;
    return list.some(hasWildcard);
  };

  const toggleGroup = (idx: number | null) => {
    setOpenGroup(prev => (prev === idx ? null : idx));
  };

  return (
    <aside className="px-5">

      <div className="flex flex-col gap-2">
        {menuItems.map((item, idx) => {
          if (!hasAccess) return null;

          if (item.isMultiple) {  
            const children = (item.multiple ?? []).filter(
              child => hasAccess(child.permission) && isPageVisible(child.type)
            );
            if (!children.length) return null;

            const allPaths = [item.to, ...children.map(c => c.to)].filter(Boolean) as string[];
            const hasActiveChild = children.some(c => isRouteActive(pathname, c.to, allPaths));
            const isOpen = openGroup === idx || hasActiveChild;

            return (
              <div className={cn(isOpen ? "bg-primary/40" : "", "grid rounded-13")}>
                <Link
                  to={children[0].to}
                  className={cn(isOpen ? "text-white" : "text-white/70", "flex items-center gap-2 px-3 py-2")}
                  onClick={() => toggleGroup(idx)}
                >
                  {item.icon}
                  <span className="font-medium text-sm">{item.label}</span>
                </Link>
                <div
                  className={cn("overflow-hidden transition-[max-height] duration-200 ease-out",
                    isOpen ? "max-height-[500px]" : "max-h-0"
                  )}
                >
                  <div className="grid pl-4 border-t border-white/10 gap-2 py-2.5">
                    {children.map((child, childIdx) => (
                      <AsideItem
                        key={childIdx}
                        to={child.to}
                        name={child.label}
                        selected={isRouteActive(pathname, child.to, allPaths)}
                        bullet
                      />
                    ))}
                  </div>
                </div>
              </div>
            )
          }

          if (!isPageVisible(item.type)) return null;

          if (item.permission) {
            if (Array.isArray(item.permission)) {
              const access = item.permission.some(p => hasWildcard(p));
              if (!access) return null;
            } else {
              if (!hasWildcard(item.permission)) {
                return null;
              }
            }
          }

          return (
            <AsideItem
              key={idx}
              to={item.to}
              name={item.label}
              onClick={() => toggleGroup(null)}
              selected={isRouteActive(pathname, item.to, [item.to])}
              icon={item.icon}
              search={item.search}
            />
          )
        })}
      </div>

    </aside>
  )
}
