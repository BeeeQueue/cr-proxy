import { URLSearchParams } from "url"
import { NowRequest, NowResponse } from "@now/node"

import { createSession } from "../src/crunchyroll"

export default async (req: NowRequest, res: NowResponse) => {
  const query = new URLSearchParams(req.query)
  const result = await createSession(query)

  res.json(result)
}
