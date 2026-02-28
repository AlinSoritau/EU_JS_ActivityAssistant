export function isAuthenticated() {
    const token = localStorage.getItem('token')
    
    if (!token) {
        console.debug("No token found in localStorage, user is not authenticated")
        return false
    }
    
    try {
        // Verify token signature and expiration
        const decoded = atob(token.split('.')[1]) // Decode the payload
        const expiresAt = JSON.parse(decoded).exp * 1000 // Convert to milliseconds
        const currentTime = Date.now()
        if (currentTime > expiresAt) {
            console.debug("Token has expired")
            return false
        }
        return true
    } catch (error) {
        // Token is invalid, expired, or malformed
        console.debug("Token is invalid, expired, or malformed:", error)
        return false
    }
}
