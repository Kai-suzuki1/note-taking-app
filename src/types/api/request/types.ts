export type SignUpRequestBody = {
  username: string // username
  email: string
  password: string
}

export type LogInRequestBody = Omit<SignUpRequestBody, 'username'>
