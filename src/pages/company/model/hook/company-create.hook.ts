import type { AppDispatch } from "@/app/providers/redux/config";
import { useDispatch } from "react-redux";
import { useCompanyCreateMutation } from "../../service/company.service";
import { toast } from "sonner";
import type { CompanyCredentials } from "../type/company-create.type";
import { useNavigate } from "@tanstack/react-router";
import { setAccount, setLocation, useLazyMeQuery } from "@/entities/account";
import { useCallback } from "react";
import { getErrorMessage } from "@/shared/utils";

interface CompanyCreateReturnProps {
  create: (firstName: string) => Promise<void>;
}

function getTimezoneOffsetString(): string {
  const offsetMinutes = -new Date().getTimezoneOffset();
  const sign = offsetMinutes >= 0 ? '+' : '-';
  const abs = Math.abs(offsetMinutes);
  const hours = String(Math.floor(abs / 60)).padStart(2, '0');
  const minutes = String(abs % 60).padStart(2, '0');
  return `${sign}${hours}:${minutes}`;
}

export const useCompanyCreate = (): CompanyCreateReturnProps => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  
  const [company] = useCompanyCreateMutation();
  const [account] = useLazyMeQuery();

  const create = useCallback(async (firstName: string): Promise<void> => {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const timezone_offset = getTimezoneOffsetString();

    try {
      const payload = { 
        name: firstName,
        currency: "RUB",
        timezone,
        timezone_offset,
      } satisfies CompanyCredentials;

      const res = await company(payload).unwrap();

      dispatch(setAccount(res));
      dispatch(setLocation(res.locations[0]));
      navigate({ to: "/", replace: true });
    }
    catch (err) {
      console.error("Не удалось создать компанию", err);
      toast.error(getErrorMessage(err));
    }
  }, [dispatch, navigate, company, account]);

  return { create };
}

