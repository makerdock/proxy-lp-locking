const schema = `
#
# --Airstack Schemas--

type AirBlock @entity {
 id: ID! #chain-number
 hash: String!
 number: BigInt!
 timestamp: BigInt!
}

type AirMeta @entity {
  id: ID! # air_meta 
  network: String!
  schemaVersion: String!
  slug: String! #Opensea_V1
  name: String! # Opeasea V1
	version: String!
}

type AirEntityCounter @entity {
	id: ID! #AIR_DAILY_STATS_ACCOUNT
	count: BigInt!
	createdAt: AirBlock! 
	lastUpdatedAt: AirBlock!
}

type AirAccount @entity {
  id: ID!
  address: String!
}

type AirToken @entity {
  id: ID!
  address: String!
}

type AirDomain @entity {
  id: ID!                                               # The namehash of the name
  name: String                                          # The human readable name, if known. Unknown portions replaced with hash in square brackets (eg, foo.[1234].eth)
  labelName: String                                     # The human readable label name (imported from CSV), if known
  labelHash: Bytes                                      # keccak256(labelName)
  tokenId: String                                      # dec(labelHash)
  parent: AirDomain                                        # The namehash (id) of the parent name
  subdomains: [AirDomain!]! @derivedFrom(field: "parent")  # Can count domains from length of array
  subdomainCount: BigInt!                                  # The number of subdomains
  resolvedAddress: AirAccount                           # Address logged from current resolver, if any
  owner: AirAccount!
  resolver: AirResolver
  ttl: BigInt
  isMigrated: Boolean!
  isPrimary: Boolean! #- NA
  expiryTimestamp: BigInt!
  registrationCost: BigInt!                            # Cost of domain registration in wei
  createdAt: AirBlock!
	lastBlock: AirBlock #- NA
}

type AirDomainTransferTransaction implements AirDomainEvent @entity {
  id: ID!
  from: AirAccount! # - NA
  to: AirAccount! # - NA
  block: AirBlock!
  transactionHash: String!
  tokenId: String # dec(labelhash)  # - NA
  domain: AirDomain!
  index: BigInt! # - NA
}
# what is the diff b/w transfer and domain owner changed
type AirDomainOwnerChangedTransaction implements AirDomainEvent @entity {
  id: ID!
  previousOwner: AirAccount! # - NA
  newOwner: AirAccount! # - owner
  block: AirBlock!
  transactionHash: String!
  tokenId: String # dec(labelhash)  # - NA
  domain: AirDomain!
  index: BigInt! # - NA
}

type AirDomainNewResolverTransaction implements AirDomainEvent @entity {
  id: ID!
  previousResolver: AirAccount # - NA
  newOwnerResolver: AirAccount! # - resolver
  block: AirBlock!
  transactionHash: String!
  tokenId: String # dec(labelhash)  # - NA
  domain: AirDomain!
  index: BigInt! # - NA
}

type AirDomainNewTTLTransaction implements AirDomainEvent @entity {
  id: ID!
  oldTTL: BigInt # - NA
  newTTL: BigInt! # - ttl
  block: AirBlock!
  transactionHash: String!
  tokenId: String # dec(labelhash)  # - NA
  domain: AirDomain!
  index: BigInt! # - NA
}

type AirResolver @entity {
  id: ID!                   # Concatenation of resolver address and namehash
  domain: AirDomain
  address: AirAccount!           # Address of resolver contract
  resolvedAddress: AirAccount             # Current value of addr record (per events)
}

type AirAddrChanged implements AirDomainEvent @entity {
  id: ID!
  resolver: AirResolver!
  previousResolvedAddress: AirAccount # previous addr record
  newResolvedAddress: AirAccount! # new addr record
  block: AirBlock!
  transactionHash: String!
  tokenId: String # dec(labelhash) - NA
  domain: AirDomain!
  index: BigInt! # - NA
}

interface AirDomainEvent {
  block: AirBlock!
  transactionHash: String!
  tokenId: String # dec(labelhash) - NA
  domain: AirDomain!
  index: BigInt! # - NA
}

interface AirDomainRegistrationEvent  {
  cost: BigInt
  paymentToken: AirToken
  expiryTimestamp: BigInt!
}

type AirNameRegisteredTransaction implements AirDomainEvent & AirDomainRegistrationEvent @entity {
  id: ID!
  block: AirBlock!
  transactionHash: String!
  tokenId: String # dec(labelhash)  # - NA
  domain: AirDomain!
  index: BigInt! # - NA
  cost: BigInt
  paymentToken: AirToken
  registrant: AirAccount!
  expiryTimestamp: BigInt! # - expiryTimestamp to be added to air domain
}

type AirNameRenewedTransaction implements AirDomainEvent & AirDomainRegistrationEvent @entity {
	id: ID!
  block: AirBlock!
  transactionHash: String!
  tokenId: String # dec(labelhash)  # - NA
  domain: AirDomain!
  index: BigInt! # - NA
  cost: BigInt
  paymentToken: AirToken
  renewer: AirAccount!
  expiryTimestamp: BigInt! # - expiryTimestamp to be added to air domain
}

#where is this coming from? NameChanged or have to implement a resolver here
type AirPrimaryDomainTransaction implements AirDomainEvent @entity {
  id: ID!
  block: AirBlock!
  transactionHash: String!
  tokenId: String # dec(labelhash) # - NA
  domain: AirDomain! # - name
  index: BigInt! # - NA
  resolverAddress: String! #make sure to remove the old primary ens if changed
}
`

export default schema;