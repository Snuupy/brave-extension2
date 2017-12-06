/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/. */

import * as types from '../constants/shieldsPanelTypes'
import { BlockedTypes, BlockOptions } from '../other/blockTypes'

export interface ShieldDetails {
  adBlock: string,
  trackingProtection: string,
  httpsEverywhere: string,
  origin: string,
  hostname: string
}

export interface BlockedDetails {
  blockedType: BlockedTypes,
  tabId: number
}

export interface ShieldsPanelDataUpdated {
  (details: ShieldDetails): {
    type: types.SHIELDS_PANEL_DATA_UPDATED,
    details: ShieldDetails
  }
}

export interface ShieldsToggled {
  (setting: BlockOptions): {
    type: types.SHIELDS_TOGGLED,
    setting: BlockOptions
  }
}

export interface AdBlockToggled {
  (): {
    type: types.AD_BLOCK_TOGGLED
  }
}

export interface TrackingProtectionToggled {
  (): {
    type: types.TRACKING_PROTECTION_TOGGLED
  }
}

export interface ResourceBlocked {
  (details: BlockedDetails): {
    type: types.RESOURCE_BLOCKED,
    details: BlockedDetails
  }
}

export interface BlockAdsTrackers {
  (setting: BlockOptions): {
    type: types.BLOCK_ADS_TRACKERS,
    setting: BlockOptions
  }
}

export interface ControlsToggled {
  (setting: boolean): {
    type: types.CONTROLS_TOGGLED,
    setting: boolean
  }
}

export interface HttpsEverywhereToggled {
  (): {
    type: types.HTTPS_EVERYWHERE_TOGGLED
  }
}

export interface JavascriptToggled {
  (): {
    type: types.JAVASCRIPT_TOGGLED
  }
}

// TODO check if we need it
export type shieldPanelActions =
  ShieldsPanelDataUpdated |
  ShieldsToggled |
  AdBlockToggled |
  TrackingProtectionToggled |
  ResourceBlocked |
  BlockAdsTrackers |
  ControlsToggled |
  HttpsEverywhereToggled |
  JavascriptToggled