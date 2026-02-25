import { PageHeader, PageHeaderActions, PageHeaderBackAction, PageHeaderTitle } from '@/shared/ui'
import { ServicesCreateForm } from './components/services-create-form'

export const ServiceCreate = () => {
  return (
    <>
      <PageHeader className="sticky top-8">
        <PageHeaderTitle>Создание услуги</PageHeaderTitle>
        <PageHeaderActions>
          <PageHeaderBackAction />
        </PageHeaderActions>
      </PageHeader>
      
      <ServicesCreateForm />
    </>
  )
}
