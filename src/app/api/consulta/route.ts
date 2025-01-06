import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  try {
    // Busca todos os tutores no banco de dados
    const consultas = await prisma.consulta.findMany({
      include: {
        animal: {
          select: {
            nome: true,
            especie: true,
            raca: true,
            dataNascimento: true,
            tutor: {
              select: {
                nomeCompleto: true,
              },
            },
          },
        },
      },
    })

    // Retorna os consultas como resposta JSON
    return new Response(JSON.stringify(consultas), { status: 200 })
  } catch (error) {
    console.error('Erro ao buscar as consultas:', error)
    return new Response(
      JSON.stringify({ error: 'Erro ao buscar as consultas' }),
      {
        status: 500,
      },
    )
  }
}
