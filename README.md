# Webshop

Simple dummy webshop project with the following acceptance criteria:

```
AC01: Create two different pages /products and /cart

AC02: The Product page lists all products and their information, and enables adding each individual product to cart in various amounts, with respect to minOrderAmount.

AC02.a: When product is added to cart its available amount should be decremented by the amount added. Adding more than the total amount should not be possible.

AC03: Cart page displays the products added to the cart: total amount currently added, total price.
```

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

The project is configured to use Playwright to run e2e tests.

For end-to-end (e2e) testing, run:

```bash
ng e2e
```
