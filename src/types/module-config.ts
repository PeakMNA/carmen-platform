// Module configuration types for business units

export interface AccountingConfig {
  fiscalYearStart: string;
  currencyCode: string;
  secondaryCurrencies: string[];
  expirationDate: string;
}

export interface InventoryConfig {
  trackingMethod: string;
  lowStockThreshold: number;
  autoReorderEnabled: boolean;
  expirationDate: string;
}

export interface SalesConfig {
  commissionStructure: string;
  discountApprovalThreshold: number;
  quotaTrackingEnabled: boolean;
  expirationDate: string;
}

export interface AnalyticsConfig {
  dataSources: string[];
  dataRetentionPeriod: number;
  expirationDate: string;
}

export interface PMSConfig {
  integrationPoints: string[];
  expirationDate: string;
}

// Base module configuration interface with common properties
export interface BaseModuleConfig {
  expirationDate: string;
}

// Use a union type for the module configurations
export type ModuleConfig = AccountingConfig | InventoryConfig | SalesConfig | AnalyticsConfig | PMSConfig;

// Define the ModuleConfigurations interface without the index signature
export interface ModuleConfigurations {
  Accounting?: AccountingConfig;
  Inventory?: InventoryConfig;
  Sales?: SalesConfig;
  Analytics?: AnalyticsConfig;
  PMS?: PMSConfig;
}

// Module activation status
export interface ModuleActivationStatus {
  isActive: boolean;
  expirationDate: string;
  gracePeriod?: number;
}

// License allocation types
export interface LicenseAllocation {
  total: number;
  used: number;
  available: number;
}

// Business unit module configuration
export interface BusinessUnitModuleConfig {
  moduleId: string;
  moduleName: string;
  isActive: boolean;
  configuration: ModuleConfig;
  expirationDate: string;
} 