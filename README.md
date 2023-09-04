# Nldraw (WIP)

## Description

This project is a quick note-taking and sketching tool built on top of the
[tldraw](https://tldraw.com) library. It provides a simple interface for users
to jot down notes and create sketches on-the-go. With a focus on offline usage,
this tool allows users to store and access their data locally, eliminating the
need for constant communication with a remote server. Whether you're in a remote
area with limited internet connectivity or simply prefer to keep your data
local, this project offers the flexibility to work offline using the local
filesystem.

Please note that this project is intended for personal use and experimentation.
It is not actively maintained, and none of the features mentioned in the roadmap
are currently scheduled for development.

## Features

> WIP

- [x] Use [tldraw](https://tldraw.com) snapshot with native filesystem instead
      of localStorage.

### Screenshots

> WIP

![Explore](screenshots/Screenshot_20230903-180256.png)
![Actions](screenshots/Screenshot_20230903-180305.png)
![Draw](screenshots/Screenshot_20230903-185138.png)

## Installation

> WIP

### From artifact

#### Locally with [act](https://github.com/nektos/act)

```sh
git clone https://github.com/tulx17/nldraw.git && cd nldraw
```

```sh
mkdir artifact
```

```sh
act workflow_dispatch --artifact-server-path artifact -W .github/workflows/ci.yml
```

> APK(s) should be in the created artifact directory

### Build it your self

Check [Capacitor](capacitorjs.com) for more details.

## Roadmap

> WIP

- [x] Create/Load/Save/Remove draws in default location.
  - [ ] Rename draws.
- [ ] App configuration.
  - [ ] Custom default location.
  - [x] Adaptive color scheme (light,dark).
- [ ] Remove web specific features.
- [ ] Replace attachments embedding with reference links.
  - [ ] Use custom component to render linked attachments (image,voice,...).
- [ ] Apply template from existing draws.
- [ ] Support tags and filter based on tags.
- [ ] Update notification.
- [ ] IOS support (no promised).

## Core Libraries

**Client:** React, Ant Design Mobile, Tldraw.

**Native:** Capacitor.

## Contributing

This project is not actively seeking contributions at the moment. However, if
you have any bug reports or suggestions, feel free to open an issue in the
repository.

## License

### Third-Party Libraries

- [tldraw](https://tldraw.com) is used as the underlying library for the
  sketching functionality. Please refer to the
  [tldraw repository](https://github.com/tldraw/tldraw) for more information
  about its license and usage.

## FAQ
