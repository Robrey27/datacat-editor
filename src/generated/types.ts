import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type AccountFilterInput = {
  credentialsExpired?: InputMaybe<Scalars['Boolean']['input']>;
  expired?: InputMaybe<Scalars['Boolean']['input']>;
  locked?: InputMaybe<Scalars['Boolean']['input']>;
  pageNumber?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  query?: InputMaybe<Scalars['String']['input']>;
};

export enum AccountStatus {
  Admin = 'Admin',
  Unverified = 'Unverified',
  Verified = 'Verified'
}

export type AccountStatusUpdateInput = {
  status: AccountStatus;
  username: Scalars['ID']['input'];
};

export type AccountUpdateInput = {
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  organization: Scalars['String']['input'];
  username: Scalars['ID']['input'];
};

export type AddCommentInput = {
  catalogEntryId: Scalars['ID']['input'];
  comment: TranslationInput;
};

export type AddDescriptionInput = {
  catalogEntryId: Scalars['ID']['input'];
  description: TranslationInput;
};

export type AddNameInput = {
  catalogEntryId: Scalars['ID']['input'];
  name: TranslationInput;
};

export type AddTagInput = {
  catalogEntryId: Scalars['ID']['input'];
  tagId: Scalars['ID']['input'];
};

export type CatalogEntryFilterInput = {
  catalogEntryType?: InputMaybe<CatalogEntryTypeFilterInput>;
  tags?: InputMaybe<TagFilterInput>;
};

/**  inputs */
export type CatalogEntryTypeFilterInput = {
  in?: InputMaybe<Array<CatalogRecordType>>;
};

export enum CatalogRecordType {
  Activity = 'Activity',
  Actor = 'Actor',
  ActsUpon = 'ActsUpon',
  AssignsCollections = 'AssignsCollections',
  AssignsMeasures = 'AssignsMeasures',
  AssignsProperties = 'AssignsProperties',
  AssignsPropertyWithValues = 'AssignsPropertyWithValues',
  AssignsUnits = 'AssignsUnits',
  AssignsValues = 'AssignsValues',
  Associates = 'Associates',
  Bag = 'Bag',
  Classification = 'Classification',
  Collects = 'Collects',
  Composes = 'Composes',
  Documents = 'Documents',
  ExternalDocument = 'ExternalDocument',
  Groups = 'Groups',
  Measure = 'Measure',
  Nest = 'Nest',
  Property = 'Property',
  Sequences = 'Sequences',
  Specializes = 'Specializes',
  Subject = 'Subject',
  Unit = 'Unit',
  Value = 'Value'
}

export type CreateCatalogEntryInput = {
  catalogEntryType: SimpleRecordType;
  properties: PropertiesInput;
  tags?: InputMaybe<Array<Scalars['ID']['input']>>;
};

export type CreateRelationshipInput = {
  fromId: Scalars['ID']['input'];
  properties?: InputMaybe<PropertiesInput>;
  relationshipType: RelationshipRecordType;
  toIds: Array<Scalars['ID']['input']>;
};

export type CreateTagInput = {
  name: Scalars['String']['input'];
  tagId?: InputMaybe<Scalars['ID']['input']>;
};

export type DeleteCatalogEntryInput = {
  catalogEntryId: Scalars['ID']['input'];
};

export type DeleteCommentInput = {
  catalogEntryId: Scalars['ID']['input'];
  commentId: Scalars['ID']['input'];
};

export type DeleteDescriptionInput = {
  catalogEntryId: Scalars['ID']['input'];
  descriptionId: Scalars['ID']['input'];
};

export type DeleteNameInput = {
  catalogEntryId: Scalars['ID']['input'];
  nameId: Scalars['ID']['input'];
};

export type DeleteRelationshipInput = {
  relationshipId: Scalars['ID']['input'];
};

export type DeleteTagInput = {
  tagId: Scalars['ID']['input'];
};

export type FilterInput = {
  idIn?: InputMaybe<Array<Scalars['ID']['input']>>;
  idNotIn?: InputMaybe<Array<Scalars['ID']['input']>>;
  pageNumber?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  query?: InputMaybe<Scalars['String']['input']>;
  tagged?: InputMaybe<Array<Scalars['ID']['input']>>;
};

export type HierarchyFilterInput = {
  rootNodeFilter: HierarchyRootNodeFilterInput;
};

export type HierarchyRootNodeFilterInput = {
  catalogEntryTypeIn?: InputMaybe<Array<CatalogRecordType>>;
  catalogEntryTypeNotIn?: InputMaybe<Array<CatalogRecordType>>;
  idIn?: InputMaybe<Array<Scalars['ID']['input']>>;
  idNotIn?: InputMaybe<Array<Scalars['ID']['input']>>;
  tagged?: InputMaybe<Array<Scalars['ID']['input']>>;
};

/**  Query type */
export type LanguageFilterInput = {
  excludeLanguageTags?: InputMaybe<Array<Scalars['String']['input']>>;
  query?: InputMaybe<Scalars['String']['input']>;
};

export type LocaleInput = {
  languageTag: Scalars['ID']['input'];
};

export type LocalizationInput = {
  languageTags?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type LoginInput = {
  password: Scalars['String']['input'];
  username: Scalars['ID']['input'];
};

export type NominalValueInput = {
  nominalValue?: InputMaybe<Scalars['String']['input']>;
  valueRole: ValueRole;
  valueType: ValueType;
};

export type ProfileUpdateInput = {
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  organization: Scalars['String']['input'];
  username: Scalars['ID']['input'];
};

export type PropertiesInput = {
  comments?: InputMaybe<Array<TranslationInput>>;
  descriptions?: InputMaybe<Array<TranslationInput>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  names: Array<TranslationInput>;
  version?: InputMaybe<VersionInput>;
};

export enum RelationshipRecordType {
  ActsUpon = 'ActsUpon',
  AssignsCollections = 'AssignsCollections',
  AssignsMeasures = 'AssignsMeasures',
  AssignsProperties = 'AssignsProperties',
  AssignsPropertyWithValues = 'AssignsPropertyWithValues',
  AssignsUnits = 'AssignsUnits',
  AssignsValues = 'AssignsValues',
  Associates = 'Associates',
  Collects = 'Collects',
  Composes = 'Composes',
  Documents = 'Documents',
  Groups = 'Groups',
  Sequences = 'Sequences',
  Specializes = 'Specializes'
}

export type RemoveTagInput = {
  catalogEntryId: Scalars['ID']['input'];
  tagId: Scalars['ID']['input'];
};

export type SearchInput = {
  entityTypeIn?: InputMaybe<Array<CatalogRecordType>>;
  entityTypeNotIn?: InputMaybe<Array<CatalogRecordType>>;
  filters?: InputMaybe<Array<CatalogEntryFilterInput>>;
  idIn?: InputMaybe<Array<Scalars['ID']['input']>>;
  idNotIn?: InputMaybe<Array<Scalars['ID']['input']>>;
  pageNumber?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  query?: InputMaybe<Scalars['String']['input']>;
  tagged?: InputMaybe<Array<Scalars['ID']['input']>>;
};

export type SetNominalValueInput = {
  nominalValue: NominalValueInput;
  valueId: Scalars['ID']['input'];
};

export type SetRelatedEntriesInput = {
  relationshipId: Scalars['ID']['input'];
  toIds: Array<Scalars['ID']['input']>;
};

export type SetToleranceInput = {
  tolerance: ToleranceInput;
  valueId: Scalars['ID']['input'];
};

export type SetVersionInput = {
  catalogEntryId: Scalars['ID']['input'];
  version: VersionInput;
};

export type SignupInput = {
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  organization: Scalars['String']['input'];
  password: Scalars['String']['input'];
  username: Scalars['ID']['input'];
};

export enum SimpleRecordType {
  Activity = 'Activity',
  Actor = 'Actor',
  Bag = 'Bag',
  Classification = 'Classification',
  ExternalDocument = 'ExternalDocument',
  Measure = 'Measure',
  Nest = 'Nest',
  Property = 'Property',
  Subject = 'Subject',
  Unit = 'Unit',
  Value = 'Value'
}

export type TagFilterInput = {
  in?: InputMaybe<Array<Scalars['ID']['input']>>;
};

export type ToleranceInput = {
  lowerTolerance?: InputMaybe<Scalars['String']['input']>;
  toleranceType: ToleranceType;
  upperTolerance?: InputMaybe<Scalars['String']['input']>;
};

export enum ToleranceType {
  Percentage = 'Percentage',
  Realvalue = 'Realvalue'
}

export type TranslationInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
  languageTag: Scalars['ID']['input'];
  value: Scalars['String']['input'];
};

export type TranslationUpdateInput = {
  translationId: Scalars['ID']['input'];
  value: Scalars['String']['input'];
};

export type UnsetNominalValueInput = {
  valueId: Scalars['ID']['input'];
};

export type UnsetToleranceInput = {
  valueId: Scalars['ID']['input'];
};

export type UpdateCommentInput = {
  catalogEntryId: Scalars['ID']['input'];
  comment: TranslationUpdateInput;
};

export type UpdateDescriptionInput = {
  catalogEntryId: Scalars['ID']['input'];
  description: TranslationUpdateInput;
};

export type UpdateNameInput = {
  catalogEntryId: Scalars['ID']['input'];
  name: TranslationUpdateInput;
};

export type UpdateTagInput = {
  name: Scalars['String']['input'];
  tagId: Scalars['ID']['input'];
};

export enum ValueRole {
  Maximum = 'Maximum',
  Minimum = 'Minimum',
  Nominal = 'Nominal'
}

export enum ValueType {
  Boolean = 'Boolean',
  Integer = 'Integer',
  Logical = 'Logical',
  Number = 'Number',
  Real = 'Real',
  String = 'String'
}

export type VersionInput = {
  versionDate?: InputMaybe<Scalars['String']['input']>;
  versionId?: InputMaybe<Scalars['String']['input']>;
};

export type FindMissingDescriptionFilterInput = {
  nodeTypeFilter: FindMissingDescriptionNodeTypeFilterInput;
};

export type FindMissingDescriptionNodeTypeFilterInput = {
  catalogEntryTypeIn?: InputMaybe<Array<CatalogRecordType>>;
};

export type FindMissingEnglishDescriptionFilterInput = {
  nodeTypeFilter: FindMissingEnglishDescriptionNodeTypeFilterInput;
};

export type FindMissingEnglishDescriptionNodeTypeFilterInput = {
  catalogEntryTypeIn?: InputMaybe<Array<CatalogRecordType>>;
};

export type FindMissingEnglishNameFilterInput = {
  nodeTypeFilter: FindMissingEnglishNameNodeTypeFilterInput;
};

export type FindMissingEnglishNameNodeTypeFilterInput = {
  catalogEntryTypeIn?: InputMaybe<Array<CatalogRecordType>>;
};

export type FindMissingTagsFilterInput = {
  nodeTypeFilter: FindMissingTagsNodeTypeFilterInput;
};

export type FindMissingTagsNodeTypeFilterInput = {
  catalogEntryTypeIn?: InputMaybe<Array<CatalogRecordType>>;
};

export type FindMultipleIDsFilterInput = {
  nodeTypeFilter: FindMultipleIDsNodeTypeFilterInput;
};

export type FindMultipleIDsNodeTypeFilterInput = {
  catalogEntryTypeIn?: InputMaybe<Array<CatalogRecordType>>;
};

export type FindMultipleNamesAcrossClassesFilterInput = {
  nodeTypeFilter: FindMultipleNamesAcrossClassesNodeTypeFilterInput;
};

export type FindMultipleNamesAcrossClassesNodeTypeFilterInput = {
  catalogEntryTypeIn?: InputMaybe<Array<CatalogRecordType>>;
};

export type FindMultipleNamesFilterInput = {
  nodeTypeFilter: FindMultipleNamesNodeTypeFilterInput;
};

export type FindMultipleNamesNodeTypeFilterInput = {
  catalogEntryTypeIn?: InputMaybe<Array<CatalogRecordType>>;
};

export type UserProfileFragment = { username: string, firstName: string, lastName: string, email: string, organization: string };

export type PagePropsFragment = { totalPages: number, pageNumber: number, hasNext: boolean, hasPrevious: boolean };

export type LanguagePropsFragment = { id: string, languageTag: string, displayCountry: string, displayLanguage: string };

export type TranslationPropsFragment = { id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } };

export type TagPropsFragment = { id: string, name: string };

type ItemProps_XtdActivity_Fragment = { __typename: 'XtdActivity', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> };

type ItemProps_XtdActor_Fragment = { __typename: 'XtdActor', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> };

type ItemProps_XtdBag_Fragment = { __typename: 'XtdBag', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> };

type ItemProps_XtdClassification_Fragment = { __typename: 'XtdClassification', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> };

type ItemProps_XtdExternalDocument_Fragment = { __typename: 'XtdExternalDocument', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> };

type ItemProps_XtdMeasureWithUnit_Fragment = { __typename: 'XtdMeasureWithUnit', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> };

type ItemProps_XtdNest_Fragment = { __typename: 'XtdNest', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> };

type ItemProps_XtdProperty_Fragment = { __typename: 'XtdProperty', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> };

type ItemProps_XtdRelActsUpon_Fragment = { __typename: 'XtdRelActsUpon', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> };

type ItemProps_XtdRelAssignsCollections_Fragment = { __typename: 'XtdRelAssignsCollections', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> };

type ItemProps_XtdRelAssignsMeasures_Fragment = { __typename: 'XtdRelAssignsMeasures', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> };

type ItemProps_XtdRelAssignsProperties_Fragment = { __typename: 'XtdRelAssignsProperties', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> };

type ItemProps_XtdRelAssignsPropertyWithValues_Fragment = { __typename: 'XtdRelAssignsPropertyWithValues', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> };

type ItemProps_XtdRelAssignsUnits_Fragment = { __typename: 'XtdRelAssignsUnits', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> };

type ItemProps_XtdRelAssignsValues_Fragment = { __typename: 'XtdRelAssignsValues', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> };

type ItemProps_XtdRelAssociates_Fragment = { __typename: 'XtdRelAssociates', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> };

type ItemProps_XtdRelCollects_Fragment = { __typename: 'XtdRelCollects', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> };

type ItemProps_XtdRelComposes_Fragment = { __typename: 'XtdRelComposes', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> };

type ItemProps_XtdRelDocuments_Fragment = { __typename: 'XtdRelDocuments', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> };

type ItemProps_XtdRelGroups_Fragment = { __typename: 'XtdRelGroups', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> };

type ItemProps_XtdRelSequences_Fragment = { __typename: 'XtdRelSequences', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> };

type ItemProps_XtdRelSpecializes_Fragment = { __typename: 'XtdRelSpecializes', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> };

type ItemProps_XtdSubject_Fragment = { __typename: 'XtdSubject', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> };

type ItemProps_XtdUnit_Fragment = { __typename: 'XtdUnit', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> };

type ItemProps_XtdValue_Fragment = { __typename: 'XtdValue', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> };

export type ItemPropsFragment = ItemProps_XtdActivity_Fragment | ItemProps_XtdActor_Fragment | ItemProps_XtdBag_Fragment | ItemProps_XtdClassification_Fragment | ItemProps_XtdExternalDocument_Fragment | ItemProps_XtdMeasureWithUnit_Fragment | ItemProps_XtdNest_Fragment | ItemProps_XtdProperty_Fragment | ItemProps_XtdRelActsUpon_Fragment | ItemProps_XtdRelAssignsCollections_Fragment | ItemProps_XtdRelAssignsMeasures_Fragment | ItemProps_XtdRelAssignsProperties_Fragment | ItemProps_XtdRelAssignsPropertyWithValues_Fragment | ItemProps_XtdRelAssignsUnits_Fragment | ItemProps_XtdRelAssignsValues_Fragment | ItemProps_XtdRelAssociates_Fragment | ItemProps_XtdRelCollects_Fragment | ItemProps_XtdRelComposes_Fragment | ItemProps_XtdRelDocuments_Fragment | ItemProps_XtdRelGroups_Fragment | ItemProps_XtdRelSequences_Fragment | ItemProps_XtdRelSpecializes_Fragment | ItemProps_XtdSubject_Fragment | ItemProps_XtdUnit_Fragment | ItemProps_XtdValue_Fragment;

export type SearchResultPropsFragment = { __typename: 'SearchResult', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> };

export type FindTagsResultFragment = { id: string, name: string };

type ConceptProps_XtdActivity_Fragment = { __typename: 'XtdActivity', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> };

type ConceptProps_XtdActor_Fragment = { __typename: 'XtdActor', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> };

type ConceptProps_XtdBag_Fragment = { __typename: 'XtdBag', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> };

type ConceptProps_XtdClassification_Fragment = { __typename: 'XtdClassification', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> };

type ConceptProps_XtdExternalDocument_Fragment = { __typename: 'XtdExternalDocument', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> };

type ConceptProps_XtdMeasureWithUnit_Fragment = { __typename: 'XtdMeasureWithUnit', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> };

type ConceptProps_XtdNest_Fragment = { __typename: 'XtdNest', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> };

type ConceptProps_XtdProperty_Fragment = { __typename: 'XtdProperty', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> };

type ConceptProps_XtdRelActsUpon_Fragment = { __typename: 'XtdRelActsUpon', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> };

type ConceptProps_XtdRelAssignsCollections_Fragment = { __typename: 'XtdRelAssignsCollections', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> };

type ConceptProps_XtdRelAssignsMeasures_Fragment = { __typename: 'XtdRelAssignsMeasures', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> };

type ConceptProps_XtdRelAssignsProperties_Fragment = { __typename: 'XtdRelAssignsProperties', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> };

type ConceptProps_XtdRelAssignsPropertyWithValues_Fragment = { __typename: 'XtdRelAssignsPropertyWithValues', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> };

type ConceptProps_XtdRelAssignsUnits_Fragment = { __typename: 'XtdRelAssignsUnits', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> };

type ConceptProps_XtdRelAssignsValues_Fragment = { __typename: 'XtdRelAssignsValues', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> };

type ConceptProps_XtdRelAssociates_Fragment = { __typename: 'XtdRelAssociates', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> };

type ConceptProps_XtdRelCollects_Fragment = { __typename: 'XtdRelCollects', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> };

type ConceptProps_XtdRelComposes_Fragment = { __typename: 'XtdRelComposes', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> };

type ConceptProps_XtdRelDocuments_Fragment = { __typename: 'XtdRelDocuments', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> };

type ConceptProps_XtdRelGroups_Fragment = { __typename: 'XtdRelGroups', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> };

type ConceptProps_XtdRelSequences_Fragment = { __typename: 'XtdRelSequences', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> };

type ConceptProps_XtdRelSpecializes_Fragment = { __typename: 'XtdRelSpecializes', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> };

type ConceptProps_XtdSubject_Fragment = { __typename: 'XtdSubject', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> };

type ConceptProps_XtdUnit_Fragment = { __typename: 'XtdUnit', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> };

type ConceptProps_XtdValue_Fragment = { __typename: 'XtdValue', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> };

export type ConceptPropsFragment = ConceptProps_XtdActivity_Fragment | ConceptProps_XtdActor_Fragment | ConceptProps_XtdBag_Fragment | ConceptProps_XtdClassification_Fragment | ConceptProps_XtdExternalDocument_Fragment | ConceptProps_XtdMeasureWithUnit_Fragment | ConceptProps_XtdNest_Fragment | ConceptProps_XtdProperty_Fragment | ConceptProps_XtdRelActsUpon_Fragment | ConceptProps_XtdRelAssignsCollections_Fragment | ConceptProps_XtdRelAssignsMeasures_Fragment | ConceptProps_XtdRelAssignsProperties_Fragment | ConceptProps_XtdRelAssignsPropertyWithValues_Fragment | ConceptProps_XtdRelAssignsUnits_Fragment | ConceptProps_XtdRelAssignsValues_Fragment | ConceptProps_XtdRelAssociates_Fragment | ConceptProps_XtdRelCollects_Fragment | ConceptProps_XtdRelComposes_Fragment | ConceptProps_XtdRelDocuments_Fragment | ConceptProps_XtdRelGroups_Fragment | ConceptProps_XtdRelSequences_Fragment | ConceptProps_XtdRelSpecializes_Fragment | ConceptProps_XtdSubject_Fragment | ConceptProps_XtdUnit_Fragment | ConceptProps_XtdValue_Fragment;

export type ExternalDocumentPropsFragment = { __typename: 'XtdExternalDocument', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> };

export type ValuePropsFragment = { __typename: 'XtdValue', valueType?: ValueType | null, valueRole?: ValueRole | null, nominalValue?: string | null, toleranceType?: ToleranceType | null, lowerTolerance?: string | null, upperTolerance?: string | null, versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> };

type CollectionProps_XtdBag_Fragment = { __typename: 'XtdBag', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> };

type CollectionProps_XtdNest_Fragment = { __typename: 'XtdNest', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> };

export type CollectionPropsFragment = CollectionProps_XtdBag_Fragment | CollectionProps_XtdNest_Fragment;

type RelationshipProps_XtdRelActsUpon_Fragment = { __typename: 'XtdRelActsUpon', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> };

type RelationshipProps_XtdRelAssignsCollections_Fragment = { __typename: 'XtdRelAssignsCollections', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> };

type RelationshipProps_XtdRelAssignsMeasures_Fragment = { __typename: 'XtdRelAssignsMeasures', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> };

type RelationshipProps_XtdRelAssignsProperties_Fragment = { __typename: 'XtdRelAssignsProperties', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> };

type RelationshipProps_XtdRelAssignsPropertyWithValues_Fragment = { __typename: 'XtdRelAssignsPropertyWithValues', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> };

type RelationshipProps_XtdRelAssignsUnits_Fragment = { __typename: 'XtdRelAssignsUnits', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> };

type RelationshipProps_XtdRelAssignsValues_Fragment = { __typename: 'XtdRelAssignsValues', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> };

type RelationshipProps_XtdRelAssociates_Fragment = { __typename: 'XtdRelAssociates', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> };

type RelationshipProps_XtdRelCollects_Fragment = { __typename: 'XtdRelCollects', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> };

type RelationshipProps_XtdRelComposes_Fragment = { __typename: 'XtdRelComposes', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> };

type RelationshipProps_XtdRelDocuments_Fragment = { __typename: 'XtdRelDocuments', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> };

type RelationshipProps_XtdRelGroups_Fragment = { __typename: 'XtdRelGroups', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> };

type RelationshipProps_XtdRelSequences_Fragment = { __typename: 'XtdRelSequences', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> };

type RelationshipProps_XtdRelSpecializes_Fragment = { __typename: 'XtdRelSpecializes', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> };

export type RelationshipPropsFragment = RelationshipProps_XtdRelActsUpon_Fragment | RelationshipProps_XtdRelAssignsCollections_Fragment | RelationshipProps_XtdRelAssignsMeasures_Fragment | RelationshipProps_XtdRelAssignsProperties_Fragment | RelationshipProps_XtdRelAssignsPropertyWithValues_Fragment | RelationshipProps_XtdRelAssignsUnits_Fragment | RelationshipProps_XtdRelAssignsValues_Fragment | RelationshipProps_XtdRelAssociates_Fragment | RelationshipProps_XtdRelCollects_Fragment | RelationshipProps_XtdRelComposes_Fragment | RelationshipProps_XtdRelDocuments_Fragment | RelationshipProps_XtdRelGroups_Fragment | RelationshipProps_XtdRelSequences_Fragment | RelationshipProps_XtdRelSpecializes_Fragment;

