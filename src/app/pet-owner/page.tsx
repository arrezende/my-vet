import { Header } from '@/components/header'
import { OwnerListType, columns } from './components/colums'
import { DataTable } from './components/data-table'

async function getData(): Promise<OwnerListType[]> {
  const res = await fetch('http://localhost:3000/api/tutores/list', {
    cache: 'no-store', // Evita cache para dados dinâmicos
  })

  return res.json()
}

export default async function OwnerList() {
  let data: OwnerListType[] = []

  try {
    data = await getData()
  } catch (error) {
    console.error(error)
    return (data = [])
    //<p className="text-red-500">Erro ao carregar dados.</p>
  }

  return (
    <>
      <Header category="Tutores" link="/tutor" page="Listagem de tutores" />
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0  bg-themeGray">
        <div className="min-h-[100vh] flex-1 rounded-xl md:min-h-min mt-3">
          <div>
            <h3 className="text-lg font-medium">
              Listagem de Tutores Cadastrados
            </h3>
            <p className="text-sm text-muted-foreground mb-4 text-zinc-600">
              Veja abaixo todos os tutores cadastrados
            </p>
          </div>
          <div className="h-px bg-white mb-4">
            <div>
              {!data.length ? (
                <p className="text-left text-xl text-muted-foreground pt-3">
                  Nenhum animal cadastrado.
                </p>
              ) : (
                <DataTable columns={columns} data={data} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
