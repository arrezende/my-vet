import { PrismaClient } from '@prisma/client'
import dayjs from 'dayjs'

const prisma = new PrismaClient()

export async function POST(req: Request) {
  try {
    const body = await req.json() // Pega o corpo da requisição como JSON
    const { data: dataConsulta, descricao, animal: animalId } = body

    // Validação simples
    if (!dataConsulta || !animalId) {
      return new Response(
        JSON.stringify({ error: 'Data da consulta e Animal são obrigatórios' }),
        { status: 400 },
      )
    }
    const dataConsultaISO = dayjs(dataConsulta).toISOString()
    // Cria o tutor no banco de dados
    const consulta = await prisma.consulta.create({
      data: {
        data: dataConsultaISO,
        descricao,

        animal: {
          connect: {
            id: parseInt(animalId),
          },
        },
      },
    })

    return new Response(JSON.stringify(consulta), { status: 201 }) // Retorna o tutor criado
  } catch (e) {
    return new Response(
      JSON.stringify({ error: 'Erro interno no servidor' + e }),
      {
        status: 500,
      },
    )
  }
}
