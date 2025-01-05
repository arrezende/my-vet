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
import { useState } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { CepConsult } from '../components/cep-consult'
import { Search } from 'lucide-react'

type Tutor = {
  nomeCompleto: string
  cpf: string
  rg: string
  nacionalidade: string
  sexo: string
  endereco: string
  numero: string
  complemento: string
  pontoReferencia: string
  cidadeEstado: string
  cep: string
  bairro: string
  comoNosConheceu: string
  pessoaFisicaJuridica: string
  profissao: string
  celular: string
  email: string
  telefoneResidencial: string
  aniversario: string
  aceitaEmailWhatsapp: boolean
}

const cadastroSchema = z.object({
  nomeCompleto: z
    .string()
    .min(3, 'Nome deve ter pelo menos 3 caracteres')
    .max(255, 'Nome muito longo'),
  cpf: z
    .string()
    .regex(
      /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/,
      'CPF deve estar no formato 000.000.000-00',
    ),
  rg: z.string(),
  nacionalidade: z.string(),
  sexo: z.string(),
  endereco: z.string(),
  numero: z.string(),
  complemento: z.string(),
  pontoReferencia: z.string(),
  cidadeEstado: z.string(),
  cep: z.string(),
  bairro: z.string(),
  comoNosConheceu: z.string(),
  pessoaFisicaJuridica: z.string(),
  profissao: z.string(),
  celular: z
    .string()
    .regex(
      /^\(\d{2}\) \d{5}\-\d{4}$/,
      'Celular deve estar no formato (00) 00000-0000',
    ),
  email: z.string().email('Email inválido'),
  telefoneResidencial: z.string().optional(),
  aniversario: z.string(),
  aceitaEmailWhatsapp: z.boolean(),
})

const nacionalidades = [
  { id: 1, nome: 'Brasileiro' },
  { id: 2, nome: 'Estrangeiro' },
]

const sexos = [
  { id: 1, nome: 'Masculino' },
  { id: 2, nome: 'Feminino' },
  { id: 3, nome: 'Outro' },
]

