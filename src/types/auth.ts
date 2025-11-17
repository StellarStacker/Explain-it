// Login Request DTO
export interface LoginRequest {
  email: string
  password: string
}

// Register Request DTO
export interface RegisterRequest {
  firstName: string
  lastName: string
  email: string
  password: string
}

// Auth Response DTO
export interface AuthResponse {
  token: string
  user: UserDTO
}

// User DTO
export interface UserDTO {
  id: string
  email: string
  firstName: string
  lastName: string
  profileImage?: string
  provider: string
}
