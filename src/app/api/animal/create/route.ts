import { PrismaClient } from '@prisma/client'
import dayjs from 'dayjs'

const prisma = new PrismaClient()

export async function POST(req: Request) {
  try {
    const body = await req.json() // Pega o corpo da requisição como JSON
    const { nome, especie, raca, dataNascimento, tutorId, consultas } = body

    // Validação simples
    if (!nome || !especie || !tutorId) {
      return new Response(
        JSON.stringify({ error: 'Nome, Espécie e Tutor são obrigatórios' }),
        { status: 400 },
      )
    }

    const dataNascimentoISO = dayjs(dataNascimento).toISOString()

    const animal = await prisma.animal.create({
      data: {
        nome,
        especie,
        raca,
        dataNascimento: dataNascimentoISO,
        tutorId: parseInt(tutorId),
        // tutor: tutor,
        consultas: {
          create: consultas || [],
        },
      },
    })

    return new Response(JSON.stringify(animal), { status: 201 }) // Retorna o animal criado
  } catch (e: unknown) {
    return new Response(
      JSON.stringify({ error: 'Erro interno no servidor' + e }),
      {
        status: 500,
      },
    )
  }
}
