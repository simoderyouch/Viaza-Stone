import { redirect } from 'next/navigation'

export default async function QuotePage({
  searchParams,
}: {
  searchParams: Promise<{ material?: string }>
}) {
  const { material } = await searchParams
  const params = new URLSearchParams({ enquiry: 'Project quote' })
  if (material) params.set('material', material)

  redirect(`/contact?${params.toString()}`)
}
