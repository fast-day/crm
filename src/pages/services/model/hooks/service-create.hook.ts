import { useCreateServiceMutation, usePhotoServiceMutation } from "@/entities/services";
import type { ServiceType } from "../schema/service.schema";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { useState } from "react";
import { useAppDispatch } from "@/shared/hooks";
import { updateAccount } from "@/entities/account";

interface UseCreateServiceReturnProps {
  isLoading: boolean;
  onSubmit: (data: ServiceType) => Promise<void>;
}

export const useCreateService = (): UseCreateServiceReturnProps => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [create] = useCreateServiceMutation();
  const [uploadPhoto] = usePhotoServiceMutation();

  const onSubmit = async (data: ServiceType) => {
    setIsLoading(true);
    try {
      const { avatar, ...dto } = data;
      const res = await create({
        ...dto,
        category: dto.category,
        mark: dto.mark ?? "red",
      });

      if (res.error) {
        console.log("res.error", res.error);
        throw new Error("test");
      }

      if (avatar) {
        const formData = new FormData();
        formData.append("file", avatar);
        await uploadPhoto({ service_id: res.data.id, body: formData}).unwrap();
      }

      dispatch(updateAccount({ has_services: true }));

      navigate({ to: "/business/services" });
    }
    catch (err) {
      console.log(err instanceof Error && err.message);
      toast.error(err instanceof Error && err.message);
    }
    finally {
      setIsLoading(false);
    }
  }

  return { isLoading, onSubmit };
};
