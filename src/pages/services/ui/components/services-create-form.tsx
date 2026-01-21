import { Button, Card, Form, FormWrapperAction, InputForm, TextareaForm } from "@/shared/ui"
import { CardContent, CardHeader, CardTitle } from "@/shared/ui/card/ui/card"
import { serviceSchema } from "../../model/schema/service.schema"

export const ServicesCreateForm = () => {
  // const { onSubmit, isLoading } = useCreateLocation();
  return (
    <div className="mt-8 relative">
      <Form className="max-w-140 mx-auto space-y-8" onSubmit={(data) => console.log(data)} schema={serviceSchema}>
        {({ register, formState, control } ) => (
          <>
            <Card>
              <CardContent className="space-y-5">
                <InputForm
                  name={"name"}
                  id={"name"}
                  type={"text"}
                  inputSize={"size_56"}
                  register={register("name")}
                  label={"Название"}
                  error={formState.errors["name"]}
                  placeholder={"Название"}
                  required
                />
                <TextareaForm
                  name={"description"}
                  id={"description"}
                  register={register("description")}
                  error={formState.errors["description"]}
                  placeholder={"Описание"}
                  label={"Описание"}
                />
                {/* <Controller
                  name={"phone"}
                  control={control}
                  render={({ field, formState }) => (
                    <PatternFormat
                      id={"phone"}
                      name={"phone"}
                      format={"+7 (###) ### ##-##"}
                      mask={"_"}
                      onChange={(v) => field.onChange(v)}
                      value={field.value}
                      customInput={Input}
                      inputSize={"size_56"}
                      error={formState.errors["phone"]}
                      placeholder={"Номер телефона"}
                      label={"Номер телефона"}
                      required
                    />
                  )}
                /> */}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3.5">
                <CardTitle className="text-xl">Продолжительность <span className="text-red">*</span></CardTitle>
              </CardHeader>
              <CardContent className="pt-0 space-y-5">
                <InputForm
                  name={"duration"}
                  id={"duration"}
                  type={"text"}
                  inputSize={"size_56"}
                  register={register("duration")}
                  label={"Длительность"}
                  error={formState.errors["duration"]}
                  placeholder={"Длительность (мин)"}
                  required
                />
                <div className="grid grid-cols-2 gap-5">
                  <InputForm
                    name={"time_start"}
                    id={"time_start"}
                    type={"text"}
                    inputMode={"decimal"}
                    inputSize={"size_56"}
                    register={register("time_start")}
                    label={"Старт услуги"}
                    error={formState.errors["time_start"]}
                    placeholder={"Старт услуги (10:00)"}
                    required
                  />
                  <InputForm
                    name={"time_end"}
                    id={"time_end"}
                    type={"text"}
                    inputMode={"numeric"}
                    inputSize={"size_56"}
                    register={register("time_end")}
                    label={"Завершение услуги"}
                    error={formState.errors["time_end"]}
                    placeholder={"Завершение услуги (18:00)"}
                    required
                  />
                </div>
                
                {/* ALERT */}
                <div className="w-full p-4 rounded-2xl bg-warn-background/20 border-2 border-dashed border-warn-background/80">
                  <p className="text-sm font-bold">Подсказка</p>
                  <p className="text-xs leading-4.5 mt-0.5">Начало и конец оказания услуги — это временные рамки, в пределах которых услуга доступна клиентам.</p>
                </div>
              
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3.5">
                <CardTitle className="text-xl">Настройка цены <span className="text-red">*</span></CardTitle>
              </CardHeader>
              <CardContent className="pt-0 space-y-5">
                <InputForm
                  name={"price"}
                  id={"price"}
                  type={"text"}
                  inputMode={"numeric"}
                  inputSize={"size_56"}
                  register={register("price")}
                  label={"Базовая цена"}
                  error={formState.errors["price"]}
                  placeholder={"Базовая цена"}
                  required
                />
                <InputForm
                  name={"cost_price"}
                  id={"cost_price"}
                  type={"text"}
                  inputSize={"size_56"}
                  inputMode={"numeric"}
                  register={register("cost_price")}
                  label={"Себестоимость услуги"}
                  error={formState.errors["cost_price"]}
                  placeholder={"Себестоимость услуги"}
                  message={undefined}
                />
                <></>
              </CardContent>
            </Card>

            <FormWrapperAction>
              <Button
                type={"submit"}
                className={"w-full md:max-w-50 font-bold"}
                animation={"toggle_sm"}
                disabled={false}
                isLoading={false}
              >Сохранить
              </Button>
            </FormWrapperAction>
          </>
        )}
      </Form>
    </div>
  )
}
