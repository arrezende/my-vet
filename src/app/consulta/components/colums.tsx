'use client'

import { ColumnDef } from '@tanstack/react-table'

export type AnimalListType = {
  id: number
  nome: string
  especie: string
  raca: string
  dataNascimento: string
  tutorId: number
  tutor: {
    nome: string
  }
  consultas: string
}

export const columns: ColumnDef<AnimalListType>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
  },
  {
    accessorKey: 'nome',
    header: 'Nome',
  },
  {
    accessorKey: 'especie',
    header: 'Espécie',
  },
  {
    accessorKey: 'raca',
    header: 'Raça',
  },
  {
    accessorKey: 'dataNascimento',
    header: 'Data de Nascimento',
    cell: ({ row }: any) => {
      const date = new Date(row.original.dataNascimento)
      return date.toLocaleDateString('pt-BR')
    },
  },
  {
    accessorKey: 'tutor.nome',
    header: 'Tutor',
  },
  {
    accessorKey: 'consultas',
    header: 'Consultas',
  },
]
