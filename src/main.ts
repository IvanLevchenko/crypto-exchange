import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";

import { AppModule } from "./app/app.module";

import { Constants } from "./constants";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix(Constants.apiPrefix);

  await app.listen(process.env.PORT || 5001);
}
bootstrap();
