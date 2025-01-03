export async function CepConsult(cep: string) {
  const result = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
  const data = await result.json()
  return data
}
