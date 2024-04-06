import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: Date; output: Date; }
};

export type BikeShareStation = {
  __typename?: 'BikeShareStation';
  address?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  isChargingStation?: Maybe<Scalars['Boolean']['output']>;
  lastReported?: Maybe<Scalars['Int']['output']>;
  lat: Scalars['Float']['output'];
  lon: Scalars['Float']['output'];
  name: Scalars['String']['output'];
  numBikesAvailableEbike?: Maybe<Scalars['Int']['output']>;
  numBikesAvailableMechanical?: Maybe<Scalars['Int']['output']>;
  numBikesDisabled?: Maybe<Scalars['Int']['output']>;
  numDocksAvailable?: Maybe<Scalars['Int']['output']>;
  numDocksDisabled?: Maybe<Scalars['Int']['output']>;
  status?: Maybe<Scalars['String']['output']>;
};

export type BikeShareStationTrend = {
  __typename?: 'BikeShareStationTrend';
  date: Scalars['String']['output'];
  numBikesAvailableEbike?: Maybe<Scalars['Int']['output']>;
  numBikesAvailableMechanical?: Maybe<Scalars['Int']['output']>;
  numBikesDisabled?: Maybe<Scalars['Int']['output']>;
  numDocksAvailable?: Maybe<Scalars['Int']['output']>;
  numDocksDisabled?: Maybe<Scalars['Int']['output']>;
};

export type FerryTicketCount = {
  __typename?: 'FerryTicketCount';
  date: Scalars['String']['output'];
  redemptionCount: Scalars['Int']['output'];
  salesCount: Scalars['Int']['output'];
};

export enum FerryTicketCountDateFilter {
  Day = 'DAY',
  Month = 'MONTH',
  Week = 'WEEK',
  Year = 'YEAR'
}

export type Query = {
  __typename?: 'Query';
  bikeShareStations: Array<BikeShareStation>;
  bikeStationTrends: Array<BikeShareStationTrend>;
  ferryTicketCounts: Array<FerryTicketCount>;
};


export type QueryBikeStationTrendsArgs = {
  id: Scalars['String']['input'];
};


export type QueryFerryTicketCountsArgs = {
  filter: FerryTicketCountDateFilter;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  BikeShareStation: ResolverTypeWrapper<BikeShareStation>;
  BikeShareStationTrend: ResolverTypeWrapper<BikeShareStationTrend>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']['output']>;
  FerryTicketCount: ResolverTypeWrapper<FerryTicketCount>;
  FerryTicketCountDateFilter: FerryTicketCountDateFilter;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  BikeShareStation: BikeShareStation;
  BikeShareStationTrend: BikeShareStationTrend;
  Boolean: Scalars['Boolean']['output'];
  DateTime: Scalars['DateTime']['output'];
  FerryTicketCount: FerryTicketCount;
  Float: Scalars['Float']['output'];
  Int: Scalars['Int']['output'];
  Query: {};
  String: Scalars['String']['output'];
};

export type BikeShareStationResolvers<ContextType = any, ParentType extends ResolversParentTypes['BikeShareStation'] = ResolversParentTypes['BikeShareStation']> = {
  address?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  isChargingStation?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  lastReported?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  lat?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  lon?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  numBikesAvailableEbike?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  numBikesAvailableMechanical?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  numBikesDisabled?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  numDocksAvailable?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  numDocksDisabled?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BikeShareStationTrendResolvers<ContextType = any, ParentType extends ResolversParentTypes['BikeShareStationTrend'] = ResolversParentTypes['BikeShareStationTrend']> = {
  date?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  numBikesAvailableEbike?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  numBikesAvailableMechanical?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  numBikesDisabled?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  numDocksAvailable?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  numDocksDisabled?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type FerryTicketCountResolvers<ContextType = any, ParentType extends ResolversParentTypes['FerryTicketCount'] = ResolversParentTypes['FerryTicketCount']> = {
  date?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  redemptionCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  salesCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  bikeShareStations?: Resolver<Array<ResolversTypes['BikeShareStation']>, ParentType, ContextType>;
  bikeStationTrends?: Resolver<Array<ResolversTypes['BikeShareStationTrend']>, ParentType, ContextType, RequireFields<QueryBikeStationTrendsArgs, 'id'>>;
  ferryTicketCounts?: Resolver<Array<ResolversTypes['FerryTicketCount']>, ParentType, ContextType, RequireFields<QueryFerryTicketCountsArgs, 'filter'>>;
};

export type Resolvers<ContextType = any> = {
  BikeShareStation?: BikeShareStationResolvers<ContextType>;
  BikeShareStationTrend?: BikeShareStationTrendResolvers<ContextType>;
  DateTime?: GraphQLScalarType;
  FerryTicketCount?: FerryTicketCountResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
};

