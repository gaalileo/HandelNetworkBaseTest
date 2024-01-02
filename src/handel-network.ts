import { BigInt } from "@graphprotocol/graph-ts";
import {
  BonusAdded as BonusAddedEvent,
  BuyShare as BuyShareEvent,
  ClaimedCreatorFee as ClaimedCreatorFeeEvent,
  ClaimedOwnerFee as ClaimedOwnerFeeEvent,
  ClaimedReflectionFee as ClaimedReflectionFeeEvent,
  ClaimedReward as ClaimedRewardEvent,
  OwnershipTransferred as OwnershipTransferredEvent,
  OwnershipVerified as OwnershipVerifiedEvent,
  RewardsOffered as RewardsOfferedEvent,
  SellShare as SellShareEvent,
} from "../generated/HandelNetwork/HandelNetwork";
import {
  BonusAdded,
  BuyShare,
  ClaimedCreatorFee,
  ClaimedOwnerFee,
  ClaimedReflectionFee,
  ClaimedReward,
  OwnershipTransferred,
  OwnershipVerified,
  RewardsOffered,
  SellShare,
  UserMarketRelation,
  MarketPrice,
} from "../generated/schema";
import { MarketPriceCalculator } from "./price-calculator";

export function handleBonusAdded(event: BonusAddedEvent): void {
  let entity = new BonusAdded(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.amount = event.params.amount;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

function handleMarketUpdate(
  marketPrice: MarketPrice,
  newSupply: BigInt,
  timestamp: BigInt
): void {
  const calculator = new MarketPriceCalculator();

  // log.debug("For Market: {}", [marketPrice.marketId.toString()]);

  marketPrice.shares = newSupply;
  marketPrice.buyPrice = calculator.getBuyPriceAfterFee(
    newSupply,
    BigInt.fromI64(10).pow(18),
    marketPrice.marketId
  );

  if (marketPrice.shares.gt(BigInt.fromI64(10).pow(18))) {
    marketPrice.sellPrice = calculator.getSellPriceAfterFee(
      newSupply,
      BigInt.fromI64(10).pow(18),
      marketPrice.marketId
    );
  } else {
    marketPrice.sellPrice = BigInt.fromI32(0);
  }
  marketPrice.lastUpdated = timestamp;
  marketPrice.save();
}

export function handleBuyShare(event: BuyShareEvent): void {
  let entity = new BuyShare(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );

  entity.marketId = event.params.marketId;
  entity.buyer = event.params.buyer;
  entity.qty = event.params.qty;
  entity.newSupply = event.params.newSupply;
  entity.pricePaid = event.params.pricePaid;
  entity.protocolFee = event.params.protocolFee;
  entity.ownerFee = event.params.ownerFee;
  entity.creatorFee = event.params.creatorFee;
  entity.rewardFee = event.params.rewardFee;
  entity.reflectionFee = event.params.reflectionFee;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();

  let userMarketRelation = UserMarketRelation.load(
    event.params.buyer
      .toHexString()
      .concat("-")
      .concat(event.params.marketId.toHexString())
  );

  if (userMarketRelation == null) {
    userMarketRelation = new UserMarketRelation(
      event.params.buyer
        .toHexString()
        .concat("-")
        .concat(event.params.marketId.toHexString())
    );
    userMarketRelation.market = event.params.marketId;
    userMarketRelation.user = event.params.buyer;
    userMarketRelation.balance = event.params.qty;
    userMarketRelation.save();
  } else {
    userMarketRelation.balance = userMarketRelation.balance.plus(
      event.params.qty
    );
    userMarketRelation.save();
  }

  let marketPrice = MarketPrice.load(event.params.marketId.toHexString());

  if (marketPrice == null) {
    // create new market price
    marketPrice = new MarketPrice(event.params.marketId.toHexString());
    marketPrice.marketId = event.params.marketId;
    handleMarketUpdate(
      marketPrice,
      event.params.newSupply,
      event.block.timestamp
    );
  } else {
    // update market price
    handleMarketUpdate(
      marketPrice,
      event.params.newSupply,
      event.block.timestamp
    );
  }
}

export function handleClaimedCreatorFee(event: ClaimedCreatorFeeEvent): void {
  let entity = new ClaimedCreatorFee(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.creator = event.params.creator;
  entity.beneficiary = event.params.beneficiary;
  entity.claimedFees = event.params.claimedFees;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleClaimedOwnerFee(event: ClaimedOwnerFeeEvent): void {
  let entity = new ClaimedOwnerFee(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.marketId = event.params.marketId;
  entity.beneficiary = event.params.beneficiary;
  entity.claimedFees = event.params.claimedFees;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleClaimedReflectionFee(
  event: ClaimedReflectionFeeEvent
): void {
  let entity = new ClaimedReflectionFee(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.marketIds = event.params.marketIds;
  entity.beneficiary = event.params.beneficiary;
  entity.claimedFees = event.params.claimedFees;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleClaimedReward(event: ClaimedRewardEvent): void {
  let entity = new ClaimedReward(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.marketId = event.params.marketId;
  entity.beneficiary = event.params.beneficiary;
  entity.claimedRewards = event.params.claimedRewards;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleOwnershipTransferred(
  event: OwnershipTransferredEvent
): void {
  let entity = new OwnershipTransferred(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.previousOwner = event.params.previousOwner;
  entity.newOwner = event.params.newOwner;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleOwnershipVerified(event: OwnershipVerifiedEvent): void {
  let entity = new OwnershipVerified(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.marketId = event.params.marketId;
  entity.newOwner = event.params.newOwner;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleRewardsOffered(event: RewardsOfferedEvent): void {
  let entity = new RewardsOffered(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.marketId = event.params.marketId;
  entity.amount = event.params.amount;
  entity.pendingRewardsInHand = event.params.pendingRewardsInHand;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleSellShare(event: SellShareEvent): void {
  let entity = new SellShare(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.marketId = event.params.marketId;
  entity.seller = event.params.seller;
  entity.qty = event.params.qty;
  entity.newSupply = event.params.newSupply;
  entity.priceReceived = event.params.priceReceived;
  entity.dividendsAdded = event.params.dividendsAdded;
  entity.protocolFee = event.params.protocolFee;
  entity.ownerFee = event.params.ownerFee;
  entity.creatorFee = event.params.creatorFee;
  entity.rewardFee = event.params.rewardFee;
  entity.reflectionFee = event.params.reflectionFee;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();

  const userMarketRelation = UserMarketRelation.load(
    event.params.seller
      .toHexString()
      .concat("-")
      .concat(event.params.marketId.toHexString())
  );

  if (userMarketRelation) {
    // if will always be true, but just to be safe
    // without buying, it can't be possible to sell
    userMarketRelation.balance = userMarketRelation.balance.minus(
      event.params.qty
    );
    userMarketRelation.save();
  }

  const marketPrice = MarketPrice.load(event.params.marketId.toHexString());

  if (marketPrice) {
    // if will always be true, but just to be safe
    // without buying, it can't be possible to sell
    // update market price
    handleMarketUpdate(
      marketPrice,
      event.params.newSupply,
      event.block.timestamp
    );
  }
}
