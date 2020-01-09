export type PagedList<TModel> = {
    totalPages: number,
    pageIndex: number,
    items: TModel[],
    hasNextPage: boolean,
    hasPreviousPage: boolean,
    totalItems: number
};