export type Users = {
   auth?: boolean
   _id:   string
   token: string
   name:  string
   email: string
   last_seen: Date | number
   avatar: string | null
   confirmed: boolean
   registrationError?: string | null,
   loginError?: string | null
}