import { useState } from "react";
import type { InviteCheckSchemaType, InviteSchemaType } from "../schemas/invite.schema";
import { useEmployeeInviteMutation, useLazyGetEmployeeByEmailQuery, type IEmployeeByEmail, type IEmployeeInviteCredentials } from "@/entities/employee";
import { isApiError } from "@/shared/utils";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";

type InviteStep = "check" | "invite" | "create";

type InviteLoading = {
  check?: boolean;
  invite?: boolean;
  create?: boolean;
}

interface UseInviteReturnProps {
  step: InviteStep;
  employee: IEmployeeByEmail | null;
  isLoading: InviteLoading;
  onCheck: (data: InviteCheckSchemaType) => Promise<void>;
  onInvite: (data: InviteSchemaType, location_id: string) => Promise<void>;
}

export const useInvite = (): UseInviteReturnProps => {
  const [step, setStep] = useState<InviteStep>("check");
  const [employee, setEmployee] = useState<IEmployeeByEmail | null>(null);
  const [isLoading, setIsLoading] = useState<InviteLoading>({ check: false, invite: false, create: false });
  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [checkEmployee] = useLazyGetEmployeeByEmailQuery();
  const [invite] = useEmployeeInviteMutation();

  const onCheck = async (data: InviteCheckSchemaType): Promise<void> => {
    setIsLoading({ check: true });
    setEmail(data.email);
    try {
      const res = await checkEmployee({ email: data.email }).unwrap() as IEmployeeByEmail;
      setStep("invite");
      setEmployee(res);
    }
    catch (error) {
      if (isApiError(error) && error.status === 404) {
        setStep("create");
      }
    }
    finally {
      setIsLoading({ check: false });
    }
  }

  const onInvite = async (data: InviteSchemaType, location_id: string): Promise<void> => {
    setIsLoading({ create: true });
    try {
      const req = {
        email,
        phone: data.phone,
        first_name: data.first_name,
        last_name: data.last_name,
        role: Number(data.role),
        position: data.position,
        location_id,
      } satisfies IEmployeeInviteCredentials;

      const res = await invite(req).unwrap();
      toast.success(res.message);
      navigate({ to: "/employees/users" });
    }
    catch (error) {
      console.log("error invite", error);
    }
    finally {
      setIsLoading({ create: false });
    }
  }

  return {
    step,
    employee,
    isLoading,
    onCheck,
    onInvite,
  }
};
