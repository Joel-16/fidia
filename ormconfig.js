module.exports = [
  {
    name: "development",
    type: "mongodb",
    url: "mongodb+srv://joel:joel@cluster0.fyzt4.mongodb.net/fidia?retryWrites=true&w=majority",
    synchronize: true,
    logging: true,
    useUnifiedTopology: true,
    entities: ["src/entity/**/*.ts"],
    migrations: ["src/migration/**/*.ts"],
    subscribers: ["src/subscriber/**/*.ts"],
    cli: {
      entitiesDir: "src/entity",
      migrationsDir: "src/migration",
      subscribersDir: "src/subscriber"
    }
  },
  {
    name: "production",
    type: "mongodb",
    url: process.env.DB_URL,
    synchronize: true, // switch this to false once you have the initial tables created and use migrations instead
    logging: false,
    useUnifiedTopology: true,
    entities: ["dist/entity/**/*.js"],
    migrations: ["dist/migration/**/*.js"],
    subscribers: ["dist/subscriber/**/*.js"],
    cli: {
      entitiesDir: "dist/entity",
      migrationsDir: "dist/migration",
      subscribersDir: "dist/subscriber"
    }
  }
];
