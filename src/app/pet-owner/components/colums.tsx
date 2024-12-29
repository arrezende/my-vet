'use client'

import { AnimalListType } from '@/app/animal/components/colums'
import { ColumnDef } from '@tanstack/react-table'

export type OwnerListType = {
  id: number
  nome: string
  cpf: string
  endereco: string
  telefone: string
  email: number
  animais: {
    nome: AnimalListType[]
  }
}

export const columns: ColumnDef<OwnerListType>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
  },
  {
    accessorKey: 'nome',
    header: 'Nome',
  },
  {
    accessorKey: 'cpf',
    header: 'CPF',
  },
  {
    accessorKey: 'endereco',
    header: 'Endereço',
  },
  {
    accessorKey: 'telefone',
    header: 'Telefone',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'animais',
    header: 'Animais',
  },
]
