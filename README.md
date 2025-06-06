<h1 align='center'>
  My Personal Website (<a href='https://www.chrisvogt.me' title='My Website'>www.chrisvogt.me</a>)
</h1>

<p align='center'>
  <a href='https://app.netlify.com/sites/chrisvogt/deploys'>
    <img src='https://api.netlify.com/api/v1/badges/29f330b8-22bf-4f7f-a0f0-240476512db0/deploy-status' alt='Netlify Status'>
  </a>
  <a href='https://github.com/chrisvogt/gatsby-theme-chrisvogt/actions/workflows/ci.yml'>
    <img src='https://github.com/chrisvogt/gatsby-theme-chrisvogt/actions/workflows/ci.yml/badge.svg?branch=main' alt='Continuous Integration badge' />
  </a>
  <a href='https://github.com/chrisvogt/gatsby-theme-chrisvogt/actions/workflows/codeql.yml'>
    <img src='https://github.com/chrisvogt/gatsby-theme-chrisvogt/actions/workflows/codeql.yml/badge.svg?branch=main' alt='CodeQL badge' />
  </a>
  <a href='https://codecov.io/gh/chrisvogt/gatsby-theme-chrisvogt'>
    <img src='https://codecov.io/gh/chrisvogt/gatsby-theme-chrisvogt/branch/main/graph/badge.svg?token=YUksu2c99s' alt='Code coverage report badge.' />
  </a>
  <a href='https://github.com/chrisvogt/gatsby-theme-chrisvogt/blob/main/LICENSE'>
    <img src='https://img.shields.io/badge/license-MIT-blue.svg' alt='Released under the MIT license.' />
  </a>
  <a href='https://twitter.com/intent/follow?screen_name=c1v0'>
    <img src='https://img.shields.io/twitter/follow/c1v0.svg?label=Follow%20@c1v0' alt='Follow @c1v0' />
  </a>
</p>

This repository contains the source code behind my personal website and blog, [www.chrisvogt.me](https://www.chrisvogt.me). The front-end code lives within [the theme directory](https://github.com/chrisvogt/gatsby-theme-chrisvogt/tree/main/theme) and the blog articles live within [the website directory](https://github.com/chrisvogt/gatsby-theme-chrisvogt/tree/main/www.chrisvogt.me).

## Local development

This repository uses [Yarn workspaces](https://yarnpkg.com/lang/en/docs/workspaces/) to separate the theme code from the content.

To install, use Yarn. From the root, do:

```sh
yarn
```

To work on the theme, open the `/theme` directory in an editor and run the following command to preview the website using `localhost`.

```sh
yarn workspace www.chrisvogt.me develop
```

I use HTTPS and SSL in my local development environment. A command is available for that, but you'll need to add SSL certificates to `/www.chrisvogt.me/certs`. I use [mkcert](https://github.com/FiloSottile/mkcert) to generate self-signed certificates.

After adding `www.dev-chrisvogt.me-key.pem` and `www.dev-chrisvogt.me.pem` to your certs directory, use the following command to develop on [https://www.dev-chrisvogt.me:8000](https://www.dev-chrisvogt.me:8000).

```sh
yarn workspace www.chrisvogt.me develop:https

# Or the shorcut
yarn develop
```

The unit tests are in the gatsby-theme-chrisvogt workspace. To run unit tests in watch mode or update snapshot tests, use the test:watch command.

```sh
yarn workspace gatsby-theme-chrisvogt test:watch

# Or the shortcut
yarn test:watch
```

To run the unit tests once, just use test.

```sh
yarn workspace gatsby-theme-chrisvogt test

# Or the shortcut
yarn test
```

To build the production website, run the following.

```sh
yarn workspace www.chrisvogt.me build
```

The website build will be output to `/www.chrisvogt.me/public`.

### How to test the production build

The production build can be run on your local machine over HTTPS if you generate self-signed certificates, which I did using [mkcert](https://github.com/FiloSottile/mkcert). You can use a tool like [http-server](https://www.npmjs.com/package/http-server) to serve the build.

```
http-server -o -S -C ../certs/www.chrisvogt.me.pem -K ../certs/www.chrisvogt.me-key.pem -a www.chrisvogt.me -p 443
```

## Copyright & License

Copyright © 2019-2025 [Chris Vogt](https://www.chrisvogt.me) and released under the [MIT license](LICENSE).
