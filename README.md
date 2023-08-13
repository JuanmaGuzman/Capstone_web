# React + Typescript + Vite

## Router configuration.
Route creations are handled by `vite-plugin-pages` and should do not need to be
set manually.
To add a route add it to the pages folder. For example:
```
src/
  |-- pages/
     |-- index.tsx
     |-- user/
        |-- profile.tsx
```
will result in the routes `/` and `/user/profile` being created.

## API services and types
API services and types are automatically created by running the command 
`yarn codegen`. This command requires that both the front end and back end
are running and will generate the resulting `.ts` files in the `src/lib/api`
directory.
