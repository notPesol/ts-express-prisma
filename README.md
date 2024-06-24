### Built With

* [TypeScript][TypeScript-url]
* [Express.js][Express-url]
* [![Prisma][Prisma.io]][Prisma-url]

[TypeScript-url]: https://www.typescriptlang.org/
[Express-url]: https://expressjs.com/
[Express-url]: https://expressjs.com/
[Prisma.io]: https://prismalens.vercel.app/header/logo-white.svg
[Prisma-url]: https://www.prisma.io/

<!-- GETTING STARTED -->
## Getting Started

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.
* npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/notPesol/ts-express-prisma.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```

<!-- USAGE EXAMPLES -->
## Usage

1. Create your .env file following [.example.env](https://github.com/notPesol/ts-express-prisma/blob/main/.example.env)
2. Map your data model to the database schema
   ```sh
   npx prisma migrate dev --name init
   ```
3. Run script
  * Build
    ```sh
    npm run build
    ```
  * Start
    ```sh
    npm start
    ```
  * Dev
    ```sh
    npm run dev
    ```
