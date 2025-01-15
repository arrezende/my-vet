'use client'

import * as React from 'react'
import {
  PawPrint,
  UsersRound,
  AudioWaveform,
  BookOpen,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
} from 'lucide-react'

import { NavMain } from '@/components/nav-main'

import { NavUser } from '@/components/nav-user'
import { TeamSwitcher } from '@/components/team-switcher'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar'

// This is sample data.
const data = {
  user: {
    name: 'My Vet',
    email: 'm@myvet.com',
    avatar: '/logo.png',
  },
  teams: [
    {
      name: 'My Vet',
      logo: GalleryVerticalEnd,
      plan: 'Enterprise',
    },
    {
      name: 'Veterinaria 2',
      logo: AudioWaveform,
      plan: 'Startup',
    },
    {
      name: 'Veterinaria 3',
      logo: Command,
      plan: 'Free',
    },
  ],
  navMain: [
    {
      title: 'Animais',
      url: '/animais',
      icon: PawPrint,
      isActive: true,
      items: [
        {
          title: 'Cadastrar Animal',
          url: '/animal/create/',
        },
        {
          title: 'Listagem de Animais',
          url: '/animal/',
        },
      ],
    },
    {
      title: 'Tutores',
      url: '#',
      icon: UsersRound,
      items: [
        {
          title: 'Cadastrar Tutor',
          url: '/pet-owner/create/',
        },
        {
          title: 'Listagem de Tutores',
          url: '/pet-owner/',
        },
      ],
    },
    {
      title: 'Consultas',
      url: '/consulta',
      icon: BookOpen,
      items: [
        {
          title: 'Agendar Consulta',
          url: '/consulta/create',
        },
        {
          title: 'Histórico de Consultas',
          url: '/consulta',
        },
      ],
    },
  ],
  projects: [
    {
      name: 'Design Engineering',
      url: '#',
      icon: Frame,
    },
    {
      name: 'Sales & Marketing',
      url: '#',
      icon: PieChart,
    },
    {
      name: 'Travel',
      url: '#',
      icon: Map,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
