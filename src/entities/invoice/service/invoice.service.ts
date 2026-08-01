import { API } from "@/shared/api";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";

function parseJsonSafely(text: string): unknown {
  try {
    return JSON.parse(text);
  } catch {
    return { title: "Ошибка", detail: text || "Неизвестная ошибка" };
  }
}

async function resolveBlobError(error: FetchBaseQueryError): Promise<FetchBaseQueryError> {
  if (typeof error.status !== "number" || !(error.data instanceof Blob)) return error;

  const text = await error.data.text();
  return { status: error.status, data: parseJsonSafely(text) };
}

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

        if (result.error) return { error: await resolveBlobError(result.error) };

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
