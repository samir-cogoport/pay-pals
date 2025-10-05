export type JwtPayload = {
  exp?: number
  [key: string]: unknown
}


export const decodeJwtPayload = (token: string): JwtPayload | null => {
  const segments = token.split('.')

  if (segments.length !== 3) {
	return null
  }

  const payloadSegment = segments[1]
  // Normalise from base64url to base64 before decoding
  const normalized = payloadSegment.replace(/-/g, '+').replace(/_/g, '/')
  const remainder = normalized.length % 4
  const base64 = normalized + '='.repeat(remainder ? 4 - remainder : 0)

  try {
	const decoded = atob(base64)
	return JSON.parse(decoded) as JwtPayload
  } catch (error) {
	return null
  }
}