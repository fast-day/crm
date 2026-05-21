import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui"

export const SystemSettingContent = () => {
  return (
    <div className="mt-8 space-y-6">

      <Card>
        <CardHeader className="pb-0">
          <CardTitle>Общие настройки</CardTitle>
        </CardHeader>

        <CardContent className="pt-4">content</CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-0">
          <CardTitle>Настройка меню</CardTitle>
        </CardHeader>

        <CardContent className="pt-4">content</CardContent>
      </Card>


    </div>
  )
}
