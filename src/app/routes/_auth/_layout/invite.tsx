import { Invite } from '@/pages/auth'
import { createFileRoute } from '@tanstack/react-router'
import z from 'zod'

const inviteSearchSchema = z.object({
  token: z.string().default("link_not_found"),
  email: z.string().optional(),
});

export const Route = createFileRoute('/_auth/_layout/invite')({
  validateSearch: inviteSearchSchema,
  component: RouteComponent,
})

function RouteComponent() {
  const query = Route.useSearch();
  return <Invite {...query} />
}
