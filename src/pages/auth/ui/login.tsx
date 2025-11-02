import { Button, Form, Input } from "@/shared/ui"
import { LoginSchema } from "../model/schemas/login.schema"
import { useLogin } from "../model/hooks/login.hook";

export const Login = () => {
  const { onSubmit, isLoading } = useLogin();

  return (
    <div>
      <Form onSubmit={(data) => onSubmit(data)} schema={LoginSchema}>
        {({ register, formState }) => (
          <>
            <Input
              id="email"
              name="email"
              type="email"
              register={register("email")}
              error={formState.errors["email"]}
              label="Email"
              required
            />
            <Input
              id="password"
              name="password"
              type="password"
              register={register("password")}
              error={formState.errors["password"]}
              label="Пароль"
              required
            />
            <div>
              <Button type="submit" isLoading={isLoading}>Войти</Button>
            </div>
          </>
        )}
      </Form>
    </div>
  )
}
