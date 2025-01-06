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
    accessorKey: 'animal.nome',
    header: 'Nome',
  },
  {
    accessorKey: 'animal.especie',
    header: 'Espécie',
  },
  {
    accessorKey: 'animal.raca',
    header: 'Raça',
  },

  {
    accessorKey: 'animal.tutor.nomeCompleto',
    header: 'Tutor',
  },
  {
    accessorKey: 'consultas',
    header: 'Consultas',
  },
]
