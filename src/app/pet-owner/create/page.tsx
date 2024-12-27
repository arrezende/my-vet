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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { useEffect, useState } from 'react'

type Tutor = {
  nome: string
  cpf: string
  endereco: string
  telefone: string
  email: string
}

const cadastroSchema = z.object({
  nome: z
    .string()
    .min(3, 'Nome deve ter pelo menos 3 caracteres')
    .max(255, 'Nome muito longo'),
  cpf: z
    .string()
    .regex(
      /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/,
      'CPF deve estar no formato 000.000.000-00',
    ),
  endereco: z.string(),
  telefone: z
    .string()
    .regex(
      /^\(\d{2}\) \d{5}\-\d{4}$/,
      'Telefone deve estar no formato (00) 00000-0000',
    ),
  email: z.string().email('Email inválido'),
})
export default function PetOwnerCreate() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [tutores, setTutores] = useState<Tutor[]>([])
  const { toast } = useToast()

  const form = useForm<z.infer<typeof cadastroSchema>>({
    resolver: zodResolver(cadastroSchema),
    defaultValues: {
      nome: '',
      cpf: '',
      endereco: '',
      telefone: '',
      email: '',
    },
  })

  const onSubmit = (values: z.infer<typeof cadastroSchema>) => {
    setIsSubmitting(true)
    async function createPetOwner(values) {
      const res = await fetch('/api/tutores/create', {
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
      console.log('Tutor cadastrado com sucesso:', data)
      toast({
        title: 'Cadastro realizado com sucesso!',
        description: 'Seus dados foram enviados.',
      })
      setIsSubmitting(false)
      form.reset()
      return setTutores(data)
    }
    if (values) {
      const petOwner = createPetOwner(values)
      console.log(petOwner)
    }
  }

  return (
    <>
      <Header
        category="Tutores"
        link="/pet-owner"
        page="Cadastrar Novo Tutor"
      />
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min">
          <div>
            <h3 className="text-lg font-medium">Novo Tutor</h3>
            <p className="text-sm text-muted-foreground mb-4 text-zinc-600">
              Preencha os campos abaixo para cadastrar um novo tutor.
            </p>
          </div>
          <div className="h-px bg-zinc-300 mb-4"></div>

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
                name="cpf"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel htmlFor="cpf">CPF</FormLabel>
                    <FormControl>
                      <Input id="cpf" {...field} placeholder="CPF" />
                    </FormControl>
                    <FormDescription>
                      Use o formato: 000.000.000-00
                    </FormDescription>
                    <FormMessage>{}</FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="endereco"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel htmlFor="endereco">Endereço</FormLabel>
                    <FormControl>
                      <Input id="endereco" {...field} placeholder="endereco" />
                    </FormControl>
                    <FormMessage>{}</FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="telefone"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel htmlFor="telefone">Telefone</FormLabel>
                    <FormControl>
                      <Input id="telefone" {...field} placeholder="telefone" />
                    </FormControl>
                    <FormDescription>
                      Use o formato: (00) 00000-0000
                    </FormDescription>
                    <FormMessage>{}</FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <FormControl>
                      <Input
                        id="email"
                        {...field}
                        placeholder="email"
                        type="email"
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
        </div>
      </div>
    </>
  )
}
