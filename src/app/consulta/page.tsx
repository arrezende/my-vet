import { Header } from '@/components/header'
import { columns } from './components/colums'
import { DataTable } from './components/data-table'
import Calendar from '@/components/calendar'
import dayjs from 'dayjs'

type ConsultProps = {
  id: number
  data: string
  descricao: string
  animalId: number
  animal: {
    nome: string
    especie: string
    raca: string
    dataNascimento: string
  }
}

async function getData(): Promise<ConsultProps[]> {
  const res = await fetch('http://localhost:3000/api/consulta', {
    cache: 'no-store', // Evita cache para dados dinâmicos
  })
  if (!res.ok) {
    throw new Error('Erro ao carregar dados')
  }
  return res.json()
}

export default async function AnimalList() {
  let dataResult: ConsultProps[]

  try {
    dataResult = await getData()
  } catch (error) {
    console.error(error)
    return <p className="text-red-500">Erro ao carregar dados.</p>
  }
  const dataConsult = dataResult.map(
    (item): { title: string; date: string } => ({
      title: item.animal.nome + ' | ' + dayjs(item.data).format('HH:mm'),
      date: dayjs(item.data).format('YYYY-MM-DD'),
    }),
  )
  return (
    <>
      <Header category="Animais" link="/animal" page="Listagem de animais" />
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min">
          <div>
            <h3 className="text-lg font-medium">
              Listagem de Animais Cadastrados
            </h3>
            <p className="text-sm text-muted-foreground mb-4 text-zinc-600">
              Veja abaixo todos os animais cadastrados
            </p>
          </div>
          <div className="h-px bg-zinc-300 mb-4"></div>
          <div>
            <DataTable columns={columns} data={dataResult} />
          </div>
          <Calendar events={dataConsult} />
        </div>
      </div>
    </>
  )
}
