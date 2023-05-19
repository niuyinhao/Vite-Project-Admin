import * as types from "@/redux/mution-types";
export const setBreadcrumbList = (breadcrumbList: { [key: string]: any }) => ({
    type: types.SET_BREADCRUMB_LIST,
    breadcrumbList: breadcrumbList
})