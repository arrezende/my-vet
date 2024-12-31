import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(
  request: Request,
  { params }: { params: { tutorId: string } },
) {
  try {
    // Busca todos os animais junto com os tutores relacionados
    const animals = await prisma.animal.findMany({
      where: {
        tutorId: parseInt(params.tutorId), // Filtra os animais pelo tutorId
      },
      include: {
        tutor: {
          // Inclui o tutor relacionado
          select: {
            nome: true, // Apenas os campos necessários do tutor
          },
        },
      },
    })
    if (animals.length === 0) {
      return new Response(
        JSON.stringify([{ id: 0, nome: 'Nenhum animal encontrado' }]),
        {
          status: 200,
        },
      )
    }
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
