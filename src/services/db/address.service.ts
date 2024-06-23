import { Address } from "@prisma/client";
import { prisma } from "~/prisma";

class AddressService {
  public async add(requestBody: any, currentUser: UserPayload) {
    const { street, province, country, postalCode } = requestBody;

    const address: Address = await prisma.address.create({
      data: {
        street, province, country, postalCode, userId: currentUser.id
      }
    });

    return address;
  }
}

export const addressService: AddressService = new AddressService();