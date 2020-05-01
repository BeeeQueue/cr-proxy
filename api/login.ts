import { NowRequest, NowResponse } from '@now/node'

export default (req: NowRequest, res: NowResponse) => {
  req.
  res.json({ name: 'John', email: 'john@example.com' })
}
