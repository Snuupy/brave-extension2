/* This Source Code Form is subject to the terms of the Mozilla Public
* License, v. 2.0. If a copy of the MPL was not distributed with this file,
* You can obtain one at http://mozilla.org/MPL/2.0/. */
import { Tab } from '../../types/state/shieldsPannelState'
// import * as shieldsPanelState from '../../state/shieldsPanelState'

export const addSiteCosmeticFilter = async (hostname: string, cssfilter: string) => {
  chrome.storage.local.get('cosmeticFilterList', (storeData = {}) => {
    let storeList = Object.assign({}, storeData.cosmeticFilterList)
    if (storeList[hostname] === undefined || storeList[hostname].length === 0) { // nothing in filter list for origin
      storeList[hostname] = [cssfilter]
    } else { // add entry
      storeList[hostname].push(cssfilter)
    }
    chrome.storage.local.set({ 'cosmeticFilterList': storeList })
  })
}

export const removeSiteFilter = (hostname: string) => {
  chrome.storage.local.get('cosmeticFilterList', (storeData = {}) => {
    let storeList = Object.assign({}, storeData.cosmeticFilterList)
    delete storeList[hostname]
    chrome.storage.local.set({ 'cosmeticFilterList': storeList })
  })
}

export const applyDOMCosmeticFilters = (tabData: Tab, tabId: number) => {
  let hostname = tabData.hostname
  // let updatedFilterList = Object.assign(tabData.appliedFilterList)
  chrome.storage.local.get('cosmeticFilterList', (storeData = {}) => { // fetch filter list
    if (storeData.cosmeticFilterList[hostname] !== undefined) {
      storeData.cosmeticFilterList[hostname].map((filter: string) => { // if the filter hasn't been applied once before, apply it and set the corresponding filter to true
        chrome.tabs.executeScript({
          // this is executed in the content script context
          code: `
          (function () {
            let filter = '${filter}'
            let addedNodeList = NodeList
            addedNodeList = document.querySelectorAll(filter)
            console.log('${filter} exists:', addedNodeList.length > 0)
            if (addedNodeList.length > 0) {
              addedNodeList.forEach((element, currentIndex = 0) => {
                element.remove()
                console.log('${filter} removed')
              })
          	}})()
          `
        })
      // console.log(`${filter} removed`)
      // updatedFilterList.appliedFilterList[filter] = true
      // console.log(updatedFilterList)
      // }
      })
    }
  })
// return updatedFilterList
// let newAppliedFilterList = Object.assign(tabData.appliedFilterList)
// appliedFilterList[filter] = true
// applySiteFilters(tabData.hostname, tabData) // apply filter, update state to store filter that was just blocked
}

export const applyCSSCosmeticFilters = (tabData: Tab, tabId: number) => {
  let hostname = tabData.hostname
  // let updatedFilterList = Object.assign(tabData.appliedFilterList)
  chrome.storage.local.get('cosmeticFilterList', (storeData = {}) => { // fetch filter list
    if (storeData.cosmeticFilterList[hostname] !== undefined) {
      storeData.cosmeticFilterList[hostname].map((filter: string) => { // if the filter hasn't been applied once before, apply it and set the corresponding filter to true
        chrome.tabs.insertCSS({
          code: `${filter} {display: none;}`,
          runAt: 'document_start'
        })
      })
    }
  })
}

export const removeAllFilters = () => {
  chrome.storage.local.set({ 'cosmeticFilterList': {} })
}

export const logStorage = (hostname: string) => {
  chrome.storage.local.get('cosmeticFilterList', (storeData = {}) => {
    // console.log(`cosmeticFilterList for ${hostname}:`, storeData.cosmeticFilterList[hostname])
    console.log(`cosmeticFilterList:`, storeData.cosmeticFilterList)
  })
}
