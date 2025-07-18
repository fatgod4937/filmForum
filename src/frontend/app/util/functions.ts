import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export const handleNavigate = (router: AppRouterInstance, page: string) => {
    router.push(`/${page.toLowerCase()}`);
};
export const slugify = (title: string) => {
    return title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
};
