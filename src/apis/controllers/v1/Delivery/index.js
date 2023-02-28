const DeliveryBoyService = require('@services/v1/Delivery');
const {
  ErrorHandler: { INTERNAL_SERVER_ERROR },
} = require('sarvm-utility');

const addDeliveryBoyToShop = async (args) => {
  try {
    const { shopId, userId, devliveryBoyId } = args;

    const body = {
      shopId: shopId.toString(),
      retailerId: userId,
      userId: devliveryBoyId,
    };
    const result = await DeliveryBoyService.addDeliveryBoyToShop(body);
    return result;
  } catch (error) {
    return error;
  }
};

const getAllListOfAllDeliveryBoy = async (args) => {
  try {
    const { shopId } = args;

    const data = await DeliveryBoyService.getAllListOfAllDeliveryBoy();
    if (data) {
      if (shopId) {
        const associated = data.filter((item) => item.shopId === shopId.toString());
        const freelancer = data.filter((item) => item.shopId !== shopId).toString();
        return {
          associated,
          freelancer,
        };
      }
      return {
        associated: [],
        freelancer: data,
      };
    }

    return data;
  } catch (error) {
    throw new INTERNAL_SERVER_ERROR(error);
  }
};

module.exports = { addDeliveryBoyToShop, getAllListOfAllDeliveryBoy };
