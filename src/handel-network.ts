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
  SellShare as SellShareEvent
} from "../generated/HandelNetwork/HandelNetwork"
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
  SellShare
} from "../generated/schema"

export function handleBonusAdded(event: BonusAddedEvent): void {
  let entity = new BonusAdded(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.amount = event.params.amount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleBuyShare(event: BuyShareEvent): void {
  let entity = new BuyShare(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.marketId = event.params.marketId
  entity.buyer = event.params.buyer
  entity.qty = event.params.qty
  entity.newSupply = event.params.newSupply
  entity.pricePaid = event.params.pricePaid
  entity.protocolFee = event.params.protocolFee
  entity.ownerFee = event.params.ownerFee
  entity.creatorFee = event.params.creatorFee
  entity.rewardFee = event.params.rewardFee
  entity.reflectionFee = event.params.reflectionFee

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleClaimedCreatorFee(event: ClaimedCreatorFeeEvent): void {
  let entity = new ClaimedCreatorFee(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.creator = event.params.creator
  entity.beneficiary = event.params.beneficiary
  entity.claimedFees = event.params.claimedFees

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleClaimedOwnerFee(event: ClaimedOwnerFeeEvent): void {
  let entity = new ClaimedOwnerFee(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.marketId = event.params.marketId
  entity.beneficiary = event.params.beneficiary
  entity.claimedFees = event.params.claimedFees

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleClaimedReflectionFee(
  event: ClaimedReflectionFeeEvent
): void {
  let entity = new ClaimedReflectionFee(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.marketIds = event.params.marketIds
  entity.beneficiary = event.params.beneficiary
  entity.claimedFees = event.params.claimedFees

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleClaimedReward(event: ClaimedRewardEvent): void {
  let entity = new ClaimedReward(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.marketId = event.params.marketId
  entity.beneficiary = event.params.beneficiary
  entity.claimedRewards = event.params.claimedRewards

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleOwnershipTransferred(
  event: OwnershipTransferredEvent
): void {
  let entity = new OwnershipTransferred(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.previousOwner = event.params.previousOwner
  entity.newOwner = event.params.newOwner

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleOwnershipVerified(event: OwnershipVerifiedEvent): void {
  let entity = new OwnershipVerified(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.marketId = event.params.marketId
  entity.newOwner = event.params.newOwner

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleRewardsOffered(event: RewardsOfferedEvent): void {
  let entity = new RewardsOffered(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.marketId = event.params.marketId
  entity.amount = event.params.amount
  entity.pendingRewardsInHand = event.params.pendingRewardsInHand

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleSellShare(event: SellShareEvent): void {
  let entity = new SellShare(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.marketId = event.params.marketId
  entity.seller = event.params.seller
  entity.qty = event.params.qty
  entity.newSupply = event.params.newSupply
  entity.priceReceived = event.params.priceReceived
  entity.dividendsAdded = event.params.dividendsAdded
  entity.protocolFee = event.params.protocolFee
  entity.ownerFee = event.params.ownerFee
  entity.creatorFee = event.params.creatorFee
  entity.rewardFee = event.params.rewardFee
  entity.reflectionFee = event.params.reflectionFee

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
