import { ChevronIcon, PieIcon } from "@/shared/icons"
import SvgBook from "@/shared/icons/Book"
import Cast from "@/shared/icons/Cast"
import { Card, CardContent, PageHeader, PageHeaderTitle } from "@/shared/ui"
import { PageTableWrapper } from "@/widgets/layout"
import { Link } from "@tanstack/react-router"

const links = [
  {
    to: "/finance/orders",
    type: "ORDERS",
    label: "Платежи",
    search: { limit: 20 },
    icon: <Cast width={22} height={22} />,
    permission: ["orders:*"],
  },
  {
    to: "/finance/invoices",
    type: "ORDERS",
    label: "Чеки",
    icon: <SvgBook width={22} height={22} />,
    permission: ["invoices:*"],
  },
  {
    to: "/finance/transactions",
    type: "ORDERS",
    label: "Транзакции",
    icon: <PieIcon width={22} height={22} />,
    // permission: ["transactions:*"],
    permission: ["orders:*"],
  },
]

export const Finance = () => {
  return (
    <>
      <PageHeader>
        <PageHeaderTitle>Точка продаж</PageHeaderTitle>
      </PageHeader>

      <PageTableWrapper>
        <div className="grid gap-2.5">
          {links.map((link, idx) => (
            <Link to={link.to} key={idx} className="block">
              <Card>
                <CardContent className="flex justify-between p-5.5">
                  <div className="flex items-center gap-2.5">
                    <span>{link.icon}</span>
                    <p>{link.label}</p>
                  </div>
                  <div><ChevronIcon width={18} height={18} /></div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

      </PageTableWrapper>
    </>
  )
}
