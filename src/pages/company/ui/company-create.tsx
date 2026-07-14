import { useCompanyCreate } from "../model/hook/company-create.hook";
import { useSelector } from "react-redux";
import { useAccount } from "@/entities/account";
import { useNavigate } from "@tanstack/react-router";
import { AppLoading } from "@/widgets/loading";
import { useEffect } from "react";

export const CompanyCreate = () => {
  const { isCompany, account } = useSelector(useAccount);
  const { create } = useCompanyCreate();
  
  const navigate = useNavigate();

  useEffect(() => {
    if (!account || isCompany) return;
    create(account.first_name);
  }, [account, create, isCompany]);

  useEffect(() => {
    if (isCompany) {
      navigate({ to: "/", replace: true });
    }
  }, [isCompany, navigate]);

  if (isCompany) return null;

  return <AppLoading />
}
