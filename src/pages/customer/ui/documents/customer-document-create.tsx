import { useCustomerCreateDocumentMutation } from '@/entities/customers';
import { getErrorMessage } from '@/shared/utils';
import { AppLoading } from '@/widgets/loading';
import { useNavigate } from '@tanstack/react-router';
import { useCallback, useEffect } from 'react';
import { toast } from 'sonner';

interface ICustomerDocumentCreateProps {
  customer_id: string;
}

export const CustomerDocumentCreate = ({ customer_id }: ICustomerDocumentCreateProps) => {
  const navigate = useNavigate();

  const [document] = useCustomerCreateDocumentMutation();

  const createDocument = useCallback(async () => {
    try {
      const res = await document({ customer_id }).unwrap();
      navigate({ to: `/customers/${customer_id}/documents/${res.id}`, replace: true });
    }
    catch (err) {
      console.error("Не удалось создать документ");
      toast.error(getErrorMessage(err));
      navigate({ to: `/customers/${customer_id}` });
    }
  }, [document, customer_id, navigate]);

  useEffect(() => {
    createDocument();
  }, [createDocument]);

  return (
    <AppLoading>
      <p className='mt-2.5 text-sm'>Создаем документ...</p>
    </AppLoading>
  )
}
