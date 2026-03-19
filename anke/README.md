# tw_vue

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Run your unit tests

```
npm run test:unit
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

### Customize self Theme Uikit3

1. (inside your project root) npm install --save uikit
2. cd node_modules/uikit
3. npm install

4. Create a file /custom/my-theme.less (or any other name) and import the core UIkit styles (uikit.less) or UIkit with its default theme (uikit.theme.less).

5. change the files inside

6. run node build/less
7. link the files inside dist folder

### some internal variables

#### component: FavoritesBoard.vue

    *isSortableHandelCard* - 
        Choise how drag and drop sortable card: all card or show icons and drag on it
        default - card

https://dev.to/ismail9k/use-svg-icons-with-vue-js-2km7