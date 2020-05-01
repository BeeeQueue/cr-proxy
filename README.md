# cr-proxy

A proxy for creating Crunchyroll sessions a la [CR-Unblocker](https://github.com/onestay/cr-unblocker-server).

If you don't feel safe sending your login credentials through some unknown entity you can deploy it yourself on Vercel:

[![Deploy to Vercel](https://vercel.com/button)](https://vercel.com/import/project?template=https://github.com/BeeeQueue/cr-proxy)

## API

### `GET /api/login?refreshToken={TOKEN}`

[See response types here](https://github.com/BeeeQueue/cr-proxy/blob/master/api/login.ts#L6-L22)

### `GET /api/passthrough`

Functions exactly like `https://api.crunchyroll.com/start_session.0.json`.

If you want to use this service like a drop-in replacement for the `start_session` action.

Passes any query parameters to the real endpoint, returns the response.