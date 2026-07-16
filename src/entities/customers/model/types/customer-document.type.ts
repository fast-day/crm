import type { CustomerProfile } from "./customer.type";

export interface ICustomerDocumentQuery {
  full_name?: string;
}

/*
  ===== ПОЛУЧЕНИЕ ДОКУМЕНТОВ =====
*/
export interface ICustomerDocumentsCredentials {
  customer_id: string;
  query: ICustomerDocumentQuery & PaginationQuery;
}

export interface ICustomerDocument {
  id: string;
  name: string | null;
  description: string | null;
  tag: TCustomerDocument;
  is_pinned: boolean;
  is_archived: boolean;
  is_locked: boolean;
  created: {
    date: string;
    time: string;
  }
}

/*
  ===== СОЗДАНИЕ ДОКУМЕНТА =====
*/
export interface ICustomerCreateDocumentCredentials {
  customer_id: string;
}

/*
  ===== ПОЛУЧЕНИЕ ИНФЫ О ДОКУМЕНТЕ =====
*/
export interface ICustomerDocumentCredentials {
  customer_id: string;
  document_id: string;
}

export interface ICustomerDocumentProfileInfo {
  id: string;
  is_banned: boolean;
  profile: CustomerProfile & {
    profile_id: string;
    email: string | null;
  }
}

export interface ICustomerDetailDocument extends ICustomerDocument {
  content: IDocumentContent | null;
  customer: ICustomerDocumentProfileInfo;
}

/*
  ===== РЕДАКТИРОВАНИЕ ДОКУМЕНТА =====
*/
export interface ICustomerUpdateDocumentCredentials {
  customer_id: string;
  document_id: string;
  body: {
    name?: string;
    content?: IDocumentContent;
    is_pinned?: boolean;
    is_archived?: boolean;
    is_locked?: boolean;
  }
}

/*
  ===== СОДЕРЖИМОЕ ДОКУМЕНТА =====
*/
export interface IDocumentContent {
  time: number;
  blocks: TDocumentContentBlock[];
}

export type TDocumentBlockType = "paragraph" | "header" | "list" | "attaches" | "image";

export type TDocumentBlockMap = {
  paragraph: {
    text: string;
  }

  header: {
    text: string;
    level: number;
  }

  list: {
    type: string;
    items: string[];
  }

  attaches: {
    file: {
      url: string;
      size: number;
      name: string;
      extension: string;
    }
    title: string;
  }

  image: {
    file: {
      url: string;
    }
    withBorder: boolean;
    withBackground: boolean;
    stretched: boolean;
    caption: string;
  }
}

export type TDocumentContentBlock = {
  [K in keyof TDocumentBlockMap]: {
    id: string;
    type: K;
    data: TDocumentBlockMap[K];
  }
}[keyof TDocumentBlockMap]
