import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  try {
    // Busca todos os tutores no banco de dados
    const tutores = await prisma.tutor.findMany({
      include: {
        animais: true, // Inclui os animais relacionados ao tutor
      },
    })

    // Retorna os tutores como resposta JSON
    return new Response(JSON.stringify(tutores), { status: 200 })
  } catch (error) {
    console.error('Erro ao buscar tutores:', error)
    return new Response(JSON.stringify({ error: 'Erro ao buscar tutores' }), {
      status: 500,
    })
  }
}
