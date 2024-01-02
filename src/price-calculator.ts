import { BigInt, log } from "@graphprotocol/graph-ts";

export class MarketPriceCalculator {
  public readonly protocolFeePercent: BigInt;
  public readonly ownerFeePercent: BigInt;
  public readonly creatorFeePercent: BigInt;
  public readonly rewardFeePercent: BigInt;
  public readonly reflectionFeePercent: BigInt;
  public readonly EXPO: BigInt;

  constructor() {
    this.EXPO = BigInt.fromI64(10).pow(18);

    this.protocolFeePercent = BigInt.fromI64(29)
      .times(this.EXPO)
      .div(BigInt.fromI32(1000));
    this.creatorFeePercent = BigInt.fromI64(1)
      .times(this.EXPO)
      .div(BigInt.fromI32(1000));
    this.rewardFeePercent = BigInt.fromI64(3)
      .times(this.EXPO)
      .div(BigInt.fromI32(100));
    this.ownerFeePercent = BigInt.fromI64(2)
      .times(this.EXPO)
      .div(BigInt.fromI32(100));
    this.reflectionFeePercent = BigInt.fromI64(2)
      .times(this.EXPO)
      .div(BigInt.fromI32(100));
  }

  getPrice(supply: BigInt, qty: BigInt): BigInt {
    // log.info("Supply: {} Qty: {}", [supply.toString(), qty.toString()]);

    const sum1: BigInt = supply.equals(BigInt.fromI32(0))
      ? BigInt.fromI32(0)
      : supply
          .minus(this.EXPO)
          .times(supply)
          .times(
            BigInt.fromI32(2)
              .times(supply.minus(this.EXPO))
              .plus(this.EXPO)
          )
          .div(BigInt.fromI32(6).times(this.EXPO));

    const sum2: BigInt =
      supply.equals(BigInt.fromI32(0)) && qty.equals(this.EXPO)
        ? BigInt.fromI32(0)
        : supply
            .minus(this.EXPO)
            .plus(qty)
            .times(supply.plus(qty))
            .times(
              BigInt.fromI32(2)
                .times(supply.minus(this.EXPO).plus(qty))
                .plus(this.EXPO)
            )
            .div(BigInt.fromI32(6).times(this.EXPO));

    const summation: BigInt = sum2.minus(sum1).div(this.EXPO);

    return summation.div(BigInt.fromI32(16000));
  }

  getBuyPrice(supply: BigInt, qty: BigInt): BigInt {
    return this.getPrice(supply, qty);
  }

  getSellPrice(supply: BigInt, qty: BigInt): BigInt {
    if (supply.ge(qty)) {
      return this.getPrice(supply.minus(qty), qty);
    } else {
      return BigInt.fromI32(0);
    }
  }

  getBuyPriceAfterFee(supply: BigInt, qty: BigInt, marketId: BigInt): BigInt {
    const price = this.getBuyPrice(supply, qty);

    const protocolFee = price.times(this.protocolFeePercent).div(this.EXPO);
    const ownerFee = price.times(this.ownerFeePercent).div(this.EXPO);
    const creatorFee = price.times(this.creatorFeePercent).div(this.EXPO);
    const rewardFee = price.times(this.rewardFeePercent).div(this.EXPO);
    const reflectionFee = price.times(this.reflectionFeePercent).div(this.EXPO);

    const finalPrice = price
      .plus(protocolFee)
      .plus(ownerFee)
      .plus(creatorFee)
      .plus(rewardFee)
      .plus(reflectionFee);

    // log.debug(
    //   "GetBuyPrice: For market: {}, Supply: {}, Qty: {}, Price: {}, FinalPrice: {}, ProtocolFee: {}, OwnerFee: {}, CreatorFee: {}, RewardFee: {}, ReflectionFee: {}",
    //   [
    //     marketId.toString(),
    //     supply.toString(),
    //     qty.toString(),
    //     price.toString(),
    //     finalPrice.toString(),
    //     protocolFee.toString(),
    //     ownerFee.toString(),
    //     creatorFee.toString(),
    //     rewardFee.toString(),
    //     reflectionFee.toString(),
    //   ]
    // );

    return finalPrice;
  }

  getSellPriceAfterFee(supply: BigInt, qty: BigInt, marketId: BigInt): BigInt {
    const price = this.getSellPrice(supply, qty);

    const protocolFee = price.times(this.protocolFeePercent).div(this.EXPO);
    const ownerFee = price.times(this.ownerFeePercent).div(this.EXPO);
    const creatorFee = price.times(this.creatorFeePercent).div(this.EXPO);
    const rewardFee = price.times(this.rewardFeePercent).div(this.EXPO);
    const reflectionFee = price.times(this.reflectionFeePercent).div(this.EXPO);

    const finalPrice = price
      .minus(protocolFee)
      .minus(ownerFee)
      .minus(creatorFee)
      .minus(rewardFee)
      .minus(reflectionFee);

    // log.debug(
    //   "GetSellPrice: For market: {} Supply: {}, Qty: {}, Price: {}, FinalPrice: {}, ProtocolFee: {}, OwnerFee: {}, CreatorFee: {}, RewardFee: {}, ReflectionFee: {}",
    //   [
    //     marketId.toString(),
    //     supply.toString(),
    //     qty.toString(),
    //     price.toString(),
    //     finalPrice.toString(),
    //     protocolFee.toString(),
    //     ownerFee.toString(),
    //     creatorFee.toString(),
    //     rewardFee.toString(),
    //     reflectionFee.toString(),
    //   ]
    // );

    return finalPrice;
  }
}
