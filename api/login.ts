import { NowRequest, NowResponse } from "@now/node"

import { createSession } from "../src/crunchyroll"
import { badRequest } from "@hapi/boom"

type OK = {
  sessionId: string
  token: string
  country: string
  expiresAt: string
  expiresInMs: number
  user: null | {
    id: string
    username: string
    email: string
    isPremium: boolean
  }
}

type Bad = {
  statusCode: number
  error: string
  message: string
}

export default async (req: NowRequest, res: NowResponse) => {
  const { refreshToken } = req.query

  if (refreshToken == null) {
    const error = badRequest("Missing `refreshToken` query parameter.").output
      .payload

    return res.status(error.statusCode).json(error)
  }

  const result = await createSession(
    Array.isArray(refreshToken) ? refreshToken[1] : refreshToken
  )

  if (result.data.auth == null) {
    const response: Bad = badRequest("Invalid or expired refresh token.").output
      .payload

    return res.status(response.statusCode).json(response)
  }

  const response: OK = {
    sessionId: result.data.session_id,
    token: result.data.auth,
    country: result.data.country_code,
    expiresAt: result.data.expires,
    expiresInMs: new Date(result.data.expires).getTime() - Date.now(),
    user:
      result.data.user == null
        ? null
        : {
            id: result.data.user.user_id,
            username: result.data.user.username,
            email: result.data.user.email,
            isPremium: result.data.user.access_type === "premium",
          },
  }

  res.json(response)
}