export type DocumentsPropsFragment = { __typename: 'XtdRelDocuments', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, relatingDocument: { __typename: 'XtdExternalDocument', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> }, relatedThings: Array<{ __typename: 'XtdActivity', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdActor', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdBag', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdClassification', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdMeasureWithUnit', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdNest', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdProperty', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdSubject', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdUnit', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdValue', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> }>, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> };

export type CollectsPropsFragment = { __typename: 'XtdRelCollects', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, relatingCollection: { __typename: 'XtdBag', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdNest', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> }, relatedThings: Array<{ __typename: 'XtdActivity', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdActor', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdBag', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdClassification', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdMeasureWithUnit', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdNest', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdProperty', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdSubject', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdUnit', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdValue', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> }>, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> };

export type AssignsCollectionsPropsFragment = { __typename: 'XtdRelAssignsCollections', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, relatingObject: { __typename: 'XtdActivity', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdActor', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdClassification', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdMeasureWithUnit', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdProperty', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdSubject', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdUnit', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdValue', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> }, relatedCollections: Array<{ __typename: 'XtdBag', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdNest', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> }>, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> };

export type AssignsPropertiesPropsFragment = { __typename: 'XtdRelAssignsProperties', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, relatingObject: { __typename: 'XtdActivity', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdActor', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdClassification', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdMeasureWithUnit', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdProperty', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdSubject', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdUnit', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdValue', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> }, relatedProperties: Array<{ __typename: 'XtdProperty', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> }>, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> };

export type AssignsMeasuresPropsFragment = { __typename: 'XtdRelAssignsMeasures', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, relatingProperty: { __typename: 'XtdProperty', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> }, relatedMeasures: Array<{ __typename: 'XtdMeasureWithUnit', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> }>, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> };

export type AssignsUnitsPropsFragment = { __typename: 'XtdRelAssignsUnits', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, relatingMeasure: { __typename: 'XtdMeasureWithUnit', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> }, relatedUnits: Array<{ __typename: 'XtdUnit', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> }>, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> };

export type AssignsValuesPropsFragment = { __typename: 'XtdRelAssignsValues', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, relatingMeasure: { __typename: 'XtdMeasureWithUnit', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> }, relatedValues: Array<{ __typename: 'XtdValue', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> }>, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> };

type MetaProps_XtdActivity_Fragment = { created: string, createdBy: string, lastModified: string, lastModifiedBy: string };

type MetaProps_XtdActor_Fragment = { created: string, createdBy: string, lastModified: string, lastModifiedBy: string };

type MetaProps_XtdBag_Fragment = { created: string, createdBy: string, lastModified: string, lastModifiedBy: string };

type MetaProps_XtdClassification_Fragment = { created: string, createdBy: string, lastModified: string, lastModifiedBy: string };

type MetaProps_XtdExternalDocument_Fragment = { created: string, createdBy: string, lastModified: string, lastModifiedBy: string };

type MetaProps_XtdMeasureWithUnit_Fragment = { created: string, createdBy: string, lastModified: string, lastModifiedBy: string };

type MetaProps_XtdNest_Fragment = { created: string, createdBy: string, lastModified: string, lastModifiedBy: string };

type MetaProps_XtdProperty_Fragment = { created: string, createdBy: string, lastModified: string, lastModifiedBy: string };

type MetaProps_XtdRelActsUpon_Fragment = { created: string, createdBy: string, lastModified: string, lastModifiedBy: string };

type MetaProps_XtdRelAssignsCollections_Fragment = { created: string, createdBy: string, lastModified: string, lastModifiedBy: string };

type MetaProps_XtdRelAssignsMeasures_Fragment = { created: string, createdBy: string, lastModified: string, lastModifiedBy: string };

type MetaProps_XtdRelAssignsProperties_Fragment = { created: string, createdBy: string, lastModified: string, lastModifiedBy: string };

type MetaProps_XtdRelAssignsPropertyWithValues_Fragment = { created: string, createdBy: string, lastModified: string, lastModifiedBy: string };

type MetaProps_XtdRelAssignsUnits_Fragment = { created: string, createdBy: string, lastModified: string, lastModifiedBy: string };

type MetaProps_XtdRelAssignsValues_Fragment = { created: string, createdBy: string, lastModified: string, lastModifiedBy: string };

type MetaProps_XtdRelAssociates_Fragment = { created: string, createdBy: string, lastModified: string, lastModifiedBy: string };

type MetaProps_XtdRelCollects_Fragment = { created: string, createdBy: string, lastModified: string, lastModifiedBy: string };

type MetaProps_XtdRelComposes_Fragment = { created: string, createdBy: string, lastModified: string, lastModifiedBy: string };

type MetaProps_XtdRelDocuments_Fragment = { created: string, createdBy: string, lastModified: string, lastModifiedBy: string };

type MetaProps_XtdRelGroups_Fragment = { created: string, createdBy: string, lastModified: string, lastModifiedBy: string };

type MetaProps_XtdRelSequences_Fragment = { created: string, createdBy: string, lastModified: string, lastModifiedBy: string };

type MetaProps_XtdRelSpecializes_Fragment = { created: string, createdBy: string, lastModified: string, lastModifiedBy: string };

type MetaProps_XtdSubject_Fragment = { created: string, createdBy: string, lastModified: string, lastModifiedBy: string };

type MetaProps_XtdUnit_Fragment = { created: string, createdBy: string, lastModified: string, lastModifiedBy: string };

type MetaProps_XtdValue_Fragment = { created: string, createdBy: string, lastModified: string, lastModifiedBy: string };

export type MetaPropsFragment = MetaProps_XtdActivity_Fragment | MetaProps_XtdActor_Fragment | MetaProps_XtdBag_Fragment | MetaProps_XtdClassification_Fragment | MetaProps_XtdExternalDocument_Fragment | MetaProps_XtdMeasureWithUnit_Fragment | MetaProps_XtdNest_Fragment | MetaProps_XtdProperty_Fragment | MetaProps_XtdRelActsUpon_Fragment | MetaProps_XtdRelAssignsCollections_Fragment | MetaProps_XtdRelAssignsMeasures_Fragment | MetaProps_XtdRelAssignsProperties_Fragment | MetaProps_XtdRelAssignsPropertyWithValues_Fragment | MetaProps_XtdRelAssignsUnits_Fragment | MetaProps_XtdRelAssignsValues_Fragment | MetaProps_XtdRelAssociates_Fragment | MetaProps_XtdRelCollects_Fragment | MetaProps_XtdRelComposes_Fragment | MetaProps_XtdRelDocuments_Fragment | MetaProps_XtdRelGroups_Fragment | MetaProps_XtdRelSequences_Fragment | MetaProps_XtdRelSpecializes_Fragment | MetaProps_XtdSubject_Fragment | MetaProps_XtdUnit_Fragment | MetaProps_XtdValue_Fragment;

export type ExternalDocumentDetailPropsFragment = { __typename: 'XtdExternalDocument', created: string, createdBy: string, lastModified: string, lastModifiedBy: string, versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, documents: { nodes: Array<{ __typename: 'XtdRelDocuments', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, relatingDocument: { __typename: 'XtdExternalDocument', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> }, relatedThings: Array<{ __typename: 'XtdActivity', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdActor', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdBag', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdClassification', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdMeasureWithUnit', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdNest', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdProperty', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdSubject', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdUnit', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdValue', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> }>, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> }> }, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> };

type ObjectDetailProps_XtdActivity_Fragment = { __typename: 'XtdActivity', created: string, createdBy: string, lastModified: string, lastModifiedBy: string, versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, documentedBy: { nodes: Array<{ __typename: 'XtdRelDocuments', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, relatingDocument: { __typename: 'XtdExternalDocument', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> }, relatedThings: Array<{ __typename: 'XtdActivity', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdActor', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdBag', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdClassification', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdMeasureWithUnit', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdNest', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdProperty', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdSubject', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdUnit', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdValue', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> }>, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> }> }, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> };

type ObjectDetailProps_XtdActor_Fragment = { __typename: 'XtdActor', created: string, createdBy: string, lastModified: string, lastModifiedBy: string, versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, documentedBy: { nodes: Array<{ __typename: 'XtdRelDocuments', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, relatingDocument: { __typename: 'XtdExternalDocument', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> }, relatedThings: Array<{ __typename: 'XtdActivity', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdActor', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdBag', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdClassification', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdMeasureWithUnit', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdNest', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdProperty', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdSubject', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdUnit', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdValue', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> }>, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> }> }, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> };

type ObjectDetailProps_XtdClassification_Fragment = { __typename: 'XtdClassification', created: string, createdBy: string, lastModified: string, lastModifiedBy: string, versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, documentedBy: { nodes: Array<{ __typename: 'XtdRelDocuments', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, relatingDocument: { __typename: 'XtdExternalDocument', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> }, relatedThings: Array<{ __typename: 'XtdActivity', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdActor', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdBag', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdClassification', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdMeasureWithUnit', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdNest', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdProperty', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdSubject', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdUnit', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdValue', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> }>, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> }> }, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> };

type ObjectDetailProps_XtdMeasureWithUnit_Fragment = { __typename: 'XtdMeasureWithUnit', created: string, createdBy: string, lastModified: string, lastModifiedBy: string, versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, documentedBy: { nodes: Array<{ __typename: 'XtdRelDocuments', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, relatingDocument: { __typename: 'XtdExternalDocument', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> }, relatedThings: Array<{ __typename: 'XtdActivity', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdActor', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdBag', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdClassification', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdMeasureWithUnit', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdNest', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdProperty', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdSubject', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdUnit', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdValue', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> }>, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> }> }, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> };

type ObjectDetailProps_XtdProperty_Fragment = { __typename: 'XtdProperty', created: string, createdBy: string, lastModified: string, lastModifiedBy: string, versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, documentedBy: { nodes: Array<{ __typename: 'XtdRelDocuments', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, relatingDocument: { __typename: 'XtdExternalDocument', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> }, relatedThings: Array<{ __typename: 'XtdActivity', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdActor', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdBag', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdClassification', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdMeasureWithUnit', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdNest', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdProperty', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdSubject', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdUnit', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdValue', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> }>, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> }> }, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> };

type ObjectDetailProps_XtdSubject_Fragment = { __typename: 'XtdSubject', created: string, createdBy: string, lastModified: string, lastModifiedBy: string, versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, documentedBy: { nodes: Array<{ __typename: 'XtdRelDocuments', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, relatingDocument: { __typename: 'XtdExternalDocument', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> }, relatedThings: Array<{ __typename: 'XtdActivity', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdActor', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdBag', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdClassification', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdMeasureWithUnit', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdNest', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdProperty', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdSubject', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdUnit', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdValue', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> }>, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> }> }, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> };

type ObjectDetailProps_XtdUnit_Fragment = { __typename: 'XtdUnit', created: string, createdBy: string, lastModified: string, lastModifiedBy: string, versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, documentedBy: { nodes: Array<{ __typename: 'XtdRelDocuments', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, relatingDocument: { __typename: 'XtdExternalDocument', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> }, relatedThings: Array<{ __typename: 'XtdActivity', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdActor', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdBag', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdClassification', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdMeasureWithUnit', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdNest', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdProperty', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdSubject', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdUnit', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdValue', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> }>, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> }> }, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> };

type ObjectDetailProps_XtdValue_Fragment = { __typename: 'XtdValue', created: string, createdBy: string, lastModified: string, lastModifiedBy: string, versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, documentedBy: { nodes: Array<{ __typename: 'XtdRelDocuments', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, relatingDocument: { __typename: 'XtdExternalDocument', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> }, relatedThings: Array<{ __typename: 'XtdActivity', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdActor', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdBag', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdClassification', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdMeasureWithUnit', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdNest', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdProperty', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdSubject', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdUnit', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdValue', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> }>, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> }> }, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> };

export type ObjectDetailPropsFragment = ObjectDetailProps_XtdActivity_Fragment | ObjectDetailProps_XtdActor_Fragment | ObjectDetailProps_XtdClassification_Fragment | ObjectDetailProps_XtdMeasureWithUnit_Fragment | ObjectDetailProps_XtdProperty_Fragment | ObjectDetailProps_XtdSubject_Fragment | ObjectDetailProps_XtdUnit_Fragment | ObjectDetailProps_XtdValue_Fragment;

export type SubjectDetailPropsFragment = { __typename: 'XtdSubject', created: string, createdBy: string, lastModified: string, lastModifiedBy: string, versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, assignedCollections: { nodes: Array<{ __typename: 'XtdRelAssignsCollections', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, relatingObject: { __typename: 'XtdActivity', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdActor', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdClassification', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdMeasureWithUnit', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdProperty', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdSubject', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdUnit', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdValue', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> }, relatedCollections: Array<{ __typename: 'XtdBag', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdNest', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> }>, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> }> }, assignedProperties: { nodes: Array<{ __typename: 'XtdRelAssignsProperties', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, relatingObject: { __typename: 'XtdActivity', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdActor', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdClassification', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdMeasureWithUnit', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdProperty', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdSubject', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdUnit', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdValue', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> }, relatedProperties: Array<{ __typename: 'XtdProperty', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> }>, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> }> }, collectedBy: { nodes: Array<{ __typename: 'XtdRelCollects', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, relatingCollection: { __typename: 'XtdBag', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdNest', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> }, relatedThings: Array<{ __typename: 'XtdActivity', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdActor', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdBag', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdClassification', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdMeasureWithUnit', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdNest', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdProperty', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdSubject', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdUnit', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdValue', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> }>, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> }> }, properties: Array<{ id: string, name?: string | null, description?: string | null, comment?: string | null, assignedMeasures: { nodes: Array<{ id: string, relatedMeasures: Array<{ id: string, name?: string | null, description?: string | null, comment?: string | null, assignedValues: { nodes: Array<{ id: string, relatedValues: Array<{ id: string, name?: string | null, description?: string | null, comment?: string | null, nominalValue?: string | null }> }> } }> }> } }>, documentedBy: { nodes: Array<{ __typename: 'XtdRelDocuments', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, relatingDocument: { __typename: 'XtdExternalDocument', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> }, relatedThings: Array<{ __typename: 'XtdActivity', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdActor', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdBag', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdClassification', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdMeasureWithUnit', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdNest', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdProperty', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdSubject', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdUnit', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdValue', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> }>, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> }> }, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> };

export type PropertyDetailPropsFragment = { __typename: 'XtdProperty', created: string, createdBy: string, lastModified: string, lastModifiedBy: string, versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, assignedMeasures: { nodes: Array<{ __typename: 'XtdRelAssignsMeasures', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, relatingProperty: { __typename: 'XtdProperty', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> }, relatedMeasures: Array<{ __typename: 'XtdMeasureWithUnit', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> }>, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> }> }, assignedTo: { nodes: Array<{ __typename: 'XtdRelAssignsProperties', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, relatingObject: { __typename: 'XtdActivity', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdActor', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdClassification', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdMeasureWithUnit', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdProperty', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdSubject', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdUnit', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdValue', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> }, relatedProperties: Array<{ __typename: 'XtdProperty', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> }>, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> }> }, collectedBy: { nodes: Array<{ __typename: 'XtdRelCollects', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, relatingCollection: { __typename: 'XtdBag', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdNest', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> }, relatedThings: Array<{ __typename: 'XtdActivity', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdActor', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdBag', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdClassification', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdMeasureWithUnit', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdNest', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdProperty', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdSubject', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdUnit', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdValue', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> }>, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> }> }, documentedBy: { nodes: Array<{ __typename: 'XtdRelDocuments', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, relatingDocument: { __typename: 'XtdExternalDocument', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> }, relatedThings: Array<{ __typename: 'XtdActivity', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdActor', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdBag', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdClassification', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdMeasureWithUnit', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdNest', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdProperty', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdSubject', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdUnit', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdValue', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> }>, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> }> }, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> };

export type MeasureDetailPropsFragment = { __typename: 'XtdMeasureWithUnit', created: string, createdBy: string, lastModified: string, lastModifiedBy: string, versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, assignedTo: { nodes: Array<{ __typename: 'XtdRelAssignsMeasures', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, relatingProperty: { __typename: 'XtdProperty', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> }, relatedMeasures: Array<{ __typename: 'XtdMeasureWithUnit', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> }>, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> }> }, assignedUnits: { nodes: Array<{ __typename: 'XtdRelAssignsUnits', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, relatingMeasure: { __typename: 'XtdMeasureWithUnit', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> }, relatedUnits: Array<{ __typename: 'XtdUnit', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> }>, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> }> }, assignedValues: { nodes: Array<{ __typename: 'XtdRelAssignsValues', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, relatingMeasure: { __typename: 'XtdMeasureWithUnit', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> }, relatedValues: Array<{ __typename: 'XtdValue', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> }>, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> }> }, documentedBy: { nodes: Array<{ __typename: 'XtdRelDocuments', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, relatingDocument: { __typename: 'XtdExternalDocument', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> }, relatedThings: Array<{ __typename: 'XtdActivity', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdActor', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdBag', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdClassification', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdMeasureWithUnit', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdNest', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdProperty', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdSubject', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdUnit', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdValue', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> }>, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> }> }, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> };

export type UnitDetailPropsFragment = { __typename: 'XtdUnit', created: string, createdBy: string, lastModified: string, lastModifiedBy: string, versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, assignedTo: { nodes: Array<{ __typename: 'XtdRelAssignsUnits', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, relatingMeasure: { __typename: 'XtdMeasureWithUnit', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> }, relatedUnits: Array<{ __typename: 'XtdUnit', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> }>, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> }> }, documentedBy: { nodes: Array<{ __typename: 'XtdRelDocuments', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, relatingDocument: { __typename: 'XtdExternalDocument', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> }, relatedThings: Array<{ __typename: 'XtdActivity', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdActor', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdBag', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdClassification', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdMeasureWithUnit', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdNest', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdProperty', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdSubject', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdUnit', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdValue', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> }>, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> }> }, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> };

export type ValueDetailPropsFragment = { __typename: 'XtdValue', valueType?: ValueType | null, valueRole?: ValueRole | null, nominalValue?: string | null, toleranceType?: ToleranceType | null, lowerTolerance?: string | null, upperTolerance?: string | null, created: string, createdBy: string, lastModified: string, lastModifiedBy: string, versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, assignedTo: { nodes: Array<{ __typename: 'XtdRelAssignsValues', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, relatingMeasure: { __typename: 'XtdMeasureWithUnit', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> }, relatedValues: Array<{ __typename: 'XtdValue', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> }>, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> }> }, documentedBy: { nodes: Array<{ __typename: 'XtdRelDocuments', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, relatingDocument: { __typename: 'XtdExternalDocument', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> }, relatedThings: Array<{ __typename: 'XtdActivity', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdActor', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdBag', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdClassification', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdMeasureWithUnit', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdNest', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdProperty', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdSubject', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdUnit', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdValue', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> }>, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> }> }, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> };

type CollectionDetailProps_XtdBag_Fragment = { __typename: 'XtdBag', created: string, createdBy: string, lastModified: string, lastModifiedBy: string, versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, collects: { nodes: Array<{ __typename: 'XtdRelCollects', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, relatingCollection: { __typename: 'XtdBag', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdNest', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> }, relatedThings: Array<{ __typename: 'XtdActivity', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdActor', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdBag', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdClassification', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdMeasureWithUnit', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdNest', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdProperty', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdSubject', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdUnit', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdValue', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> }>, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> }> }, assignedTo: { nodes: Array<{ __typename: 'XtdRelAssignsCollections', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, relatingObject: { __typename: 'XtdActivity', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdActor', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdClassification', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdMeasureWithUnit', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdProperty', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdSubject', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdUnit', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdValue', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> }, relatedCollections: Array<{ __typename: 'XtdBag', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdNest', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> }>, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> }> }, collectedBy: { nodes: Array<{ __typename: 'XtdRelCollects', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, relatingCollection: { __typename: 'XtdBag', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdNest', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> }, relatedThings: Array<{ __typename: 'XtdActivity', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdActor', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdBag', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdClassification', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdMeasureWithUnit', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdNest', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdProperty', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdSubject', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdUnit', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdValue', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> }>, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> }> }, documentedBy: { nodes: Array<{ __typename: 'XtdRelDocuments', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, relatingDocument: { __typename: 'XtdExternalDocument', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> }, relatedThings: Array<{ __typename: 'XtdActivity', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdActor', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdBag', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdClassification', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdMeasureWithUnit', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdNest', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdProperty', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdSubject', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdUnit', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdValue', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> }>, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> }> }, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> };

type CollectionDetailProps_XtdNest_Fragment = { __typename: 'XtdNest', created: string, createdBy: string, lastModified: string, lastModifiedBy: string, versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, collects: { nodes: Array<{ __typename: 'XtdRelCollects', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, relatingCollection: { __typename: 'XtdBag', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdNest', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> }, relatedThings: Array<{ __typename: 'XtdActivity', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdActor', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdBag', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdClassification', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdMeasureWithUnit', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdNest', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdProperty', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdSubject', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdUnit', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdValue', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> }>, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> }> }, assignedTo: { nodes: Array<{ __typename: 'XtdRelAssignsCollections', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, relatingObject: { __typename: 'XtdActivity', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdActor', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdClassification', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdMeasureWithUnit', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdProperty', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdSubject', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdUnit', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdValue', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> }, relatedCollections: Array<{ __typename: 'XtdBag', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdNest', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> }>, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> }> }, collectedBy: { nodes: Array<{ __typename: 'XtdRelCollects', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, relatingCollection: { __typename: 'XtdBag', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdNest', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> }, relatedThings: Array<{ __typename: 'XtdActivity', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdActor', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdBag', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdClassification', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdMeasureWithUnit', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdNest', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdProperty', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdSubject', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdUnit', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdValue', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> }>, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> }> }, documentedBy: { nodes: Array<{ __typename: 'XtdRelDocuments', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, relatingDocument: { __typename: 'XtdExternalDocument', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> }, relatedThings: Array<{ __typename: 'XtdActivity', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdActor', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdBag', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdClassification', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdMeasureWithUnit', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdNest', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdProperty', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdSubject', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdUnit', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdValue', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> }>, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> }> }, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> };

export type CollectionDetailPropsFragment = CollectionDetailProps_XtdBag_Fragment | CollectionDetailProps_XtdNest_Fragment;

export type ExportCatalogRecord_FragmentFragment = { id: string, typ?: string | null, schlagworte?: string | null, name?: string | null, name_en?: string | null, description?: string | null, versionId?: string | null, created?: string | null, createdBy?: string | null, lastModified?: string | null, lastModifiedBy?: string | null };

export type ExportCatalogRecordRelationship_FragmentFragment = { Entity1: string, Entity1Type: string, RelationId: string, RelationshipType: string, Entity2: string, Entity2Type: string };

export type FindTagsResultFragmentFragment = { id: string, name: string };

export type SignupFormMutationVariables = Exact<{
  profile: SignupInput;
}>;


export type SignupFormMutation = { success?: boolean | null };

export type ConfirmEmailMutationVariables = Exact<{
  token: Scalars['String']['input'];
}>;


export type ConfirmEmailMutation = { success?: boolean | null };

export type LoginFormMutationVariables = Exact<{
  credentials: LoginInput;
}>;


export type LoginFormMutation = { token?: string | null };

export type UpdateProfileMutationVariables = Exact<{
  input: ProfileUpdateInput;
}>;


export type UpdateProfileMutation = { updateProfile: { username: string, firstName: string, lastName: string, email: string, organization: string } };

export type CreateEntryMutationVariables = Exact<{
  input: CreateCatalogEntryInput;
}>;


export type CreateEntryMutation = { createCatalogEntry?: { catalogEntry?: { __typename: 'XtdActivity', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdActor', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdBag', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdClassification', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdExternalDocument', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdMeasureWithUnit', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdNest', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdProperty', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdSubject', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdUnit', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdValue', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> } | null } | null };

export type DeleteEntryMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteEntryMutation = { deleteCatalogEntry?: { catalogEntry?: { __typename: 'XtdActivity', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdActor', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdBag', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdClassification', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdExternalDocument', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdMeasureWithUnit', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdNest', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdProperty', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdSubject', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdUnit', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdValue', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> } | null } | null };

export type SetVersionMutationVariables = Exact<{
  input: SetVersionInput;
}>;


export type SetVersionMutation = { setVersion?: { catalogEntry?: { __typename: 'XtdActivity', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdActor', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdBag', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdClassification', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdExternalDocument', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdMeasureWithUnit', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdNest', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdProperty', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdSubject', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdUnit', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdValue', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> } | null } | null };

export type AddNameMutationVariables = Exact<{
  input: AddNameInput;
}>;


export type AddNameMutation = { addName?: { catalogEntry?: { __typename: 'XtdActivity', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdActor', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdBag', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdClassification', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdExternalDocument', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdMeasureWithUnit', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdNest', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdProperty', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdSubject', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdUnit', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdValue', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> } | null } | null };

export type UpdateNameMutationVariables = Exact<{
  input: UpdateNameInput;
}>;


export type UpdateNameMutation = { updateName?: { catalogEntry?: { __typename: 'XtdActivity', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdActor', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdBag', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdClassification', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdExternalDocument', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdMeasureWithUnit', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdNest', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdProperty', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdSubject', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdUnit', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdValue', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> } | null } | null };

export type DeleteNameMutationVariables = Exact<{
  input: DeleteNameInput;
}>;


export type DeleteNameMutation = { deleteName?: { catalogEntry?: { __typename: 'XtdActivity', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdActor', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdBag', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdClassification', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdExternalDocument', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdMeasureWithUnit', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdNest', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdProperty', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdSubject', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdUnit', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdValue', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> } | null } | null };

export type AddDescriptionMutationVariables = Exact<{
  input: AddDescriptionInput;
}>;


export type AddDescriptionMutation = { addDescription?: { catalogEntry?: { __typename: 'XtdActivity', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdActor', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdBag', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdClassification', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdExternalDocument', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdMeasureWithUnit', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdNest', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdProperty', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdSubject', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdUnit', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdValue', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> } | null } | null };

export type UpdateDescriptionMutationVariables = Exact<{
  input: UpdateDescriptionInput;
}>;


export type UpdateDescriptionMutation = { updateDescription?: { catalogEntry?: { __typename: 'XtdActivity', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdActor', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdBag', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdClassification', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdExternalDocument', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdMeasureWithUnit', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdNest', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdProperty', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdSubject', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdUnit', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdValue', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> } | null } | null };

export type DeleteDescriptionMutationVariables = Exact<{
  input: DeleteDescriptionInput;
}>;


export type DeleteDescriptionMutation = { deleteDescription?: { catalogEntry?: { __typename: 'XtdActivity', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdActor', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdBag', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdClassification', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdExternalDocument', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdMeasureWithUnit', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdNest', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdProperty', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdSubject', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdUnit', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdValue', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> } | null } | null };

export type AddCommentMutationVariables = Exact<{
  input: AddCommentInput;
}>;


export type AddCommentMutation = { addComment?: { catalogEntry?: { __typename: 'XtdActivity', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdActor', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdBag', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdClassification', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdExternalDocument', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdMeasureWithUnit', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdNest', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdProperty', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdSubject', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdUnit', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdValue', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> } | null } | null };

export type UpdateCommentMutationVariables = Exact<{
  input: UpdateCommentInput;
}>;


export type UpdateCommentMutation = { updateComment?: { catalogEntry?: { __typename: 'XtdActivity', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdActor', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdBag', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdClassification', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdExternalDocument', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdMeasureWithUnit', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdNest', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdProperty', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdSubject', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdUnit', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdValue', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> } | null } | null };

export type DeleteCommentMutationVariables = Exact<{
  input: DeleteCommentInput;
}>;


export type DeleteCommentMutation = { deleteComment?: { catalogEntry?: { __typename: 'XtdActivity', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdActor', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdBag', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdClassification', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdExternalDocument', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdMeasureWithUnit', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdNest', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdProperty', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdSubject', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdUnit', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdValue', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> } | null } | null };

export type SetToleranceMutationVariables = Exact<{
  input: SetToleranceInput;
}>;


export type SetToleranceMutation = { setTolerance?: { catalogEntry?: { __typename: 'XtdValue', valueType?: ValueType | null, valueRole?: ValueRole | null, nominalValue?: string | null, toleranceType?: ToleranceType | null, lowerTolerance?: string | null, upperTolerance?: string | null, created: string, createdBy: string, lastModified: string, lastModifiedBy: string, versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, assignedTo: { nodes: Array<{ __typename: 'XtdRelAssignsValues', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, relatingMeasure: { __typename: 'XtdMeasureWithUnit', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> }, relatedValues: Array<{ __typename: 'XtdValue', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> }>, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> }> }, documentedBy: { nodes: Array<{ __typename: 'XtdRelDocuments', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, relatingDocument: { __typename: 'XtdExternalDocument', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> }, relatedThings: Array<{ __typename: 'XtdActivity', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdActor', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdBag', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdClassification', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdMeasureWithUnit', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdNest', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdProperty', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdSubject', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdUnit', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdValue', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> }>, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> }> }, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> } | null } | null };

export type UnsetToleranceMutationVariables = Exact<{
  input: UnsetToleranceInput;
}>;


export type UnsetToleranceMutation = { unsetTolerance?: { catalogEntry?: { __typename: 'XtdValue', valueType?: ValueType | null, valueRole?: ValueRole | null, nominalValue?: string | null, toleranceType?: ToleranceType | null, lowerTolerance?: string | null, upperTolerance?: string | null, created: string, createdBy: string, lastModified: string, lastModifiedBy: string, versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, assignedTo: { nodes: Array<{ __typename: 'XtdRelAssignsValues', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, relatingMeasure: { __typename: 'XtdMeasureWithUnit', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> }, relatedValues: Array<{ __typename: 'XtdValue', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> }>, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> }> }, documentedBy: { nodes: Array<{ __typename: 'XtdRelDocuments', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, relatingDocument: { __typename: 'XtdExternalDocument', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> }, relatedThings: Array<{ __typename: 'XtdActivity', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdActor', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdBag', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdClassification', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdMeasureWithUnit', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdNest', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdProperty', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdSubject', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdUnit', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdValue', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> }>, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> }> }, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> } | null } | null };

export type SetNominalValueMutationVariables = Exact<{
  input: SetNominalValueInput;
}>;


export type SetNominalValueMutation = { setNominalValue?: { catalogEntry?: { __typename: 'XtdValue', valueType?: ValueType | null, valueRole?: ValueRole | null, nominalValue?: string | null, toleranceType?: ToleranceType | null, lowerTolerance?: string | null, upperTolerance?: string | null, created: string, createdBy: string, lastModified: string, lastModifiedBy: string, versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, assignedTo: { nodes: Array<{ __typename: 'XtdRelAssignsValues', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, relatingMeasure: { __typename: 'XtdMeasureWithUnit', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> }, relatedValues: Array<{ __typename: 'XtdValue', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> }>, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> }> }, documentedBy: { nodes: Array<{ __typename: 'XtdRelDocuments', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, relatingDocument: { __typename: 'XtdExternalDocument', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> }, relatedThings: Array<{ __typename: 'XtdActivity', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdActor', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdBag', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdClassification', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdMeasureWithUnit', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdNest', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdProperty', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdSubject', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdUnit', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdValue', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> }>, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> }> }, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> } | null } | null };

export type UnsetNominalValueMutationVariables = Exact<{
  input: UnsetNominalValueInput;
}>;


export type UnsetNominalValueMutation = { unsetNominalValue?: { catalogEntry?: { __typename: 'XtdValue', valueType?: ValueType | null, valueRole?: ValueRole | null, nominalValue?: string | null, toleranceType?: ToleranceType | null, lowerTolerance?: string | null, upperTolerance?: string | null, created: string, createdBy: string, lastModified: string, lastModifiedBy: string, versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, assignedTo: { nodes: Array<{ __typename: 'XtdRelAssignsValues', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, relatingMeasure: { __typename: 'XtdMeasureWithUnit', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> }, relatedValues: Array<{ __typename: 'XtdValue', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> }>, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> }> }, documentedBy: { nodes: Array<{ __typename: 'XtdRelDocuments', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, relatingDocument: { __typename: 'XtdExternalDocument', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> }, relatedThings: Array<{ __typename: 'XtdActivity', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdActor', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdBag', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdClassification', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdMeasureWithUnit', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdNest', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdProperty', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdSubject', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdUnit', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdValue', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> }>, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> }> }, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> } | null } | null };

export type TagBagMutationVariables = Exact<{
  bagId: Scalars['ID']['input'];
  tagId: Scalars['ID']['input'];
}>;


export type TagBagMutation = { addTag?: { catalogEntry?: { __typename: 'XtdBag', created: string, createdBy: string, lastModified: string, lastModifiedBy: string, versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, collects: { nodes: Array<{ __typename: 'XtdRelCollects', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, relatingCollection: { __typename: 'XtdBag', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdNest', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> }, relatedThings: Array<{ __typename: 'XtdActivity', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdActor', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdBag', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdClassification', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdMeasureWithUnit', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdNest', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdProperty', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdSubject', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdUnit', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdValue', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> }>, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> }> }, assignedTo: { nodes: Array<{ __typename: 'XtdRelAssignsCollections', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, relatingObject: { __typename: 'XtdActivity', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdActor', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdClassification', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdMeasureWithUnit', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdProperty', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdSubject', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdUnit', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdValue', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> }, relatedCollections: Array<{ __typename: 'XtdBag', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdNest', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> }>, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> }> }, collectedBy: { nodes: Array<{ __typename: 'XtdRelCollects', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, relatingCollection: { __typename: 'XtdBag', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdNest', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> }, relatedThings: Array<{ __typename: 'XtdActivity', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdActor', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdBag', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdClassification', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdMeasureWithUnit', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdNest', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdProperty', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdSubject', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdUnit', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdValue', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> }>, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> }> }, documentedBy: { nodes: Array<{ __typename: 'XtdRelDocuments', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, relatingDocument: { __typename: 'XtdExternalDocument', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> }, relatedThings: Array<{ __typename: 'XtdActivity', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdActor', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdBag', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdClassification', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdMeasureWithUnit', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdNest', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdProperty', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdSubject', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdUnit', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdValue', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> }>, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> }> }, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdNest', created: string, createdBy: string, lastModified: string, lastModifiedBy: string, versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, collects: { nodes: Array<{ __typename: 'XtdRelCollects', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, relatingCollection: { __typename: 'XtdBag', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdNest', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> }, relatedThings: Array<{ __typename: 'XtdActivity', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdActor', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdBag', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdClassification', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdMeasureWithUnit', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdNest', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdProperty', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdSubject', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdUnit', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdValue', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> }>, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> }> }, assignedTo: { nodes: Array<{ __typename: 'XtdRelAssignsCollections', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, relatingObject: { __typename: 'XtdActivity', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdActor', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdClassification', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdMeasureWithUnit', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdProperty', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdSubject', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdUnit', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdValue', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> }, relatedCollections: Array<{ __typename: 'XtdBag', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdNest', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> }>, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> }> }, collectedBy: { nodes: Array<{ __typename: 'XtdRelCollects', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, relatingCollection: { __typename: 'XtdBag', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdNest', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> }, relatedThings: Array<{ __typename: 'XtdActivity', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdActor', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdBag', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdClassification', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdMeasureWithUnit', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdNest', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdProperty', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdSubject', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdUnit', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdValue', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> }>, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> }> }, documentedBy: { nodes: Array<{ __typename: 'XtdRelDocuments', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, relatingDocument: { __typename: 'XtdExternalDocument', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> }, relatedThings: Array<{ __typename: 'XtdActivity', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdActor', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdBag', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdClassification', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdMeasureWithUnit', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdNest', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdProperty', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdSubject', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdUnit', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdValue', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> }>, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> }> }, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> } | {} | null } | null };

export type AddTagMutationVariables = Exact<{
  input: AddTagInput;
}>;


export type AddTagMutation = { addTag?: { catalogEntry?: { __typename: 'XtdActivity' } | { __typename: 'XtdActor' } | { __typename: 'XtdBag' } | { __typename: 'XtdClassification' } | { __typename: 'XtdExternalDocument' } | { __typename: 'XtdMeasureWithUnit' } | { __typename: 'XtdNest' } | { __typename: 'XtdProperty' } | { __typename: 'XtdSubject' } | { __typename: 'XtdUnit' } | { __typename: 'XtdValue' } | null } | null };

export type CreateTagMutationVariables = Exact<{
  input: CreateTagInput;
}>;


export type CreateTagMutation = { createTag?: { tag?: { id: string, name: string } | null } | null };

export type CreateRelationshipMutationVariables = Exact<{
  input: CreateRelationshipInput;
}>;


export type CreateRelationshipMutation = { createRelationship?: { relationship?: { __typename: 'XtdRelActsUpon', id: string } | { __typename: 'XtdRelAssignsCollections', id: string } | { __typename: 'XtdRelAssignsMeasures', id: string } | { __typename: 'XtdRelAssignsProperties', id: string } | { __typename: 'XtdRelAssignsPropertyWithValues', id: string } | { __typename: 'XtdRelAssignsUnits', id: string } | { __typename: 'XtdRelAssignsValues', id: string } | { __typename: 'XtdRelAssociates', id: string } | { __typename: 'XtdRelCollects', id: string } | { __typename: 'XtdRelComposes', id: string } | { __typename: 'XtdRelDocuments', id: string } | { __typename: 'XtdRelGroups', id: string } | { __typename: 'XtdRelSequences', id: string } | { __typename: 'XtdRelSpecializes', id: string } | null } | null };

export type SetRelatedEntriesMutationVariables = Exact<{
  input: SetRelatedEntriesInput;
}>;


export type SetRelatedEntriesMutation = { setRelatedEntries?: { relationship?: { __typename: 'XtdRelActsUpon', id: string } | { __typename: 'XtdRelAssignsCollections', id: string } | { __typename: 'XtdRelAssignsMeasures', id: string } | { __typename: 'XtdRelAssignsProperties', id: string } | { __typename: 'XtdRelAssignsPropertyWithValues', id: string } | { __typename: 'XtdRelAssignsUnits', id: string } | { __typename: 'XtdRelAssignsValues', id: string } | { __typename: 'XtdRelAssociates', id: string } | { __typename: 'XtdRelCollects', id: string } | { __typename: 'XtdRelComposes', id: string } | { __typename: 'XtdRelDocuments', id: string } | { __typename: 'XtdRelGroups', id: string } | { __typename: 'XtdRelSequences', id: string } | { __typename: 'XtdRelSpecializes', id: string } | null } | null };

export type DeleteRelationshipMutationVariables = Exact<{
  input: DeleteRelationshipInput;
}>;


export type DeleteRelationshipMutation = { deleteRelationship?: { relationship?: { id: string } | { id: string } | { id: string } | { id: string } | { id: string } | { id: string } | { id: string } | { id: string } | { id: string } | { id: string } | { id: string } | { id: string } | { id: string } | { id: string } | null } | null };

export type FindLanguagesQueryVariables = Exact<{
  input: LanguageFilterInput;
}>;


export type FindLanguagesQuery = { languages?: { totalElements: number, nodes: Array<{ id: string, languageTag: string, displayCountry: string, displayLanguage: string }> } | null };

export type FindItemQueryVariables = Exact<{
  input: SearchInput;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  pageNumber?: InputMaybe<Scalars['Int']['input']>;
}>;


export type FindItemQuery = { search: { totalElements: number, nodes: Array<{ __typename: 'SearchResult', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> }>, pageInfo: { totalPages: number, pageNumber: number, hasNext: boolean, hasPrevious: boolean } } };

export type FindTagsQueryVariables = Exact<{
  pageSize?: InputMaybe<Scalars['Int']['input']>;
}>;

export type FindTagsQuery = { findTags: { totalElements: number, nodes: Array<{ id: string, name: string }> } };

export type FindAllNestsQueryVariables = Exact<{
  input: SearchInput;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  pageNumber?: InputMaybe<Scalars['Int']['input']>;
}>;


export type FindAllNestsQuery = { search: { totalElements: number, nodes: Array<{ __typename: 'SearchResult', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> }>, pageInfo: { totalPages: number, pageNumber: number, hasNext: boolean, hasPrevious: boolean } } };

export type FindPropertyGroupsQueryVariables = Exact<{
  input: SearchInput;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  pageNumber?: InputMaybe<Scalars['Int']['input']>;
}>;


export type FindPropertyGroupsQuery = { search: { totalElements: number, nodes: Array<{ __typename: 'SearchResult', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> }>, pageInfo: { totalPages: number, pageNumber: number, hasNext: boolean, hasPrevious: boolean } } };

export type GetBagQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetBagQuery = { getBag?: { documentedBy: { nodes: Array<{ relatingDocument: { id: string, name?: string | null } }> } } | null };

export type PropertyTreeQueryVariables = Exact<{ [key: string]: never; }>;


export type PropertyTreeQuery = { hierarchy: { paths: Array<Array<string>>, nodes: Array<{ __typename: 'XtdActivity', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdActor', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdBag', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdClassification', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdExternalDocument', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdMeasureWithUnit', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdNest', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdProperty', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdRelActsUpon', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdRelAssignsCollections', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdRelAssignsMeasures', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdRelAssignsProperties', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdRelAssignsPropertyWithValues', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdRelAssignsUnits', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdRelAssignsValues', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdRelAssociates', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdRelCollects', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdRelComposes', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdRelDocuments', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdRelGroups', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdRelSequences', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdRelSpecializes', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdSubject', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdUnit', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdValue', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> }> } };

export type GetDocumentEntryQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetDocumentEntryQuery = { node?: { __typename: 'XtdExternalDocument', created: string, createdBy: string, lastModified: string, lastModifiedBy: string, versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, documents: { nodes: Array<{ __typename: 'XtdRelDocuments', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, relatingDocument: { __typename: 'XtdExternalDocument', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> }, relatedThings: Array<{ __typename: 'XtdActivity', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdActor', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdBag', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdClassification', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdMeasureWithUnit', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdNest', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdProperty', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdSubject', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdUnit', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdValue', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> }>, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> }> }, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> } | {} | null };

export type GetObjectEntryQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetObjectEntryQuery = { node?: { __typename: 'XtdActivity', created: string, createdBy: string, lastModified: string, lastModifiedBy: string, versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, documentedBy: { nodes: Array<{ __typename: 'XtdRelDocuments', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, relatingDocument: { __typename: 'XtdExternalDocument', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> }, relatedThings: Array<{ __typename: 'XtdActivity', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdActor', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdBag', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdClassification', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdMeasureWithUnit', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdNest', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdProperty', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdSubject', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdUnit', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdValue', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> }>, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> }> }, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdActor', created: string, createdBy: string, lastModified: string, lastModifiedBy: string, versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, documentedBy: { nodes: Array<{ __typename: 'XtdRelDocuments', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, relatingDocument: { __typename: 'XtdExternalDocument', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> }, relatedThings: Array<{ __typename: 'XtdActivity', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdActor', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdBag', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdClassification', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdMeasureWithUnit', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdNest', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdProperty', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdSubject', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdUnit', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdValue', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> }>, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> }> }, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdClassification', created: string, createdBy: string, lastModified: string, lastModifiedBy: string, versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, documentedBy: { nodes: Array<{ __typename: 'XtdRelDocuments', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, relatingDocument: { __typename: 'XtdExternalDocument', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> }, relatedThings: Array<{ __typename: 'XtdActivity', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdActor', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdBag', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdClassification', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdMeasureWithUnit', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdNest', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdProperty', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdSubject', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdUnit', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdValue', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> }>, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> }> }, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdMeasureWithUnit', created: string, createdBy: string, lastModified: string, lastModifiedBy: string, versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, documentedBy: { nodes: Array<{ __typename: 'XtdRelDocuments', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, relatingDocument: { __typename: 'XtdExternalDocument', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> }, relatedThings: Array<{ __typename: 'XtdActivity', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdActor', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdBag', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdClassification', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdMeasureWithUnit', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdNest', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdProperty', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdSubject', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdUnit', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdValue', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> }>, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> }> }, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdProperty', created: string, createdBy: string, lastModified: string, lastModifiedBy: string, versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, documentedBy: { nodes: Array<{ __typename: 'XtdRelDocuments', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, relatingDocument: { __typename: 'XtdExternalDocument', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> }, relatedThings: Array<{ __typename: 'XtdActivity', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdActor', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdBag', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdClassification', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdMeasureWithUnit', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdNest', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdProperty', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdSubject', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdUnit', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdValue', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> }>, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> }> }, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdSubject', created: string, createdBy: string, lastModified: string, lastModifiedBy: string, versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, documentedBy: { nodes: Array<{ __typename: 'XtdRelDocuments', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, relatingDocument: { __typename: 'XtdExternalDocument', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> }, relatedThings: Array<{ __typename: 'XtdActivity', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdActor', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdBag', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdClassification', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdMeasureWithUnit', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdNest', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdProperty', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdSubject', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdUnit', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdValue', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> }>, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> }> }, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdUnit', created: string, createdBy: string, lastModified: string, lastModifiedBy: string, versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, documentedBy: { nodes: Array<{ __typename: 'XtdRelDocuments', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, relatingDocument: { __typename: 'XtdExternalDocument', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> }, relatedThings: Array<{ __typename: 'XtdActivity', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdActor', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdBag', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdClassification', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdMeasureWithUnit', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdNest', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdProperty', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdSubject', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdUnit', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdValue', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> }>, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> }> }, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdValue', created: string, createdBy: string, lastModified: string, lastModifiedBy: string, versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, documentedBy: { nodes: Array<{ __typename: 'XtdRelDocuments', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, relatingDocument: { __typename: 'XtdExternalDocument', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> }, relatedThings: Array<{ __typename: 'XtdActivity', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdActor', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdBag', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdClassification', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdMeasureWithUnit', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdNest', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdProperty', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdSubject', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdUnit', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdValue', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> }>, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> }> }, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> } | {} | null };

export type GetSubjectEntryQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetSubjectEntryQuery = { node?: { __typename: 'XtdSubject', created: string, createdBy: string, lastModified: string, lastModifiedBy: string, versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, assignedCollections: { nodes: Array<{ __typename: 'XtdRelAssignsCollections', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, relatingObject: { __typename: 'XtdActivity', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdActor', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdClassification', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdMeasureWithUnit', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdProperty', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdSubject', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdUnit', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdValue', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> }, relatedCollections: Array<{ __typename: 'XtdBag', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdNest', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> }>, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> }> }, assignedProperties: { nodes: Array<{ __typename: 'XtdRelAssignsProperties', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, relatingObject: { __typename: 'XtdActivity', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdActor', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdClassification', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdMeasureWithUnit', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdProperty', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdSubject', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdUnit', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdValue', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> }, relatedProperties: Array<{ __typename: 'XtdProperty', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> }>, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> }> }, collectedBy: { nodes: Array<{ __typename: 'XtdRelCollects', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, relatingCollection: { __typename: 'XtdBag', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdNest', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> }, relatedThings: Array<{ __typename: 'XtdActivity', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdActor', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdBag', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdClassification', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdMeasureWithUnit', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdNest', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdProperty', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdSubject', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdUnit', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdValue', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> }>, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> }> }, properties: Array<{ id: string, name?: string | null, description?: string | null, comment?: string | null, assignedMeasures: { nodes: Array<{ id: string, relatedMeasures: Array<{ id: string, name?: string | null, description?: string | null, comment?: string | null, assignedValues: { nodes: Array<{ id: string, relatedValues: Array<{ id: string, name?: string | null, description?: string | null, comment?: string | null, nominalValue?: string | null }> }> } }> }> } }>, documentedBy: { nodes: Array<{ __typename: 'XtdRelDocuments', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, relatingDocument: { __typename: 'XtdExternalDocument', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> }, relatedThings: Array<{ __typename: 'XtdActivity', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdActor', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdBag', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdClassification', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdMeasureWithUnit', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdNest', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdProperty', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdSubject', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdUnit', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdValue', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> }>, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> }> }, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> } | null };

export type GetPropertyEntryQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetPropertyEntryQuery = { node?: { __typename: 'XtdProperty', created: string, createdBy: string, lastModified: string, lastModifiedBy: string, versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, assignedMeasures: { nodes: Array<{ __typename: 'XtdRelAssignsMeasures', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, relatingProperty: { __typename: 'XtdProperty', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> }, relatedMeasures: Array<{ __typename: 'XtdMeasureWithUnit', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> }>, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> }> }, assignedTo: { nodes: Array<{ __typename: 'XtdRelAssignsProperties', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, relatingObject: { __typename: 'XtdActivity', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdActor', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdClassification', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdMeasureWithUnit', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdProperty', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdSubject', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdUnit', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdValue', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> }, relatedProperties: Array<{ __typename: 'XtdProperty', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> }>, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> }> }, collectedBy: { nodes: Array<{ __typename: 'XtdRelCollects', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, relatingCollection: { __typename: 'XtdBag', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdNest', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> }, relatedThings: Array<{ __typename: 'XtdActivity', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdActor', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdBag', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdClassification', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdMeasureWithUnit', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdNest', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdProperty', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdSubject', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdUnit', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdValue', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> }>, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> }> }, documentedBy: { nodes: Array<{ __typename: 'XtdRelDocuments', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, relatingDocument: { __typename: 'XtdExternalDocument', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> }, relatedThings: Array<{ __typename: 'XtdActivity', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdActor', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdBag', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdClassification', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdMeasureWithUnit', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdNest', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdProperty', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdSubject', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdUnit', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdValue', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> }>, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> }> }, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> } | null };

export type GetMeasureEntryQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetMeasureEntryQuery = { node?: { __typename: 'XtdMeasureWithUnit', created: string, createdBy: string, lastModified: string, lastModifiedBy: string, versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, assignedTo: { nodes: Array<{ __typename: 'XtdRelAssignsMeasures', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, relatingProperty: { __typename: 'XtdProperty', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> }, relatedMeasures: Array<{ __typename: 'XtdMeasureWithUnit', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> }>, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> }> }, assignedUnits: { nodes: Array<{ __typename: 'XtdRelAssignsUnits', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, relatingMeasure: { __typename: 'XtdMeasureWithUnit', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> }, relatedUnits: Array<{ __typename: 'XtdUnit', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> }>, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> }> }, assignedValues: { nodes: Array<{ __typename: 'XtdRelAssignsValues', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, relatingMeasure: { __typename: 'XtdMeasureWithUnit', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> }, relatedValues: Array<{ __typename: 'XtdValue', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> }>, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> }> }, documentedBy: { nodes: Array<{ __typename: 'XtdRelDocuments', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, relatingDocument: { __typename: 'XtdExternalDocument', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> }, relatedThings: Array<{ __typename: 'XtdActivity', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdActor', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdBag', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdClassification', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdMeasureWithUnit', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdNest', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdProperty', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdSubject', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdUnit', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdValue', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> }>, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> }> }, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> } | null };

export type GetUnitEntryQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetUnitEntryQuery = { node?: { __typename: 'XtdUnit', created: string, createdBy: string, lastModified: string, lastModifiedBy: string, versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, assignedTo: { nodes: Array<{ __typename: 'XtdRelAssignsUnits', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, relatingMeasure: { __typename: 'XtdMeasureWithUnit', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> }, relatedUnits: Array<{ __typename: 'XtdUnit', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> }>, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> }> }, documentedBy: { nodes: Array<{ __typename: 'XtdRelDocuments', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, relatingDocument: { __typename: 'XtdExternalDocument', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> }, relatedThings: Array<{ __typename: 'XtdActivity', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdActor', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdBag', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdClassification', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdMeasureWithUnit', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdNest', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdProperty', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdSubject', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdUnit', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdValue', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> }>, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> }> }, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> } | null };

export type GetValueEntryQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetValueEntryQuery = { node?: { __typename: 'XtdValue', valueType?: ValueType | null, valueRole?: ValueRole | null, nominalValue?: string | null, toleranceType?: ToleranceType | null, lowerTolerance?: string | null, upperTolerance?: string | null, created: string, createdBy: string, lastModified: string, lastModifiedBy: string, versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, assignedTo: { nodes: Array<{ __typename: 'XtdRelAssignsValues', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, relatingMeasure: { __typename: 'XtdMeasureWithUnit', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> }, relatedValues: Array<{ __typename: 'XtdValue', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> }>, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> }> }, documentedBy: { nodes: Array<{ __typename: 'XtdRelDocuments', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, relatingDocument: { __typename: 'XtdExternalDocument', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> }, relatedThings: Array<{ __typename: 'XtdActivity', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdActor', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdBag', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdClassification', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdMeasureWithUnit', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdNest', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdProperty', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdSubject', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdUnit', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdValue', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> }>, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> }> }, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> } | null };

export type GetCollectionEntryQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetCollectionEntryQuery = { node?: { __typename: 'XtdBag', created: string, createdBy: string, lastModified: string, lastModifiedBy: string, versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, collects: { nodes: Array<{ __typename: 'XtdRelCollects', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, relatingCollection: { __typename: 'XtdBag', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdNest', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> }, relatedThings: Array<{ __typename: 'XtdActivity', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdActor', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdBag', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdClassification', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdMeasureWithUnit', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdNest', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdProperty', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdSubject', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdUnit', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdValue', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> }>, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> }> }, assignedTo: { nodes: Array<{ __typename: 'XtdRelAssignsCollections', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, relatingObject: { __typename: 'XtdActivity', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdActor', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdClassification', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdMeasureWithUnit', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdProperty', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdSubject', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdUnit', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdValue', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> }, relatedCollections: Array<{ __typename: 'XtdBag', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdNest', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> }>, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> }> }, collectedBy: { nodes: Array<{ __typename: 'XtdRelCollects', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, relatingCollection: { __typename: 'XtdBag', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdNest', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> }, relatedThings: Array<{ __typename: 'XtdActivity', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdActor', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdBag', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdClassification', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdMeasureWithUnit', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdNest', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdProperty', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdSubject', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdUnit', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdValue', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> }>, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> }> }, documentedBy: { nodes: Array<{ __typename: 'XtdRelDocuments', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, relatingDocument: { __typename: 'XtdExternalDocument', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> }, relatedThings: Array<{ __typename: 'XtdActivity', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdActor', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdBag', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdClassification', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdMeasureWithUnit', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdNest', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdProperty', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdSubject', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdUnit', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdValue', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> }>, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> }> }, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdNest', created: string, createdBy: string, lastModified: string, lastModifiedBy: string, versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, collects: { nodes: Array<{ __typename: 'XtdRelCollects', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, relatingCollection: { __typename: 'XtdBag', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdNest', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> }, relatedThings: Array<{ __typename: 'XtdActivity', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdActor', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdBag', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdClassification', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdMeasureWithUnit', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdNest', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdProperty', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdSubject', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdUnit', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdValue', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> }>, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> }> }, assignedTo: { nodes: Array<{ __typename: 'XtdRelAssignsCollections', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, relatingObject: { __typename: 'XtdActivity', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdActor', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdClassification', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdMeasureWithUnit', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdProperty', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdSubject', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdUnit', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdValue', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> }, relatedCollections: Array<{ __typename: 'XtdBag', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdNest', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> }>, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> }> }, collectedBy: { nodes: Array<{ __typename: 'XtdRelCollects', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, relatingCollection: { __typename: 'XtdBag', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdNest', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> }, relatedThings: Array<{ __typename: 'XtdActivity', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdActor', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdBag', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdClassification', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdMeasureWithUnit', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdNest', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdProperty', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdSubject', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdUnit', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdValue', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> }>, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> }> }, documentedBy: { nodes: Array<{ __typename: 'XtdRelDocuments', versionId?: string | null, versionDate?: string | null, id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, relatingDocument: { __typename: 'XtdExternalDocument', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> }, relatedThings: Array<{ __typename: 'XtdActivity', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdActor', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdBag', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdClassification', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdMeasureWithUnit', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdNest', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdProperty', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdSubject', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdUnit', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdValue', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> }>, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> }> }, names: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, descriptions: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, comments: Array<{ id: string, value: string, language: { id: string, languageTag: string, displayCountry: string, displayLanguage: string } }>, tags: Array<{ id: string, name: string }> } | {} | null };

export type FindModelWithoutGroupTreeQueryVariables = Exact<{ [key: string]: never; }>;


export type FindModelWithoutGroupTreeQuery = { findModelWithoutGroup: { paths: Array<Array<string>>, nodes: Array<{ __typename: 'XtdActivity', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdActor', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdBag', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdClassification', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdExternalDocument', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdMeasureWithUnit', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdNest', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdProperty', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdRelActsUpon', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdRelAssignsCollections', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdRelAssignsMeasures', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdRelAssignsProperties', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdRelAssignsPropertyWithValues', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdRelAssignsUnits', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdRelAssignsValues', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdRelAssociates', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdRelCollects', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdRelComposes', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdRelDocuments', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdRelGroups', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdRelSequences', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdRelSpecializes', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdSubject', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdUnit', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdValue', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> }> } };

export type FindGroupWithoutSubjectTreeQueryVariables = Exact<{ [key: string]: never; }>;


export type FindGroupWithoutSubjectTreeQuery = { findGroupWithoutSubject: { paths: Array<Array<string>>, nodes: Array<{ __typename: 'XtdActivity', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdActor', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdBag', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdClassification', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdExternalDocument', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdMeasureWithUnit', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdNest', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdProperty', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdRelActsUpon', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdRelAssignsCollections', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdRelAssignsMeasures', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdRelAssignsProperties', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdRelAssignsPropertyWithValues', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdRelAssignsUnits', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdRelAssignsValues', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdRelAssociates', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdRelCollects', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdRelComposes', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdRelDocuments', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdRelGroups', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdRelSequences', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdRelSpecializes', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdSubject', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdUnit', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdValue', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> }> } };

export type FindSubjectWithoutPropTreeQueryVariables = Exact<{ [key: string]: never; }>;


export type FindSubjectWithoutPropTreeQuery = { findSubjectWithoutProp: { paths: Array<Array<string>>, nodes: Array<{ __typename: 'XtdActivity', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdActor', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdBag', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdClassification', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdExternalDocument', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdMeasureWithUnit', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdNest', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdProperty', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdRelActsUpon', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdRelAssignsCollections', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdRelAssignsMeasures', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdRelAssignsProperties', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdRelAssignsPropertyWithValues', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdRelAssignsUnits', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdRelAssignsValues', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdRelAssociates', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdRelCollects', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdRelComposes', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdRelDocuments', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdRelGroups', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdRelSequences', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdRelSpecializes', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdSubject', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdUnit', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdValue', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> }> } };

export type FindPropWithoutSubjectOrPropGroupTreeQueryVariables = Exact<{ [key: string]: never; }>;


export type FindPropWithoutSubjectOrPropGroupTreeQuery = { findPropWithoutSubjectOrPropGroup: { paths: Array<Array<string>>, nodes: Array<{ __typename: 'XtdActivity', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdActor', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdBag', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdClassification', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdExternalDocument', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdMeasureWithUnit', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdNest', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdProperty', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdRelActsUpon', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdRelAssignsCollections', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdRelAssignsMeasures', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdRelAssignsProperties', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdRelAssignsPropertyWithValues', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdRelAssignsUnits', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdRelAssignsValues', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdRelAssociates', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdRelCollects', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdRelComposes', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdRelDocuments', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdRelGroups', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdRelSequences', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdRelSpecializes', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdSubject', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdUnit', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdValue', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> }> } };

export type FindPropGroupWithoutPropTreeQueryVariables = Exact<{ [key: string]: never; }>;


export type FindPropGroupWithoutPropTreeQuery = { findPropGroupWithoutProp: { paths: Array<Array<string>>, nodes: Array<{ __typename: 'XtdActivity', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdActor', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdBag', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdClassification', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdExternalDocument', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdMeasureWithUnit', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdNest', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdProperty', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdRelActsUpon', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdRelAssignsCollections', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdRelAssignsMeasures', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdRelAssignsProperties', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdRelAssignsPropertyWithValues', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdRelAssignsUnits', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdRelAssignsValues', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdRelAssociates', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdRelCollects', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdRelComposes', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdRelDocuments', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdRelGroups', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdRelSequences', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdRelSpecializes', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdSubject', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdUnit', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdValue', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> }> } };

export type FindMeasureWithoutPropTreeQueryVariables = Exact<{ [key: string]: never; }>;


export type FindMeasureWithoutPropTreeQuery = { findMeasureWithoutProp: { paths: Array<Array<string>>, nodes: Array<{ __typename: 'XtdActivity', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdActor', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdBag', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdClassification', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdExternalDocument', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdMeasureWithUnit', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdNest', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdProperty', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdRelActsUpon', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdRelAssignsCollections', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdRelAssignsMeasures', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdRelAssignsProperties', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdRelAssignsPropertyWithValues', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdRelAssignsUnits', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdRelAssignsValues', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdRelAssociates', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdRelCollects', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdRelComposes', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdRelDocuments', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdRelGroups', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdRelSequences', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdRelSpecializes', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdSubject', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdUnit', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdValue', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> }> } };

export type FindUnitWithoutMeasureTreeQueryVariables = Exact<{ [key: string]: never; }>;


export type FindUnitWithoutMeasureTreeQuery = { findUnitWithoutMeasure: { paths: Array<Array<string>>, nodes: Array<{ __typename: 'XtdActivity', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdActor', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdBag', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdClassification', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdExternalDocument', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdMeasureWithUnit', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdNest', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdProperty', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdRelActsUpon', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdRelAssignsCollections', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdRelAssignsMeasures', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdRelAssignsProperties', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdRelAssignsPropertyWithValues', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdRelAssignsUnits', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdRelAssignsValues', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdRelAssociates', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdRelCollects', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdRelComposes', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdRelDocuments', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdRelGroups', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdRelSequences', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdRelSpecializes', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdSubject', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdUnit', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdValue', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> }> } };

export type FindValueWithoutMeasureTreeQueryVariables = Exact<{ [key: string]: never; }>;


export type FindValueWithoutMeasureTreeQuery = { findValueWithoutMeasure: { paths: Array<Array<string>>, nodes: Array<{ __typename: 'XtdActivity', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdActor', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdBag', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdClassification', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdExternalDocument', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdMeasureWithUnit', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdNest', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdProperty', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdRelActsUpon', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdRelAssignsCollections', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdRelAssignsMeasures', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdRelAssignsProperties', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdRelAssignsPropertyWithValues', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdRelAssignsUnits', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdRelAssignsValues', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdRelAssociates', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdRelCollects', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdRelComposes', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdRelDocuments', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdRelGroups', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdRelSequences', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdRelSpecializes', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdSubject', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdUnit', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdValue', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> }> } };

export type FindExportCatalogItemsTreeQueryVariables = Exact<{ [key: string]: never; }>;


export type FindExportCatalogItemsTreeQuery = { findExportCatalogItems: { paths: Array<Array<string>>, nodes?: Array<{ id: string, typ?: string | null, schlagworte?: string | null, name?: string | null, name_en?: string | null, description?: string | null, versionId?: string | null, created?: string | null, createdBy?: string | null, lastModified?: string | null, lastModifiedBy?: string | null }> | null } };

export type FindExportCatalogItemsRelationshipsTreeQueryVariables = Exact<{ [key: string]: never; }>;


export type FindExportCatalogItemsRelationshipsTreeQuery = { findExportCatalogItemsRelationships: { paths: Array<Array<string>>, nodes?: Array<{ Entity1: string, Entity1Type: string, RelationId: string, RelationshipType: string, Entity2: string, Entity2Type: string }> | null } };

export type FindMissingEnglishNameTreeQueryVariables = Exact<{
  input: FindMissingEnglishNameFilterInput;
}>;


export type FindMissingEnglishNameTreeQuery = { findMissingEnglishName: { paths: Array<Array<string>>, nodes: Array<{ __typename: 'XtdActivity', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdActor', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdBag', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdClassification', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdExternalDocument', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdMeasureWithUnit', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdNest', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdProperty', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdRelActsUpon', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdRelAssignsCollections', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdRelAssignsMeasures', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdRelAssignsProperties', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdRelAssignsPropertyWithValues', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdRelAssignsUnits', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdRelAssignsValues', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdRelAssociates', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdRelCollects', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdRelComposes', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdRelDocuments', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdRelGroups', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdRelSequences', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdRelSpecializes', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdSubject', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdUnit', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdValue', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> }> } };

export type FindMultipleIDsTreeQueryVariables = Exact<{
  input: FindMultipleIDsFilterInput;
}>;


export type FindMultipleIDsTreeQuery = { findMultipleIDs: { paths: Array<Array<string>>, nodes: Array<{ __typename: 'XtdActivity', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdActor', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdBag', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdClassification', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdExternalDocument', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdMeasureWithUnit', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdNest', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdProperty', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdRelActsUpon', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdRelAssignsCollections', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdRelAssignsMeasures', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdRelAssignsProperties', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdRelAssignsPropertyWithValues', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdRelAssignsUnits', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdRelAssignsValues', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdRelAssociates', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdRelCollects', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdRelComposes', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdRelDocuments', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdRelGroups', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdRelSequences', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdRelSpecializes', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdSubject', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdUnit', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdValue', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> }> } };

export type FindMissingDescriptionTreeQueryVariables = Exact<{
  input: FindMissingDescriptionFilterInput;
}>;


export type FindMissingDescriptionTreeQuery = { findMissingDescription: { paths: Array<Array<string>>, nodes: Array<{ __typename: 'XtdActivity', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdActor', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdBag', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdClassification', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdExternalDocument', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdMeasureWithUnit', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdNest', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdProperty', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdRelActsUpon', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdRelAssignsCollections', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdRelAssignsMeasures', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdRelAssignsProperties', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdRelAssignsPropertyWithValues', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdRelAssignsUnits', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdRelAssignsValues', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdRelAssociates', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdRelCollects', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdRelComposes', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdRelDocuments', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdRelGroups', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdRelSequences', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdRelSpecializes', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdSubject', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdUnit', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdValue', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> }> } };

export type FindMissingEnglishDescriptionTreeQueryVariables = Exact<{
  input: FindMissingEnglishDescriptionFilterInput;
}>;


export type FindMissingEnglishDescriptionTreeQuery = { findMissingEnglishDescription: { paths: Array<Array<string>>, nodes: Array<{ __typename: 'XtdActivity', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdActor', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdBag', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdClassification', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdExternalDocument', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdMeasureWithUnit', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdNest', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdProperty', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdRelActsUpon', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdRelAssignsCollections', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdRelAssignsMeasures', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdRelAssignsProperties', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdRelAssignsPropertyWithValues', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdRelAssignsUnits', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdRelAssignsValues', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdRelAssociates', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdRelCollects', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdRelComposes', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdRelDocuments', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdRelGroups', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdRelSequences', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdRelSpecializes', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdSubject', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdUnit', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdValue', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> }> } };

export type FindMultipleNamesTreeQueryVariables = Exact<{
  input: FindMultipleNamesFilterInput;
}>;


export type FindMultipleNamesTreeQuery = { findMultipleNames: { paths: Array<Array<string>>, nodes: Array<{ __typename: 'XtdActivity', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdActor', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdBag', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdClassification', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdExternalDocument', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdMeasureWithUnit', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdNest', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdProperty', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdRelActsUpon', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdRelAssignsCollections', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdRelAssignsMeasures', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdRelAssignsProperties', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdRelAssignsPropertyWithValues', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdRelAssignsUnits', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdRelAssignsValues', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdRelAssociates', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdRelCollects', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdRelComposes', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdRelDocuments', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdRelGroups', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdRelSequences', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdRelSpecializes', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdSubject', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdUnit', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdValue', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> }> } };

export type FindMultipleNamesAcrossClassesTreeQueryVariables = Exact<{
  input: FindMultipleNamesAcrossClassesFilterInput;
}>;


export type FindMultipleNamesAcrossClassesTreeQuery = { findMultipleNamesAcrossClasses: { paths: Array<Array<string>>, nodes: Array<{ __typename: 'XtdActivity', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdActor', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdBag', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdClassification', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdExternalDocument', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdMeasureWithUnit', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdNest', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdProperty', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdRelActsUpon', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdRelAssignsCollections', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdRelAssignsMeasures', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdRelAssignsProperties', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdRelAssignsPropertyWithValues', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdRelAssignsUnits', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdRelAssignsValues', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdRelAssociates', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdRelCollects', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdRelComposes', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdRelDocuments', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdRelGroups', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdRelSequences', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdRelSpecializes', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdSubject', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdUnit', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> } | { __typename: 'XtdValue', id: string, recordType: CatalogRecordType, name?: string | null, description?: string | null, comment?: string | null, tags: Array<{ id: string, name: string }> }> } };

export type ProfileQueryVariables = Exact<{ [key: string]: never; }>;


export type ProfileQuery = { profile: { username: string, firstName: string, lastName: string, email: string, organization: string } };

export const UserProfileFragmentDoc = gql`
    fragment UserProfile on Profile {
  username
  firstName
  lastName
  email
  organization
}
    `;
export const PagePropsFragmentDoc = gql`
    fragment PageProps on PageInfo {
  totalPages
  pageNumber
  hasNext
  hasPrevious
}
    `;
export const TagPropsFragmentDoc = gql`
    fragment TagProps on Tag {
  id
  name
}
    `;
export const SearchResultPropsFragmentDoc = gql`
    fragment SearchResultProps on SearchResult {
  __typename
  id
  recordType
  name(input: {languageTags: ["de-DE", "en-US"]})
  description(input: {languageTags: ["de-DE", "en-US"]})
  comment(input: {languageTags: ["de-DE", "en-US"]})
  tags {
    ...TagProps
  }
}
    ${TagPropsFragmentDoc}`;
export const MetaPropsFragmentDoc = gql`
    fragment MetaProps on Concept {
  created
  createdBy
  lastModified
  lastModifiedBy
}
    `;
export const ItemPropsFragmentDoc = gql`
    fragment ItemProps on Concept {
  __typename
  id
  recordType
  name(input: {languageTags: ["de-DE", "en-US"]})
  description(input: {languageTags: ["de-DE", "en-US"]})
  comment(input: {languageTags: ["de-DE", "en-US"]})
  tags {
    ...TagProps
  }
}
    ${TagPropsFragmentDoc}`;
export const LanguagePropsFragmentDoc = gql`
    fragment LanguageProps on Language {
  id
  languageTag
  displayCountry(input: {languageTag: "de"})
  displayLanguage(input: {languageTag: "de"})
}
    `;
export const TranslationPropsFragmentDoc = gql`
    fragment TranslationProps on Translation {
  id
  language {
    ...LanguageProps
  }
  value
}
    ${LanguagePropsFragmentDoc}`;
export const ConceptPropsFragmentDoc = gql`
    fragment ConceptProps on Concept {
  ...ItemProps
  versionId
  versionDate
  names {
    ...TranslationProps
  }
  descriptions {
    ...TranslationProps
  }
  comments {
    ...TranslationProps
  }
}
    ${ItemPropsFragmentDoc}
${TranslationPropsFragmentDoc}`;
export const ExternalDocumentPropsFragmentDoc = gql`
    fragment ExternalDocumentProps on XtdExternalDocument {
  ...ConceptProps
}
    ${ConceptPropsFragmentDoc}`;
export const RelationshipPropsFragmentDoc = gql`
    fragment RelationshipProps on XtdRelationship {
  ...ConceptProps
}
    ${ConceptPropsFragmentDoc}`;
export const DocumentsPropsFragmentDoc = gql`
    fragment DocumentsProps on XtdRelDocuments {
  ...RelationshipProps
  relatingDocument {
    ...ItemProps
  }
  relatedThings {
    ...ItemProps
  }
}
    ${RelationshipPropsFragmentDoc}
${ItemPropsFragmentDoc}`;
export const ExternalDocumentDetailPropsFragmentDoc = gql`
    fragment ExternalDocumentDetailProps on XtdExternalDocument {
  ...MetaProps
  ...ExternalDocumentProps
  documents {
    nodes {
      ...DocumentsProps
    }
  }
}
    ${MetaPropsFragmentDoc}
${ExternalDocumentPropsFragmentDoc}
${DocumentsPropsFragmentDoc}`;
export const ObjectDetailPropsFragmentDoc = gql`
    fragment ObjectDetailProps on XtdObject {
  ...MetaProps
  ...ConceptProps
  documentedBy {
    nodes {
      ...DocumentsProps
    }
  }
}
    ${MetaPropsFragmentDoc}
${ConceptPropsFragmentDoc}
${DocumentsPropsFragmentDoc}`;
export const AssignsCollectionsPropsFragmentDoc = gql`
    fragment AssignsCollectionsProps on XtdRelAssignsCollections {
  ...RelationshipProps
  relatingObject {
    ...ItemProps
  }
  relatedCollections {
    ...ItemProps
  }
}
    ${RelationshipPropsFragmentDoc}
${ItemPropsFragmentDoc}`;
export const AssignsPropertiesPropsFragmentDoc = gql`
    fragment AssignsPropertiesProps on XtdRelAssignsProperties {
  ...RelationshipProps
  relatingObject {
    ...ItemProps
  }
  relatedProperties {
    ...ItemProps
  }
}
    ${RelationshipPropsFragmentDoc}
${ItemPropsFragmentDoc}`;
export const CollectsPropsFragmentDoc = gql`
    fragment CollectsProps on XtdRelCollects {
  ...RelationshipProps
  relatingCollection {
    ...ItemProps
    tags {
      ...TagProps
    }
  }
  relatedThings {
    ...ItemProps
  }
}
    ${RelationshipPropsFragmentDoc}
${ItemPropsFragmentDoc}
${TagPropsFragmentDoc}`;
export const SubjectDetailPropsFragmentDoc = gql`
    fragment SubjectDetailProps on XtdSubject {
  ...ObjectDetailProps
  assignedCollections {
    nodes {
      ...AssignsCollectionsProps
    }
  }
  assignedProperties {
    nodes {
      ...AssignsPropertiesProps
    }
  }
  collectedBy {
    nodes {
      ...CollectsProps
    }
  }
  properties {
    id
    name
    description
    comment
    assignedMeasures {
      nodes {
        id
        relatedMeasures {
          id
          name
          description
          comment
          assignedValues {
            nodes {
              id
              relatedValues {
                id
                name
                description
                comment
                nominalValue
              }
            }
          }
        }
      }
    }
  }
}
    ${ObjectDetailPropsFragmentDoc}
${AssignsCollectionsPropsFragmentDoc}
${AssignsPropertiesPropsFragmentDoc}
${CollectsPropsFragmentDoc}`;
export const AssignsMeasuresPropsFragmentDoc = gql`
    fragment AssignsMeasuresProps on XtdRelAssignsMeasures {
  ...RelationshipProps
  relatingProperty {
    ...ItemProps
  }
  relatedMeasures {
    ...ItemProps
  }
}
    ${RelationshipPropsFragmentDoc}
${ItemPropsFragmentDoc}`;
export const PropertyDetailPropsFragmentDoc = gql`
    fragment PropertyDetailProps on XtdProperty {
  ...ObjectDetailProps
  assignedMeasures {
    nodes {
      ...AssignsMeasuresProps
    }
  }
  assignedTo {
    nodes {
      ...AssignsPropertiesProps
    }
  }
  collectedBy {
    nodes {
      ...CollectsProps
    }
  }
}
    ${ObjectDetailPropsFragmentDoc}
${AssignsMeasuresPropsFragmentDoc}
${AssignsPropertiesPropsFragmentDoc}
${CollectsPropsFragmentDoc}`;
export const AssignsUnitsPropsFragmentDoc = gql`
    fragment AssignsUnitsProps on XtdRelAssignsUnits {
  ...RelationshipProps
  relatingMeasure {
    ...ItemProps
  }
  relatedUnits {
    ...ItemProps
  }
}
    ${RelationshipPropsFragmentDoc}
${ItemPropsFragmentDoc}`;
export const AssignsValuesPropsFragmentDoc = gql`
    fragment AssignsValuesProps on XtdRelAssignsValues {
  ...RelationshipProps
  relatingMeasure {
    ...ItemProps
  }
  relatedValues {
    ...ItemProps
  }
}
    ${RelationshipPropsFragmentDoc}
${ItemPropsFragmentDoc}`;
export const MeasureDetailPropsFragmentDoc = gql`
    fragment MeasureDetailProps on XtdMeasureWithUnit {
  ...ObjectDetailProps
  assignedTo {
    nodes {
      ...AssignsMeasuresProps
    }
  }
  assignedUnits {
    nodes {
      ...AssignsUnitsProps
    }
  }
  assignedValues {
    nodes {
      ...AssignsValuesProps
    }
  }
}
    ${ObjectDetailPropsFragmentDoc}
${AssignsMeasuresPropsFragmentDoc}
${AssignsUnitsPropsFragmentDoc}
${AssignsValuesPropsFragmentDoc}`;
export const UnitDetailPropsFragmentDoc = gql`
    fragment UnitDetailProps on XtdUnit {
  ...ObjectDetailProps
  assignedTo {
    nodes {
      ...AssignsUnitsProps
    }
  }
}
    ${ObjectDetailPropsFragmentDoc}
${AssignsUnitsPropsFragmentDoc}`;
export const ValuePropsFragmentDoc = gql`
    fragment ValueProps on XtdValue {
  ...ConceptProps
  valueType
  valueRole
  nominalValue
  toleranceType
  lowerTolerance
  upperTolerance
}
    ${ConceptPropsFragmentDoc}`;
export const ValueDetailPropsFragmentDoc = gql`
    fragment ValueDetailProps on XtdValue {
  ...ObjectDetailProps
  ...ValueProps
  assignedTo {
    nodes {
      ...AssignsValuesProps
    }
  }
}
    ${ObjectDetailPropsFragmentDoc}
${ValuePropsFragmentDoc}
${AssignsValuesPropsFragmentDoc}`;
export const CollectionPropsFragmentDoc = gql`
    fragment CollectionProps on XtdCollection {
  ...ConceptProps
}
    ${ConceptPropsFragmentDoc}`;
export const CollectionDetailPropsFragmentDoc = gql`
    fragment CollectionDetailProps on XtdCollection {
  ...MetaProps
  ...CollectionProps
  collects {
    nodes {
      ...CollectsProps
    }
  }
  assignedTo {
    nodes {
      ...AssignsCollectionsProps
    }
  }
  collectedBy {
    nodes {
      ...CollectsProps
    }
  }
  documentedBy {
    nodes {
      ...DocumentsProps
    }
  }
}
    ${MetaPropsFragmentDoc}
${CollectionPropsFragmentDoc}
${CollectsPropsFragmentDoc}
${AssignsCollectionsPropsFragmentDoc}
${DocumentsPropsFragmentDoc}`;
export const ExportCatalogRecord_FragmentFragmentDoc = gql`
    fragment ExportCatalogRecord_Fragment on ExportResult {
  id
  typ
  schlagworte
  name
  name_en
  description
  versionId
  created
  createdBy
  lastModified
  lastModifiedBy
}
    `;
export const ExportCatalogRecordRelationship_FragmentFragmentDoc = gql`
    fragment ExportCatalogRecordRelationship_Fragment on ExportRelationshipResult {
  Entity1
  Entity1Type
  RelationId
  RelationshipType
  Entity2
  Entity2Type
}
    `;
export const FindTagsResultFragmentFragmentDoc = gql`
    fragment FindTagsResultFragment on Tag {
  id
  name
}
    `;
export const SignupFormDocument = gql`
    mutation SignupForm($profile: SignupInput!) {
  success: signup(input: $profile)
}
    `;
export type SignupFormMutationFn = Apollo.MutationFunction<SignupFormMutation, SignupFormMutationVariables>;

/**
 * __useSignupFormMutation__
 *
 * To run a mutation, you first call `useSignupFormMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignupFormMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signupFormMutation, { data, loading, error }] = useSignupFormMutation({
 *   variables: {
 *      profile: // value for 'profile'
 *   },
 * });
 */
export function useSignupFormMutation(baseOptions?: Apollo.MutationHookOptions<SignupFormMutation, SignupFormMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignupFormMutation, SignupFormMutationVariables>(SignupFormDocument, options);
      }
export type SignupFormMutationHookResult = ReturnType<typeof useSignupFormMutation>;
export type SignupFormMutationResult = Apollo.MutationResult<SignupFormMutation>;
export type SignupFormMutationOptions = Apollo.BaseMutationOptions<SignupFormMutation, SignupFormMutationVariables>;
export const ConfirmEmailDocument = gql`
    mutation ConfirmEmail($token: String!) {
  success: confirm(token: $token)
}
    `;
export type ConfirmEmailMutationFn = Apollo.MutationFunction<ConfirmEmailMutation, ConfirmEmailMutationVariables>;

/**
 * __useConfirmEmailMutation__
 *
 * To run a mutation, you first call `useConfirmEmailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useConfirmEmailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [confirmEmailMutation, { data, loading, error }] = useConfirmEmailMutation({
 *   variables: {
 *      token: // value for 'token'
 *   },
 * });
 */
export function useConfirmEmailMutation(baseOptions?: Apollo.MutationHookOptions<ConfirmEmailMutation, ConfirmEmailMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ConfirmEmailMutation, ConfirmEmailMutationVariables>(ConfirmEmailDocument, options);
      }
export type ConfirmEmailMutationHookResult = ReturnType<typeof useConfirmEmailMutation>;
export type ConfirmEmailMutationResult = Apollo.MutationResult<ConfirmEmailMutation>;
export type ConfirmEmailMutationOptions = Apollo.BaseMutationOptions<ConfirmEmailMutation, ConfirmEmailMutationVariables>;
export const LoginFormDocument = gql`
    mutation LoginForm($credentials: LoginInput!) {
  token: login(input: $credentials)
}
    `;
export type LoginFormMutationFn = Apollo.MutationFunction<LoginFormMutation, LoginFormMutationVariables>;

/**
 * __useLoginFormMutation__
 *
 * To run a mutation, you first call `useLoginFormMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginFormMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginFormMutation, { data, loading, error }] = useLoginFormMutation({
 *   variables: {
 *      credentials: // value for 'credentials'
 *   },
 * });
 */
export function useLoginFormMutation(baseOptions?: Apollo.MutationHookOptions<LoginFormMutation, LoginFormMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginFormMutation, LoginFormMutationVariables>(LoginFormDocument, options);
      }
export type LoginFormMutationHookResult = ReturnType<typeof useLoginFormMutation>;
export type LoginFormMutationResult = Apollo.MutationResult<LoginFormMutation>;
export type LoginFormMutationOptions = Apollo.BaseMutationOptions<LoginFormMutation, LoginFormMutationVariables>;
export const UpdateProfileDocument = gql`
    mutation UpdateProfile($input: ProfileUpdateInput!) {
  updateProfile(input: $input) {
    ...UserProfile
  }
}
    ${UserProfileFragmentDoc}`;
export type UpdateProfileMutationFn = Apollo.MutationFunction<UpdateProfileMutation, UpdateProfileMutationVariables>;

/**
 * __useUpdateProfileMutation__
 *
 * To run a mutation, you first call `useUpdateProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProfileMutation, { data, loading, error }] = useUpdateProfileMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateProfileMutation(baseOptions?: Apollo.MutationHookOptions<UpdateProfileMutation, UpdateProfileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateProfileMutation, UpdateProfileMutationVariables>(UpdateProfileDocument, options);
      }
export type UpdateProfileMutationHookResult = ReturnType<typeof useUpdateProfileMutation>;
export type UpdateProfileMutationResult = Apollo.MutationResult<UpdateProfileMutation>;
export type UpdateProfileMutationOptions = Apollo.BaseMutationOptions<UpdateProfileMutation, UpdateProfileMutationVariables>;
export const CreateEntryDocument = gql`
    mutation CreateEntry($input: CreateCatalogEntryInput!) {
  createCatalogEntry(input: $input) {
    catalogEntry {
      ...ConceptProps
    }
  }
}
    ${ConceptPropsFragmentDoc}`;
export type CreateEntryMutationFn = Apollo.MutationFunction<CreateEntryMutation, CreateEntryMutationVariables>;

/**
 * __useCreateEntryMutation__
 *
 * To run a mutation, you first call `useCreateEntryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateEntryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createEntryMutation, { data, loading, error }] = useCreateEntryMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateEntryMutation(baseOptions?: Apollo.MutationHookOptions<CreateEntryMutation, CreateEntryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateEntryMutation, CreateEntryMutationVariables>(CreateEntryDocument, options);
      }
export type CreateEntryMutationHookResult = ReturnType<typeof useCreateEntryMutation>;
export type CreateEntryMutationResult = Apollo.MutationResult<CreateEntryMutation>;
export type CreateEntryMutationOptions = Apollo.BaseMutationOptions<CreateEntryMutation, CreateEntryMutationVariables>;
export const DeleteEntryDocument = gql`
    mutation DeleteEntry($id: ID!) {
  deleteCatalogEntry(input: {catalogEntryId: $id}) {
    catalogEntry {
      ...ConceptProps
    }
  }
}
    ${ConceptPropsFragmentDoc}`;
export type DeleteEntryMutationFn = Apollo.MutationFunction<DeleteEntryMutation, DeleteEntryMutationVariables>;

/**
 * __useDeleteEntryMutation__
 *
 * To run a mutation, you first call `useDeleteEntryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteEntryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteEntryMutation, { data, loading, error }] = useDeleteEntryMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteEntryMutation(baseOptions?: Apollo.MutationHookOptions<DeleteEntryMutation, DeleteEntryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteEntryMutation, DeleteEntryMutationVariables>(DeleteEntryDocument, options);
      }
export type DeleteEntryMutationHookResult = ReturnType<typeof useDeleteEntryMutation>;
export type DeleteEntryMutationResult = Apollo.MutationResult<DeleteEntryMutation>;
export type DeleteEntryMutationOptions = Apollo.BaseMutationOptions<DeleteEntryMutation, DeleteEntryMutationVariables>;
export const SetVersionDocument = gql`
    mutation SetVersion($input: SetVersionInput!) {
  setVersion(input: $input) {
    catalogEntry {
      ...ConceptProps
    }
  }
}
    ${ConceptPropsFragmentDoc}`;
export type SetVersionMutationFn = Apollo.MutationFunction<SetVersionMutation, SetVersionMutationVariables>;

/**
 * __useSetVersionMutation__
 *
 * To run a mutation, you first call `useSetVersionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetVersionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setVersionMutation, { data, loading, error }] = useSetVersionMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSetVersionMutation(baseOptions?: Apollo.MutationHookOptions<SetVersionMutation, SetVersionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SetVersionMutation, SetVersionMutationVariables>(SetVersionDocument, options);
      }
export type SetVersionMutationHookResult = ReturnType<typeof useSetVersionMutation>;
export type SetVersionMutationResult = Apollo.MutationResult<SetVersionMutation>;
export type SetVersionMutationOptions = Apollo.BaseMutationOptions<SetVersionMutation, SetVersionMutationVariables>;
export const AddNameDocument = gql`
    mutation AddName($input: AddNameInput!) {
  addName(input: $input) {
    catalogEntry {
      ...ConceptProps
    }
  }
}
    ${ConceptPropsFragmentDoc}`;
export type AddNameMutationFn = Apollo.MutationFunction<AddNameMutation, AddNameMutationVariables>;

/**
 * __useAddNameMutation__
 *
 * To run a mutation, you first call `useAddNameMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddNameMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addNameMutation, { data, loading, error }] = useAddNameMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddNameMutation(baseOptions?: Apollo.MutationHookOptions<AddNameMutation, AddNameMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddNameMutation, AddNameMutationVariables>(AddNameDocument, options);
      }
export type AddNameMutationHookResult = ReturnType<typeof useAddNameMutation>;
export type AddNameMutationResult = Apollo.MutationResult<AddNameMutation>;
export type AddNameMutationOptions = Apollo.BaseMutationOptions<AddNameMutation, AddNameMutationVariables>;
export const UpdateNameDocument = gql`
    mutation UpdateName($input: UpdateNameInput!) {
  updateName(input: $input) {
    catalogEntry {
      ...ConceptProps
    }
  }
}
    ${ConceptPropsFragmentDoc}`;
export type UpdateNameMutationFn = Apollo.MutationFunction<UpdateNameMutation, UpdateNameMutationVariables>;

/**
 * __useUpdateNameMutation__
 *
 * To run a mutation, you first call `useUpdateNameMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateNameMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateNameMutation, { data, loading, error }] = useUpdateNameMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateNameMutation(baseOptions?: Apollo.MutationHookOptions<UpdateNameMutation, UpdateNameMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateNameMutation, UpdateNameMutationVariables>(UpdateNameDocument, options);
      }
export type UpdateNameMutationHookResult = ReturnType<typeof useUpdateNameMutation>;
export type UpdateNameMutationResult = Apollo.MutationResult<UpdateNameMutation>;
export type UpdateNameMutationOptions = Apollo.BaseMutationOptions<UpdateNameMutation, UpdateNameMutationVariables>;
export const DeleteNameDocument = gql`
    mutation DeleteName($input: DeleteNameInput!) {
  deleteName(input: $input) {
    catalogEntry {
      ...ConceptProps
    }
  }
}
    ${ConceptPropsFragmentDoc}`;
export type DeleteNameMutationFn = Apollo.MutationFunction<DeleteNameMutation, DeleteNameMutationVariables>;

/**
 * __useDeleteNameMutation__
 *
 * To run a mutation, you first call `useDeleteNameMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteNameMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteNameMutation, { data, loading, error }] = useDeleteNameMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeleteNameMutation(baseOptions?: Apollo.MutationHookOptions<DeleteNameMutation, DeleteNameMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteNameMutation, DeleteNameMutationVariables>(DeleteNameDocument, options);
      }
export type DeleteNameMutationHookResult = ReturnType<typeof useDeleteNameMutation>;
export type DeleteNameMutationResult = Apollo.MutationResult<DeleteNameMutation>;
export type DeleteNameMutationOptions = Apollo.BaseMutationOptions<DeleteNameMutation, DeleteNameMutationVariables>;
export const AddDescriptionDocument = gql`
    mutation AddDescription($input: AddDescriptionInput!) {
  addDescription(input: $input) {
    catalogEntry {
      ...ConceptProps
    }
  }
}
    ${ConceptPropsFragmentDoc}`;
export type AddDescriptionMutationFn = Apollo.MutationFunction<AddDescriptionMutation, AddDescriptionMutationVariables>;

/**
 * __useAddDescriptionMutation__
 *
 * To run a mutation, you first call `useAddDescriptionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddDescriptionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addDescriptionMutation, { data, loading, error }] = useAddDescriptionMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddDescriptionMutation(baseOptions?: Apollo.MutationHookOptions<AddDescriptionMutation, AddDescriptionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddDescriptionMutation, AddDescriptionMutationVariables>(AddDescriptionDocument, options);
      }
export type AddDescriptionMutationHookResult = ReturnType<typeof useAddDescriptionMutation>;
export type AddDescriptionMutationResult = Apollo.MutationResult<AddDescriptionMutation>;
export type AddDescriptionMutationOptions = Apollo.BaseMutationOptions<AddDescriptionMutation, AddDescriptionMutationVariables>;
export const UpdateDescriptionDocument = gql`
    mutation UpdateDescription($input: UpdateDescriptionInput!) {
  updateDescription(input: $input) {
    catalogEntry {
      ...ConceptProps
    }
  }
}
    ${ConceptPropsFragmentDoc}`;
export type UpdateDescriptionMutationFn = Apollo.MutationFunction<UpdateDescriptionMutation, UpdateDescriptionMutationVariables>;

/**
 * __useUpdateDescriptionMutation__
 *
 * To run a mutation, you first call `useUpdateDescriptionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateDescriptionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateDescriptionMutation, { data, loading, error }] = useUpdateDescriptionMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateDescriptionMutation(baseOptions?: Apollo.MutationHookOptions<UpdateDescriptionMutation, UpdateDescriptionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateDescriptionMutation, UpdateDescriptionMutationVariables>(UpdateDescriptionDocument, options);
      }
export type UpdateDescriptionMutationHookResult = ReturnType<typeof useUpdateDescriptionMutation>;
export type UpdateDescriptionMutationResult = Apollo.MutationResult<UpdateDescriptionMutation>;
export type UpdateDescriptionMutationOptions = Apollo.BaseMutationOptions<UpdateDescriptionMutation, UpdateDescriptionMutationVariables>;
export const DeleteDescriptionDocument = gql`
    mutation DeleteDescription($input: DeleteDescriptionInput!) {
  deleteDescription(input: $input) {
    catalogEntry {
      ...ConceptProps
    }
  }
}
    ${ConceptPropsFragmentDoc}`;
export type DeleteDescriptionMutationFn = Apollo.MutationFunction<DeleteDescriptionMutation, DeleteDescriptionMutationVariables>;

/**
 * __useDeleteDescriptionMutation__
 *
 * To run a mutation, you first call `useDeleteDescriptionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteDescriptionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteDescriptionMutation, { data, loading, error }] = useDeleteDescriptionMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeleteDescriptionMutation(baseOptions?: Apollo.MutationHookOptions<DeleteDescriptionMutation, DeleteDescriptionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteDescriptionMutation, DeleteDescriptionMutationVariables>(DeleteDescriptionDocument, options);
      }
export type DeleteDescriptionMutationHookResult = ReturnType<typeof useDeleteDescriptionMutation>;
export type DeleteDescriptionMutationResult = Apollo.MutationResult<DeleteDescriptionMutation>;
export type DeleteDescriptionMutationOptions = Apollo.BaseMutationOptions<DeleteDescriptionMutation, DeleteDescriptionMutationVariables>;
export const AddCommentDocument = gql`
    mutation AddComment($input: AddCommentInput!) {
  addComment(input: $input) {
    catalogEntry {
      ...ConceptProps
    }
  }
}
    ${ConceptPropsFragmentDoc}`;
export type AddCommentMutationFn = Apollo.MutationFunction<AddCommentMutation, AddCommentMutationVariables>;

/**
 * __useAddCommentMutation__
 *
 * To run a mutation, you first call `useAddCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addCommentMutation, { data, loading, error }] = useAddCommentMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddCommentMutation(baseOptions?: Apollo.MutationHookOptions<AddCommentMutation, AddCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddCommentMutation, AddCommentMutationVariables>(AddCommentDocument, options);
      }
export type AddCommentMutationHookResult = ReturnType<typeof useAddCommentMutation>;
export type AddCommentMutationResult = Apollo.MutationResult<AddCommentMutation>;
export type AddCommentMutationOptions = Apollo.BaseMutationOptions<AddCommentMutation, AddCommentMutationVariables>;
export const UpdateCommentDocument = gql`
    mutation UpdateComment($input: UpdateCommentInput!) {
  updateComment(input: $input) {
    catalogEntry {
      ...ConceptProps
    }
  }
}
    ${ConceptPropsFragmentDoc}`;
export type UpdateCommentMutationFn = Apollo.MutationFunction<UpdateCommentMutation, UpdateCommentMutationVariables>;

/**
 * __useUpdateCommentMutation__
 *
 * To run a mutation, you first call `useUpdateCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCommentMutation, { data, loading, error }] = useUpdateCommentMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateCommentMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCommentMutation, UpdateCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateCommentMutation, UpdateCommentMutationVariables>(UpdateCommentDocument, options);
      }
export type UpdateCommentMutationHookResult = ReturnType<typeof useUpdateCommentMutation>;
export type UpdateCommentMutationResult = Apollo.MutationResult<UpdateCommentMutation>;
export type UpdateCommentMutationOptions = Apollo.BaseMutationOptions<UpdateCommentMutation, UpdateCommentMutationVariables>;
export const DeleteCommentDocument = gql`
    mutation DeleteComment($input: DeleteCommentInput!) {
  deleteComment(input: $input) {
    catalogEntry {
      ...ConceptProps
    }
  }
}
    ${ConceptPropsFragmentDoc}`;
export type DeleteCommentMutationFn = Apollo.MutationFunction<DeleteCommentMutation, DeleteCommentMutationVariables>;

/**
 * __useDeleteCommentMutation__
 *
 * To run a mutation, you first call `useDeleteCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCommentMutation, { data, loading, error }] = useDeleteCommentMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeleteCommentMutation(baseOptions?: Apollo.MutationHookOptions<DeleteCommentMutation, DeleteCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteCommentMutation, DeleteCommentMutationVariables>(DeleteCommentDocument, options);
      }
export type DeleteCommentMutationHookResult = ReturnType<typeof useDeleteCommentMutation>;
export type DeleteCommentMutationResult = Apollo.MutationResult<DeleteCommentMutation>;
export type DeleteCommentMutationOptions = Apollo.BaseMutationOptions<DeleteCommentMutation, DeleteCommentMutationVariables>;
export const SetToleranceDocument = gql`
    mutation SetTolerance($input: SetToleranceInput!) {
  setTolerance(input: $input) {
    catalogEntry {
      ...ValueDetailProps
    }
  }
}
    ${ValueDetailPropsFragmentDoc}`;
export type SetToleranceMutationFn = Apollo.MutationFunction<SetToleranceMutation, SetToleranceMutationVariables>;

/**
 * __useSetToleranceMutation__
 *
 * To run a mutation, you first call `useSetToleranceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetToleranceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setToleranceMutation, { data, loading, error }] = useSetToleranceMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSetToleranceMutation(baseOptions?: Apollo.MutationHookOptions<SetToleranceMutation, SetToleranceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SetToleranceMutation, SetToleranceMutationVariables>(SetToleranceDocument, options);
      }
export type SetToleranceMutationHookResult = ReturnType<typeof useSetToleranceMutation>;
export type SetToleranceMutationResult = Apollo.MutationResult<SetToleranceMutation>;
export type SetToleranceMutationOptions = Apollo.BaseMutationOptions<SetToleranceMutation, SetToleranceMutationVariables>;
export const UnsetToleranceDocument = gql`
    mutation UnsetTolerance($input: UnsetToleranceInput!) {
  unsetTolerance(input: $input) {
    catalogEntry {
      ...ValueDetailProps
    }
  }
}
    ${ValueDetailPropsFragmentDoc}`;
export type UnsetToleranceMutationFn = Apollo.MutationFunction<UnsetToleranceMutation, UnsetToleranceMutationVariables>;

/**
 * __useUnsetToleranceMutation__
 *
 * To run a mutation, you first call `useUnsetToleranceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnsetToleranceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unsetToleranceMutation, { data, loading, error }] = useUnsetToleranceMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUnsetToleranceMutation(baseOptions?: Apollo.MutationHookOptions<UnsetToleranceMutation, UnsetToleranceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UnsetToleranceMutation, UnsetToleranceMutationVariables>(UnsetToleranceDocument, options);
      }
export type UnsetToleranceMutationHookResult = ReturnType<typeof useUnsetToleranceMutation>;
export type UnsetToleranceMutationResult = Apollo.MutationResult<UnsetToleranceMutation>;
export type UnsetToleranceMutationOptions = Apollo.BaseMutationOptions<UnsetToleranceMutation, UnsetToleranceMutationVariables>;
export const SetNominalValueDocument = gql`
    mutation SetNominalValue($input: SetNominalValueInput!) {
  setNominalValue(input: $input) {
    catalogEntry {
      ...ValueDetailProps
    }
  }
}
    ${ValueDetailPropsFragmentDoc}`;
export type SetNominalValueMutationFn = Apollo.MutationFunction<SetNominalValueMutation, SetNominalValueMutationVariables>;

/**
 * __useSetNominalValueMutation__
 *
 * To run a mutation, you first call `useSetNominalValueMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetNominalValueMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setNominalValueMutation, { data, loading, error }] = useSetNominalValueMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSetNominalValueMutation(baseOptions?: Apollo.MutationHookOptions<SetNominalValueMutation, SetNominalValueMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SetNominalValueMutation, SetNominalValueMutationVariables>(SetNominalValueDocument, options);
      }
export type SetNominalValueMutationHookResult = ReturnType<typeof useSetNominalValueMutation>;
export type SetNominalValueMutationResult = Apollo.MutationResult<SetNominalValueMutation>;
export type SetNominalValueMutationOptions = Apollo.BaseMutationOptions<SetNominalValueMutation, SetNominalValueMutationVariables>;
export const UnsetNominalValueDocument = gql`
    mutation UnsetNominalValue($input: UnsetNominalValueInput!) {
  unsetNominalValue(input: $input) {
    catalogEntry {
      ...ValueDetailProps
    }
  }
}
    ${ValueDetailPropsFragmentDoc}`;
export type UnsetNominalValueMutationFn = Apollo.MutationFunction<UnsetNominalValueMutation, UnsetNominalValueMutationVariables>;

/**
 * __useUnsetNominalValueMutation__
 *
 * To run a mutation, you first call `useUnsetNominalValueMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnsetNominalValueMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unsetNominalValueMutation, { data, loading, error }] = useUnsetNominalValueMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUnsetNominalValueMutation(baseOptions?: Apollo.MutationHookOptions<UnsetNominalValueMutation, UnsetNominalValueMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UnsetNominalValueMutation, UnsetNominalValueMutationVariables>(UnsetNominalValueDocument, options);
      }
export type UnsetNominalValueMutationHookResult = ReturnType<typeof useUnsetNominalValueMutation>;
export type UnsetNominalValueMutationResult = Apollo.MutationResult<UnsetNominalValueMutation>;
export type UnsetNominalValueMutationOptions = Apollo.BaseMutationOptions<UnsetNominalValueMutation, UnsetNominalValueMutationVariables>;
export const TagBagDocument = gql`
    mutation TagBag($bagId: ID!, $tagId: ID!) {
  addTag(input: {catalogEntryId: $bagId, tagId: $tagId}) {
    catalogEntry {
      ...CollectionDetailProps
    }
  }
}
    ${CollectionDetailPropsFragmentDoc}`;
export type TagBagMutationFn = Apollo.MutationFunction<TagBagMutation, TagBagMutationVariables>;

/**
 * __useTagBagMutation__
 *
 * To run a mutation, you first call `useTagBagMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTagBagMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [tagBagMutation, { data, loading, error }] = useTagBagMutation({
 *   variables: {
 *      bagId: // value for 'bagId'
 *      tagId: // value for 'tagId'
 *   },
 * });
 */
export function useTagBagMutation(baseOptions?: Apollo.MutationHookOptions<TagBagMutation, TagBagMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<TagBagMutation, TagBagMutationVariables>(TagBagDocument, options);
      }
export type TagBagMutationHookResult = ReturnType<typeof useTagBagMutation>;
export type TagBagMutationResult = Apollo.MutationResult<TagBagMutation>;
export type TagBagMutationOptions = Apollo.BaseMutationOptions<TagBagMutation, TagBagMutationVariables>;
export const AddTagDocument = gql`
    mutation AddTag($input: AddTagInput!) {
  addTag(input: $input) {
    catalogEntry {
      __typename
    }
  }
}
    `;
export type AddTagMutationFn = Apollo.MutationFunction<AddTagMutation, AddTagMutationVariables>;

/**
 * __useAddTagMutation__
 *
 * To run a mutation, you first call `useAddTagMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddTagMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addTagMutation, { data, loading, error }] = useAddTagMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddTagMutation(baseOptions?: Apollo.MutationHookOptions<AddTagMutation, AddTagMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddTagMutation, AddTagMutationVariables>(AddTagDocument, options);
      }
export type AddTagMutationHookResult = ReturnType<typeof useAddTagMutation>;
export type AddTagMutationResult = Apollo.MutationResult<AddTagMutation>;
export type AddTagMutationOptions = Apollo.BaseMutationOptions<AddTagMutation, AddTagMutationVariables>;
export const CreateTagDocument = gql`
    mutation CreateTag($input: CreateTagInput!) {
  createTag(input: $input) {
    tag {
      id
      name
    }
  }
}
    `;
export type CreateTagMutationFn = Apollo.MutationFunction<CreateTagMutation, CreateTagMutationVariables>;

/**
 * __useCreateTagMutation__
 *
 * To run a mutation, you first call `useCreateTagMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTagMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTagMutation, { data, loading, error }] = useCreateTagMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateTagMutation(baseOptions?: Apollo.MutationHookOptions<CreateTagMutation, CreateTagMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateTagMutation, CreateTagMutationVariables>(CreateTagDocument, options);
      }
export type CreateTagMutationHookResult = ReturnType<typeof useCreateTagMutation>;
export type CreateTagMutationResult = Apollo.MutationResult<CreateTagMutation>;
export type CreateTagMutationOptions = Apollo.BaseMutationOptions<CreateTagMutation, CreateTagMutationVariables>;
export const CreateRelationshipDocument = gql`
    mutation CreateRelationship($input: CreateRelationshipInput!) {
  createRelationship(input: $input) {
    relationship {
      ... on XtdRelationship {
        __typename
        id
      }
    }
  }
}
    `;
export type CreateRelationshipMutationFn = Apollo.MutationFunction<CreateRelationshipMutation, CreateRelationshipMutationVariables>;

/**
 * __useCreateRelationshipMutation__
 *
 * To run a mutation, you first call `useCreateRelationshipMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateRelationshipMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createRelationshipMutation, { data, loading, error }] = useCreateRelationshipMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateRelationshipMutation(baseOptions?: Apollo.MutationHookOptions<CreateRelationshipMutation, CreateRelationshipMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateRelationshipMutation, CreateRelationshipMutationVariables>(CreateRelationshipDocument, options);
      }
export type CreateRelationshipMutationHookResult = ReturnType<typeof useCreateRelationshipMutation>;
export type CreateRelationshipMutationResult = Apollo.MutationResult<CreateRelationshipMutation>;
export type CreateRelationshipMutationOptions = Apollo.BaseMutationOptions<CreateRelationshipMutation, CreateRelationshipMutationVariables>;
export const SetRelatedEntriesDocument = gql`
    mutation SetRelatedEntries($input: SetRelatedEntriesInput!) {
  setRelatedEntries(input: $input) {
    relationship {
      ... on XtdRelationship {
        __typename
        id
      }
    }
  }
}
    `;
export type SetRelatedEntriesMutationFn = Apollo.MutationFunction<SetRelatedEntriesMutation, SetRelatedEntriesMutationVariables>;

/**
 * __useSetRelatedEntriesMutation__
 *
 * To run a mutation, you first call `useSetRelatedEntriesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetRelatedEntriesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setRelatedEntriesMutation, { data, loading, error }] = useSetRelatedEntriesMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSetRelatedEntriesMutation(baseOptions?: Apollo.MutationHookOptions<SetRelatedEntriesMutation, SetRelatedEntriesMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SetRelatedEntriesMutation, SetRelatedEntriesMutationVariables>(SetRelatedEntriesDocument, options);
      }
export type SetRelatedEntriesMutationHookResult = ReturnType<typeof useSetRelatedEntriesMutation>;
export type SetRelatedEntriesMutationResult = Apollo.MutationResult<SetRelatedEntriesMutation>;
export type SetRelatedEntriesMutationOptions = Apollo.BaseMutationOptions<SetRelatedEntriesMutation, SetRelatedEntriesMutationVariables>;
export const DeleteRelationshipDocument = gql`
    mutation DeleteRelationship($input: DeleteRelationshipInput!) {
  deleteRelationship(input: $input) {
    relationship {
      ... on XtdRelationship {
        id
      }
    }
  }
}
    `;
export type DeleteRelationshipMutationFn = Apollo.MutationFunction<DeleteRelationshipMutation, DeleteRelationshipMutationVariables>;

/**
 * __useDeleteRelationshipMutation__
 *
 * To run a mutation, you first call `useDeleteRelationshipMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteRelationshipMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteRelationshipMutation, { data, loading, error }] = useDeleteRelationshipMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeleteRelationshipMutation(baseOptions?: Apollo.MutationHookOptions<DeleteRelationshipMutation, DeleteRelationshipMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteRelationshipMutation, DeleteRelationshipMutationVariables>(DeleteRelationshipDocument, options);
      }
export type DeleteRelationshipMutationHookResult = ReturnType<typeof useDeleteRelationshipMutation>;
export type DeleteRelationshipMutationResult = Apollo.MutationResult<DeleteRelationshipMutation>;
export type DeleteRelationshipMutationOptions = Apollo.BaseMutationOptions<DeleteRelationshipMutation, DeleteRelationshipMutationVariables>;
export const FindLanguagesDocument = gql`
    query FindLanguages($input: LanguageFilterInput!) {
  languages(input: $input) {
    nodes {
      ...LanguageProps
    }
    totalElements
  }
}
    ${LanguagePropsFragmentDoc}`;

/**
 * __useFindLanguagesQuery__
 *
 * To run a query within a React component, call `useFindLanguagesQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindLanguagesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindLanguagesQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useFindLanguagesQuery(baseOptions: Apollo.QueryHookOptions<FindLanguagesQuery, FindLanguagesQueryVariables> & ({ variables: FindLanguagesQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindLanguagesQuery, FindLanguagesQueryVariables>(FindLanguagesDocument, options);
      }
export function useFindLanguagesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindLanguagesQuery, FindLanguagesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindLanguagesQuery, FindLanguagesQueryVariables>(FindLanguagesDocument, options);
        }
export function useFindLanguagesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<FindLanguagesQuery, FindLanguagesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FindLanguagesQuery, FindLanguagesQueryVariables>(FindLanguagesDocument, options);
        }
export type FindLanguagesQueryHookResult = ReturnType<typeof useFindLanguagesQuery>;
export type FindLanguagesLazyQueryHookResult = ReturnType<typeof useFindLanguagesLazyQuery>;
export type FindLanguagesSuspenseQueryHookResult = ReturnType<typeof useFindLanguagesSuspenseQuery>;
export type FindLanguagesQueryResult = Apollo.QueryResult<FindLanguagesQuery, FindLanguagesQueryVariables>;
export const FindItemDocument = gql`
    query FindItem($input: SearchInput!, $pageSize: Int, $pageNumber: Int) {
  search(input: $input, pageSize: $pageSize, pageNumber: $pageNumber) {
    nodes {
      ...SearchResultProps
    }
    pageInfo {
      ...PageProps
    }
    totalElements
  }
}
    ${SearchResultPropsFragmentDoc}
${PagePropsFragmentDoc}`;

/**
 * __useFindItemQuery__
 *
 * To run a query within a React component, call `useFindItemQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindItemQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindItemQuery({
 *   variables: {
 *      input: // value for 'input'
 *      pageSize: // value for 'pageSize'
 *      pageNumber: // value for 'pageNumber'
 *   },
 * });
 */
export function useFindItemQuery(baseOptions: Apollo.QueryHookOptions<FindItemQuery, FindItemQueryVariables> & ({ variables: FindItemQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindItemQuery, FindItemQueryVariables>(FindItemDocument, options);
      }
export function useFindItemLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindItemQuery, FindItemQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindItemQuery, FindItemQueryVariables>(FindItemDocument, options);
        }
export function useFindItemSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<FindItemQuery, FindItemQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FindItemQuery, FindItemQueryVariables>(FindItemDocument, options);
        }
export type FindItemQueryHookResult = ReturnType<typeof useFindItemQuery>;
export type FindItemLazyQueryHookResult = ReturnType<typeof useFindItemLazyQuery>;
export type FindItemSuspenseQueryHookResult = ReturnType<typeof useFindItemSuspenseQuery>;
export type FindItemQueryResult = Apollo.QueryResult<FindItemQuery, FindItemQueryVariables>;
export const FindTagsDocument = gql`
    query FindTags($pageSize: Int) {
  findTags(input: {pageSize: $pageSize}) {
    nodes {
      id
      name
    }
    totalElements
  }
}
    `;

/**
 * __useFindTagsQuery__
 *
 * To run a query within a React component, call `useFindTagsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindTagsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindTagsQuery({
 *   variables: {
 *      pageSize: // value for 'pageSize'
 *   },
 * });
 */
export function useFindTagsQuery(baseOptions?: Apollo.QueryHookOptions<FindTagsQuery, FindTagsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindTagsQuery, FindTagsQueryVariables>(FindTagsDocument, options);
      }
export function useFindTagsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindTagsQuery, FindTagsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindTagsQuery, FindTagsQueryVariables>(FindTagsDocument, options);
        }
export function useFindTagsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<FindTagsQuery, FindTagsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FindTagsQuery, FindTagsQueryVariables>(FindTagsDocument, options);
        }
export type FindTagsQueryHookResult = ReturnType<typeof useFindTagsQuery>;
export type FindTagsLazyQueryHookResult = ReturnType<typeof useFindTagsLazyQuery>;
export type FindTagsSuspenseQueryHookResult = ReturnType<typeof useFindTagsSuspenseQuery>;
export type FindTagsQueryResult = Apollo.QueryResult<FindTagsQuery, FindTagsQueryVariables>;
export const FindAllNestsDocument = gql`
    query FindAllNests($input: SearchInput!, $pageSize: Int, $pageNumber: Int) {
  search(input: $input, pageSize: $pageSize, pageNumber: $pageNumber) {
    nodes {
      ...SearchResultProps
    }
    pageInfo {
      ...PageProps
    }
    totalElements
  }
}
    ${SearchResultPropsFragmentDoc}
${PagePropsFragmentDoc}`;

/**
 * __useFindAllNestsQuery__
 *
 * To run a query within a React component, call `useFindAllNestsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindAllNestsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindAllNestsQuery({
 *   variables: {
 *      input: // value for 'input'
 *      pageSize: // value for 'pageSize'
 *      pageNumber: // value for 'pageNumber'
 *   },
 * });
 */
export function useFindAllNestsQuery(baseOptions: Apollo.QueryHookOptions<FindAllNestsQuery, FindAllNestsQueryVariables> & ({ variables: FindAllNestsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindAllNestsQuery, FindAllNestsQueryVariables>(FindAllNestsDocument, options);
      }
export function useFindAllNestsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindAllNestsQuery, FindAllNestsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindAllNestsQuery, FindAllNestsQueryVariables>(FindAllNestsDocument, options);
        }
export function useFindAllNestsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<FindAllNestsQuery, FindAllNestsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FindAllNestsQuery, FindAllNestsQueryVariables>(FindAllNestsDocument, options);
        }
export type FindAllNestsQueryHookResult = ReturnType<typeof useFindAllNestsQuery>;
export type FindAllNestsLazyQueryHookResult = ReturnType<typeof useFindAllNestsLazyQuery>;
export type FindAllNestsSuspenseQueryHookResult = ReturnType<typeof useFindAllNestsSuspenseQuery>;
export type FindAllNestsQueryResult = Apollo.QueryResult<FindAllNestsQuery, FindAllNestsQueryVariables>;
export const FindPropertyGroupsDocument = gql`
    query FindPropertyGroups($input: SearchInput!, $pageSize: Int, $pageNumber: Int) {
  search(input: $input, pageSize: $pageSize, pageNumber: $pageNumber) {
    nodes {
      ...SearchResultProps
    }
    pageInfo {
      ...PageProps
    }
    totalElements
  }
}
    ${SearchResultPropsFragmentDoc}
${PagePropsFragmentDoc}`;

/**
 * __useFindPropertyGroupsQuery__
 *
 * To run a query within a React component, call `useFindPropertyGroupsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindPropertyGroupsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindPropertyGroupsQuery({
 *   variables: {
 *      input: // value for 'input'
 *      pageSize: // value for 'pageSize'
 *      pageNumber: // value for 'pageNumber'
 *   },
 * });
 */
export function useFindPropertyGroupsQuery(baseOptions: Apollo.QueryHookOptions<FindPropertyGroupsQuery, FindPropertyGroupsQueryVariables> & ({ variables: FindPropertyGroupsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindPropertyGroupsQuery, FindPropertyGroupsQueryVariables>(FindPropertyGroupsDocument, options);
      }
export function useFindPropertyGroupsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindPropertyGroupsQuery, FindPropertyGroupsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindPropertyGroupsQuery, FindPropertyGroupsQueryVariables>(FindPropertyGroupsDocument, options);
        }
export function useFindPropertyGroupsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<FindPropertyGroupsQuery, FindPropertyGroupsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FindPropertyGroupsQuery, FindPropertyGroupsQueryVariables>(FindPropertyGroupsDocument, options);
        }
export type FindPropertyGroupsQueryHookResult = ReturnType<typeof useFindPropertyGroupsQuery>;
export type FindPropertyGroupsLazyQueryHookResult = ReturnType<typeof useFindPropertyGroupsLazyQuery>;
export type FindPropertyGroupsSuspenseQueryHookResult = ReturnType<typeof useFindPropertyGroupsSuspenseQuery>;
export type FindPropertyGroupsQueryResult = Apollo.QueryResult<FindPropertyGroupsQuery, FindPropertyGroupsQueryVariables>;
export const GetBagDocument = gql`
    query GetBag($id: ID!) {
  getBag(id: $id) {
    documentedBy {
      nodes {
        relatingDocument {
          id
          name
        }
      }
    }
  }
}
    `;

/**
 * __useGetBagQuery__
 *
 * To run a query within a React component, call `useGetBagQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBagQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBagQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetBagQuery(baseOptions: Apollo.QueryHookOptions<GetBagQuery, GetBagQueryVariables> & ({ variables: GetBagQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetBagQuery, GetBagQueryVariables>(GetBagDocument, options);
      }
export function useGetBagLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetBagQuery, GetBagQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetBagQuery, GetBagQueryVariables>(GetBagDocument, options);
        }
export function useGetBagSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetBagQuery, GetBagQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetBagQuery, GetBagQueryVariables>(GetBagDocument, options);
        }
export type GetBagQueryHookResult = ReturnType<typeof useGetBagQuery>;
export type GetBagLazyQueryHookResult = ReturnType<typeof useGetBagLazyQuery>;
export type GetBagSuspenseQueryHookResult = ReturnType<typeof useGetBagSuspenseQuery>;
export type GetBagQueryResult = Apollo.QueryResult<GetBagQuery, GetBagQueryVariables>;
export const PropertyTreeDocument = gql`
    query PropertyTree {
  hierarchy(
    input: {rootNodeFilter: {catalogEntryTypeIn: [Bag], tagged: ["6f96aaa7-e08f-49bb-ac63-93061d4c5db2"]}}
  ) {
    nodes {
      ...ItemProps
    }
    paths
  }
}
    ${ItemPropsFragmentDoc}`;

/**
 * __usePropertyTreeQuery__
 *
 * To run a query within a React component, call `usePropertyTreeQuery` and pass it any options that fit your needs.
 * When your component renders, `usePropertyTreeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePropertyTreeQuery({
 *   variables: {
 *   },
 * });
 */
export function usePropertyTreeQuery(baseOptions?: Apollo.QueryHookOptions<PropertyTreeQuery, PropertyTreeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PropertyTreeQuery, PropertyTreeQueryVariables>(PropertyTreeDocument, options);
      }
export function usePropertyTreeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PropertyTreeQuery, PropertyTreeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PropertyTreeQuery, PropertyTreeQueryVariables>(PropertyTreeDocument, options);
        }
export function usePropertyTreeSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<PropertyTreeQuery, PropertyTreeQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<PropertyTreeQuery, PropertyTreeQueryVariables>(PropertyTreeDocument, options);
        }
export type PropertyTreeQueryHookResult = ReturnType<typeof usePropertyTreeQuery>;
export type PropertyTreeLazyQueryHookResult = ReturnType<typeof usePropertyTreeLazyQuery>;
export type PropertyTreeSuspenseQueryHookResult = ReturnType<typeof usePropertyTreeSuspenseQuery>;
export type PropertyTreeQueryResult = Apollo.QueryResult<PropertyTreeQuery, PropertyTreeQueryVariables>;
export const GetDocumentEntryDocument = gql`
    query GetDocumentEntry($id: ID!) {
  node(id: $id) {
    ...ExternalDocumentDetailProps
  }
}
    ${ExternalDocumentDetailPropsFragmentDoc}`;

/**
 * __useGetDocumentEntryQuery__
 *
 * To run a query within a React component, call `useGetDocumentEntryQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDocumentEntryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDocumentEntryQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetDocumentEntryQuery(baseOptions: Apollo.QueryHookOptions<GetDocumentEntryQuery, GetDocumentEntryQueryVariables> & ({ variables: GetDocumentEntryQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetDocumentEntryQuery, GetDocumentEntryQueryVariables>(GetDocumentEntryDocument, options);
      }
export function useGetDocumentEntryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetDocumentEntryQuery, GetDocumentEntryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetDocumentEntryQuery, GetDocumentEntryQueryVariables>(GetDocumentEntryDocument, options);
        }
export function useGetDocumentEntrySuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetDocumentEntryQuery, GetDocumentEntryQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetDocumentEntryQuery, GetDocumentEntryQueryVariables>(GetDocumentEntryDocument, options);
        }
export type GetDocumentEntryQueryHookResult = ReturnType<typeof useGetDocumentEntryQuery>;
export type GetDocumentEntryLazyQueryHookResult = ReturnType<typeof useGetDocumentEntryLazyQuery>;
export type GetDocumentEntrySuspenseQueryHookResult = ReturnType<typeof useGetDocumentEntrySuspenseQuery>;
export type GetDocumentEntryQueryResult = Apollo.QueryResult<GetDocumentEntryQuery, GetDocumentEntryQueryVariables>;
export const GetObjectEntryDocument = gql`
    query GetObjectEntry($id: ID!) {
  node(id: $id) {
    ...ObjectDetailProps
  }
}
    ${ObjectDetailPropsFragmentDoc}`;

/**
 * __useGetObjectEntryQuery__
 *
 * To run a query within a React component, call `useGetObjectEntryQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetObjectEntryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetObjectEntryQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetObjectEntryQuery(baseOptions: Apollo.QueryHookOptions<GetObjectEntryQuery, GetObjectEntryQueryVariables> & ({ variables: GetObjectEntryQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetObjectEntryQuery, GetObjectEntryQueryVariables>(GetObjectEntryDocument, options);
      }
export function useGetObjectEntryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetObjectEntryQuery, GetObjectEntryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetObjectEntryQuery, GetObjectEntryQueryVariables>(GetObjectEntryDocument, options);
        }
export function useGetObjectEntrySuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetObjectEntryQuery, GetObjectEntryQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetObjectEntryQuery, GetObjectEntryQueryVariables>(GetObjectEntryDocument, options);
        }
export type GetObjectEntryQueryHookResult = ReturnType<typeof useGetObjectEntryQuery>;
export type GetObjectEntryLazyQueryHookResult = ReturnType<typeof useGetObjectEntryLazyQuery>;
export type GetObjectEntrySuspenseQueryHookResult = ReturnType<typeof useGetObjectEntrySuspenseQuery>;
export type GetObjectEntryQueryResult = Apollo.QueryResult<GetObjectEntryQuery, GetObjectEntryQueryVariables>;
export const GetSubjectEntryDocument = gql`
    query GetSubjectEntry($id: ID!) {
  node: getSubject(id: $id) {
    ...SubjectDetailProps
  }
}
    ${SubjectDetailPropsFragmentDoc}`;

/**
 * __useGetSubjectEntryQuery__
 *
 * To run a query within a React component, call `useGetSubjectEntryQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSubjectEntryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSubjectEntryQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetSubjectEntryQuery(baseOptions: Apollo.QueryHookOptions<GetSubjectEntryQuery, GetSubjectEntryQueryVariables> & ({ variables: GetSubjectEntryQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSubjectEntryQuery, GetSubjectEntryQueryVariables>(GetSubjectEntryDocument, options);
      }
export function useGetSubjectEntryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSubjectEntryQuery, GetSubjectEntryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSubjectEntryQuery, GetSubjectEntryQueryVariables>(GetSubjectEntryDocument, options);
        }
export function useGetSubjectEntrySuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetSubjectEntryQuery, GetSubjectEntryQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetSubjectEntryQuery, GetSubjectEntryQueryVariables>(GetSubjectEntryDocument, options);
        }
export type GetSubjectEntryQueryHookResult = ReturnType<typeof useGetSubjectEntryQuery>;
export type GetSubjectEntryLazyQueryHookResult = ReturnType<typeof useGetSubjectEntryLazyQuery>;
export type GetSubjectEntrySuspenseQueryHookResult = ReturnType<typeof useGetSubjectEntrySuspenseQuery>;
export type GetSubjectEntryQueryResult = Apollo.QueryResult<GetSubjectEntryQuery, GetSubjectEntryQueryVariables>;
export const GetPropertyEntryDocument = gql`
    query GetPropertyEntry($id: ID!) {
  node: getProperty(id: $id) {
    ...PropertyDetailProps
  }
}
    ${PropertyDetailPropsFragmentDoc}`;

/**
 * __useGetPropertyEntryQuery__
 *
 * To run a query within a React component, call `useGetPropertyEntryQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPropertyEntryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPropertyEntryQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetPropertyEntryQuery(baseOptions: Apollo.QueryHookOptions<GetPropertyEntryQuery, GetPropertyEntryQueryVariables> & ({ variables: GetPropertyEntryQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPropertyEntryQuery, GetPropertyEntryQueryVariables>(GetPropertyEntryDocument, options);
      }
export function useGetPropertyEntryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPropertyEntryQuery, GetPropertyEntryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPropertyEntryQuery, GetPropertyEntryQueryVariables>(GetPropertyEntryDocument, options);
        }
export function useGetPropertyEntrySuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetPropertyEntryQuery, GetPropertyEntryQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetPropertyEntryQuery, GetPropertyEntryQueryVariables>(GetPropertyEntryDocument, options);
        }
export type GetPropertyEntryQueryHookResult = ReturnType<typeof useGetPropertyEntryQuery>;
export type GetPropertyEntryLazyQueryHookResult = ReturnType<typeof useGetPropertyEntryLazyQuery>;
export type GetPropertyEntrySuspenseQueryHookResult = ReturnType<typeof useGetPropertyEntrySuspenseQuery>;
export type GetPropertyEntryQueryResult = Apollo.QueryResult<GetPropertyEntryQuery, GetPropertyEntryQueryVariables>;
export const GetMeasureEntryDocument = gql`
    query GetMeasureEntry($id: ID!) {
  node: getMeasure(id: $id) {
    ...MeasureDetailProps
  }
}
    ${MeasureDetailPropsFragmentDoc}`;

/**
 * __useGetMeasureEntryQuery__
 *
 * To run a query within a React component, call `useGetMeasureEntryQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMeasureEntryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMeasureEntryQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetMeasureEntryQuery(baseOptions: Apollo.QueryHookOptions<GetMeasureEntryQuery, GetMeasureEntryQueryVariables> & ({ variables: GetMeasureEntryQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMeasureEntryQuery, GetMeasureEntryQueryVariables>(GetMeasureEntryDocument, options);
      }
export function useGetMeasureEntryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMeasureEntryQuery, GetMeasureEntryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMeasureEntryQuery, GetMeasureEntryQueryVariables>(GetMeasureEntryDocument, options);
        }
export function useGetMeasureEntrySuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetMeasureEntryQuery, GetMeasureEntryQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetMeasureEntryQuery, GetMeasureEntryQueryVariables>(GetMeasureEntryDocument, options);
        }
export type GetMeasureEntryQueryHookResult = ReturnType<typeof useGetMeasureEntryQuery>;
export type GetMeasureEntryLazyQueryHookResult = ReturnType<typeof useGetMeasureEntryLazyQuery>;
export type GetMeasureEntrySuspenseQueryHookResult = ReturnType<typeof useGetMeasureEntrySuspenseQuery>;
export type GetMeasureEntryQueryResult = Apollo.QueryResult<GetMeasureEntryQuery, GetMeasureEntryQueryVariables>;
export const GetUnitEntryDocument = gql`
    query GetUnitEntry($id: ID!) {
  node: getUnit(id: $id) {
    ...UnitDetailProps
  }
}
    ${UnitDetailPropsFragmentDoc}`;

/**
 * __useGetUnitEntryQuery__
 *
 * To run a query within a React component, call `useGetUnitEntryQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUnitEntryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUnitEntryQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetUnitEntryQuery(baseOptions: Apollo.QueryHookOptions<GetUnitEntryQuery, GetUnitEntryQueryVariables> & ({ variables: GetUnitEntryQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUnitEntryQuery, GetUnitEntryQueryVariables>(GetUnitEntryDocument, options);
      }
export function useGetUnitEntryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUnitEntryQuery, GetUnitEntryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUnitEntryQuery, GetUnitEntryQueryVariables>(GetUnitEntryDocument, options);
        }
export function useGetUnitEntrySuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetUnitEntryQuery, GetUnitEntryQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetUnitEntryQuery, GetUnitEntryQueryVariables>(GetUnitEntryDocument, options);
        }
export type GetUnitEntryQueryHookResult = ReturnType<typeof useGetUnitEntryQuery>;
export type GetUnitEntryLazyQueryHookResult = ReturnType<typeof useGetUnitEntryLazyQuery>;
export type GetUnitEntrySuspenseQueryHookResult = ReturnType<typeof useGetUnitEntrySuspenseQuery>;
export type GetUnitEntryQueryResult = Apollo.QueryResult<GetUnitEntryQuery, GetUnitEntryQueryVariables>;
export const GetValueEntryDocument = gql`
    query GetValueEntry($id: ID!) {
  node: getValue(id: $id) {
    ...ValueDetailProps
  }
}
    ${ValueDetailPropsFragmentDoc}`;

/**
 * __useGetValueEntryQuery__
 *
 * To run a query within a React component, call `useGetValueEntryQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetValueEntryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetValueEntryQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetValueEntryQuery(baseOptions: Apollo.QueryHookOptions<GetValueEntryQuery, GetValueEntryQueryVariables> & ({ variables: GetValueEntryQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetValueEntryQuery, GetValueEntryQueryVariables>(GetValueEntryDocument, options);
      }
export function useGetValueEntryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetValueEntryQuery, GetValueEntryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetValueEntryQuery, GetValueEntryQueryVariables>(GetValueEntryDocument, options);
        }
export function useGetValueEntrySuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetValueEntryQuery, GetValueEntryQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetValueEntryQuery, GetValueEntryQueryVariables>(GetValueEntryDocument, options);
        }
export type GetValueEntryQueryHookResult = ReturnType<typeof useGetValueEntryQuery>;
export type GetValueEntryLazyQueryHookResult = ReturnType<typeof useGetValueEntryLazyQuery>;
export type GetValueEntrySuspenseQueryHookResult = ReturnType<typeof useGetValueEntrySuspenseQuery>;
export type GetValueEntryQueryResult = Apollo.QueryResult<GetValueEntryQuery, GetValueEntryQueryVariables>;
export const GetCollectionEntryDocument = gql`
    query GetCollectionEntry($id: ID!) {
  node(id: $id) {
    ...CollectionDetailProps
  }
}
    ${CollectionDetailPropsFragmentDoc}`;

/**
 * __useGetCollectionEntryQuery__
 *
 * To run a query within a React component, call `useGetCollectionEntryQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCollectionEntryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCollectionEntryQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetCollectionEntryQuery(baseOptions: Apollo.QueryHookOptions<GetCollectionEntryQuery, GetCollectionEntryQueryVariables> & ({ variables: GetCollectionEntryQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCollectionEntryQuery, GetCollectionEntryQueryVariables>(GetCollectionEntryDocument, options);
      }
export function useGetCollectionEntryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCollectionEntryQuery, GetCollectionEntryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCollectionEntryQuery, GetCollectionEntryQueryVariables>(GetCollectionEntryDocument, options);
        }
export function useGetCollectionEntrySuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetCollectionEntryQuery, GetCollectionEntryQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetCollectionEntryQuery, GetCollectionEntryQueryVariables>(GetCollectionEntryDocument, options);
        }
export type GetCollectionEntryQueryHookResult = ReturnType<typeof useGetCollectionEntryQuery>;
export type GetCollectionEntryLazyQueryHookResult = ReturnType<typeof useGetCollectionEntryLazyQuery>;
export type GetCollectionEntrySuspenseQueryHookResult = ReturnType<typeof useGetCollectionEntrySuspenseQuery>;
export type GetCollectionEntryQueryResult = Apollo.QueryResult<GetCollectionEntryQuery, GetCollectionEntryQueryVariables>;
export const FindModelWithoutGroupTreeDocument = gql`
    query FindModelWithoutGroupTree {
  findModelWithoutGroup {
    paths
    nodes {
      ...ItemProps
    }
  }
}
    ${ItemPropsFragmentDoc}`;

/**
 * __useFindModelWithoutGroupTreeQuery__
 *
 * To run a query within a React component, call `useFindModelWithoutGroupTreeQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindModelWithoutGroupTreeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindModelWithoutGroupTreeQuery({
 *   variables: {
 *   },
 * });
 */
export function useFindModelWithoutGroupTreeQuery(baseOptions?: Apollo.QueryHookOptions<FindModelWithoutGroupTreeQuery, FindModelWithoutGroupTreeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindModelWithoutGroupTreeQuery, FindModelWithoutGroupTreeQueryVariables>(FindModelWithoutGroupTreeDocument, options);
      }
export function useFindModelWithoutGroupTreeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindModelWithoutGroupTreeQuery, FindModelWithoutGroupTreeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindModelWithoutGroupTreeQuery, FindModelWithoutGroupTreeQueryVariables>(FindModelWithoutGroupTreeDocument, options);
        }
export function useFindModelWithoutGroupTreeSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<FindModelWithoutGroupTreeQuery, FindModelWithoutGroupTreeQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FindModelWithoutGroupTreeQuery, FindModelWithoutGroupTreeQueryVariables>(FindModelWithoutGroupTreeDocument, options);
        }
export type FindModelWithoutGroupTreeQueryHookResult = ReturnType<typeof useFindModelWithoutGroupTreeQuery>;
export type FindModelWithoutGroupTreeLazyQueryHookResult = ReturnType<typeof useFindModelWithoutGroupTreeLazyQuery>;
export type FindModelWithoutGroupTreeSuspenseQueryHookResult = ReturnType<typeof useFindModelWithoutGroupTreeSuspenseQuery>;
export type FindModelWithoutGroupTreeQueryResult = Apollo.QueryResult<FindModelWithoutGroupTreeQuery, FindModelWithoutGroupTreeQueryVariables>;
export const FindGroupWithoutSubjectTreeDocument = gql`
    query FindGroupWithoutSubjectTree {
  findGroupWithoutSubject {
    paths
    nodes {
      ...ItemProps
    }
  }
}
    ${ItemPropsFragmentDoc}`;

/**
 * __useFindGroupWithoutSubjectTreeQuery__
 *
 * To run a query within a React component, call `useFindGroupWithoutSubjectTreeQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindGroupWithoutSubjectTreeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindGroupWithoutSubjectTreeQuery({
 *   variables: {
 *   },
 * });
 */
export function useFindGroupWithoutSubjectTreeQuery(baseOptions?: Apollo.QueryHookOptions<FindGroupWithoutSubjectTreeQuery, FindGroupWithoutSubjectTreeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindGroupWithoutSubjectTreeQuery, FindGroupWithoutSubjectTreeQueryVariables>(FindGroupWithoutSubjectTreeDocument, options);
      }
export function useFindGroupWithoutSubjectTreeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindGroupWithoutSubjectTreeQuery, FindGroupWithoutSubjectTreeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindGroupWithoutSubjectTreeQuery, FindGroupWithoutSubjectTreeQueryVariables>(FindGroupWithoutSubjectTreeDocument, options);
        }
export function useFindGroupWithoutSubjectTreeSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<FindGroupWithoutSubjectTreeQuery, FindGroupWithoutSubjectTreeQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FindGroupWithoutSubjectTreeQuery, FindGroupWithoutSubjectTreeQueryVariables>(FindGroupWithoutSubjectTreeDocument, options);
        }
export type FindGroupWithoutSubjectTreeQueryHookResult = ReturnType<typeof useFindGroupWithoutSubjectTreeQuery>;
export type FindGroupWithoutSubjectTreeLazyQueryHookResult = ReturnType<typeof useFindGroupWithoutSubjectTreeLazyQuery>;
export type FindGroupWithoutSubjectTreeSuspenseQueryHookResult = ReturnType<typeof useFindGroupWithoutSubjectTreeSuspenseQuery>;
export type FindGroupWithoutSubjectTreeQueryResult = Apollo.QueryResult<FindGroupWithoutSubjectTreeQuery, FindGroupWithoutSubjectTreeQueryVariables>;
export const FindSubjectWithoutPropTreeDocument = gql`
    query FindSubjectWithoutPropTree {
  findSubjectWithoutProp {
    paths
    nodes {
      ...ItemProps
    }
  }
}
    ${ItemPropsFragmentDoc}`;

/**
 * __useFindSubjectWithoutPropTreeQuery__
 *
 * To run a query within a React component, call `useFindSubjectWithoutPropTreeQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindSubjectWithoutPropTreeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindSubjectWithoutPropTreeQuery({
 *   variables: {
 *   },
 * });
 */
export function useFindSubjectWithoutPropTreeQuery(baseOptions?: Apollo.QueryHookOptions<FindSubjectWithoutPropTreeQuery, FindSubjectWithoutPropTreeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindSubjectWithoutPropTreeQuery, FindSubjectWithoutPropTreeQueryVariables>(FindSubjectWithoutPropTreeDocument, options);
      }
export function useFindSubjectWithoutPropTreeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindSubjectWithoutPropTreeQuery, FindSubjectWithoutPropTreeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindSubjectWithoutPropTreeQuery, FindSubjectWithoutPropTreeQueryVariables>(FindSubjectWithoutPropTreeDocument, options);
        }
export function useFindSubjectWithoutPropTreeSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<FindSubjectWithoutPropTreeQuery, FindSubjectWithoutPropTreeQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FindSubjectWithoutPropTreeQuery, FindSubjectWithoutPropTreeQueryVariables>(FindSubjectWithoutPropTreeDocument, options);
        }
export type FindSubjectWithoutPropTreeQueryHookResult = ReturnType<typeof useFindSubjectWithoutPropTreeQuery>;
export type FindSubjectWithoutPropTreeLazyQueryHookResult = ReturnType<typeof useFindSubjectWithoutPropTreeLazyQuery>;
export type FindSubjectWithoutPropTreeSuspenseQueryHookResult = ReturnType<typeof useFindSubjectWithoutPropTreeSuspenseQuery>;
export type FindSubjectWithoutPropTreeQueryResult = Apollo.QueryResult<FindSubjectWithoutPropTreeQuery, FindSubjectWithoutPropTreeQueryVariables>;
export const FindPropWithoutSubjectOrPropGroupTreeDocument = gql`
    query FindPropWithoutSubjectOrPropGroupTree {
  findPropWithoutSubjectOrPropGroup {
    paths
    nodes {
      ...ItemProps
    }
  }
}
    ${ItemPropsFragmentDoc}`;

/**
 * __useFindPropWithoutSubjectOrPropGroupTreeQuery__
 *
 * To run a query within a React component, call `useFindPropWithoutSubjectOrPropGroupTreeQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindPropWithoutSubjectOrPropGroupTreeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindPropWithoutSubjectOrPropGroupTreeQuery({
 *   variables: {
 *   },
 * });
 */
export function useFindPropWithoutSubjectOrPropGroupTreeQuery(baseOptions?: Apollo.QueryHookOptions<FindPropWithoutSubjectOrPropGroupTreeQuery, FindPropWithoutSubjectOrPropGroupTreeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindPropWithoutSubjectOrPropGroupTreeQuery, FindPropWithoutSubjectOrPropGroupTreeQueryVariables>(FindPropWithoutSubjectOrPropGroupTreeDocument, options);
      }
export function useFindPropWithoutSubjectOrPropGroupTreeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindPropWithoutSubjectOrPropGroupTreeQuery, FindPropWithoutSubjectOrPropGroupTreeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindPropWithoutSubjectOrPropGroupTreeQuery, FindPropWithoutSubjectOrPropGroupTreeQueryVariables>(FindPropWithoutSubjectOrPropGroupTreeDocument, options);
        }
export function useFindPropWithoutSubjectOrPropGroupTreeSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<FindPropWithoutSubjectOrPropGroupTreeQuery, FindPropWithoutSubjectOrPropGroupTreeQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FindPropWithoutSubjectOrPropGroupTreeQuery, FindPropWithoutSubjectOrPropGroupTreeQueryVariables>(FindPropWithoutSubjectOrPropGroupTreeDocument, options);
        }
export type FindPropWithoutSubjectOrPropGroupTreeQueryHookResult = ReturnType<typeof useFindPropWithoutSubjectOrPropGroupTreeQuery>;
export type FindPropWithoutSubjectOrPropGroupTreeLazyQueryHookResult = ReturnType<typeof useFindPropWithoutSubjectOrPropGroupTreeLazyQuery>;
export type FindPropWithoutSubjectOrPropGroupTreeSuspenseQueryHookResult = ReturnType<typeof useFindPropWithoutSubjectOrPropGroupTreeSuspenseQuery>;
export type FindPropWithoutSubjectOrPropGroupTreeQueryResult = Apollo.QueryResult<FindPropWithoutSubjectOrPropGroupTreeQuery, FindPropWithoutSubjectOrPropGroupTreeQueryVariables>;
export const FindPropGroupWithoutPropTreeDocument = gql`
    query FindPropGroupWithoutPropTree {
  findPropGroupWithoutProp {
    paths
    nodes {
      ...ItemProps
    }
  }
}
    ${ItemPropsFragmentDoc}`;

/**
 * __useFindPropGroupWithoutPropTreeQuery__
 *
 * To run a query within a React component, call `useFindPropGroupWithoutPropTreeQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindPropGroupWithoutPropTreeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindPropGroupWithoutPropTreeQuery({
 *   variables: {
 *   },
 * });
 */
export function useFindPropGroupWithoutPropTreeQuery(baseOptions?: Apollo.QueryHookOptions<FindPropGroupWithoutPropTreeQuery, FindPropGroupWithoutPropTreeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindPropGroupWithoutPropTreeQuery, FindPropGroupWithoutPropTreeQueryVariables>(FindPropGroupWithoutPropTreeDocument, options);
      }
export function useFindPropGroupWithoutPropTreeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindPropGroupWithoutPropTreeQuery, FindPropGroupWithoutPropTreeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindPropGroupWithoutPropTreeQuery, FindPropGroupWithoutPropTreeQueryVariables>(FindPropGroupWithoutPropTreeDocument, options);
        }
export function useFindPropGroupWithoutPropTreeSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<FindPropGroupWithoutPropTreeQuery, FindPropGroupWithoutPropTreeQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FindPropGroupWithoutPropTreeQuery, FindPropGroupWithoutPropTreeQueryVariables>(FindPropGroupWithoutPropTreeDocument, options);
        }
export type FindPropGroupWithoutPropTreeQueryHookResult = ReturnType<typeof useFindPropGroupWithoutPropTreeQuery>;
export type FindPropGroupWithoutPropTreeLazyQueryHookResult = ReturnType<typeof useFindPropGroupWithoutPropTreeLazyQuery>;
export type FindPropGroupWithoutPropTreeSuspenseQueryHookResult = ReturnType<typeof useFindPropGroupWithoutPropTreeSuspenseQuery>;
export type FindPropGroupWithoutPropTreeQueryResult = Apollo.QueryResult<FindPropGroupWithoutPropTreeQuery, FindPropGroupWithoutPropTreeQueryVariables>;
export const FindMeasureWithoutPropTreeDocument = gql`
    query FindMeasureWithoutPropTree {
  findMeasureWithoutProp {
    paths
    nodes {
      ...ItemProps
    }
  }
}
    ${ItemPropsFragmentDoc}`;

/**
 * __useFindMeasureWithoutPropTreeQuery__
 *
 * To run a query within a React component, call `useFindMeasureWithoutPropTreeQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindMeasureWithoutPropTreeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindMeasureWithoutPropTreeQuery({
 *   variables: {
 *   },
 * });
 */
export function useFindMeasureWithoutPropTreeQuery(baseOptions?: Apollo.QueryHookOptions<FindMeasureWithoutPropTreeQuery, FindMeasureWithoutPropTreeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindMeasureWithoutPropTreeQuery, FindMeasureWithoutPropTreeQueryVariables>(FindMeasureWithoutPropTreeDocument, options);
      }
export function useFindMeasureWithoutPropTreeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindMeasureWithoutPropTreeQuery, FindMeasureWithoutPropTreeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindMeasureWithoutPropTreeQuery, FindMeasureWithoutPropTreeQueryVariables>(FindMeasureWithoutPropTreeDocument, options);
        }
export function useFindMeasureWithoutPropTreeSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<FindMeasureWithoutPropTreeQuery, FindMeasureWithoutPropTreeQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FindMeasureWithoutPropTreeQuery, FindMeasureWithoutPropTreeQueryVariables>(FindMeasureWithoutPropTreeDocument, options);
        }
export type FindMeasureWithoutPropTreeQueryHookResult = ReturnType<typeof useFindMeasureWithoutPropTreeQuery>;
export type FindMeasureWithoutPropTreeLazyQueryHookResult = ReturnType<typeof useFindMeasureWithoutPropTreeLazyQuery>;
export type FindMeasureWithoutPropTreeSuspenseQueryHookResult = ReturnType<typeof useFindMeasureWithoutPropTreeSuspenseQuery>;
export type FindMeasureWithoutPropTreeQueryResult = Apollo.QueryResult<FindMeasureWithoutPropTreeQuery, FindMeasureWithoutPropTreeQueryVariables>;
export const FindUnitWithoutMeasureTreeDocument = gql`
    query FindUnitWithoutMeasureTree {
  findUnitWithoutMeasure {
    paths
    nodes {
      ...ItemProps
    }
  }
}
    ${ItemPropsFragmentDoc}`;

/**
 * __useFindUnitWithoutMeasureTreeQuery__
 *
 * To run a query within a React component, call `useFindUnitWithoutMeasureTreeQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindUnitWithoutMeasureTreeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindUnitWithoutMeasureTreeQuery({
 *   variables: {
 *   },
 * });
 */
export function useFindUnitWithoutMeasureTreeQuery(baseOptions?: Apollo.QueryHookOptions<FindUnitWithoutMeasureTreeQuery, FindUnitWithoutMeasureTreeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindUnitWithoutMeasureTreeQuery, FindUnitWithoutMeasureTreeQueryVariables>(FindUnitWithoutMeasureTreeDocument, options);
      }
export function useFindUnitWithoutMeasureTreeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindUnitWithoutMeasureTreeQuery, FindUnitWithoutMeasureTreeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindUnitWithoutMeasureTreeQuery, FindUnitWithoutMeasureTreeQueryVariables>(FindUnitWithoutMeasureTreeDocument, options);
        }
export function useFindUnitWithoutMeasureTreeSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<FindUnitWithoutMeasureTreeQuery, FindUnitWithoutMeasureTreeQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FindUnitWithoutMeasureTreeQuery, FindUnitWithoutMeasureTreeQueryVariables>(FindUnitWithoutMeasureTreeDocument, options);
        }
export type FindUnitWithoutMeasureTreeQueryHookResult = ReturnType<typeof useFindUnitWithoutMeasureTreeQuery>;
export type FindUnitWithoutMeasureTreeLazyQueryHookResult = ReturnType<typeof useFindUnitWithoutMeasureTreeLazyQuery>;
export type FindUnitWithoutMeasureTreeSuspenseQueryHookResult = ReturnType<typeof useFindUnitWithoutMeasureTreeSuspenseQuery>;
export type FindUnitWithoutMeasureTreeQueryResult = Apollo.QueryResult<FindUnitWithoutMeasureTreeQuery, FindUnitWithoutMeasureTreeQueryVariables>;
export const FindValueWithoutMeasureTreeDocument = gql`
    query FindValueWithoutMeasureTree {
  findValueWithoutMeasure {
    paths
    nodes {
      ...ItemProps
    }
  }
}
    ${ItemPropsFragmentDoc}`;

/**
 * __useFindValueWithoutMeasureTreeQuery__
 *
 * To run a query within a React component, call `useFindValueWithoutMeasureTreeQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindValueWithoutMeasureTreeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindValueWithoutMeasureTreeQuery({
 *   variables: {
 *   },
 * });
 */
export function useFindValueWithoutMeasureTreeQuery(baseOptions?: Apollo.QueryHookOptions<FindValueWithoutMeasureTreeQuery, FindValueWithoutMeasureTreeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindValueWithoutMeasureTreeQuery, FindValueWithoutMeasureTreeQueryVariables>(FindValueWithoutMeasureTreeDocument, options);
      }
export function useFindValueWithoutMeasureTreeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindValueWithoutMeasureTreeQuery, FindValueWithoutMeasureTreeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindValueWithoutMeasureTreeQuery, FindValueWithoutMeasureTreeQueryVariables>(FindValueWithoutMeasureTreeDocument, options);
        }
export function useFindValueWithoutMeasureTreeSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<FindValueWithoutMeasureTreeQuery, FindValueWithoutMeasureTreeQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FindValueWithoutMeasureTreeQuery, FindValueWithoutMeasureTreeQueryVariables>(FindValueWithoutMeasureTreeDocument, options);
        }
export type FindValueWithoutMeasureTreeQueryHookResult = ReturnType<typeof useFindValueWithoutMeasureTreeQuery>;
export type FindValueWithoutMeasureTreeLazyQueryHookResult = ReturnType<typeof useFindValueWithoutMeasureTreeLazyQuery>;
export type FindValueWithoutMeasureTreeSuspenseQueryHookResult = ReturnType<typeof useFindValueWithoutMeasureTreeSuspenseQuery>;
export type FindValueWithoutMeasureTreeQueryResult = Apollo.QueryResult<FindValueWithoutMeasureTreeQuery, FindValueWithoutMeasureTreeQueryVariables>;
export const FindExportCatalogItemsTreeDocument = gql`
    query FindExportCatalogItemsTree {
  findExportCatalogItems {
    paths
    nodes {
      ...ExportCatalogRecord_Fragment
    }
  }
}
    ${ExportCatalogRecord_FragmentFragmentDoc}`;

/**
 * __useFindExportCatalogItemsTreeQuery__
 *
 * To run a query within a React component, call `useFindExportCatalogItemsTreeQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindExportCatalogItemsTreeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindExportCatalogItemsTreeQuery({
 *   variables: {
 *   },
 * });
 */
export function useFindExportCatalogItemsTreeQuery(baseOptions?: Apollo.QueryHookOptions<FindExportCatalogItemsTreeQuery, FindExportCatalogItemsTreeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindExportCatalogItemsTreeQuery, FindExportCatalogItemsTreeQueryVariables>(FindExportCatalogItemsTreeDocument, options);
      }
export function useFindExportCatalogItemsTreeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindExportCatalogItemsTreeQuery, FindExportCatalogItemsTreeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindExportCatalogItemsTreeQuery, FindExportCatalogItemsTreeQueryVariables>(FindExportCatalogItemsTreeDocument, options);
        }
export function useFindExportCatalogItemsTreeSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<FindExportCatalogItemsTreeQuery, FindExportCatalogItemsTreeQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FindExportCatalogItemsTreeQuery, FindExportCatalogItemsTreeQueryVariables>(FindExportCatalogItemsTreeDocument, options);
        }
export type FindExportCatalogItemsTreeQueryHookResult = ReturnType<typeof useFindExportCatalogItemsTreeQuery>;
export type FindExportCatalogItemsTreeLazyQueryHookResult = ReturnType<typeof useFindExportCatalogItemsTreeLazyQuery>;
export type FindExportCatalogItemsTreeSuspenseQueryHookResult = ReturnType<typeof useFindExportCatalogItemsTreeSuspenseQuery>;
export type FindExportCatalogItemsTreeQueryResult = Apollo.QueryResult<FindExportCatalogItemsTreeQuery, FindExportCatalogItemsTreeQueryVariables>;
export const FindExportCatalogItemsRelationshipsTreeDocument = gql`
    query FindExportCatalogItemsRelationshipsTree {
  findExportCatalogItemsRelationships {
    paths
    nodes {
      ...ExportCatalogRecordRelationship_Fragment
    }
  }
}
    ${ExportCatalogRecordRelationship_FragmentFragmentDoc}`;

/**
 * __useFindExportCatalogItemsRelationshipsTreeQuery__
 *
 * To run a query within a React component, call `useFindExportCatalogItemsRelationshipsTreeQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindExportCatalogItemsRelationshipsTreeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindExportCatalogItemsRelationshipsTreeQuery({
 *   variables: {
 *   },
 * });
 */
export function useFindExportCatalogItemsRelationshipsTreeQuery(baseOptions?: Apollo.QueryHookOptions<FindExportCatalogItemsRelationshipsTreeQuery, FindExportCatalogItemsRelationshipsTreeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindExportCatalogItemsRelationshipsTreeQuery, FindExportCatalogItemsRelationshipsTreeQueryVariables>(FindExportCatalogItemsRelationshipsTreeDocument, options);
      }
export function useFindExportCatalogItemsRelationshipsTreeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindExportCatalogItemsRelationshipsTreeQuery, FindExportCatalogItemsRelationshipsTreeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindExportCatalogItemsRelationshipsTreeQuery, FindExportCatalogItemsRelationshipsTreeQueryVariables>(FindExportCatalogItemsRelationshipsTreeDocument, options);
        }
export function useFindExportCatalogItemsRelationshipsTreeSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<FindExportCatalogItemsRelationshipsTreeQuery, FindExportCatalogItemsRelationshipsTreeQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FindExportCatalogItemsRelationshipsTreeQuery, FindExportCatalogItemsRelationshipsTreeQueryVariables>(FindExportCatalogItemsRelationshipsTreeDocument, options);
        }
export type FindExportCatalogItemsRelationshipsTreeQueryHookResult = ReturnType<typeof useFindExportCatalogItemsRelationshipsTreeQuery>;
export type FindExportCatalogItemsRelationshipsTreeLazyQueryHookResult = ReturnType<typeof useFindExportCatalogItemsRelationshipsTreeLazyQuery>;
export type FindExportCatalogItemsRelationshipsTreeSuspenseQueryHookResult = ReturnType<typeof useFindExportCatalogItemsRelationshipsTreeSuspenseQuery>;
export type FindExportCatalogItemsRelationshipsTreeQueryResult = Apollo.QueryResult<FindExportCatalogItemsRelationshipsTreeQuery, FindExportCatalogItemsRelationshipsTreeQueryVariables>;
export const FindMissingEnglishNameTreeDocument = gql`
    query FindMissingEnglishNameTree($input: findMissingEnglishNameFilterInput!) {
  findMissingEnglishName(input: $input) {
    paths
    nodes {
      ...ItemProps
    }
  }
}
    ${ItemPropsFragmentDoc}`;

/**
 * __useFindMissingEnglishNameTreeQuery__
 *
 * To run a query within a React component, call `useFindMissingEnglishNameTreeQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindMissingEnglishNameTreeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindMissingEnglishNameTreeQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useFindMissingEnglishNameTreeQuery(baseOptions: Apollo.QueryHookOptions<FindMissingEnglishNameTreeQuery, FindMissingEnglishNameTreeQueryVariables> & ({ variables: FindMissingEnglishNameTreeQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindMissingEnglishNameTreeQuery, FindMissingEnglishNameTreeQueryVariables>(FindMissingEnglishNameTreeDocument, options);
      }
export function useFindMissingEnglishNameTreeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindMissingEnglishNameTreeQuery, FindMissingEnglishNameTreeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindMissingEnglishNameTreeQuery, FindMissingEnglishNameTreeQueryVariables>(FindMissingEnglishNameTreeDocument, options);
        }
export function useFindMissingEnglishNameTreeSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<FindMissingEnglishNameTreeQuery, FindMissingEnglishNameTreeQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FindMissingEnglishNameTreeQuery, FindMissingEnglishNameTreeQueryVariables>(FindMissingEnglishNameTreeDocument, options);
        }
export type FindMissingEnglishNameTreeQueryHookResult = ReturnType<typeof useFindMissingEnglishNameTreeQuery>;
export type FindMissingEnglishNameTreeLazyQueryHookResult = ReturnType<typeof useFindMissingEnglishNameTreeLazyQuery>;
export type FindMissingEnglishNameTreeSuspenseQueryHookResult = ReturnType<typeof useFindMissingEnglishNameTreeSuspenseQuery>;
export type FindMissingEnglishNameTreeQueryResult = Apollo.QueryResult<FindMissingEnglishNameTreeQuery, FindMissingEnglishNameTreeQueryVariables>;
export const FindMultipleIDsTreeDocument = gql`
    query FindMultipleIDsTree($input: findMultipleIDsFilterInput!) {
  findMultipleIDs(input: $input) {
    paths
    nodes {
      ...ItemProps
    }
  }
}
    ${ItemPropsFragmentDoc}`;

/**
 * __useFindMultipleIDsTreeQuery__
 *
 * To run a query within a React component, call `useFindMultipleIDsTreeQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindMultipleIDsTreeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindMultipleIDsTreeQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useFindMultipleIDsTreeQuery(baseOptions: Apollo.QueryHookOptions<FindMultipleIDsTreeQuery, FindMultipleIDsTreeQueryVariables> & ({ variables: FindMultipleIDsTreeQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindMultipleIDsTreeQuery, FindMultipleIDsTreeQueryVariables>(FindMultipleIDsTreeDocument, options);
      }
export function useFindMultipleIDsTreeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindMultipleIDsTreeQuery, FindMultipleIDsTreeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindMultipleIDsTreeQuery, FindMultipleIDsTreeQueryVariables>(FindMultipleIDsTreeDocument, options);
        }
export function useFindMultipleIDsTreeSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<FindMultipleIDsTreeQuery, FindMultipleIDsTreeQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FindMultipleIDsTreeQuery, FindMultipleIDsTreeQueryVariables>(FindMultipleIDsTreeDocument, options);
        }
export type FindMultipleIDsTreeQueryHookResult = ReturnType<typeof useFindMultipleIDsTreeQuery>;
export type FindMultipleIDsTreeLazyQueryHookResult = ReturnType<typeof useFindMultipleIDsTreeLazyQuery>;
export type FindMultipleIDsTreeSuspenseQueryHookResult = ReturnType<typeof useFindMultipleIDsTreeSuspenseQuery>;
export type FindMultipleIDsTreeQueryResult = Apollo.QueryResult<FindMultipleIDsTreeQuery, FindMultipleIDsTreeQueryVariables>;
export const FindMissingDescriptionTreeDocument = gql`
    query FindMissingDescriptionTree($input: findMissingDescriptionFilterInput!) {
  findMissingDescription(input: $input) {
    paths
    nodes {
      ...ItemProps
    }
  }
}
    ${ItemPropsFragmentDoc}`;

/**
 * __useFindMissingDescriptionTreeQuery__
 *
 * To run a query within a React component, call `useFindMissingDescriptionTreeQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindMissingDescriptionTreeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindMissingDescriptionTreeQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useFindMissingDescriptionTreeQuery(baseOptions: Apollo.QueryHookOptions<FindMissingDescriptionTreeQuery, FindMissingDescriptionTreeQueryVariables> & ({ variables: FindMissingDescriptionTreeQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindMissingDescriptionTreeQuery, FindMissingDescriptionTreeQueryVariables>(FindMissingDescriptionTreeDocument, options);
      }
export function useFindMissingDescriptionTreeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindMissingDescriptionTreeQuery, FindMissingDescriptionTreeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindMissingDescriptionTreeQuery, FindMissingDescriptionTreeQueryVariables>(FindMissingDescriptionTreeDocument, options);
        }
export function useFindMissingDescriptionTreeSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<FindMissingDescriptionTreeQuery, FindMissingDescriptionTreeQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FindMissingDescriptionTreeQuery, FindMissingDescriptionTreeQueryVariables>(FindMissingDescriptionTreeDocument, options);
        }
export type FindMissingDescriptionTreeQueryHookResult = ReturnType<typeof useFindMissingDescriptionTreeQuery>;
export type FindMissingDescriptionTreeLazyQueryHookResult = ReturnType<typeof useFindMissingDescriptionTreeLazyQuery>;
export type FindMissingDescriptionTreeSuspenseQueryHookResult = ReturnType<typeof useFindMissingDescriptionTreeSuspenseQuery>;
export type FindMissingDescriptionTreeQueryResult = Apollo.QueryResult<FindMissingDescriptionTreeQuery, FindMissingDescriptionTreeQueryVariables>;
export const FindMissingEnglishDescriptionTreeDocument = gql`
    query FindMissingEnglishDescriptionTree($input: findMissingEnglishDescriptionFilterInput!) {
  findMissingEnglishDescription(input: $input) {
    paths
    nodes {
      ...ItemProps
    }
  }
}
    ${ItemPropsFragmentDoc}`;

/**
 * __useFindMissingEnglishDescriptionTreeQuery__
 *
 * To run a query within a React component, call `useFindMissingEnglishDescriptionTreeQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindMissingEnglishDescriptionTreeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindMissingEnglishDescriptionTreeQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useFindMissingEnglishDescriptionTreeQuery(baseOptions: Apollo.QueryHookOptions<FindMissingEnglishDescriptionTreeQuery, FindMissingEnglishDescriptionTreeQueryVariables> & ({ variables: FindMissingEnglishDescriptionTreeQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindMissingEnglishDescriptionTreeQuery, FindMissingEnglishDescriptionTreeQueryVariables>(FindMissingEnglishDescriptionTreeDocument, options);
      }
export function useFindMissingEnglishDescriptionTreeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindMissingEnglishDescriptionTreeQuery, FindMissingEnglishDescriptionTreeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindMissingEnglishDescriptionTreeQuery, FindMissingEnglishDescriptionTreeQueryVariables>(FindMissingEnglishDescriptionTreeDocument, options);
        }
export function useFindMissingEnglishDescriptionTreeSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<FindMissingEnglishDescriptionTreeQuery, FindMissingEnglishDescriptionTreeQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FindMissingEnglishDescriptionTreeQuery, FindMissingEnglishDescriptionTreeQueryVariables>(FindMissingEnglishDescriptionTreeDocument, options);
        }
export type FindMissingEnglishDescriptionTreeQueryHookResult = ReturnType<typeof useFindMissingEnglishDescriptionTreeQuery>;
export type FindMissingEnglishDescriptionTreeLazyQueryHookResult = ReturnType<typeof useFindMissingEnglishDescriptionTreeLazyQuery>;
export type FindMissingEnglishDescriptionTreeSuspenseQueryHookResult = ReturnType<typeof useFindMissingEnglishDescriptionTreeSuspenseQuery>;
export type FindMissingEnglishDescriptionTreeQueryResult = Apollo.QueryResult<FindMissingEnglishDescriptionTreeQuery, FindMissingEnglishDescriptionTreeQueryVariables>;
export const FindMultipleNamesTreeDocument = gql`
    query FindMultipleNamesTree($input: findMultipleNamesFilterInput!) {
  findMultipleNames(input: $input) {
    paths
    nodes {
      ...ItemProps
    }
  }
}
    ${ItemPropsFragmentDoc}`;

/**
 * __useFindMultipleNamesTreeQuery__
 *
 * To run a query within a React component, call `useFindMultipleNamesTreeQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindMultipleNamesTreeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindMultipleNamesTreeQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useFindMultipleNamesTreeQuery(baseOptions: Apollo.QueryHookOptions<FindMultipleNamesTreeQuery, FindMultipleNamesTreeQueryVariables> & ({ variables: FindMultipleNamesTreeQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindMultipleNamesTreeQuery, FindMultipleNamesTreeQueryVariables>(FindMultipleNamesTreeDocument, options);
      }
export function useFindMultipleNamesTreeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindMultipleNamesTreeQuery, FindMultipleNamesTreeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindMultipleNamesTreeQuery, FindMultipleNamesTreeQueryVariables>(FindMultipleNamesTreeDocument, options);
        }
export function useFindMultipleNamesTreeSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<FindMultipleNamesTreeQuery, FindMultipleNamesTreeQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FindMultipleNamesTreeQuery, FindMultipleNamesTreeQueryVariables>(FindMultipleNamesTreeDocument, options);
        }
export type FindMultipleNamesTreeQueryHookResult = ReturnType<typeof useFindMultipleNamesTreeQuery>;
export type FindMultipleNamesTreeLazyQueryHookResult = ReturnType<typeof useFindMultipleNamesTreeLazyQuery>;
export type FindMultipleNamesTreeSuspenseQueryHookResult = ReturnType<typeof useFindMultipleNamesTreeSuspenseQuery>;
export type FindMultipleNamesTreeQueryResult = Apollo.QueryResult<FindMultipleNamesTreeQuery, FindMultipleNamesTreeQueryVariables>;
export const FindMultipleNamesAcrossClassesTreeDocument = gql`
    query FindMultipleNamesAcrossClassesTree($input: findMultipleNamesAcrossClassesFilterInput!) {
  findMultipleNamesAcrossClasses(input: $input) {
    paths
    nodes {
      ...ItemProps
    }
  }
}
    ${ItemPropsFragmentDoc}`;

/**
 * __useFindMultipleNamesAcrossClassesTreeQuery__
 *
 * To run a query within a React component, call `useFindMultipleNamesAcrossClassesTreeQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindMultipleNamesAcrossClassesTreeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindMultipleNamesAcrossClassesTreeQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useFindMultipleNamesAcrossClassesTreeQuery(baseOptions: Apollo.QueryHookOptions<FindMultipleNamesAcrossClassesTreeQuery, FindMultipleNamesAcrossClassesTreeQueryVariables> & ({ variables: FindMultipleNamesAcrossClassesTreeQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindMultipleNamesAcrossClassesTreeQuery, FindMultipleNamesAcrossClassesTreeQueryVariables>(FindMultipleNamesAcrossClassesTreeDocument, options);
      }
export function useFindMultipleNamesAcrossClassesTreeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindMultipleNamesAcrossClassesTreeQuery, FindMultipleNamesAcrossClassesTreeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindMultipleNamesAcrossClassesTreeQuery, FindMultipleNamesAcrossClassesTreeQueryVariables>(FindMultipleNamesAcrossClassesTreeDocument, options);
        }
export function useFindMultipleNamesAcrossClassesTreeSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<FindMultipleNamesAcrossClassesTreeQuery, FindMultipleNamesAcrossClassesTreeQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FindMultipleNamesAcrossClassesTreeQuery, FindMultipleNamesAcrossClassesTreeQueryVariables>(FindMultipleNamesAcrossClassesTreeDocument, options);
        }
export type FindMultipleNamesAcrossClassesTreeQueryHookResult = ReturnType<typeof useFindMultipleNamesAcrossClassesTreeQuery>;
export type FindMultipleNamesAcrossClassesTreeLazyQueryHookResult = ReturnType<typeof useFindMultipleNamesAcrossClassesTreeLazyQuery>;
export type FindMultipleNamesAcrossClassesTreeSuspenseQueryHookResult = ReturnType<typeof useFindMultipleNamesAcrossClassesTreeSuspenseQuery>;
export type FindMultipleNamesAcrossClassesTreeQueryResult = Apollo.QueryResult<FindMultipleNamesAcrossClassesTreeQuery, FindMultipleNamesAcrossClassesTreeQueryVariables>;
export const ProfileDocument = gql`
    query Profile {
  profile {
    ...UserProfile
  }
}
    ${UserProfileFragmentDoc}`;

/**
 * __useProfileQuery__
 *
 * To run a query within a React component, call `useProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `useProfileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProfileQuery({
 *   variables: {
 *   },
 * });
 */
export function useProfileQuery(baseOptions?: Apollo.QueryHookOptions<ProfileQuery, ProfileQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProfileQuery, ProfileQueryVariables>(ProfileDocument, options);
      }
export function useProfileLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProfileQuery, ProfileQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProfileQuery, ProfileQueryVariables>(ProfileDocument, options);
        }
export function useProfileSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ProfileQuery, ProfileQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ProfileQuery, ProfileQueryVariables>(ProfileDocument, options);
        }
export type ProfileQueryHookResult = ReturnType<typeof useProfileQuery>;
export type ProfileLazyQueryHookResult = ReturnType<typeof useProfileLazyQuery>;
export type ProfileSuspenseQueryHookResult = ReturnType<typeof useProfileSuspenseQuery>;
export type ProfileQueryResult = Apollo.QueryResult<ProfileQuery, ProfileQueryVariables>;