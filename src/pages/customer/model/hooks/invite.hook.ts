import { useCreateCustomerMutation, useLazyCheckCustomerQuery, type ICheckCustomer, type ICustomerCreateCredentials } from "@/entities/customers"
import { useState } from "react";
import type { CustomerSchemaType } from "../schemas/customer.schema";
import { toast } from "sonner";
import { getErrorMessage } from "@/shared/utils";
import { useNavigate } from "@tanstack/react-router";
import { useAppDispatch } from "@/shared/hooks";
import { updateAccount } from "@/entities/account";
import { Route } from "@/app/routes/_app/_layout-focus/customers/create/";

type InviteStep = "checking" | "viewing" | "creating";

interface IUseCustomerInviteReturnProps {
  step: InviteStep;
  isChecking: boolean;
  isCreating: boolean;
  foundCustomer?: ICheckCustomer;
  
  handleCheck: (phone: string) => Promise<void>;
  handleCreate: (data: CustomerSchemaType) => Promise<void>;
}

export const useCustomerInvite = (): IUseCustomerInviteReturnProps => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { redirect } = Route.useSearch();

  const [step, setStep] = useState<InviteStep>("checking");
  const [foundCustomer, setFoundCustomer] = useState<ICheckCustomer | undefined>(undefined);

  const [checking, { isLoading: isChecking }] = useLazyCheckCustomerQuery();
  const [creating, { isLoading: isCreating }] = useCreateCustomerMutation();

  const handleCheck = async (phone: string): Promise<void> => {
    try {
      const res = await checking({ phone }).unwrap();
      setFoundCustomer(res);
      if (res.exists) {
        setStep("viewing");
      } else {
        setStep("creating");
      }
    }
    catch (err) {
      toast.error(getErrorMessage(err));
      console.error("Ошибка при проверке");
    }
  }

  const handleCreate = async (data: CustomerSchemaType): Promise<void> => {
    try {
      const req = {
        ...data,
        is_banned: false,
      } satisfies ICustomerCreateCredentials;
      await creating(req).unwrap();

      dispatch(updateAccount({ has_customers: true }));

      navigate({ to: redirect ? redirect : "/customers" });
    }
    catch (error) {
      console.log(error);
      toast.error(getErrorMessage(error));
    }
  }

  return {
    step,
    isChecking,
    isCreating,
    foundCustomer,

    handleCheck,
    handleCreate,
  }
}
