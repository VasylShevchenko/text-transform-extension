# <center> Text Transform Extension </center>

<p align="center">
  <img src="doc/preview.gif">
</p>

Description: Chrome Extension for easily changes the regional texture: lower region, UPPER REGISTER, change of capital letters in review on the upper region.

# Link to browser extensions

### [Text Transform](https://chromewebstore.google.com/detail/text-transform/lngoloonfgohfhnpcgkfgnfikeedbhgg) <a href="https://chrome.google.com/webstore/detail/autoviewed/occcjmolphcfebdeichmoflmfgeefjef"><img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" width="24" /></a>

### History

On 03.2025: Installs: 731 | Stars: 5 | Version 2.0 | Last update: 2 Dec 2020


# Development
1. run command

```console
$ ng build --watch
```

2. open chrome and input: chrome://extensions/
3. enable 'Developer mode'
4. click 'Load unpacked extension…' and choose path/to/the/extension/dist/text-transform
5. click 'Enabled'

# Production

```console
$ ng build --configuration production
```

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.20. Current version of Angular CLI 18.2.9

[//]: # (## Development server)

[//]: # (Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.)

[//]: # ()
[//]: # (## Build)

[//]: # ()
[//]: # (Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.)

## TODO

- [ ] Add words counter

- [ ] Return Future: insert selected text from browser to extension

- https://developer.chrome.com/docs/extensions/reference/api/storage?hl=ru#sync

- https://stackoverflow.com/questions/66788838/chrome-scripting-executescript-unexpected-property-arguments

- https://stackoverflow.com/questions/76994233/how-to-get-user-selected-text-in-chrome-extension-manifest-v3

- [x] Chrome Extensions | Migrate from Manifest V2 to Manifest V3  


## Fix Bugs 

- [ ] йцукенгшщзхїфівапролджєячсмитьбю -> йцукенгшщзх ф вапролдж ячсмитьбю

- [ ] fix Google analitick


## Info
[Chrome extension with Angular — from zero to a little hero](https://medium.com/angular-in-depth/chrome-extension-with-angular-why-and-how-778200b87575)
