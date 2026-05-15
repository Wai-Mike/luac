import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Link } from '@inertiajs/react';
import { Fragment } from 'react';

export function Breadcrumbs({ breadcrumbs }) {
    if (!breadcrumbs.length) {
        return null;
    }

    return (
        <Breadcrumb>
            <BreadcrumbList className="gap-1.5 sm:gap-2">
                {breadcrumbs.map((item, index) => {
                    const isLast = index === breadcrumbs.length - 1;
                    const key = item.href ?? `crumb-${item.title}-${index}`;

                    return (
                        <Fragment key={key}>
                            <BreadcrumbItem className="max-w-[10rem] sm:max-w-xs">
                                {isLast ? (
                                    <BreadcrumbPage className="truncate font-semibold text-[rgb(29,84,114)] dark:text-sky-300">
                                        {item.title}
                                    </BreadcrumbPage>
                                ) : (
                                    <BreadcrumbLink asChild>
                                        <Link
                                            href={item.href}
                                            prefetch
                                            className="truncate text-neutral-600 transition-colors hover:text-[rgb(29,84,114)] dark:text-neutral-400 dark:hover:text-sky-300"
                                        >
                                            {item.title}
                                        </Link>
                                    </BreadcrumbLink>
                                )}
                            </BreadcrumbItem>
                            {!isLast && (
                                <BreadcrumbSeparator className="text-neutral-300 dark:text-neutral-600 [&>svg]:opacity-70" />
                            )}
                        </Fragment>
                    );
                })}
            </BreadcrumbList>
        </Breadcrumb>
    );
}
