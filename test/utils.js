// const { MongoMemoryServer } = require('mongodb-memory-server');
// const mongooseTest = require('mongoose');

// const port = 27018;
// const mongod = new MongoMemoryServer({
//   instance: {
//     port,
//   },
//   autoStart: false,
// });

// const setup = async () => {
//   console.log(" [ Setting up in memory mongodb  ] ")
//   await mongod.start();
//   if (mongod.instanceInfoSync.port !== port) {
//     throw new Error(`Failed to startup, :${port} already in use`);
//   }
//   await mongooseTest.connect(`mongodb://localhost/test`,
//   {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   });
// };

// before(async () => {
//   console.log(" [ Set up in memory mongodb  ] ")
//   await setup();
// });