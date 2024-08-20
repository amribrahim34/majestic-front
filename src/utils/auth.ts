export function isAuthenticated(): boolean {
  const authToken = localStorage.getItem('auth_token')
  // if (!authToken) return false
  return !!authToken

  // try {
  //   // Check if the token is in the expected format
  //   const parts = authToken.split('.')
  //   if (parts.length !== 3) {
  //     console.warn('Auth token is not in valid JWT format')
  //     return false
  //   }

  //   const base64Url = parts[1]
  //   const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
  //   const jsonPayload = decodeURIComponent(
  //     atob(base64)
  //       .split('')
  //       .map(function (c) {
  //         return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
  //       })
  //       .join('')
  //   )

  //   const tokenData = JSON.parse(jsonPayload)

  //   // Check if 'exp' exists in the token data
  //   if (!tokenData.exp) {
  //     console.warn('Token does not contain expiration information')
  //     return false
  //   }

  //   const expirationTime = tokenData.exp * 1000 // Convert to milliseconds
  //   return Date.now() < expirationTime
  // } catch (error) {
  //   console.error('Error parsing auth token:', error)
  //   return false
  // }
}
