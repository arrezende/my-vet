import { Separator } from '@radix-ui/react-separator'
import { SidebarTrigger } from './ui/sidebar'
import MakeBreadcrumb from './makeBreadcrumb'
type HeaderProps = {
  category: string
  link: string
  page: string
}
export function Header({ category, link, page }: HeaderProps) {
  return (
    <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />

        <MakeBreadcrumb category={category} link={link} page={page} />
      </div>
    </header>
  )
}
