type User = {
  class: "user"
  user_id: string
  etp_guid: string
  username: string
  email: string
  first_name: string
  last_name: string
  premium: "" | "anime|drama|manga"
  is_publisher: boolean
  access_type: null | "premium"
  created: string
}

export type CreateSessionResponse = {
  data: {
    session_id: string
    country_code: string
    ip: string
    device_type: string
    device_id: string
    user: User | null
    auth: string | null
    expires: string
    version: string
    ops: unknown[]
    connectivity_type: "unknown"
    debug: any
  }
}

export type CreateSessionError = {
  error: true
  code: "bad_auth_params" | string
  message: string
}

type Responses = CreateSessionResponse | CreateSessionError

export const isError = (obj: Responses): obj is CreateSessionError =>
  (obj as any).error === true
