import { API } from "@/shared/api";
import { buildQuery } from "@/shared/lib";
import type { ICustomerCreateDocumentCredentials, ICustomerDetailDocument, ICustomerDocument, ICustomerDocumentCredentials, ICustomerDocumentsCredentials, ICustomerUpdateDocumentCredentials } from "../model/types/customer-document.type";

export const CustomerDocumentApi = API.injectEndpoints({
  endpoints: build => ({
    
    /*
      ===== ПОЛУЧЕНИЕ ДОКУМЕНТОВ КЛИЕНТА =====
    */
   getCustomerDocuments: build.query<ApiResponse<ICustomerDocument>, ICustomerDocumentsCredentials>({
    query: ({ customer_id, query }) => ({
      url: buildQuery(`/v1/customer/${customer_id}/documents`, { ...query }),
      method: "GET",
    }),
   }),

    /*
      ===== СОЗДАНИЕ ДОКУМЕНТА =====
    */
   customerCreateDocument: build.mutation<ICustomerDocument, ICustomerCreateDocumentCredentials>({
    query: ({ customer_id }) => ({
      url: `/v1/customer/${customer_id}/document`,
      method: "POST",
    }),
   }),

    /*
      ===== ПОЛУЧЕНИЕ ДОКУМЕНТА =====
    */
   getCustomerDocument: build.query<ICustomerDetailDocument, ICustomerDocumentCredentials>({
    query: ({ customer_id, document_id }) => ({
      url: `/v1/customer/${customer_id}/documents/${document_id}`,
      method: "GET",
    }),
   }),

    /*
      ===== РЕДАКТИРОВАНИЕ ДОКУМЕНТА =====
    */
   customerUpdateDocument: build.mutation<ICustomerDetailDocument, ICustomerUpdateDocumentCredentials>({
    query: ({ customer_id, document_id, body }) => ({
      url: `/v1/customer/${customer_id}/documents/${document_id}`,
      method: "PATCH",
      body,
    }),
   }),

  }),
});

export const {
  useGetCustomerDocumentsQuery,
  useCustomerCreateDocumentMutation,
  useGetCustomerDocumentQuery,
  useCustomerUpdateDocumentMutation,
} = CustomerDocumentApi;
