import { newMockEvent } from "matchstick-as"
import { ethereum, BigInt, Address } from "@graphprotocol/graph-ts"
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
} from "../generated/HandelNetwork/HandelNetwork"

export function createBonusAddedEvent(amount: BigInt): BonusAdded {
  let bonusAddedEvent = changetype<BonusAdded>(newMockEvent())

  bonusAddedEvent.parameters = new Array()

  bonusAddedEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return bonusAddedEvent
}

export function createBuyShareEvent(
  marketId: BigInt,
  buyer: Address,
  qty: BigInt,
  newSupply: BigInt,
  pricePaid: BigInt,
  protocolFee: BigInt,
  ownerFee: BigInt,
  creatorFee: BigInt,
  rewardFee: BigInt,
  reflectionFee: BigInt
): BuyShare {
  let buyShareEvent = changetype<BuyShare>(newMockEvent())

  buyShareEvent.parameters = new Array()

  buyShareEvent.parameters.push(
    new ethereum.EventParam(
      "marketId",
      ethereum.Value.fromUnsignedBigInt(marketId)
    )
  )
  buyShareEvent.parameters.push(
    new ethereum.EventParam("buyer", ethereum.Value.fromAddress(buyer))
  )
  buyShareEvent.parameters.push(
    new ethereum.EventParam("qty", ethereum.Value.fromUnsignedBigInt(qty))
  )
  buyShareEvent.parameters.push(
    new ethereum.EventParam(
      "newSupply",
      ethereum.Value.fromUnsignedBigInt(newSupply)
    )
  )
  buyShareEvent.parameters.push(
    new ethereum.EventParam(
      "pricePaid",
      ethereum.Value.fromUnsignedBigInt(pricePaid)
    )
  )
  buyShareEvent.parameters.push(
    new ethereum.EventParam(
      "protocolFee",
      ethereum.Value.fromUnsignedBigInt(protocolFee)
    )
  )
  buyShareEvent.parameters.push(
    new ethereum.EventParam(
      "ownerFee",
      ethereum.Value.fromUnsignedBigInt(ownerFee)
    )
  )
  buyShareEvent.parameters.push(
    new ethereum.EventParam(
      "creatorFee",
      ethereum.Value.fromUnsignedBigInt(creatorFee)
    )
  )
  buyShareEvent.parameters.push(
    new ethereum.EventParam(
      "rewardFee",
      ethereum.Value.fromUnsignedBigInt(rewardFee)
    )
  )
  buyShareEvent.parameters.push(
    new ethereum.EventParam(
      "reflectionFee",
      ethereum.Value.fromUnsignedBigInt(reflectionFee)
    )
  )

  return buyShareEvent
}

export function createClaimedCreatorFeeEvent(
  creator: Address,
  beneficiary: Address,
  claimedFees: BigInt
): ClaimedCreatorFee {
  let claimedCreatorFeeEvent = changetype<ClaimedCreatorFee>(newMockEvent())

  claimedCreatorFeeEvent.parameters = new Array()

  claimedCreatorFeeEvent.parameters.push(
    new ethereum.EventParam("creator", ethereum.Value.fromAddress(creator))
  )
  claimedCreatorFeeEvent.parameters.push(
    new ethereum.EventParam(
      "beneficiary",
      ethereum.Value.fromAddress(beneficiary)
    )
  )
  claimedCreatorFeeEvent.parameters.push(
    new ethereum.EventParam(
      "claimedFees",
      ethereum.Value.fromUnsignedBigInt(claimedFees)
    )
  )

  return claimedCreatorFeeEvent
}

export function createClaimedOwnerFeeEvent(
  marketId: BigInt,
  beneficiary: Address,
  claimedFees: BigInt
): ClaimedOwnerFee {
  let claimedOwnerFeeEvent = changetype<ClaimedOwnerFee>(newMockEvent())

  claimedOwnerFeeEvent.parameters = new Array()

  claimedOwnerFeeEvent.parameters.push(
    new ethereum.EventParam(
      "marketId",
      ethereum.Value.fromUnsignedBigInt(marketId)
    )
  )
  claimedOwnerFeeEvent.parameters.push(
    new ethereum.EventParam(
      "beneficiary",
      ethereum.Value.fromAddress(beneficiary)
    )
  )
  claimedOwnerFeeEvent.parameters.push(
    new ethereum.EventParam(
      "claimedFees",
      ethereum.Value.fromUnsignedBigInt(claimedFees)
    )
  )

  return claimedOwnerFeeEvent
}

export function createClaimedReflectionFeeEvent(
  marketIds: BigInt,
  beneficiary: Address,
  claimedFees: BigInt
): ClaimedReflectionFee {
  let claimedReflectionFeeEvent = changetype<ClaimedReflectionFee>(
    newMockEvent()
  )

  claimedReflectionFeeEvent.parameters = new Array()

  claimedReflectionFeeEvent.parameters.push(
    new ethereum.EventParam(
      "marketIds",
      ethereum.Value.fromUnsignedBigInt(marketIds)
    )
  )
  claimedReflectionFeeEvent.parameters.push(
    new ethereum.EventParam(
      "beneficiary",
      ethereum.Value.fromAddress(beneficiary)
    )
  )
  claimedReflectionFeeEvent.parameters.push(
    new ethereum.EventParam(
      "claimedFees",
      ethereum.Value.fromUnsignedBigInt(claimedFees)
    )
  )

  return claimedReflectionFeeEvent
}

