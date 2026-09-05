import { Button, Card, ErrorForm, Form, FormWrapperAction, ImagePicker, InputForm, RadioGroupForm, RadioGroupItem } from "@/shared/ui"
import { CardContent, CardHeader, CardTitle } from "@/shared/ui/card/ui/card"
import { serviceSchema, type ServiceType } from "../../model/schema/service.schema"
import { useAccount } from "@/entities/account";
import { useSelector } from "react-redux";
import { useGetServiceCategoryQuery, type IService } from "@/entities/services";
import { minuteFormat } from "@/shared/utils";
import { ServiceCategory } from "@/features/services";
import { Controller } from "react-hook-form";

interface ServicesCreateFormProps {
  onSubmit: (data: ServiceType) => Promise<void>;
  isLoading: boolean;
  data?: IService;
}

export const ServicesForm = ({ onSubmit, isLoading, data }: ServicesCreateFormProps) => {
  const { account } = useSelector(useAccount);

  const { data: categories, isLoading: isLoadingCategory } = useGetServiceCategoryQuery();

  const defaultValues = {
    name: data?.name ?? "",
    mark: data?.mark ?? undefined,
    duration: data?.duration ?? undefined,
    type: "offline",
    price: data?.price ?? undefined,
    date_type: data?.discount?.date_type ?? "days",
    cost_price: data?.prices.cost_price ?? undefined,
    category: data?.category ?? undefined,
    avatar: null,
  } satisfies ServiceType;

  return (
    <div className="mt-8 relative">
      <Form 
        className="space-y-8 flex justify-center 1100:flex-row flex-col-reverse items-start gap-8"
        onSubmit={(data) => onSubmit(data)} 
        options={{ defaultValues }}
        schema={serviceSchema}
      >
        {({ register, formState, control, watch } ) => 
        {
          const duration = watch("duration");
          return (
          <>
            <div className="max-w-140 space-y-8 w-full">
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

                  <ServiceCategory
                    name={"category"}
                    control={control}
                    categories={categories}
                    isLoadingCategory={isLoadingCategory}
                  />

                  <div>
                    <RadioGroupForm name="mark" control={control} radioClassName={"flex items-center gap-2.5"}>
                      <RadioGroupItem className="bg-red-500 w-7 h-7 border-none data-checked:bg-red-500!" value={"red"} id={"red"} />
                      <RadioGroupItem className="bg-orange-500 w-7 h-7 border-none data-checked:bg-orange-500!" value={"orange"} id={"orange"} />
                      <RadioGroupItem className="bg-green-500 w-7 h-7 border-none data-checked:bg-green-500!" value={"green"} id={"green"} />
                      <RadioGroupItem className="bg-blue-500 w-7 h-7 border-none data-checked:bg-blue-500!" value={"blue"} id={"blue"} />
                      <RadioGroupItem className="bg-purple-500 w-7 h-7 border-none data-checked:bg-purple-500!" value={"purple"} id={"purple"} />
                      <RadioGroupItem className="bg-teal-500 w-7 h-7 border-none data-checked:bg-teal-500!" value={"teal"} id={"teal"} />
                      <RadioGroupItem className="bg-pink-500 w-7 h-7 border-none data-checked:bg-pink-500!" value={"pink"} id={"pink"} />
                    </RadioGroupForm>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3.5">
                  <CardTitle className="text-xl">Продолжительность <span className="text-red">*</span></CardTitle>
                </CardHeader>
                <CardContent className="pt-0 space-y-5">
                  <div>
                    <InputForm
                      name={"duration"}
                      id={"duration"}
                      type={"text"}
                      inputSize={"size_56"}
                      register={register("duration", { valueAsNumber: true })}
                      label={"Длительность"}
                      error={formState.errors["duration"]}
                      placeholder={"Длительность"}
                      labelInput={"Мин"}
                      required
                    />
                    {duration !== undefined && <span className="text-xs">{minuteFormat(duration)}</span>}
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
                    register={register("price", { valueAsNumber: true })}
                    label={"Базовая цена"}
                    error={formState.errors["price"]}
                    placeholder={"Базовая цена"}
                    required
                    labelInput={account?.company?.currency}
                  />
                  <InputForm
                    name={"cost_price"}
                    id={"cost_price"}
                    type={"text"}
                    inputSize={"size_56"}
                    inputMode={"numeric"}
                    register={register("cost_price", { setValueAs: (v) => v === "" ? undefined : Number(v) })}
                    label={"Себестоимость услуги"}
                    error={formState.errors["cost_price"]}
                    placeholder={"Себестоимость услуги"}
                    labelInput={account?.company?.currency}
                  />
                </CardContent>
              </Card>

              <FormWrapperAction>
                <Button
                  type={"submit"}
                  className={"w-full md:max-w-50 font-bold"}
                  animation={"toggle_sm"}
                  disabled={isLoading}
                  isLoading={isLoading}
                >Сохранить
                </Button>
              </FormWrapperAction>
            </div>

            <Controller
              control={control}
              name={"avatar"}
              render={({ field, fieldState }) => (
                <div className="1100:sticky top-8 self-start h-fit">
                  <ImagePicker
                    sizeCls={"h-32 w-32"}
                    value={field.value}
                    onChange={field.onChange}
                    preview_url={data?.avatar}
                  />
                  {fieldState.error && <ErrorForm msg={fieldState.error.message} />}
                </div>
              )}
            />
          </>
        )}}
      </Form>
    </div>
  )
}
