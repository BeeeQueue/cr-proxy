import { URLSearchParams } from "url"
import fetch from "node-fetch"

import { CreateSessionError, CreateSessionResponse, isError } from "./types"

type Options = URLSearchParams | string

export const createSession = async (options: Options) => {
  const query =
    typeof options === "string"
      ? new URLSearchParams({
          access_token: "LNDJgOit5yaRIWN",
          device_type: "com.crunchyroll.windows.desktop",
          device_id: "device_id",
          version: "1.1",
          auth: options,
        })
      : options

  const response = await fetch(
    `https://api.crunchyroll.com/start_session.0.json?${query.toString()}`,
    { method: "POST" }
  )

  const body = (await response.json()) as
    | CreateSessionResponse
    | CreateSessionError

  if (isError(body)) {
    throw new Error(body.message)
  }

  return body
}
