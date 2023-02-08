/** Information about the pricing plan. */
export interface Plan {
  /**
   * Plan ID.
   * @readonly
   */
  id?: string;
  /** Plan name. */
  name?: string | null;
  /** Plan description. */
  description?: string | null;
  /** What is included with this plan (e.g., 1 weekly entrance to a specific class). */
  perks?: StringList;
  /** Plan price, payment schedule, and expiration. */
  pricing?: Pricing;
  /** Whether the plan is public (visible to site visitors and members). */
  public?: boolean | null;
  /**
   * Whether the plan is archived. Archived plans are not visible and can't be purchased anymore, but existing purchases remain in effect.
   * @readonly
   */
  archived?: boolean;
  /**
   * Whether the plan is marked as primary.
   * @readonly
   */
  primary?: boolean;
  /**
   * Whether the plan has any orders (including pending and unpaid orders).
   * @readonly
   */
  hasOrders?: boolean;
  /**
   * Date plan was created.
   * @readonly
   */
  createdDate?: Date;
  /**
   * Date plan was last updated.
   * @readonly
   */
  updatedDate?: Date;
  /**
   * URL-friendly version of plan name. Unique across all plans in the same site.
   * @readonly
   */
  slug?: string | null;
  /**
   * Number of times the same buyer can purchase the plan. Currently limited to support:
   * - Empty value or a value of `0`, meaning no limitation.
   * - Value of `1`, meaning limited to one purchase per buyer.
   */
  maxPurchasesPerBuyer?: number | null;
  /** Whether the buyer can start the plan at a later date. Defaults to false. */
  allowFutureStartDate?: boolean | null;
  /** Whether the buyer is allowed to cancel their plan. Defaults to false. */
  buyerCanCancel?: boolean | null;
  /** Any terms and conditions that apply to the plan. This information will be displayed during checkout. */
  termsAndConditions?: string | null;
  clientData?: Record<string, string>;
  /** Reference to a form which is shown in checkout to gather additional data */
  formId?: string | null;
}
/** This wrapper type exist in order to distinguish an empty string list from no list at all in update requests. */
export interface StringList {
  /** List of strings */
  values?: string[];
}
/** Plan pricing information. Includes the price of the plan and payment details. */
export interface Pricing extends PricingPricingModelOneOf {
  /** Amount for a single payment (or the whole subscription if it's not a recurring plan) */
  price?: Money;
  /** Free trial period for the plan in days. It’s available only for recurring plans. Set to 0 to remove free trial. */
  freeTrialDays?: number | null;
  /** Plan has recurring payments. */
  subscription?: Recurrence;
  /** One time payment, plan is valid for the specified duration. */
  singlePaymentForDuration?: Duration;
  /** One time payment, plan is valid until it is canceled. */
  singlePaymentUnlimited?: boolean | null;
}
/** @oneof */
export interface PricingPricingModelOneOf {
  /** Plan has recurring payments. */
  subscription?: Recurrence;
  /** One time payment, plan is valid for the specified duration. */
  singlePaymentForDuration?: Duration;
  /** One time payment, plan is valid until it is canceled. */
  singlePaymentUnlimited?: boolean | null;
}
/** An object specifying how often and for how long payments recur (may be forever). */
export interface Recurrence {
  /** Length of one payment cycle. */
  cycleDuration?: Duration;
  /**
   * Amount of payment cycles this subscription is valid for.
   *
   * `0` for unlimited or until-canceled.
   */
  cycleCount?: number | null;
}
/** A duration expressed in number of time units. */
export interface Duration {
  /**
   * The amount of a duration `unit` in a single payment cycle.
   *
   * Currently limited to support only `1`.
   */
  count?: number | null;
  /** Unit of time for the cycle duration. */
  unit?: PeriodUnit;
}
export enum PeriodUnit {
  UNDEFINED = 'UNDEFINED',
  DAY = 'DAY',
  WEEK = 'WEEK',
  MONTH = 'MONTH',
  YEAR = 'YEAR',
}
export interface Money {
  /** Monetary amount. Decimal string with a period as a decimal separator (e.g., 3.99). */
  value?: string;
  /** Currency code. Must be valid ISO 4217 currency code (e.g., USD). */
  currency?: string;
}
export interface BuyerCanCancelUpdated {
  plan?: Plan;
}
export interface ListPublicPlansRequest {
  /** Number of items to list. Defaults to 75. See [Pagination](https://dev.wix.com/api/rest/getting-started/pagination). */
  limit?: number | null;
  /** Number of items to skip. Defaults to 0. See [Pagination](https://dev.wix.com/api/rest/getting-started/pagination). */
  offset?: number | null;
  /** IDs of plans to list. Non-existent IDs will be ignored and won't cause errors. You can pass a maximum of 100 IDs. */
  planIds?: string[];
}
export interface ListPublicPlansResponse {
  /** List of public pricing plans. */
  plans?: PublicPlan[];
}
/** Public plan entity containing information about the pricing plan. Can be read by any site member or visitor. */
export interface PublicPlan {
  /** Plan ID. */
  id?: string;
  /** Plan name. */
  name?: string | null;
  /** Plan description. */
  description?: string | null;
  /** What is included with this plan (e.g., 1 weekly entrance to a specific class). */
  perks?: StringList;
  /** Plan price, payment schedule, and expiration. */
  pricing?: Pricing;
  /** Whether the plan is marked as primary. */
  primary?: boolean;
  /** Date plan was created. */
  createdDate?: Date;
  /** Date plan was last updated. */
  updatedDate?: Date;
  /** URL-friendly version of plan name. Unique across all plans in the same site. */
  slug?: string | null;
  /** Number of times the same buyer can purchase the plan. An empty value or a value of zero means no limitation. */
  maxPurchasesPerBuyer?: number | null;
  /** Whether the buyer can start the plan at a later date. Defaults to false. */
  allowFutureStartDate?: boolean | null;
  /** Whether the buyer is allowed to cancel their plan. Defaults to false. */
  buyerCanCancel?: boolean | null;
  /** Any terms and conditions that apply to the plan. This information will be displayed during checkout. */
  termsAndConditions?: string | null;
  clientData?: Record<string, string>;
  /** Reference to a form which is shown in checkout to gather additional data */
  formId?: string | null;
}
export interface QueryPublicPlansRequest {
  query?: QueryV2;
}
export interface QueryV2 {
  /** A filter object. See [supported fields and operators](https://dev.wix.com/api/rest/wix-pricing-plans/pricing-plans/plans/filter-and-sort#wix-pricing-plans_pricing-plans_plans_filter-and-sort_query-public-plans) */
  filter?: Record<string, any> | null;
  /** Sort object in the form [{"fieldName":"sortField1"},{"fieldName":"sortField2","direction":"DESC"}] */
  sort?: Sorting[];
  /** Pointer to page of results using offset. Can not be used together with 'cursorPaging' */
  paging?: Paging;
}
export interface Sorting {
  /** Name of the field to sort by. */
  fieldName?: string;
  /** Sort order. */
  order?: SortOrder;
}
export enum SortOrder {
  ASC = 'ASC',
  DESC = 'DESC',
}
export interface Paging {
  /** Number of items to load. */
  limit?: number | null;
  /** Number of items to skip in the current sort order. */
  offset?: number | null;
}
export interface QueryPublicPlansResponse {
  /** List of public pricing plans that match the specified query. */
  plans?: PublicPlan[];
  /** Object containing paging-related data (number of plans returned, offset). */
  pagingMetadata?: PagingMetadataV2;
}
export interface PagingMetadataV2 {
  /** Number of items returned in the response. */
  count?: number | null;
  /** Offset that was requested. */
  offset?: number | null;
  /** Total number of items that match the query. Returned if offset paging is used and the `tooManyToCount` flag is not set. */
  total?: number | null;
  /** Flag that indicates the server failed to calculate the `total` field. */
  tooManyToCount?: boolean | null;
  /** Cursors to navigate through the result pages using `next` and `prev`. Returned if cursor paging is used. */
  cursors?: Cursors;
  /**
   * Indicates if there are more results after the current page.
   * If `true`, another page of results can be retrieved.
   * If `false`, this is the last page.
   * @internal
   */
  hasNext?: boolean | null;
}
export interface Cursors {
  /** Cursor pointing to next page in the list of results. */
  next?: string | null;
  /** Cursor pointing to previous page in the list of results. */
  prev?: string | null;
}
export interface GetPlanRequest {
  /** Plan ID. */
  id: string;
}
export interface GetPlanResponse {
  /** Pricing plan. */
  plan?: Plan;
}
export interface ListPlansRequest {
  /** Archived filter. Defaults to ACTIVE (not archived) only. */
  archived?: ArchivedFilter;
  /** Visibility filter. Defaults to PUBLIC_AND_HIDDEN (meaning, both are listed). */
  public?: PublicFilter;
  /** Number of pricing plans to list. Defaults to 75. */
  limit?: number | null;
  /** Number of pricing plans to skip. Defaults to 0. */
  offset?: number | null;
  /** Plan ID filter. Non-existent IDs are ignored, and won't cause errors. You can pass a maximum of 100 IDs. */
  planIds?: string[];
}
export enum ArchivedFilter {
  /** Returns all plans that are active. */
  ACTIVE = 'ACTIVE',
  /** Returns all plans that are archived. */
  ARCHIVED = 'ARCHIVED',
  /** Returns all plans that are active and archived. */
  ARCHIVED_AND_ACTIVE = 'ARCHIVED_AND_ACTIVE',
}
export enum PublicFilter {
  /** Returns all public and hidden plans. */
  PUBLIC_AND_HIDDEN = 'PUBLIC_AND_HIDDEN',
  /** Returns only public plans. */
  PUBLIC = 'PUBLIC',
  /** Returns only hidden plans. */
  HIDDEN = 'HIDDEN',
}
export interface ListPlansResponse {
  /** List of all public and hidden pricing plans. */
  plans?: Plan[];
}
export interface GetPlanStatsRequest {}
export interface GetPlanStatsResponse {
  /** Total number of plans created, including active plans (both public and hidden) and archived plans. */
  totalPlans?: number;
}
export interface CreatePlanRequest {
  plan: Plan;
}
export interface CreatePlanResponse {
  plan?: Plan;
}
export interface UpdatePlanRequest {
  plan?: Plan;
  fieldMask?: string[];
}
export interface UpdatePlanResponse {
  plan?: Plan;
}
export interface SetPlanVisibilityRequest {
  id: string;
  visible?: boolean;
}
export interface SetPlanVisibilityResponse {
  plan?: Plan;
}
export interface MakePlanPrimaryRequest {
  id: string;
}
export interface MakePlanPrimaryResponse {
  plan?: Plan;
}
export interface ClearPrimaryRequest {}
export interface ClearPrimaryResponse {}
export interface ArchivePlanRequest {
  id: string;
}
export interface ArchivePlanResponse {
  plan?: Plan;
}
export interface PlanArchived {
  plan?: Plan;
}
export interface BulkArchivePlanRequest {
  /** List of Plan IDs. */
  ids: string[];
  /** Set to true to return Plan entity in response. */
  returnFullEntity?: boolean;
}
export interface BulkArchivePlanResponse {
  results?: BulkPlanResult[];
  bulkActionMetadata?: BulkActionMetadata;
}
export interface BulkPlanResult {
  itemMetadata?: ItemMetadata;
  plan?: Plan;
}
export interface ItemMetadata {
  /** Item ID. Should always be available, unless it's impossible (for example, when failing to create an item). */
  id?: string | null;
  /** Index of the item within the request array. Allows for correlation between request and response items. */
  originalIndex?: number;
  /** Whether the requested action was successful for this item. When `false`, the `error` field is populated. */
  success?: boolean;
  /** Details about the error in case of failure. */
  error?: ApplicationError;
}
export interface ApplicationError {
  code?: string;
  description?: string;
  data?: Record<string, any> | null;
}
export interface BulkActionMetadata {
  /** Number of items that were successfully processed. */
  totalSuccesses?: number;
  /** Number of items that couldn't be processed. */
  totalFailures?: number;
  /** Number of failures without details because detailed failure threshold was exceeded. */
  undetailedFailures?: number;
}
export interface ArrangePlansRequest {
  ids?: string[];
}
export interface ArrangePlansResponse {}
