import { Header } from '@/components/header'
import { AnimalListType, columns } from './components/colums'
import { DataTable } from './components/data-table'
import Calendar from '@/components/calendar'

async function getData(): Promise<AnimalListType[]> {
  const res = await fetch('http://localhost:3000/api/animal/list', {
    cache: 'no-store', // Evita cache para dados dinâmicos
  })
  if (!res.ok) {
    throw new Error('Erro ao carregar dados')
  }
  return res.json()
}

export default async function AnimalList() {
  let data: AnimalListType[] = []

  try {
    data = await getData()
  } catch (error) {
    console.error(error)
    return <p className="text-red-500">Erro ao carregar dados.</p>
  }

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
            <DataTable columns={columns} data={data} />
          </div>
          <Calendar
            events={[
              { title: 'event 1', date: '2025-01-01' },
              { title: 'event 2', date: '2025-01-02' },
              { title: 'event 3', date: '2025-01-01' },
            ]}
          />
        </div>
      </div>
    </>
  )
}
