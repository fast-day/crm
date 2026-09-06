import { accountSelector } from "@/entities/account"
import { ShareIcon, WorldIcon } from "@/shared/icons"
import { Card, CardContent, CardHeader, CardTitle, PageHeader, PageHeaderActions, PageHeaderBackAction, PageHeaderTitle } from "@/shared/ui"
import { PageTableWrapper } from "@/widgets/layout"
import { Link } from "@tanstack/react-router"
import { useSelector } from "react-redux"

export const OnlineOverview = () => {
  const { account } = useSelector(accountSelector);

  return (
    <>
      <PageHeader>
        <PageHeaderTitle>Онлайн-запись</PageHeaderTitle>
        <PageHeaderActions>
          <PageHeaderBackAction />
        </PageHeaderActions>
      </PageHeader>

      <PageTableWrapper>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Ссылка на онлайн-бронирование</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex items-center gap-2.5 bg-card p-2.5 rounded-2xl">
              <div className="relative size-8">
                <WorldIcon />
                <div className="absolute top-0.5 right-0.5 w-3 h-3 rounded-full bg-green" />
              </div>
              <div className="text-md font-semibold flex-1">{account?.company?.widget_url}</div>
              
              <Link to={account?.company?.widget_url} target={"_blank"} className="bg-white size-12 rounded-2xl flex items-center justify-center">
                <ShareIcon width={20} height={20} />
              </Link>
            </div>
          </CardContent>
        </Card>

      </PageTableWrapper>
    </>
  )
}
