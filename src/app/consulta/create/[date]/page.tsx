'use client'

import { Header } from '@/components/header'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useParams } from 'next/navigation'
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
import dayjs from 'dayjs'

interface Consulta {
  id: number
  data: string
  descricao: string
  animal: string
  animalId: number
  tutor: string
}

const cadastroSchema = z.object({
  descricao: z.string().min(3, 'A descrição deve ter pelo menos 3 caracteres'),

  data: z.string().nonempty('A data é obrigatória'),
  animal: z.string().nonempty('O animal é obrigatório'),
})

export default function ConsultCreateByDate() {
  const params = useParams<{ tag: string; item: string; date: string }>()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [animais, setAnimais] = useState<{ id: number; nome: string }[]>([])
  const [tutor, setTutor] = useState<{ id: number; nome: string }[]>([])
  const [tutorSelected, setTutorSelected] = useState('')
  const { toast } = useToast()

  const ownerSelected = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTutorSelected(event.target.value)
  }

  useEffect(() => {
    // Fetch tutores from API
    async function getTutor() {
      const res = await fetch('/api/tutores/list')
      const data = await res.json()
      setTutor(data)
    }
    getTutor()
  }, [])
  useEffect(() => {
    if (tutorSelected) {
      async function getAnimals() {
        const res = await fetch('/api/animal/list/' + tutorSelected)
        const data = await res.json()

        setAnimais(data)
      }
      getAnimals()
    }
  }, [tutorSelected])

  const form = useForm<z.infer<typeof cadastroSchema>>({
    resolver: zodResolver(cadastroSchema),
    defaultValues: {
      data: dayjs(params.date).format('YYYY-MM-DDTHH:mm:ss'),
      descricao: '',
    },
  })
  //   form.setValue('data', dayjs(params.date).toISOString())
  const onSubmit = (values: z.infer<typeof cadastroSchema>) => {
    setIsSubmitting(true)

    async function createConsult(values: z.infer<typeof cadastroSchema>) {
      const res = await fetch('/api/consulta/create', {
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
      const consult = createConsult(values)
      console.log(consult)
    }
  }

  return (
    <>
      <Header
        category="Consulta"
        link="/consulta"
        page="Cadastrar Nova Consulta"
      />
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min">
          <div>
            <h3 className="text-lg font-medium">Nova Consulta</h3>
            <p className="text-sm text-muted-foreground mb-4 text-zinc-600">
              Preencha os campos abaixo para cadastrar uma nova consulta.
            </p>
          </div>
          <div className="h-px bg-zinc-300 mb-4"></div>

          <div className="grid grid-cols-2 items-center gap-2">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                  control={form.control}
                  name="data"
                  render={({ field }) => (
                    <FormItem className="mb-4">
                      <FormLabel htmlFor="data">Data da Consulta</FormLabel>
                      <FormControl>
                        <Input
                          id="data"
                          {...field}
                          placeholder="YYYY-MM-DD HH:mm:ss"
                          type="datetime-local"
                        />
                      </FormControl>
                      <FormMessage>{}</FormMessage>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="descricao"
                  render={({ field }) => (
                    <FormItem className="mb-4">
                      <FormLabel htmlFor="descricao">Descrição</FormLabel>
                      <FormControl>
                        <Input
                          id="descrição"
                          {...field}
                          placeholder="Descrição"
                        />
                      </FormControl>
                      <FormMessage>{}</FormMessage>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="tutor"
                  render={({ field }) => (
                    <FormItem className="mb-4">
                      <FormLabel htmlFor="tutorId">Tutor</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={(value) =>
                            ownerSelected({ target: { value } })
                          }
                          {...field}
                        >
                          <SelectTrigger className="">
                            <SelectValue placeholder="Selecione um Tutor" />
                          </SelectTrigger>
                          <SelectContent>
                            {tutor.map((tutor) => (
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
                  name="animal"
                  render={({ field }) => (
                    <FormItem className="mb-4">
                      <FormLabel htmlFor="animalId">Animal</FormLabel>
                      <FormControl>
                        <Select onValueChange={field.onChange} {...field}>
                          <SelectTrigger className="">
                            <SelectValue placeholder="Selecione um Animal" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem
                              key={0}
                              value="Selecione um Animal"
                              selected={true}
                              disabled={true}
                            >
                              Selecione um Animal
                            </SelectItem>
                            {animais.map((animal) => (
                              <SelectItem
                                key={animal.id}
                                value={animal.id.toString()}
                                disabled={animal.id === 0}
                              >
                                {animal.nome}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
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
