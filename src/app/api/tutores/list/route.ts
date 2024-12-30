import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  try {
    // Busca todos os animais junto com os tutores relacionados
    const tutores = await prisma.tutor.findMany({})

    return new Response(JSON.stringify(tutores), { status: 200 })
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
