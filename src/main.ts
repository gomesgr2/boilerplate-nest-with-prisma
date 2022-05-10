import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as firebase from "firebase-admin";
const serviceAccount = require("../service-account.json");

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  firebase.initializeApp(serviceAccount);

  await app.listen(3000);
}
bootstrap();
