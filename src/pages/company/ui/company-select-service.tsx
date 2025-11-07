import { Link, useNavigate } from "@tanstack/react-router"
import { companySelector } from "../model/selector/company.selector";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useGetSpecializationQuery } from "../service/company.service";

export const CompanySelectService = () => {
  const navigate = useNavigate();
  const { company } = useSelector(companySelector);
  const { data } = useGetSpecializationQuery();

  useEffect(() => {
    if (!company) {
      navigate({ to: "/company/create" });
    }
  }, [company, navigate]);

  console.log(data);

  return (
    <div className="max-w-5xl mx-auto w-full py-20 px-10">
      <h1 className="text-2xl font-bold mb-6">Выберите специализацию</h1>
      <div className="grid grid-cols-4 gap-2.5">
        {data && data.map((item, index) => (
          <Link to={`/company/create/service/3`} params={{ service_id: item.id }} key={index} className="p-4 rounded-md bg-gray-100 flex items-center justify-center flex-col gap-2">
            <div>
              <p className="text-lg font-medium text-center">{item.name}</p>
              <p className="text-sm leading-3.5 font-normal mt-1.5">{item.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
