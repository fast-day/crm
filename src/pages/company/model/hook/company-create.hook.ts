import type { AppDispatch } from "@/app/providers/redux/config";
import { useDispatch, useSelector } from "react-redux";
import type { CompanyType } from "../schema/company.schema";
import { addCompany, addCompanyService, clearCompany } from "../slice/company.slice";
import { useNavigate } from "@tanstack/react-router";
import type { ServicePayload } from "../type/payload-service.type";
import { useCompanyCreateMutation } from "../../service/company.service";
import { toast } from "sonner";
import { companySelector } from "../selector/company.selector";
import type { CompanyCredentials } from "../type/company-create.type";

interface CompanyCreateReturnProps {
  stepOne: (data: CompanyType) => void;
  stepTwo: (payload: ServicePayload) => void;
  create: () => void;
}

export const useCompanyCreate = (): CompanyCreateReturnProps => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { company: companyData } = useSelector(companySelector);

  const [company] = useCompanyCreateMutation();

  const stepOne = (data: CompanyType) => {
    const d = {
      ...data,
      timezone_offset: data.timezone,
    };
    dispatch(addCompany(d));
    navigate({ to: "service" });
  };
  
  const stepTwo = (payload: ServicePayload): void => {
    dispatch(addCompanyService(payload));
  };

  const create = async (): Promise<void> => {
    try {
      if (!companyData) return;
      const payload = { 
        // ...companyData, 

        // TEST
        public_name: companyData.public_name,
        name: companyData.name,
        post_code: companyData.post_code,
        country: companyData.country,
        currency: companyData.currency,
        city: "Москва",
        region: "Московская область",

        timezone: companyData.timezone,
        timezone_offset: companyData.timezone_offset,
        lat: "55.7558",
        lng: "37.6173",
        //

        specialization: companyData.specialization ?? 0, 
        industry: companyData.industry ?? 0 
      } satisfies CompanyCredentials;

      await company(payload).unwrap();
      clearCompany();
    }
    catch (err) {
      console.error("Не удалось создать компанию", err);
      toast.error("Не удалось создать компанию", { description: JSON.stringify(err) });
    }
  };

  return { stepOne, stepTwo, create };
}
