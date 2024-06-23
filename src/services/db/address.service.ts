import { Address } from "@prisma/client";
import { Helper } from "~/globals/helpers/helper";
import { NotFoundException } from "~/globals/middlewares/error.middleware";
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

  public async remove(id: number, currentUser: UserPayload) {

    // 1) Make sure the address exist
    const address = await this.getOne(id);
    if (!address) {
      throw new NotFoundException(`Not found address with ID: ${id}`);
    }
    // 2) User 1 cannot delete address of user 2
    Helper.checkPermission(address!, 'userId', currentUser);

    await prisma.address.delete({
      where: { id }
    })
  }

  private async getOne(id: number): Promise<Address | null> {
    const address = await prisma.address.findFirst({
      where: { id }
    });

    return address;
  }
}

export const addressService: AddressService = new AddressService();