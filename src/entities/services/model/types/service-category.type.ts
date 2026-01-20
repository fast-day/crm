export interface IServiceCategory {
  id: number;
  name: string;
}

export interface IServiceCategoryCredentials {
  name: string;
}

export interface IServiceUpdateCategoryCredentials {
  category_id: number;
  body: IServiceCategoryCredentials;
}

export interface IServiceCategoryDeleteCredentials {
  category_id: number;
}
