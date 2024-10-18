# Text Transform Extension

<p align="center">
  <img src="doc/preview.gif">
</p>

Chrome Extension for easily changes the regional texture: lower region, UPPER REGISTER, change of capital letters in review on the upper region.

# Development

1. ng build
2. cp manifest.json dist/
3. open chrome and input: chrome://extensions/
4. enable 'Developer mode'
5. click 'Load unpacked extension…' and choose path/to/the/extension/dist
6. click 'Enabled'

# ng build --env=prod

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.20.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## TODO

- [ ] Add words counter
