import { Button, Form, InputForm, SelectForm } from "@/shared/ui"
import { CompanySchema } from "../model/schema/company.schema"
import { useCompanyCreate } from "../model/hook/company-create.hook";
import SvgChevron from "@/shared/icons/Chevron";
import { mockCountries, mockCurrency, mockTimezone } from "../model/mock";

export const CompanyCreate = () => {
  const { stepOne } = useCompanyCreate();

  return (
    <div className="max-w-140 mx-auto w-full pt-10 lg:pt-20 pb-28 px-5">
      <h1 className="text-32 leading-8 font-extrabold">Создание компании</h1>
      <div className="mt-8 w-full">
        <Form onSubmit={(data) => stepOne(data)} schema={CompanySchema}>
          {({ register, formState, control }) => (
            <div className="relative w-full">
              <div className="w-full space-y-8">
                <div className="space-y-4">
                  <div className="space-y-4">
                    <h2 className="text-lg font-extrabold leading-4">Как называется ваша компания?</h2>
                    <InputForm
                      name={"name"}
                      id={"name"}
                      type={"text"}
                      inputSize={"size_56"}
                      register={register("name")}
                      error={formState.errors["name"]}
                    />
                  </div>
                  <InputForm
                    name="public_name"
                    id="public_name"
                    type="text"
                    register={register("public_name")}
                    error={formState.errors["public_name"]}
                    label="Публичное имя компании"
                    required
                  />
                </div>

                {/* АДРЕС */}
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h2 className="text-lg font-extrabold leading-4">Юридический адрес</h2>
                    <InputForm
                      name={"address"}
                      id={"address"}
                      type={"text"}
                      inputSize={"size_56"}
                      register={register("address")}
                      error={formState.errors["address"]}
                      label={"Поиск адреса"}
                      placeholder={"Начните вводить"}
                      required
                    />
                  </div>
                </div>


                {/* НАСТРОЙКИ */}
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h2 className="text-lg font-extrabold leading-4">Настройки</h2>
                    <SelectForm
                      name={"country"}
                      control={control}
                      options={mockCountries}
                      error={formState.errors["country"]}
                      label={"Страна"}
                      required
                    />

                    <SelectForm
                      name={"timezone"}
                      control={control}
                      options={mockTimezone}
                      error={formState.errors["timezone"]}
                      label={"Часовой пояс"}
                      required
                    />

                    <SelectForm
                      name={"currency"}
                      control={control}
                      options={mockCurrency}
                      error={formState.errors["currency"]}
                      label={"Валюта"}
                      required
                    />

                  </div>
                </div>
              </div>
              <div className="left-0 right-0 mx-auto fixed bottom-0 flex justify-center md:bg-transparent backdrop-blur-xs bg-black/4 py-6 rounded-t-3xl px-5">
                <Button
                  type={"submit"}
                  className={"w-full md:max-w-50 font-normal"}
                  iconRight={<SvgChevron width={18} height={18}/>}
                  disabled={false}
                  isLoading={false}
                >
                  Далее
                </Button>
              </div>
            </div>
          )}
        </Form>
      </div>
    </div>
  )
}
