import { NowRequest, NowResponse } from "@now/node"

import { createSession } from "../src/crunchyroll"

export default async (req: NowRequest, res: NowResponse) => {
  const { refreshToken } = req.query
  const result = await createSession(
    Array.isArray(refreshToken) ? refreshToken[1] : refreshToken
  )

  res.json({
    token: result.data.auth,
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
  })
}
