import { API } from "@/shared/api";

const invoiceApi = API.injectEndpoints({
  endpoints: build => ({
    /**
      ===== УСТАНОВКА ФАЙЛА =====
    **/
    downloadInvoice: build.mutation<null, { invoice_id: string, tag: string }>({
      async queryFn({ invoice_id, tag }, _api, _extraOptions, query) {
        const result = await query({
          url: `/v1/invoice/${invoice_id}/download`,
          responseHandler: (res) => res.blob(),
        });

        if (result.error) {
          return { error: result.error };
        }

        const blob = result.data as Blob;
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `${tag}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);

        return { data: null };
      },
    }),
  }),
});

export const {
  useDownloadInvoiceMutation,
} = invoiceApi;
