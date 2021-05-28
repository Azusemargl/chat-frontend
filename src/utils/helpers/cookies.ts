export const get_cookie = (name: string) => {
   return document.cookie.split('; ').some(cookie => {
      return cookie.trim().startsWith(name + '=')
   })
}

export const delete_cookie = (name: string) => {
   if (get_cookie(name)) document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:01 GMT`
}

const cookieToken = document.cookie.split('; ').filter(cookie => cookie.split('=')[0] === 'token')
export const token = cookieToken[0]?.split('=')[1]
