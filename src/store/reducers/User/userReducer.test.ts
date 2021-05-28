import userReducer, { actions, InitialState } from "."

const state: InitialState = {
   auth:  false,
   id:    null as number | null,
   name:  null as string | null,
   email: null as string | null,
   avatar: null as string | null,
   last_seen: null as string | null,
   confirmed: false,
   registrationError: null as string | null,
   loginError: null as string | null
}

test('add registration data', () => {
   const newState = userReducer(state, actions.setUser({
      auth: true,
      id: 1,
      name: 'Semargl',
      email: 'semarglg@mail.com',
      avatar: null,
      last_seen: null,
      confirmed: false,
      registrationError: null,
      loginError: null
   }))
   expect(newState.id).toBe(1)
   expect(newState.name).toBe('Semargl')
   expect(newState.email).toBe('semarglg@mail.com')
})