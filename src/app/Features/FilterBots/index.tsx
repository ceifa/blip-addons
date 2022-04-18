import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { BaseFeature } from '@features/BaseFeature';
import * as Constants from './Constants';
import { Filter } from './Filter';
import { Settings } from '~/Settings';

const FILTER_ID = 'blip-addons-filter';
const FILTER_CONTAINER = '.move-bots-button-container';

export class FilterBots extends BaseFeature {
  public static shouldAlwaysClean = true;

  private getHeader(): HTMLElement {
    const container = document.querySelector(FILTER_CONTAINER) as HTMLElement;

    return container;
  }

  public handle(): void {
    // ...
  }

  public get hasFilter(): boolean {
    return !!document.getElementById(FILTER_ID);
  }

  public get allContacts(): HTMLElement[] {
    return Array.from(
      document.getElementsByTagName('contact')
    ) as HTMLElement[];
  }

  private matchesAny(source: string, patterns: RegExp[]): boolean {
    return patterns.some((pattern) => pattern.test(source));
  }

  private getRegexes(environment: keyof typeof Constants): RegExp[] {
    const keywordsMap = {
      [Constants.ALL]: [''],
      [Constants.PRD]: Settings.prodKey,
      [Constants.HMG]: Settings.hmgKey,
      [Constants.DEV]: Settings.devKey,
      [Constants.BETA]: Settings.betaKey,
    };

    console.log(keywordsMap);

    return keywordsMap[environment]
      .map((keyword) => keyword.trim())
      .map((keyword) => new RegExp(`\\b${keyword}\\b`, 'i'));
  }

  private handleChange = (e: any): void => {
    const regexes = this.getRegexes(e.target.value);
    const contacts = this.allContacts;

    for (const contact of contacts) {
      const contactName = (
        contact.querySelector('.contact-name span') as HTMLElement
      ).innerText;

      contact.style.display = this.matchesAny(contactName, regexes)
        ? 'block'
        : 'none';
    }
  };

  private paintRouters(): void {
    const color = '#80E3EB';
    const contacts = this.allContacts;

    for (const contact of contacts) {
      const contactCategory = contact.querySelector(
        '.contact-data small'
      ).innerHTML;

      if (contactCategory.startsWith('R')) {
        const contactCard = contact.querySelector('.card') as HTMLElement;

        if (contactCard) {
          contactCard.style.backgroundColor = color;
        }
      }
    }
  }

  public cleanup(): any {
    const header = this.getHeader();
    this.paintRouters();

    if (header) {
      header.style.display = 'flex';
      header.style.alignItems = 'center';
      header.style.justifyContent = 'space-between';
      header.style.padding = '5px';

      if (!this.hasFilter) {
        const filter = document.createElement('div');

        filter.id = FILTER_ID;

        ReactDOM.render(<Filter onChange={this.handleChange} />, filter);
        header.appendChild(filter);
      }

      return true;
    }

    return false;
  }
}
