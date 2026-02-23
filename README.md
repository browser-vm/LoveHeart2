<h1 align="center">LoveHeart2</h1>

<p align="center"><em>LoveHeart like you know it, but more powerful than ever.</em></p>

<p align="center"><img src="public/sj.png" height="60"><br><small>Powered by Scramjet</small></p>

---

LoveHeart2 is an advanced web proxy interface built on top of [Scramjet](https://github.com/MercuryWorkshop/scramjet), the most advanced web proxy. It features a sleek hacker terminal aesthetic while maintaining all the power and capabilities of the underlying Scramjet engine.

[Scramjet](https://github.com/MercuryWorkshop/scramjet) is an experimental interception based web proxy designed with security, developer friendliness, and performance in mind. This project is made to evade internet censorship and bypass arbitrary web browser restrictions.

## Features

- 🖥️ **Terminal-style interface** - Classic green-on-black hacker aesthetic
- ⚡ **Powered by Scramjet** - All the power of the most advanced web proxy
- 🎨 **Scanlines & glow effects** - Authentic CRT monitor feel
- 📱 **Responsive design** - Works on desktop and mobile

## Supported Sites

LoveHeart2 (via Scramjet) has CAPTCHA support! Some of the popular websites that are supported include:

- [Google](https://google.com)
- [Twitter](https://twitter.com)
- [Instagram](https://instagram.com)
- [Youtube](https://youtube.com)
- [Spotify](https://spotify.com)
- [Discord](https://discord.com)
- [Reddit](https://reddit.com)
- [GeForce NOW](https://play.geforcenow.com/)

Ensure you are not hosting on a datacenter IP for CAPTCHAs to work reliably along with YouTube. Heavy amounts of traffic will make some sites NOT work on a single IP. Consider rotating IPs or routing through Wireguard using a project like <a href="https://github.com/whyvl/wireproxy">wireproxy</a>.

## Setup / Usage

You will need Node.js 16.x (and above) and Git installed; below is an example for a Github Codespace.

```

nvm install 20
nvm use 20
corepack enable pnpm

git clone https://github.com/MercuryWorkshop/Scramjet-App
cd Scramjet-App
```

Install dependencies

```
pnpm install
```

Run the server

```
pnpm start
```

Resources for self-hosting:

- https://github.com/nvm-sh/nvm
- https://docs.titaniumnetwork.org/guides/nginx/
- https://docs.titaniumnetwork.org/guides/vps-hosting/
- https://docs.titaniumnetwork.org/guides/dns-setup/

### HTTP Transport

The example uses [libcurl-transport](https://github.com/MercuryWorkshop/libcurl-transport) to fetch proxied data encrypted.

You may also want to use [epoxy-transport](https://github.com/MercuryWorkshop/epoxy-transport), a different way of fetching encrypted data.

This example also now uses [wisp-js/server](https://www.npmjs.com/package/@mercuryworkshop/wisp-js) instead of the now outdated wisp-server-node. Please note that this can also be replaced with other wisp implementations like [wisp-server-python](https://github.com/MercuryWorkshop/wisp-server-python) which is highly recommended for production.

See the [bare-mux](https://github.com/MercuryWorkshop/bare-mux) documentation for more information.

---

<p align="center">
  <small>LoveHeart2 is powered by <a href="https://github.com/MercuryWorkshop/scramjet">Scramjet</a></small>
</p>
