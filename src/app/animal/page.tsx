'use client'

import { Header } from '@/components/header'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

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

const cadastroSchema = z.object({
  nome: z
    .string()
    .min(3, 'Nome deve ter pelo menos 3 caracteres')
    .max(255, 'Nome muito longo'),
  cpf: z
    .string()
    .length(11, 'CPF deve ter 11 dígitos')
    .regex(/^\d+$/, 'CPF deve conter apenas números'),
  endereco: z.string(),

  telefone: z.string().regex(/^\d+$/, 'Telefone deve conter apenas números'),
  email: z.string().email('Email inválido'),
})
export default function Animal() {
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
    alert('Formulário enviado com sucesso')
    console.log({ values })
  }

  return (
    <>
      <Header category="Animais" link="/animal" page="Animal" />
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="nome"
                render={({ field }) => (
                  <FormItem>
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
                  <FormItem>
                    <FormLabel htmlFor="cpf">CPF</FormLabel>
                    <FormControl>
                      <Input id="cpf" {...field} placeholder="CPF" />
                    </FormControl>
                    <FormMessage>{}</FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="endereco"
                render={({ field }) => (
                  <FormItem>
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
                  <FormItem>
                    <FormLabel htmlFor="telefone">Telefone</FormLabel>
                    <FormControl>
                      <Input id="telefone" {...field} placeholder="telefone" />
                    </FormControl>
                    <FormMessage>{}</FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
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
              {/* <div>
                <Label htmlFor="nome">Nome</Label>
                <Input id="nome" {...register('nome')} />

                {errors.nome && <p>{errors.nome.message}</p>}
              </div>
              <div>
                <Label htmlFor="cpf">CPF</Label>
                <Input id="cpf" {...register('cpf')} />

                {errors.cpf && <p>{errors.cpf.message}</p>}
              </div>

              <div>
                <Label htmlFor="endereco">Endereço</Label>
                <Input id="endereco" {...register('endereco')} />

                {errors.endereco && <p>{errors.endereco.message}</p>}
              </div>
              <div>
                <Label htmlFor="telefone">Telefone</Label>
                <Input id="telefone" {...register('telefone')} />

                {errors.endereco && <p>{errors.endereco.message}</p>}
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" {...register('email')} />

                {errors.email && <p>{errors.email.message}</p>}
              </div> */}
              <Button type="submit" className="mt-4">
                Submit
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </>
  )
}