export function createClaimedRewardEvent(
  marketId: BigInt,
  beneficiary: Address,
  claimedRewards: BigInt
): ClaimedReward {
  let claimedRewardEvent = changetype<ClaimedReward>(newMockEvent())

  claimedRewardEvent.parameters = new Array()

  claimedRewardEvent.parameters.push(
    new ethereum.EventParam(
      "marketId",
      ethereum.Value.fromUnsignedBigInt(marketId)
    )
  )
  claimedRewardEvent.parameters.push(
    new ethereum.EventParam(
      "beneficiary",
      ethereum.Value.fromAddress(beneficiary)
    )
  )
  claimedRewardEvent.parameters.push(
    new ethereum.EventParam(
      "claimedRewards",
      ethereum.Value.fromUnsignedBigInt(claimedRewards)
    )
  )

  return claimedRewardEvent
}

export function createOwnershipTransferredEvent(
  previousOwner: Address,
  newOwner: Address
): OwnershipTransferred {
  let ownershipTransferredEvent = changetype<OwnershipTransferred>(
    newMockEvent()
  )

  ownershipTransferredEvent.parameters = new Array()

  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam(
      "previousOwner",
      ethereum.Value.fromAddress(previousOwner)
    )
  )
  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  )

  return ownershipTransferredEvent
}

export function createOwnershipVerifiedEvent(
  marketId: BigInt,
  newOwner: Address
): OwnershipVerified {
  let ownershipVerifiedEvent = changetype<OwnershipVerified>(newMockEvent())

  ownershipVerifiedEvent.parameters = new Array()

  ownershipVerifiedEvent.parameters.push(
    new ethereum.EventParam(
      "marketId",
      ethereum.Value.fromUnsignedBigInt(marketId)
    )
  )
  ownershipVerifiedEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  )

  return ownershipVerifiedEvent
}

export function createRewardsOfferedEvent(
  marketId: BigInt,
  amount: BigInt,
  pendingRewardsInHand: BigInt
): RewardsOffered {
  let rewardsOfferedEvent = changetype<RewardsOffered>(newMockEvent())

  rewardsOfferedEvent.parameters = new Array()

  rewardsOfferedEvent.parameters.push(
    new ethereum.EventParam(
      "marketId",
      ethereum.Value.fromUnsignedBigInt(marketId)
    )
  )
  rewardsOfferedEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )
  rewardsOfferedEvent.parameters.push(
    new ethereum.EventParam(
      "pendingRewardsInHand",
      ethereum.Value.fromUnsignedBigInt(pendingRewardsInHand)
    )
  )

  return rewardsOfferedEvent
}

export function createSellShareEvent(
  marketId: BigInt,
  seller: Address,
  qty: BigInt,
  newSupply: BigInt,
  priceReceived: BigInt,
  dividendsAdded: BigInt,
  protocolFee: BigInt,
  ownerFee: BigInt,
  creatorFee: BigInt,
  rewardFee: BigInt,
  reflectionFee: BigInt
): SellShare {
  let sellShareEvent = changetype<SellShare>(newMockEvent())

  sellShareEvent.parameters = new Array()

  sellShareEvent.parameters.push(
    new ethereum.EventParam(
      "marketId",
      ethereum.Value.fromUnsignedBigInt(marketId)
    )
  )
  sellShareEvent.parameters.push(
    new ethereum.EventParam("seller", ethereum.Value.fromAddress(seller))
  )
  sellShareEvent.parameters.push(
    new ethereum.EventParam("qty", ethereum.Value.fromUnsignedBigInt(qty))
  )
  sellShareEvent.parameters.push(
    new ethereum.EventParam(
      "newSupply",
      ethereum.Value.fromUnsignedBigInt(newSupply)
    )
  )
  sellShareEvent.parameters.push(
    new ethereum.EventParam(
      "priceReceived",
      ethereum.Value.fromUnsignedBigInt(priceReceived)
    )
  )
  sellShareEvent.parameters.push(
    new ethereum.EventParam(
      "dividendsAdded",
      ethereum.Value.fromUnsignedBigInt(dividendsAdded)
    )
  )
  sellShareEvent.parameters.push(
    new ethereum.EventParam(
      "protocolFee",
      ethereum.Value.fromUnsignedBigInt(protocolFee)
    )
  )
  sellShareEvent.parameters.push(
    new ethereum.EventParam(
      "ownerFee",
      ethereum.Value.fromUnsignedBigInt(ownerFee)
    )
  )
  sellShareEvent.parameters.push(
    new ethereum.EventParam(
      "creatorFee",
      ethereum.Value.fromUnsignedBigInt(creatorFee)
    )
  )
  sellShareEvent.parameters.push(
    new ethereum.EventParam(
      "rewardFee",
      ethereum.Value.fromUnsignedBigInt(rewardFee)
    )
  )
  sellShareEvent.parameters.push(
    new ethereum.EventParam(
      "reflectionFee",
      ethereum.Value.fromUnsignedBigInt(reflectionFee)
    )
  )

  return sellShareEvent
}
