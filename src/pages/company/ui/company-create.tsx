import { Button, Form, InputForm } from "@/shared/ui"
import { CompanySchema } from "../model/schema/company.schema"
import { useCompanyCreate } from "../model/hook/company-create.hook";

export const CompanyCreate = () => {
  const { stepOne } = useCompanyCreate();

  return (
    <div className="max-w-5xl mx-auto w-full py-20 px-10">
      <h1 className="text-2xl font-bold mb-6">Создание компании</h1>
      <Form onSubmit={(data) => stepOne(data)} schema={CompanySchema}>
        {({ register, formState }) => (
          <div className="flex justify-between">
            <div className="w-full max-w-md flex flex-col gap-4">
              <InputForm
                name="name"
                id="name"
                type="text"
                register={register("name")}
                error={formState.errors["name"]}
                label="Наименование компании"
                required
              />
              <InputForm
                name="public_name"
                id="public_name"
                type="text"
                register={register("public_name")}
                error={formState.errors["public_name"]}
                label="Публичное имя компании"
                required
              />
              <div className="mt-5">
                <h2 className="text-xl font-bold">Локация</h2>
                <div className="flex flex-col gap-4 mt-5">
                  <InputForm
                    name="country"
                    id="country"
                    type="text"
                    register={register("country")}
                    error={formState.errors["country"]}
                    label="Страна"
                    required
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <InputForm
                      name="city"
                      id="city"
                      type="text"
                      register={register("city")}
                      error={formState.errors["city"]}
                      label="Город"
                      required
                    />
                    <InputForm
                      name="region"
                      id="region"
                      type="text"
                      register={register("region")}
                      error={formState.errors["region"]}
                      label="Регион"
                      required
                    />
                    <InputForm
                      name="street"
                      id="street"
                      type="text"
                      register={register("street")}
                      error={formState.errors["street"]}
                      label="Улица"
                    />
                    <InputForm
                      name="house"
                      id="house"
                      type="text"
                      register={register("house")}
                      error={formState.errors["house"]}
                      label="Дом"
                    />
                  </div>
                  <InputForm
                    name="post_code"
                    id="post_code"
                    type="text"
                    register={register("post_code")}
                    error={formState.errors["post_code"]}
                    label="Почтовый индекс"
                  />
                </div>
              </div>
              <div className="mt-5">
                <h2 className="text-xl font-bold">Настройки</h2>
                <div className="flex flex-col gap-4 mt-5">
                  <InputForm
                    name="currency"
                    id="currency"
                    type="text"
                    register={register("currency")}
                    error={formState.errors["currency"]}
                    label="Валюта компании"
                    required
                  />
                  <InputForm
                    name="timezone"
                    id="timezone"
                    type="text"
                    register={register("timezone")}
                    error={formState.errors["timezone"]}
                    label="Часовой пояс"
                    required
                  />
                </div>
              </div>
            </div>
            <div className="w-full max-w-80 py-6">
              <Button type="submit" isLoading={false}>Создать</Button>
            </div>
          </div>
        )}
      </Form>
    </div>
  )
}
