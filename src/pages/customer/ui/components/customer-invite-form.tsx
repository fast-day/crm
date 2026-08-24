import { Button, Card, CardContent, CardHeader, CardTitle, Form, FormWrapperAction, InputForm, TextareaForm } from "@/shared/ui"
import { customerCheckSchema, customerSchema } from "../../model/schemas/customer.schema";
import { Controller } from "react-hook-form";
import { PatternFormat } from "react-number-format";
import { useCustomerInvite } from "../../model/hooks/invite.hook";
import { FoundCustomer } from "@/widgets/customer";

export const CustomerInviteForm = () => {
  const { step, handleCheck, isChecking, foundCustomer, handleCreate, isCreating } = useCustomerInvite();

  return (
    <div className="mt-8 relative">
      <div className="max-w-140 mx-auto space-y-8 relative">

        {step === "checking" && (
          <Form
            id={"check"}
            onSubmit={(data) => handleCheck(data.phone)}
            schema={customerCheckSchema}
          >
            {({ control, register }) => (
              <>
                <Card>
                  <CardHeader className="pb-0">
                    <CardTitle>Номер телефона</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <Controller
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
                          customInput={InputForm}
                          required
                          register={register("phone")}
                          label={"Номер телефона"}
                          inputSize={"size_56"}
                          error={formState.errors["phone"]}
                          placeholder={"Телефон"}
                        />
                      )}
                    />
    
                    <div className="flex justify-end">
                      <Button
                        type={"submit"}
                        className={"w-full md:max-w-50 font-bold"}
                        animation={"toggle_sm"}
                        disabled={isChecking}
                        isLoading={isChecking}
                      >Продолжить</Button>
                    </div>

                  </CardContent>
                </Card>
              </>
            )}
          </Form>
        )}

        {(step === "viewing" && foundCustomer !== undefined) && <FoundCustomer {...foundCustomer} />}
        
        {step === "creating" && (
          <Form
            className="space-y-8 relative"
            onSubmit={(data) => handleCreate(data)}
            schema={customerSchema}
          >
            {({ register, formState }) => (
              <>
                <Card>
                  <CardHeader className="pb-0">
                    <CardTitle>Номер телефона</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <PatternFormat
                      id={"phone"}
                      name={"phone"}
                      format={"+7 (###) ### ##-##"}
                      mask={"_"}
                      value={foundCustomer?.search_value}
                      customInput={InputForm}
                      register={register("phone")}
                      label={"Номер телефона"}
                      inputSize={"size_56"}
                      error={formState.errors["phone"]}
                      placeholder={"Телефон"}
                      required
                      readOnly
                    />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-0">
                    <CardTitle>Основная информация</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <InputForm
                      name={"first_name"}
                      id={"first_name"}
                      type={"text"}
                      inputSize={"size_56"}
                      register={register("first_name")}
                      label={"Имя"}
                      placeholder={"Имя"}
                      error={formState.errors["first_name"]}
                      required
                    />
                    <InputForm
                      name={"last_name"}
                      id={"last_name"}
                      type={"text"}
                      inputSize={"size_56"}
                      register={register("last_name")}
                      label={"Фамилия"}
                      placeholder={"Фамилия"}
                      error={formState.errors["last_name"]}
                    />
                  </CardContent>
                </Card>


                <Card>
                  <CardHeader className="pb-0">
                    <CardTitle>Дополнительная информация</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <TextareaForm
                      name={"note"}
                      id={"note"}
                      register={register("note")}
                      label={"Описание"}
                      placeholder={"Описание (видно только вам)"}
                      error={formState.errors["note"]}
                    />
                  </CardContent>
                </Card>

                <FormWrapperAction>
                  <Button
                    type={"submit"}
                    className={"w-full md:max-w-50 font-bold"}
                    animation={"toggle_sm"}
                    disabled={isCreating}
                    isLoading={isCreating}
                  >Сохранить</Button>
                </FormWrapperAction>
              </>
            )}
          </Form>
        )}
      </div>
    </div>
  )
}
