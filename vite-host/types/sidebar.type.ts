type SidebarMenuItem = {
  id?: string,
  route?: string,
  title?: string,
  name?: string,
  icon?: {
    name?: string,
    [key: string]: any
  },
  position?: number,
  type: 'submenu_item' | 'item',
  submenu?: SidebarMenuItem[]
}

type SidebarMenu = SidebarMenuItem[]

export type {
  SidebarMenu,
  SidebarMenuItem
}
