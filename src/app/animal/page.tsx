import { Header } from '@/components/header'
import { AnimalListType, columns } from './components/colums'
import { DataTable } from './components/data-table'

async function getData(): Promise<AnimalListType[]> {
  const res = await fetch('http://localhost:3000/api/animal/list', {
    cache: 'no-store', // Evita cache para dados dinâmicos
  })

  return res.json()
}

export default async function AnimalList() {
  let data: AnimalListType[] = []

  try {
    data = await getData()
  } catch (error) {
    console.error(error)
    return (data = [])
    //<p className="text-red-500">Erro ao carregar dados.</p>
  }

  return (
    <>
      <Header category="Animais" link="/animal" page="Listagem de animais" />
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0  bg-themeGray">
        <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min">
          <div>
            <h3 className="text-lg font-medium mt-3">
              Listagem de Animais Cadastrados
            </h3>
            <p className="text-sm text-muted-foreground mb-4 text-zinc-600">
              Veja abaixo todos os animais cadastrados
            </p>
          </div>
          <div className="h-px bg-zinc-300 mb-4"></div>
          <div>
            {!data.length ? (
              <p className="text-left text-xl text-muted-foreground">
                Nenhum animal cadastrado.
              </p>
            ) : (
              <DataTable columns={columns} data={data} />
            )}
          </div>
        </div>
      </div>
    </>
  )
}
