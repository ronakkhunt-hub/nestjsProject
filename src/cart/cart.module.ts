import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { CartSchema } from "../../schemas/cart_schema";
import { CartController } from "./cart.controller";
import { CartService } from "./cart.service";

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'Cart', schema: CartSchema }
          ]),
    ],
    controllers: [CartController],
    providers: [CartService]
})

export class CartModule{}