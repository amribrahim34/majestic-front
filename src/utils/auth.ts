export function isAuthenticated(): boolean {
  const authToken = localStorage.getItem('auth_token')
  if (!authToken) return false

  // Check if the token is in JWT format (contains two dots)
  if (authToken.split('.').length !== 3) {
    console.warn('Auth token is not in valid JWT format')
    return false
  }

  try {
    const base64Url = authToken.split('.')[1]
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
        })
        .join('')
    )

    const tokenData = JSON.parse(jsonPayload)
    const expirationTime = tokenData.exp * 1000 // Convert to milliseconds
    return Date.now() < expirationTime
  } catch (error) {
    console.error('Error parsing auth token:', error)
    return false
  }
}