export default function PetOwnerCreate() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { toast } = useToast()

  const form = useForm<z.infer<typeof cadastroSchema>>({
    resolver: zodResolver(cadastroSchema),
    defaultValues: {
      nomeCompleto: '',
      cpf: '',
      rg: '',
      nacionalidade: '',
      sexo: '',
      endereco: '',
      numero: '',
      complemento: '',
      pontoReferencia: '',
      cidadeEstado: '',
      cep: '',
      bairro: '',
      comoNosConheceu: '',
      pessoaFisicaJuridica: '',
      profissao: '',
      celular: '',
      email: '',
      telefoneResidencial: '',
      aniversario: '',
      aceitaEmailWhatsapp: false,
    },
  })

  const onSubmit = (values: z.infer<typeof cadastroSchema>) => {
    setIsSubmitting(true)
    async function createPetOwner(values: Tutor) {
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
    }
    if (values) {
      const petOwner = createPetOwner(values)
      console.log(petOwner)
    }
  }

  const cepConsult = async function (cep: string) {
    const data = await CepConsult(cep)

    const { bairro, estado, logradouro } = data
    form.setValue('bairro', bairro)
    form.setValue('cidadeEstado', estado)
    form.setValue('endereco', logradouro)
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

          <div>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="grid grid-cols-2 gap-12">
                  <div className="">
                    <FormField
                      control={form.control}
                      name="nomeCompleto"
                      render={({ field }) => (
                        <FormItem className="mb-4 ">
                          <FormLabel htmlFor="nomeCompleto">
                            Nome Completo
                          </FormLabel>
                          <FormControl>
                            <Input
                              id="nomeCompleto"
                              {...field}
                              placeholder="Nome Completo"
                            />
                          </FormControl>
                          <FormMessage>{}</FormMessage>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="sexo"
                      render={({ field }) => (
                        <FormItem className="mb-4 ">
                          <FormLabel htmlFor="sexo">Sexo</FormLabel>
                          <FormControl>
                            <Select onValueChange={field.onChange} {...field}>
                              <SelectTrigger className="">
                                <SelectValue placeholder="Selecione um sexo" />
                              </SelectTrigger>
                              <SelectContent>
                                {sexos.map((sexo) => (
                                  <SelectItem
                                    key={sexo.id}
                                    value={sexo.id.toString()}
                                  >
                                    {sexo.nome}
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
                      name="nacionalidade"
                      render={({ field }) => (
                        <FormItem className="mb-4 ">
                          <FormLabel htmlFor="nacionalidade">
                            Nacionalidade
                          </FormLabel>
                          <FormControl>
                            <Select onValueChange={field.onChange} {...field}>
                              <SelectTrigger className="">
                                <SelectValue placeholder="Selecione uma nacionalidade" />
                              </SelectTrigger>
                              <SelectContent>
                                {nacionalidades.map((nacionalidade) => (
                                  <SelectItem
                                    key={nacionalidade.id}
                                    value={nacionalidade.id.toString()}
                                  >
                                    {nacionalidade.nome}
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
                      name="cpf"
                      render={({ field }) => (
                        <FormItem className="mb-4 ">
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
                      name="rg"
                      render={({ field }) => (
                        <FormItem className="mb-4 ">
                          <FormLabel htmlFor="rg">RG</FormLabel>
                          <FormControl>
                            <Input id="rg" {...field} placeholder="RG" />
                          </FormControl>
                          <FormMessage>{}</FormMessage>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="cep"
                      render={({ field }) => (
                        <FormItem className="mb-4">
                          <FormLabel htmlFor="cep">CEP</FormLabel>
                          <FormControl>
                            <div className="flex gap-2">
                              <Input id="cep" {...field} placeholder="CEP" />
                              <Button
                                type="button"
                                onClick={() => cepConsult(field.value)}
                              >
                                <Search className="h-4 w-4" />
                              </Button>
                            </div>
                          </FormControl>
                          <FormMessage>{}</FormMessage>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="endereco"
                      render={({ field }) => (
                        <FormItem className="mb-4 ">
                          <FormLabel htmlFor="endereco">Endereço</FormLabel>
                          <FormControl>
                            <Input
                              id="endereco"
                              {...field}
                              placeholder="Endereço"
                            />
                          </FormControl>
                          <FormMessage>{}</FormMessage>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="numero"
                      render={({ field }) => (
                        <FormItem className="mb-4">
                          <FormLabel htmlFor="numero">Número</FormLabel>
                          <FormControl>
                            <Input
                              id="numero"
                              {...field}
                              placeholder="Número"
                            />
                          </FormControl>
                          <FormMessage>{}</FormMessage>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="complemento"
                      render={({ field }) => (
                        <FormItem className="mb-4">
                          <FormLabel htmlFor="complemento">
                            Complemento
                          </FormLabel>
                          <FormControl>
                            <Input
                              id="complemento"
                              {...field}
                              placeholder="Complemento"
                            />
                          </FormControl>
                          <FormMessage>{}</FormMessage>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="pontoReferencia"
                      render={({ field }) => (
                        <FormItem className="mb-4">
                          <FormLabel htmlFor="pontoReferencia">
                            Ponto de Referência
                          </FormLabel>
                          <FormControl>
                            <Input
                              id="pontoReferencia"
                              {...field}
                              placeholder="Ponto de Referência"
                            />
                          </FormControl>
                          <FormMessage>{}</FormMessage>
                        </FormItem>
                      )}
                    />
                  </div>
                  <div>
                    <FormField
                      control={form.control}
                      name="cidadeEstado"
                      render={({ field }) => (
                        <FormItem className="mb-4">
                          <FormLabel htmlFor="cidadeEstado">
                            Cidade/Estado
                          </FormLabel>
                          <FormControl>
                            <Input
                              id="cidadeEstado"
                              {...field}
                              placeholder="Cidade/Estado"
                            />
                          </FormControl>
                          <FormMessage>{}</FormMessage>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="bairro"
                      render={({ field }) => (
                        <FormItem className="mb-4">
                          <FormLabel htmlFor="bairro">Bairro</FormLabel>
                          <FormControl>
                            <Input
                              id="bairro"
                              {...field}
                              placeholder="Bairro"
                            />
                          </FormControl>
                          <FormMessage>{}</FormMessage>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="comoNosConheceu"
                      render={({ field }) => (
                        <FormItem className="mb-4">
                          <FormLabel htmlFor="comoNosConheceu">
                            Como nos conheceu
                          </FormLabel>
                          <FormControl>
                            <Input
                              id="comoNosConheceu"
                              {...field}
                              placeholder="Como nos conheceu"
                            />
                          </FormControl>
                          <FormMessage>{}</FormMessage>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="pessoaFisicaJuridica"
                      render={({ field }) => (
                        <FormItem className="mb-4">
                          <FormLabel htmlFor="pessoaFisicaJuridica">
                            Pessoa Física/Jurídica
                          </FormLabel>
                          <FormControl>
                            <Input
                              id="pessoaFisicaJuridica"
                              {...field}
                              placeholder="Pessoa Física/Jurídica"
                            />
                          </FormControl>
                          <FormMessage>{}</FormMessage>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="profissao"
                      render={({ field }) => (
                        <FormItem className="mb-4">
                          <FormLabel htmlFor="profissao">Profissão</FormLabel>
                          <FormControl>
                            <Input
                              id="profissao"
                              {...field}
                              placeholder="Profissão"
                            />
                          </FormControl>
                          <FormMessage>{}</FormMessage>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="celular"
                      render={({ field }) => (
                        <FormItem className="mb-4">
                          <FormLabel htmlFor="celular">
                            Celular (é WhatsApp)
                          </FormLabel>
                          <FormControl>
                            <Input
                              id="celular"
                              {...field}
                              placeholder="Celular"
                            />
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
                              placeholder="Email"
                              type="email"
                            />
                          </FormControl>
                          <FormMessage>{}</FormMessage>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="telefoneResidencial"
                      render={({ field }) => (
                        <FormItem className="mb-4">
                          <FormLabel htmlFor="telefoneResidencial">
                            Telefone Residencial
                          </FormLabel>
                          <FormControl>
                            <Input
                              id="telefoneResidencial"
                              {...field}
                              placeholder="Telefone Residencial"
                            />
                          </FormControl>
                          <FormMessage>{}</FormMessage>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="aniversario"
                      render={({ field }) => (
                        <FormItem className="mb-4">
                          <FormLabel htmlFor="aniversario">
                            Aniversário
                          </FormLabel>
                          <FormControl>
                            <Input
                              id="aniversario"
                              {...field}
                              placeholder="Aniversário"
                            />
                          </FormControl>
                          <FormMessage>{}</FormMessage>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="aceitaEmailWhatsapp"
                      render={({ field }) => (
                        <FormItem className="flex items-center justify-start mb-4">
                          {/* <FormControl> */}
                          <Input
                            id="aceitaEmailWhatsapp"
                            type="checkbox"
                            checked={field.value}
                            onChange={(e) => field.onChange(e.target.checked)}
                            className="h-6 w-8"
                          />
                          {/* </FormControl> */}
                          <FormLabel htmlFor="aceitaEmailWhatsapp">
                            Aceita Receber mensagens via WhatsApp
                          </FormLabel>

                          <FormMessage>{}</FormMessage>
                        </FormItem>
                      )}
                    />

                    <Button type="submit" disabled={isSubmitting}>
                      {isSubmitting ? 'Enviando...' : 'Enviar Cadastro'}
                    </Button>
                  </div>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </>
  )
}
