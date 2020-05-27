# EventAgenda

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.2.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Style configuration

Default values are:
```
--font-size: 0.875rem;
--h1-font-size: 2.1875rem;
--h2-font-size: 1.75rem;
--h3-font-size: 1.53125rem;
--h4-font-size: 1.3125rem;
--h5-font-size: 1.09375rem;
--h6-font-size: 0.875rem;
--font-family: -apple-system;
--space: 2rem;
--primary: #0848;
--on-primary: #fff;
--bg-color: #fff;
```

### Set custom styles via generating scss file

- Create new scss file
- Add following code
```
@use "variables" with (
    $font-family-base: -apple-system,
    $spacer: 2rem,
    $primary: #0848,
);

:root {
    @each $style in map-keys(variables.$property-values) {
        --#{$style}: #{map-get(variables.$property-values, $style)};
    }
}
``` 
- Add into `angular.json` in styles property following code

```
{
    "input": "<path to file>",
    "lazy": true
}
```

- Use theme service to add custom style file to head

### Set Custom styles directly

- Create `<style>` tag
- Add following code into `<style>` tag
```
:root {
     --font-size: 0.875rem;
     --h1-font-size: 2.1875rem;
     --h2-font-size: 1.75rem;
     --h3-font-size: 1.53125rem;
     --h4-font-size: 1.3125rem;
     --h5-font-size: 1.09375rem;
     --h6-font-size: 0.875rem;
     --font-family: -apple-system;
     --space: 2rem;
     --primary: #0848;
     --on-primary: #fff;
     --bg-color: #fff;
   }
```

