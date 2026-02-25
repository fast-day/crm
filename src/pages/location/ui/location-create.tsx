import { PageHeader, PageHeaderActions, PageHeaderBackAction, PageHeaderTitle } from "@/shared/ui"
import { LocationCreateForm } from "./components/location-create-form"

export const LocationCreate = () => {
  return (
    <>
      <PageHeader className="sticky top-8">
        <PageHeaderTitle>Создание локации</PageHeaderTitle>
        <PageHeaderActions>
          <PageHeaderBackAction />
        </PageHeaderActions>
      </PageHeader>

      <LocationCreateForm />
    </>
  )
}
