import * as jwt from 'jsonwebtoken'

const authenticated = async (context: any) => {
  const token = localStorage.getItem('token')
  if (!token) return context.redirect('/login')
  try {
    const secretKey: string = '1-381-9-0123jpojpomdawpodimawdp!@)(&$)'
    await jwt.verify(token, secretKey)
  } catch (error) {
    localStorage.removeItem('token')
    return context.redirect('/login')
  }
}

export default authenticated
