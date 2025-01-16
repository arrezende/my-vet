'use client'

import { Header } from '@/components/header'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

import { useToast } from '@/hooks/use-toast'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { useState, useEffect } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface Tutor {
  id: number
  nomeCompleto: string
}

const cadastroSchema = z.object({
  nome: z
    .string()
    .min(3, 'Nome deve ter pelo menos 3 caracteres')
    .max(255, 'Nome muito longo'),

  raca: z.string().min(3, 'Raça deve ter pelo menos 3 caracteres'),
  dataNascimento: z
    .string()
    .regex(
      /^\d{4}-\d{2}-\d{2}$/,
      'Data de nascimento deve estar no formato DD-MM-YYYY',
    ),
  especie: z.string().nonempty('Espécie é obrigatória'),
  tutorId: z.string().nonempty('Tutor é obrigatório'),
})

export default function PetOwnerCreate() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [tutores, setTutores] = useState<Tutor[]>([])
  const [animais, setAnimais] = useState<{ id: number; name: string }[]>([])
  const { toast } = useToast()
  useEffect(() => {
    // Fetch tutores from API
    async function getTutores() {
      const res = await fetch('/api/tutores/list')
      const data = await res.json()
      console.log(data)
      setTutores(data)
    }
    getTutores()

    setAnimais([
      { id: 1, name: 'Cachorro' },
      { id: 2, name: 'Gato' },
      { id: 3, name: 'Aves' },
      { id: 4, name: 'Roedores e pequenos mamíferos' },
      { id: 5, name: 'Répteis' },
      { id: 6, name: 'Cavalos' },
      { id: 7, name: 'Gado (bovinos)' },
      { id: 8, name: 'Ovinos e caprinos' },
      { id: 9, name: 'Animais mantidos como pets exóticos' },
      { id: 10, name: 'Animais de zoológicos ou resgatados' },
    ])
  }, [])

  const form = useForm<z.infer<typeof cadastroSchema>>({
    resolver: zodResolver(cadastroSchema),
    defaultValues: {
      nome: '',
      raca: '',
      dataNascimento: '',
      especie: '',
      tutorId: '',
    },
  })

  const onSubmit = (values: z.infer<typeof cadastroSchema>) => {
    setIsSubmitting(true)

    async function createAnimal(values: z.infer<typeof cadastroSchema>) {
      const res = await fetch('/api/animal/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })

      if (!res.ok) {
        const errorText = await res.text()
        const error = JSON.parse(errorText)

        toast({
          title: 'Ops, ocorreu um erro ao cadastrar',
          description: 'Verifique os campos e tente novamente. ' + error.error,
        })
        setIsSubmitting(false)
        return
      }
      const data = await res.json()
      console.log('Animal cadastrado com sucesso:', data)
      toast({
        title: 'Cadastro realizado com sucesso!',
        description: 'Seus dados foram enviados.',
      })
      setIsSubmitting(false)
      form.reset()
    }

    if (values) {
      const animal = createAnimal(values)
      console.log(animal)
    }
  }

  return (
    <>
      <Header category="Animais" link="/animal" page="Cadastrar Novo Animal" />
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0  bg-themeGray">
        <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min mt-3">
          <div>
            <h3 className="text-lg font-medium">Novo Animal</h3>
            <p className="text-sm text-muted-foreground mb-4 text-zinc-600">
              Preencha os campos abaixo para cadastrar um novo animal.
            </p>
          </div>
          <div className="h-px bg-zinc-300 mb-4"></div>

          <div className="grid grid-cols-2 items-center gap-2">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                  control={form.control}
                  name="nome"
                  render={({ field }) => (
                    <FormItem className="mb-4">
                      <FormLabel htmlFor="nome">Nome</FormLabel>
                      <FormControl>
                        <Input id="nome" {...field} placeholder="Nome" />
                      </FormControl>
                      <FormMessage>{}</FormMessage>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="especie"
                  render={({ field }) => (
                    <FormItem className="mb-4">
                      <FormLabel htmlFor="especieId">Espécie</FormLabel>
                      <FormControl>
                        <Select onValueChange={field.onChange} {...field}>
                          <SelectTrigger className="">
                            <SelectValue placeholder="Selecione uma Espécie" />
                          </SelectTrigger>
                          <SelectContent>
                            {animais.map((animal) => (
                              <SelectItem
                                key={animal.id}
                                value={animal.id.toString()}
                              >
                                {animal.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage>{}</FormMessage>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="raca"
                  render={({ field }) => (
                    <FormItem className="mb-4">
                      <FormLabel htmlFor="raca">Raça</FormLabel>
                      <FormControl>
                        <Input id="raca" {...field} placeholder="Raça" />
                      </FormControl>
                      <FormMessage>{}</FormMessage>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="tutorId"
                  render={({ field }) => (
                    <FormItem className="mb-4">
                      <FormLabel htmlFor="tutorId">Tutor</FormLabel>
                      <FormControl>
                        <Select onValueChange={field.onChange} {...field}>
                          <SelectTrigger className="">
                            <SelectValue placeholder="Selecione um tutor" />
                          </SelectTrigger>
                          <SelectContent>
                            {tutores.length > 0 &&
                              tutores.map((tutor) => (
                                <SelectItem
                                  key={tutor.id}
                                  value={tutor.id.toString()}
                                >
                                  {tutor.nomeCompleto}
                                </SelectItem>
                              ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage>{}</FormMessage>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="dataNascimento"
                  render={({ field }) => (
                    <FormItem className="mb-4">
                      <FormLabel htmlFor="dataNascimento">
                        Data de Nascimento
                      </FormLabel>
                      <FormControl>
                        <Input
                          id="dataNascimento"
                          {...field}
                          placeholder="YYYY-MM-DD"
                          type="date"
                        />
                      </FormControl>
                      <FormMessage>{}</FormMessage>
                    </FormItem>
                  )}
                />

                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Enviando...' : 'Enviar Cadastro'}
                </Button>
              </form>
            </Form>
            <div>teste</div>
          </div>
        </div>
      </div>
    </>
  )
}
