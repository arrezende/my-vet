import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"

type BreadCrumbProps = {
    category: string,
    link: string,
    page: string
}

export default function MakeBreadcrumb({category,link, page}: BreadCrumbProps) { 

    return (
        <Breadcrumb>
            <BreadcrumbList>
            <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href={link}>
                    {category}
                </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="hidden md:block" />
            <BreadcrumbItem>
                <BreadcrumbPage>{page}</BreadcrumbPage>
            </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
    )
}