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
  name: string
}

const cadastroSchema = z.object({
  nome: z
    .string()
    .min(3, 'Nome deve ter pelo menos 3 caracteres')
    .max(255, 'Nome muito longo'),
  especie: z.string().min(3, 'Espécie deve ter pelo menos 3 caracteres'),
  raca: z.string().min(3, 'Raça deve ter pelo menos 3 caracteres'),
  dataNascimento: z
    .string()
    .regex(
      /^\d{4}-\d{2}-\d{2}$/,
      'Data de nascimento deve estar no formato YYYY-MM-DD',
    ),
  tutorId: z.string().nonempty('Selecione um tutor'),
})

export default function PetOwnerCreate() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [tutores, setTutores] = useState<Tutor[]>([])
  const { toast } = useToast()

  useEffect(() => {
    // Fetch tutores from API
    // fetch('/api/tutores')
    //   .then((response) => response.json())
    //   .then((data) => setTutores(data))

    setTutores([
      { id: 1, name: 'Tutor 1' },
      { id: 2, name: 'Tutor 2' },
      { id: 3, name: 'Tutor 3' },
    ])
  }, [])

  const form = useForm<z.infer<typeof cadastroSchema>>({
    resolver: zodResolver(cadastroSchema),
    defaultValues: {
      nome: '',
      especie: '',
      raca: '',
      dataNascimento: '',
      tutorId: '',
    },
  })

  const onSubmit = (values: z.infer<typeof cadastroSchema>) => {
    setIsSubmitting(true)
    // Simula um envio de formulário
    setTimeout(() => {
      setIsSubmitting(false)
      console.log(values)
      toast({
        title: 'Cadastro realizado com sucesso!',
        description: 'Seus dados foram enviados.',
      })
      form.reset()
    }, 2000)
  }

  return (
    <>
      <Header category="Animais" link="/animal" page="Cadastrar Novo Animal" />
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min">
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
                      <FormLabel htmlFor="especie">Espécie</FormLabel>
                      <FormControl>
                        <Input id="especie" {...field} placeholder="Espécie" />
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
                            {tutores.map((tutor) => (
                              <SelectItem
                                key={tutor.id}
                                value={tutor.id.toString()}
                              >
                                {tutor.name}
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
