import { Header } from '@/components/header'
import { ChartArea } from './chart/area'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card'

import Link from 'next/link'

const animalMonth = [
  { month: 'Janeiro', quantity: 186 },
  { month: 'Fevereiro', quantity: 305 },
  { month: 'Março', quantity: 237 },
  { month: 'Abril', quantity: 73 },
  { month: 'Maio', quantity: 209 },
  { month: 'Junho', quantity: 214 },
]
const consultsMonth = [
  { month: 'Janeiro', quantity: 10 },
  { month: 'Fevereiro', quantity: 20 },
  { month: 'Março', quantity: 50 },
  { month: 'Abril', quantity: 5 },
  { month: 'Maio', quantity: 60 },
  { month: 'Junho', quantity: 214 },
]
const lastAnimals = [
  { month: 'Bella', desktop: 186 },
  { month: 'Max', desktop: 305 },
  { month: 'Luna', desktop: 237 },
]

export default async function OwnerList() {
  return (
    <>
      <Header category="Home" link="/" page="Dashboard" />
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min">
          <div>
            <h3 className="text-lg font-medium">Dashboard</h3>
            <p className="text-sm text-muted-foreground mb-4 text-zinc-600">
              Bem-vindo ao seu painel de controle, onde você pode visualizar e
              gerenciar todas as suas informações de forma eficiente.
            </p>
          </div>
          <div className="h-px bg-zinc-300 mb-4"></div>
          <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
            <ChartArea
              data={animalMonth}
              title="Animais por mês"
              description="Mostrando o total de animais nos últimos 6 meses"
            />
            <Card>
              <CardHeader>
                <CardTitle>Últimos Atendimentos (24h)</CardTitle>
                <CardDescription>
                  Mostrando o total de atendimentos nas últimas 24h
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul>
                  <li>
                    <Link href="#">Vale Nada</Link>
                  </li>
                  <li>
                    <Link href="#">Tostão</Link>
                  </li>
                  <li>
                    <Link href="#">Miau</Link>
                  </li>
                </ul>
              </CardContent>
            </Card>
            <ChartArea
              data={consultsMonth}
              title="Consultas por mês"
              description="Mostrando o total de consultas nos últimos 6 meses"
            />
            <Card>
              <CardHeader>
                <CardTitle>Últimos Atendimentos (24h)</CardTitle>
                <CardDescription>
                  Mostrando o total de atendimentos nas últimas 24h
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul>
                  <li>
                    <Link href="#">Vale Nada</Link>
                  </li>
                  <li>
                    <Link href="#">Tostão</Link>
                  </li>
                  <li>
                    <Link href="#">Miau</Link>
                  </li>
                </ul>
              </CardContent>
            </Card>{' '}
            <Card>
              <CardHeader>
                <CardTitle>Últimos animais cadastrados (24h)</CardTitle>
                <CardDescription>
                  Mostrando o total de animais cadastrados nas últimas 24h
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul>
                  <li>
                    <Link href="#">Vale Nada</Link>
                  </li>
                  <li>
                    <Link href="#">Tostão</Link>
                  </li>
                  <li>
                    <Link href="#">Miau</Link>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  )
}
