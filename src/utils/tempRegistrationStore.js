/**
 * Temporary in-memory storage for unverified registrations
 * In production, use Redis or a temporary database table
 */
const unverifiedRegistrations = new Map()

export const tempRegistrationStore = {
  /**
   * Store registration data temporarily (before email verification)
   */
  store: (email, data) => {
    // Auto-expire after 10 minutes
    const expiryTimer = setTimeout(() => {
      unverifiedRegistrations.delete(email)
    }, 10 * 60 * 1000)

    unverifiedRegistrations.set(email, {
      ...data,
      expiryTimer,
      createdAt: new Date(),
    })
  },

  /**
   * Retrieve registration data
   */
  get: (email) => {
    return unverifiedRegistrations.get(email)
  },

  /**
   * Remove registration data
   */
  remove: (email) => {
    const data = unverifiedRegistrations.get(email)
    if (data?.expiryTimer) {
      clearTimeout(data.expiryTimer)
    }
    unverifiedRegistrations.delete(email)
  },

  /**
   * Check if registration exists
   */
  has: (email) => {
    return unverifiedRegistrations.has(email)
  },
}
