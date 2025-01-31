"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { createClient } from "@/utils/supabase/client"

const profileFormSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: "Le nom d'utilisateur doit contenir au moins 2 caractères.",
    })
    .max(30, {
      message: "Le nom d'utilisateur ne doit pas dépasser 30 caractères.",
    }),
  email: z
    .string()
    .min(1, { message: "L'email est requis." })
    .email("Adresse email invalide."),
  company: z.string().optional(),
  phone: z.string().optional(),
})

type ProfileFormValues = z.infer<typeof profileFormSchema>

interface ProfileFormProps {
  user: any
}

export function ProfileForm({ user }: ProfileFormProps) {
  const supabase = createClient()
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      username: user?.user_metadata?.username || "",
      email: user?.email || "",
      company: user?.user_metadata?.company || "",
      phone: user?.user_metadata?.phone || "",
    },
  })

  async function onSubmit(data: ProfileFormValues) {
    try {
      const { error } = await supabase.auth.updateUser({
        email: data.email,
        data: {
          username: data.username,
          company: data.company,
          phone: data.phone,
        },
      })

      if (error) throw error

      toast.success("Profil mis à jour avec succès")
    } catch (error) {
      toast.error("Erreur lors de la mise à jour du profil")
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom d'utilisateur</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
              <FormDescription>
                C'est votre nom public. Il peut être modifié à tout moment.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="john@exemple.fr" type="email" {...field} />
              </FormControl>
              <FormDescription>
                Votre adresse email principale pour les notifications.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="company"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Entreprise</FormLabel>
              <FormControl>
                <Input placeholder="Votre entreprise" {...field} />
              </FormControl>
              <FormDescription>
                Optionnel - Le nom de votre entreprise pour la facturation.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Téléphone</FormLabel>
              <FormControl>
                <Input placeholder="+33 6 12 34 56 78" {...field} />
              </FormControl>
              <FormDescription>
                Optionnel - Pour vous contacter en cas d'urgence.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Mettre à jour le profil</Button>
      </form>
    </Form>
  )
}
