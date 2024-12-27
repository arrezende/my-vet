import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(req: Request) {
  try {
    const body = await req.json() // Pega o corpo da requisição como JSON
    const { nome, cpf, endereco, telefone, email, animais } = body

    // Validação simples
    if (!nome || !cpf) {
      return new Response(
        JSON.stringify({ error: 'Nome e CPF são obrigatórios' }),
        { status: 400 },
      )
    }

    // Cria o tutor no banco de dados
    const tutor = await prisma.tutor.create({
      data: {
        nome,
        cpf,
        endereco,
        telefone,
        email,
        animais: {
          create: animais || [], // Cria os animais relacionados, se enviados
        },
      },
    })

    return new Response(JSON.stringify(tutor), { status: 201 }) // Retorna o tutor criado
  } catch (error: any) {
    console.error(
      'Erro interno:',
      error.code == 'P2002' ? 'erro do CPF' : 'erro interno',
    )

    if (error.code == 'P2002') {
      // Erro de duplicidade (ex: CPF já cadastrado)
      return new Response(JSON.stringify({ error: 'CPF já cadastrado' }), {
        status: 400,
      })
    }

    return new Response(JSON.stringify({ error: 'Erro interno no servidor' }), {
      status: 500,
    })
  }
}
