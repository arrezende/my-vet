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

  return res.json()
}

export default async function AnimalList() {
  let dataResult: ConsultProps[]

  try {
    dataResult = await getData()
  } catch (error) {
    dataResult = []
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
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0  bg-themeGray">
        <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min mt-3">
          <div>
            <h3 className="text-lg font-medium">
              Listagem de Animais Cadastrados
            </h3>
            <p className="text-sm text-muted-foreground mb-4 text-zinc-600">
              Veja abaixo todos os animais cadastrados
            </p>
          </div>
          <div className="h-px bg-zinc-300 mb-4"></div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            <div className="col-span-10">
              <Calendar events={dataConsult} className="bg-white" />
            </div>
            <div className="col-span-2">
              <DataTable columns={columns} data={dataResult} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
