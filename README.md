# Bible Verses Daily
Chrome extension that displays a new bible verse everyday from Bible Gateway and Our Manna

## Configuration
For this extension the only configuration that may be needed is a proxy, which adds CORS headers in order to make requests to the Bible Gateway API, by default [cors-anywhere](https://github.com/Rob--W/cors-anywhere) is defined in config.json, and for testing purposes temporary access must be requested at https://cors-anywhere.herokuapp.com/

You can also use a self-hosted proxy for long-term use. With this approach your config.json should end up looking like this:
```
{
    "proxyUrl": "https://custom_proxy.com/"
}
```
At last, if no proxy is defined or Bible Gateway is unavailable, a verse from the Our Manna API will be displayed.

