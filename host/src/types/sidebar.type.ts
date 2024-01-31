type SidebarMenuItem = {
  id: string,
  route: string,
  title: string,
  icon?: {
    name: string,
    [key: string]: any
  },
  position?: number
}

type SidebarMenu = SidebarMenuItem[]

export type {
  SidebarMenu,
  SidebarMenuItem
}
