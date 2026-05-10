import { PageHeader, PageHeaderTitle } from "@/shared/ui"
import { SettingsContent } from "@/widgets/settings"

export const Settings = () => {
  return (
    <>
      <PageHeader>
        <PageHeaderTitle>Настройки</PageHeaderTitle>
      </PageHeader>

      <SettingsContent />
    </>
  )
}
