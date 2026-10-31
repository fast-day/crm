import { Button, CheckboxForm, ErrorForm, Form, InputForm, PhoneInput } from "@/shared/ui"
import { RegisterSchema } from "../model/schemas/register.schema"
import { useRegister } from "../model/hooks/register.hook";
import { Controller } from "react-hook-form";
import { Link } from "@tanstack/react-router";

export const Register = () => {
  const { onSubmit, isLoading } = useRegister();

  return (
    <div className="p-5 md:p-8 rounded-3xl md:bg-black/4">
      <div>
        <h1 className="text-center text-2xl font-extrabold leading-7">Регистрация</h1>
      </div>
      <div className="mt-8">
        <Form onSubmit={(data) => onSubmit(data)} schema={RegisterSchema}>
          {({ register, formState, control }) => (
            <>
              <InputForm
                id={"email"}
                name={"email"}
                type={"email"}
                inputSize={"size_60"}
                register={register("email")}
                error={formState.errors["email"]}
                placeholder={"Email"}
              />
              <div className="grid 380:grid-cols-2 gap-4">
                <InputForm
                  id={"first_name"}
                  name={"first_name"}
                  type={"text"}
                  inputSize={"size_60"}
                  register={register("first_name")}
                  error={formState.errors["first_name"]}
                  placeholder={"Имя"}
                />
                <InputForm
                  id={"last_name"}
                  name={"last_name"}
                  type={"text"}
                  inputSize={"size_60"}
                  register={register("last_name")}
                  error={formState.errors["last_name"]}
                  placeholder={"Фамилия"}
                />
              </div>
              <Controller
                name={"phone"}
                control={control}
                render={({ field, formState }) => (
                  <PhoneInput
                    id="phone"
                    name="phone"
                    value={field.value}
                    onChange={field.onChange}
                    inputSize="size_60"
                    error={formState.errors["phone"]}
                    placeholder="Телефон"
                  />
                )}
              />
              <InputForm
                id={"password"}
                name={"password"}
                type={"password"}
                inputSize={"size_60"}
                register={register("password")}
                error={formState.errors["password"]}
                placeholder={"Пароль"}
              />
              <div>
                <CheckboxForm
                  {...register("agree")}
                  checkboxClass={"size-5.5 bg-card border border-primary/20"}
                  label={
                    <>
                      {"Принимаю "}
                      <a href="https://storage.fast-day.ru/site-documents/terms_of_service_WEB301026.pdf" target="_blank" className="underline">условия использования</a>,{" "}
                      <a href="https://storage.fast-day.ru/site-documents/personal_data_processing_policy_WEB301026.pdf" target="_blank" className="underline">политику обработки персональных данных</a>
                    </>
                  }
                />
                {formState.errors["agree"] && <ErrorForm msg={formState.errors["agree"].message}/>}
              </div>
              <div>
                <Button
                  type={"submit"}
                  size={"size_60"}
                  isLoading={isLoading}
                  disabled={isLoading}
                >
                  Зарегистрироваться
                </Button>
              </div>
              <div className="flex items-center text-sm justify-center">
                <p>Уже есть аккаунт? <Link to={"/login"} className="hover:text-warn-color-icon underline duration-200 cursor-pointer">Войти</Link></p>
              </div>
            </>
          )}
        </Form>
      </div>
    </div>
  )
}
