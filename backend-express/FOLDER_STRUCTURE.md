# Project Structure

```
├── get-folder-structure.js
├── package.json
├── src
│   ├── app.ts
│   ├── middleware
│   │   └── jwt.middleware.ts
│   ├── module
│   │   ├── auth
│   │   │   ├── controller.ts
│   │   │   ├── router.ts
│   │   │   ├── schema.ts
│   │   │   └── service.ts
│   │   ├── note
│   │   │   ├── controller.ts
│   │   │   ├── model.ts
│   │   │   ├── router.ts
│   │   │   ├── schema.ts
│   │   │   └── service.ts
│   │   └── user
│   │       ├── controller.ts
│   │       ├── model.ts
│   │       ├── router.ts
│   │       ├── schema.ts
│   │       └── service.ts
│   ├── server.ts
│   ├── type
│   │   └── index.d.ts
│   └── utils
│       ├── config
│       │   ├── rate-limiter-config.ts
│       │   └── swagger-config.ts
│       ├── connect-db.ts
│       ├── error-handler.ts
│       ├── jwt.ts
│       └── load-env.ts
├── STRUCTURE.md
└── tsconfig.json
```