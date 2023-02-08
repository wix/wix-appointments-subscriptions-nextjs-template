// this is a copy from the ambassador package till we move to the sdk

declare type Boolean = boolean;
declare type Double = number;
declare type Int = number;
declare type Long = number;
declare type String = string;
declare type Struct = any;
declare type Timestamp = string;
declare type Value = any;
declare type JsonMap<T> = {
  [key: string]: T;
};
export interface ActionLabels {
  bookingRequestApprovalLabel?: String;
  offlinePaymentLabel?: String;
  onlinePaymentLabel?: String;
}
export interface AdditionalLabel {
  linkLabel?: LinkLabel;
  textLabel?: TextLabel;
}
export interface AddressFields {
  city?: FormField;
  floorNumber?: FormField;
  state?: FormField;
  street?: FormField;
}
export interface AppItem {
  id?: String;
  image?: CommonImage[];
  inactive?: Boolean;
  itemTypeIdentifier?: String;
  media?: CommonMediaItem[];
  metadata?: JsonMap<any>;
  name?: String;
  path?: String;
  protected?: Boolean;
  translationId?: String;
  updatedDate?: Timestamp;
  video?: VideoV2[];
}
export enum ApprovalStatus {
  UNDEFINED = 'UNDEFINED',
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  DECLINED = 'DECLINED',
}
export interface Availability {
  constraints?: AvailabilityConstraints;
  end?: Timestamp;
  linkedSchedules?: LinkedSchedule[];
  locations?: V1Location[];
  start?: Timestamp;
  useDefaultLocation?: Boolean;
}
export interface AvailabilityConstraints {
  slotDurations?: Int[];
  slotsSplitInterval?: SplitInterval;
  splitInterval?: Int;
  timeBetweenSlots?: Int;
}
export interface BackOfficeListRequest {
  id?: String;
}
export interface BackOfficeListResponse {
  haveServices?: Boolean;
}
export interface BookingPolicy {
  bookUpToXMinutesBefore?: Int;
  bookingsApprovalPolicy?: BookingsApprovalPolicy;
  cancelRescheduleUpToXMinutesBefore?: Int;
  futureBookingsPolicy?: FutureBookingPolicy;
  isBookOnlineAllowed?: Boolean;
  isCancelAllowed?: Boolean;
  isRescheduleAllowed?: Boolean;
  maxParticipantsPerBooking?: Int;
  overrideBusinessPolicyFields?: String[];
  waitingListPolicy?: WaitingListPolicy;
}
export interface BookingsApprovalPolicy {
  isBusinessApprovalRequired?: Boolean;
  requestsAffectsAvailability?: Boolean;
}
export interface BoolValue {
  value: Boolean;
}
export interface BulkRequest {
  requestBusiness?: GetBusinessRequest;
  requestGetResource?: GetResourceRequest;
  requestListResources?: ListResourcesRequest;
  requestService?: GetServiceRequest;
  requestServices?: ListServicesRequest;
}
export interface BulkResponse {
  responseBusiness?: GetBusinessResponse;
  responseResource?: GetResourceResponse;
  responseResources?: ListResourcesResponse;
  responseService?: GetServiceResponse;
  responseServices?: ListServicesResponse;
}
export enum BusinessNotificationType {
  UNDEFINED = 'UNDEFINED',
  CONFIRMATION_EMAIL = 'CONFIRMATION_EMAIL',
}
export interface BusinessSchedule {
  periods?: TimePeriod[];
  specialHourPeriod?: SpecialHourPeriod[];
}
export enum BusinessType {
  UNDEFINED = 'UNDEFINED',
  ON_THE_GO = 'ON_THE_GO',
  ON_LOCATION = 'ON_LOCATION',
}
export interface CalendarConference {
  accountOwnerId?: String;
  conferenceType?: ConferenceType;
  description?: String;
  externalId?: String;
  guestUrl?: String;
  hostUrl?: String;
  id?: String;
  password?: String;
  providerId?: String;
}
export interface Category {
  customProperties?: JsonMap<string>;
  id?: String;
  name?: String;
  sortOrder?: Int;
  status?: CategoryStatus;
}
export enum CategoryStatus {
  CREATED = 'CREATED',
  DELETED = 'DELETED',
}
export interface CommonAddress {
  addressLine?: String;
  addressLine2?: String;
  city?: String;
  country?: String;
  countryFullname?: String;
  formattedAddress?: String;
  geocode?: CommonAddressLocation;
  hint?: String;
  postalCode?: String;
  streetAddress?: CommonStreetAddress;
  subdivision?: String;
  subdivisions?: Subdivision[];
}
export interface CommonAddressLocation {
  latitude?: Double;
  longitude?: Double;
}
export interface CommonCursorPaging {
  cursor?: String;
  limit?: Int;
}
export interface CommonDocument {
  filename?: String;
  id: String;
  sizeInBytes?: String;
  url: String;
  urlExpirationDate?: Timestamp;
}
export interface CommonImage {
  altText?: String;
  filename?: String;
  height: Int;
  id: String;
  sizeInBytes?: String;
  url: String;
  urlExpirationDate?: Timestamp;
  width: Int;
}
export interface CommonMediaItem {
  document?: CommonDocument;
  image?: CommonImage;
  video?: CommonVideo;
}
export interface CommonPaging {
  limit?: Int;
  offset?: Int;
}
export interface CommonStreetAddress {
  apt?: String;
  name?: String;
  number?: String;
}
export interface CommonVideo {
  height: Int;
  id: String;
  thumbnail?: CommonImage;
  url: String;
  width: Int;
}
export interface ConferenceAccount {
  conferenceProvider?: String;
  custom?: CustomConferenceLink;
  default?: Boolean;
  resourceId?: String;
}
export interface ConferenceProvider {
  providerId?: String;
}
export enum ConferenceType {
  UNDEFINED = 'UNDEFINED',
  ONLINE_MEETING_PROVIDER = 'ONLINE_MEETING_PROVIDER',
  CUSTOM = 'CUSTOM',
}
export interface CursorPagingMetaData {
  count?: Int;
  cursor?: String;
}
export interface Cursors {
  next?: String;
  prev?: String;
}
export interface CustomConferenceLink {
  description?: String;
  password?: String;
  url?: String;
}
export enum Day {
  UNDEFINED = 'UNDEFINED',
  MON = 'MON',
  TUE = 'TUE',
  WED = 'WED',
  THU = 'THU',
  FRI = 'FRI',
  SAT = 'SAT',
  SUN = 'SUN',
}
export enum DayOfWeek {
  MONDAY = 'MONDAY',
  TUESDAY = 'TUESDAY',
  WEDNESDAY = 'WEDNESDAY',
  THURSDAY = 'THURSDAY',
  FRIDAY = 'FRIDAY',
  SATURDAY = 'SATURDAY',
  SUNDAY = 'SUNDAY',
}
export interface Error {
  code?: String;
  message?: String;
}
export interface ExternalCalendarOverrides {
  description?: String;
  title?: String;
}
export interface FieldConstraints {
  required?: Boolean;
}
export interface Form {
  actionLabels?: ActionLabels;
  address?: AddressFields;
  customFields?: FormField[];
  email?: FormField;
  firstName?: FormField;
  header?: Header;
  id?: String;
  lastName?: FormField;
  name?: FormField;
  numberOfParticipants?: FormField;
  phone?: FormField;
}
export interface FormField {
  additionalLabels?: AdditionalLabel[];
  fieldId?: String;
  label?: String;
  userConstraints?: FieldConstraints;
  valueType?: ValueType;
}
export interface Frequency {
  repetition?: Int;
}
export interface FutureBookingPolicy {
  limitXMinutesToTheFuture?: Int;
  shouldLimit?: Boolean;
}
export interface GetActiveFeaturesResponse {
  applicableForCourse?: Boolean;
  applicableForExternalCalendars?: Boolean;
  applicableForGroups?: Boolean;
  applicableForIndividual?: Boolean;
  applicableForPayments?: Boolean;
  applicableForReminders?: Boolean;
  applicableForServiceList?: Boolean;
  applicableForSmsReminders?: Boolean;
  bookingsStaffLimit?: Int;
}
export interface GetBusinessRequest {
  suppressNotFoundError?: Boolean;
}
export interface GetBusinessResponse {
  activeFeatures?: GetActiveFeaturesResponse;
  businessProperties?: GetPropertiesResponse;
  info?: GetInfoViewResponse;
  notificationsSetup?: GetNotificationViewResponse;
  responseType?: ResponseType;
  siteUrl?: String;
}
export interface GetCategoryRequest {
  fields?: String[];
  id?: String;
}
export interface GetCategoryResponse {
  category?: Category;
  slugs?: Slug[];
}
export interface GetInfoViewResponse {
  businessType?: BusinessType;
  countryCode?: String;
  currency?: String;
  email?: String;
  errors?: Error[];
  formattedAddress?: String;
  googleFormattedAddress?: String;
  language?: String;
  locale?: String;
  name?: String;
  phone?: String;
  premiumInfo?: PremiumInfo;
  timeZone?: String;
}
export interface GetItemsForCouponsByFiltersRequest {
  group: String;
  limit: Int;
  offset: Int;
  text?: String;
}
export interface GetItemsForCouponsByIdsRequest {
  group: String;
  ids: String[];
}
export interface GetItemsForCouponsResponse {
  items: ItemForCoupon[];
  totalCount: Int;
}
export interface GetItemsForShoutoutRequest {
  entityId?: String;
  group?: String;
}
export interface GetNotificationViewResponse {
  errors?: Error[];
  notifications?: NotificationView[];
}
export interface GetPropertiesResponse {
  customProperties?: Property[];
  errors?: Error[];
}
export interface GetResourceRequest {
  fields?: String[];
  id?: String;
}
export interface GetResourceResponse {
  conferenceAccount?: ConferenceAccount;
  conferenceProviders?: Provider[];
  resource?: Resource;
  schedules?: Schedule[];
  slugs?: Slug[];
}
export interface GetServiceRequest {
  fields?: String[];
  id?: String;
}
export interface GetServiceResponse {
  category?: Category;
  form?: Form;
  maxPrice?: Money;
  minPrice?: Money;
  pricingPlans?: PricingPlan[];
  resources?: Resource[];
  schedules?: Schedule[];
  service?: Service;
  slugs?: Slug[];
  status?: ServiceStatus;
  urls?: URLs;
  userDefinedSlug?: Slug;
}
export interface Header {
  description?: String;
  isDescriptionHidden?: Boolean;
  title?: String;
}
export interface Interval {
  daysOfWeek?: Day;
  duration?: Int;
  hourOfDay?: Int;
  minuteOfHour?: Int;
}
export interface ItemForCoupon {
  id: String;
  itemUrl?: String;
  mediaItem?: V2MediaItem;
  name: String;
  prices?: Prices;
}
export interface KindListValue {
  value: StructListValue;
}
export interface KindNullValue {
  value: StructNullValue;
}
export interface LanguageMetadata {
  code?: String;
  tag?: String;
}
export interface LinkLabel {
  label?: String;
  url?: String;
}
export interface LinkedSchedule {
  scheduleId?: String;
  scheduleOwnerId?: String;
  scheduleOwnerName?: String;
  scheduleOwnerUserId?: String;
  transparency?: Transparency;
}
export interface ListCategoriesRequest {
  includeDeleted?: Boolean;
  query?: Query;
}
export interface ListCategoriesResponse {
  categories?: GetCategoryResponse[];
  metadata?: QueryMetaData;
  pagingMetadata?: PagingMetadataV2;
}
export interface ListResourcesRequest {
  includeDeleted?: Boolean;
  query?: Query;
}
export interface ListResourcesResponse {
  metadata?: QueryMetaData;
  pagingMetadata?: PagingMetadataV2;
  resources?: GetResourceResponse[];
  responseType?: ResponseType;
}
export interface ListServicesBySlugRequest {
  includeDeleted?: Boolean;
  query?: Query;
  slug?: String;
}
export interface ListServicesRequest {
  includeDeleted?: Boolean;
  query?: Query;
}
export interface ListServicesResponse {
  metadata?: QueryMetaData;
  pagingMetadata?: PagingMetadataV2;
  responseType?: ResponseType;
  services?: GetServiceResponse[];
}
export enum LocationLocationType {
  UNDEFINED = 'UNDEFINED',
  OWNER_BUSINESS = 'OWNER_BUSINESS',
  OWNER_CUSTOM = 'OWNER_CUSTOM',
  CUSTOM = 'CUSTOM',
}
export enum LocationStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}
export interface LocationsAddress {
  city?: String;
  country?: String;
  formattedAddress?: String;
  geocode?: LocationsAddressLocation;
  hint?: String;
  postalCode?: String;
  streetAddress?: LocationsStreetAddress;
  subdivision?: String;
}
export interface LocationsAddressLocation {
  latitude?: Double;
  longitude?: Double;
}
export interface LocationsLocation {
  address?: LocationsAddress;
  archived?: Boolean;
  businessSchedule?: BusinessSchedule;
  default?: Boolean;
  description?: String;
  email?: String;
  fax?: String;
  id?: String;
  locationType?: LocationsLocationType;
  name?: String;
  phone?: String;
  revision?: Long;
  status?: LocationStatus;
  timeZone?: String;
}
export enum LocationsLocationType {
  UNKNOWN = 'UNKNOWN',
  BRANCH = 'BRANCH',
  OFFICES = 'OFFICES',
  RECEPTION = 'RECEPTION',
  HEADQUARTERS = 'HEADQUARTERS',
}
export interface LocationsStreetAddress {
  apt?: String;
  name?: String;
  number?: String;
}
export interface MediaDocument {
  value: CommonDocument;
}
export interface MediaImage {
  value: CommonImage;
}
export interface MediaVideo {
  value: CommonVideo;
}
export interface Money {
  currency: String;
  formattedValue?: String;
  value: String;
}
export enum NotificationType {
  UNDEFINED = 'UNDEFINED',
  CONFIRMATION_EMAIL = 'CONFIRMATION_EMAIL',
  CANCELLATION_EMAIL = 'CANCELLATION_EMAIL',
  REMINDER_EMAIL = 'REMINDER_EMAIL',
  REMINDER_SMS = 'REMINDER_SMS',
}
export interface NotificationView {
  includeConferenceLink?: Boolean;
  isEnabled?: Boolean;
  requireParticipantConsent?: Boolean;
  tags?: String[];
  type?: NotificationType;
}
export interface NullValueUnrecognized {
  value: Int;
}
export interface NumberValue {
  value: Double;
}
export interface PageUrl {
  base: String;
  path: String;
}
export interface PagingMetadataV2 {
  count?: Int;
  cursors?: Cursors;
  hasNext?: Boolean;
  offset?: Int;
  tooManyToCount?: Boolean;
  total?: Int;
}
export interface PagingMethodCursorPaging {
  value: CommonCursorPaging;
}
export interface PagingMethodPaging {
  value: CommonPaging;
}
export interface Participant {
  approvalStatus?: ApprovalStatus;
  contactId?: String;
  email?: String;
  id?: String;
  inherited?: Boolean;
  name?: String;
  partySize?: Int;
  phone?: String;
}
export interface PaymentOptions {
  custom?: Boolean;
  wixPaidPlan?: Boolean;
  wixPayInPerson?: Boolean;
  wixPayOnline?: Boolean;
}
export enum PremiumInfo {
  UNDEFINED = 'UNDEFINED',
  BOOKINGS_PREMIUM = 'BOOKINGS_PREMIUM',
  WIX_PREMIUM = 'WIX_PREMIUM',
  NO_PREMIUM = 'NO_PREMIUM',
}
export interface Price {
  amount?: String;
  currency?: String;
  downPayAmount?: String;
}
export interface Prices {
  current: String;
  original?: String;
}
export interface PricingPlan {
  id?: String;
  name?: String;
  status?: PricingPlanStatus;
  visible?: Boolean;
}
export enum PricingPlanStatus {
  UNDEFINED = 'UNDEFINED',
  ACTIVE = 'ACTIVE',
  ARCHIVED = 'ARCHIVED',
}
export interface Property {
  propertyName?: String;
  value?: String;
}
export interface Provider {
  accountOwnerId?: String;
  email?: String;
  id?: String;
  name?: String;
  status?: ProviderStatus;
}
export enum ProviderStatus {
  UNDEFINED = 'UNDEFINED',
  CONNECTED = 'CONNECTED',
  DISCONNECTED = 'DISCONNECTED',
}
export interface Query {
  fields: String[];
  fieldsets: String[];
  filter?: Value;
  paging?: CommonPaging;
  sort: Sorting[];
}
export interface QueryCategoriesRequest {
  includeDeleted?: Boolean;
  query?: QueryV2;
}
export interface QueryCategoriesResponse {
  categories?: GetCategoryResponse[];
  pagingMetadata?: PagingMetadataV2;
}
export interface QueryMetaData {
  items?: Int;
  offset?: Int;
  totalCount?: Int;
}
export interface QueryResourcesRequest {
  includeDeleted?: Boolean;
  query?: QueryV2;
}
export interface QueryResourcesResponse {
  pagingMetadata?: PagingMetadataV2;
  resources?: GetResourceResponse[];
  responseType?: ResponseType;
}
export interface QueryServicesRequest {
  includeDeleted?: Boolean;
  query?: QueryV2;
}
export interface QueryServicesResponse {
  pagingMetadata?: PagingMetadataV2;
  responseType?: ResponseType;
  services?: GetServiceResponse[];
}
export interface QueryV2 {
  cursorPaging?: CommonCursorPaging;
  fields: String[];
  fieldsets: String[];
  filter?: Struct;
  paging?: CommonPaging;
  sort: Sorting[];
}
export interface Rate {
  defaultVariedPrice?: Price;
  labeledPriceOptions?: JsonMap<Price>;
  priceText?: String;
}
export interface RecurringInterval {
  affectedSchedules?: LinkedSchedule[];
  end?: Timestamp;
  frequency?: Frequency;
  id?: String;
  interval?: Interval;
  intervalType?: RecurringIntervalType;
  start?: Timestamp;
}
export enum RecurringIntervalType {
  UNDEFINED = 'UNDEFINED',
  EVENT = 'EVENT',
  TIME_AVAILABILITY = 'TIME_AVAILABILITY',
  AVAILABILITY = 'AVAILABILITY',
}
export interface Resource {
  description?: String;
  email?: String;
  id?: String;
  images?: CommonImage[];
  name?: String;
  phone?: String;
  scheduleIds?: String[];
  schedules?: Schedule[];
  status?: ResourceStatus;
  tag?: String;
  tags?: String[];
  wixUserId?: String;
}
export enum ResourceStatus {
  UNDEFINED = 'UNDEFINED',
  CREATED = 'CREATED',
  DELETED = 'DELETED',
  UPDATED = 'UPDATED',
}
export enum ResponseType {
  CONSISTENT = 'CONSISTENT',
  EVENTUALLY_CONSISTENT = 'EVENTUALLY_CONSISTENT',
}
export interface Schedule {
  availability?: Availability;
  calendarConference?: CalendarConference;
  capacity?: Int;
  conferenceProvider?: ConferenceProvider;
  created?: Timestamp;
  externalCalendarOverrides?: ExternalCalendarOverrides;
  firstSessionStart?: Timestamp;
  id?: String;
  inheritedFields?: String[];
  intervals?: RecurringInterval[];
  lastSessionEnd?: Timestamp;
  location?: V1Location;
  participants?: Participant[];
  rate?: Rate;
  scheduleOwnerId?: String;
  scheduleOwnerName?: String;
  scheduleOwnerUserId?: String;
  status?: ScheduleStatus;
  tags?: String[];
  timeZone?: String;
  title?: String;
  totalNumberOfParticipants?: Int;
  updated?: Timestamp;
  version?: Int;
  versions?: Version;
}
export enum ScheduleStatus {
  UNDEFINED = 'UNDEFINED',
  CREATED = 'CREATED',
  CANCELLED = 'CANCELLED',
}
export interface SeoSchema {
  settings?: Settings;
  tags?: Tag[];
}
export interface Service {
  advancedSeoData?: SeoSchema;
  bookingFormId?: String;
  categoryId?: String;
  customProperties?: JsonMap<string>;
  id?: String;
  includeConferenceOption?: Boolean;
  info?: ServiceInfo;
  paymentOptions?: PaymentOptions;
  policy?: BookingPolicy;
  scheduleIds?: String[];
  seoData?: SeoSchema;
  sortOrder?: Int;
  status?: ServiceStatus;
}
export interface ServiceInfo {
  description?: String;
  images?: CommonImage[];
  media?: V1Media;
  name?: String;
  tagLine?: String;
}
export enum ServiceStatus {
  CREATED = 'CREATED',
  DELETED = 'DELETED',
}
export interface Settings {
  preventAutoRedirect?: Boolean;
}
export interface Slug {
  createdAt?: Timestamp;
  name?: String;
}
export enum SortOrder {
  ASC = 'ASC',
  DESC = 'DESC',
}
export interface SortOrderUnrecognized {
  value: Int;
}
export interface Sorting {
  fieldName: String;
  order: SortOrder;
}
export interface SpecialHourPeriod {
  comment?: String;
  endDate?: String;
  isClosed?: Boolean;
  startDate?: String;
}
export interface SplitInterval {
  sameAsDuration?: Boolean;
  valueInMinutes?: Int;
}
export interface StringValue {
  value: String;
}
export interface StructListValue {
  values: Value[];
}
export enum StructNullValue {
  NULL_VALUE = 'NULL_VALUE',
}
export interface StructValue {
  value: Struct;
}
export interface Subdivision {
  code?: String;
  name?: String;
}
export interface Tag {
  children?: String;
  custom?: Boolean;
  disabled?: Boolean;
  meta?: JsonMap<any>;
  props?: JsonMap<any>;
  type?: String;
}
export interface TextLabel {
  label?: String;
}
export interface TimePeriod {
  closeDay?: DayOfWeek;
  closeTime?: String;
  openDay?: DayOfWeek;
  openTime?: String;
}
export interface TpaRequestFilter {
  itemTypeIdentifier?: String;
}
export interface TpaSiteStructureRequest {
  filter?: TpaRequestFilter;
  languageMetadata?: LanguageMetadata;
  paging?: CommonCursorPaging;
}
export interface TpaSiteStructureResponse {
  pageData?: CursorPagingMetaData;
  results?: AppItem[];
  totalResults?: Int;
}
export enum Transparency {
  UNDEFINED = 'UNDEFINED',
  FREE = 'FREE',
  BUSY = 'BUSY',
}
export interface URLs {
  bookingPageUrl?: PageUrl;
  servicePageUrl?: PageUrl;
}
export interface V1Location {
  address?: String;
  businessLocation?: LocationsLocation;
  customAddress?: CommonAddress;
  locationType?: LocationLocationType;
}
export interface V1Media {
  coverMedia?: V1MediaItem;
  items?: V1MediaItem[];
  mainMedia?: V1MediaItem;
}
export interface V1MediaItem {
  image?: CommonImage;
}
export interface V2MediaItem {
  height: Int;
  url: String;
  width: Int;
}
export enum ValueType {
  SHORT_TEXT = 'SHORT_TEXT',
  LONG_TEXT = 'LONG_TEXT',
  CHECK_BOX = 'CHECK_BOX',
}
export interface Version {
  participantsVersion?: Int;
  scheduleVersion?: Int;
}
export interface VideoResolution {
  filename?: String;
  format: String;
  height: Int;
  poster?: CommonImage;
  quality?: String;
  sizeInBytes?: String;
  url: String;
  urlExpirationDate?: Timestamp;
  width: Int;
}
export interface VideoV2 {
  filename?: String;
  id: String;
  posters: CommonImage[];
  resolutions: VideoResolution[];
  sizeInBytes?: String;
  url: String;
  urlExpirationDate?: Timestamp;
}
export interface WaitingListPolicy {
  capacity?: Int;
  isEnabled?: Boolean;
  timeWindowMinutes?: Int;
}
export {};
