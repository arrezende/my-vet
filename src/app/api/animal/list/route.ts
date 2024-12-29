import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  try {
    // Busca todos os animais junto com os tutores relacionados
    const animals = await prisma.animal.findMany({
      include: {
        tutor: {
          // Inclui o tutor relacionado
          select: {
            nome: true, // Apenas os campos necessários do tutor
          },
        },
      },
    })

    return new Response(JSON.stringify(animals), { status: 200 })
  } catch (error) {
    console.error('Erro ao buscar os animais:', error)
    return new Response(
      JSON.stringify({ error: 'Erro ao buscar os animais' }),
      {
        status: 500,
      },
    )
  }
}
