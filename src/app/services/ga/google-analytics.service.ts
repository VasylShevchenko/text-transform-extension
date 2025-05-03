import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

declare var chrome;

const GA_ENDPOINT = 'https://www.google-analytics.com/mp/collect';
const GA_DEBUG_ENDPOINT = 'https://www.google-analytics.com/debug/mp/collect';

const MEASUREMENT_ID = environment.ga_measurement_id;
const API_SECRET = environment.ga_api_secret;
const DEFAULT_ENGAGEMENT_TIME_MSEC = 100;

const SESSION_EXPIRATION_IN_MIN = 30;

@Injectable({
  providedIn: 'root'
})

export class GoogleAnalyticsService {
  debug: boolean;

  constructor() {
    this.debug = false;
  }

  async getOrCreateClientId(): Promise<string> {
    let { clientId }: { clientId?: string } = await chrome.storage.local.get('clientId');
    if (!clientId) {
      clientId = self.crypto.randomUUID();
      await chrome.storage.local.set({ clientId });
    }
    return clientId;
  }

  async getOrCreateSessionId(): Promise<string> {
    let { sessionData }: { sessionData?: { session_id: string; timestamp: string } } = await chrome.storage.session.get('sessionData');
    const currentTimeInMs: number = Date.now();

    if (sessionData && sessionData.timestamp) {
      const durationInMin: number = (currentTimeInMs - Number(sessionData.timestamp)) / 60000;
      if (durationInMin > SESSION_EXPIRATION_IN_MIN) {
        sessionData = null;
      } else {
        sessionData.timestamp = currentTimeInMs.toString();
        await chrome.storage.session.set({ sessionData });
      }
    }

    if (!sessionData) {
      sessionData = {
        session_id: currentTimeInMs.toString(),
        timestamp: currentTimeInMs.toString()
      };
      await chrome.storage.session.set({ sessionData });
    }

    return sessionData.session_id;
  }

  async fireEvent(name: string, params?: Record<string, any>): Promise<void> {
    if (!params) { params = {}; }

    if (!params.session_id) {
      params.session_id = await this.getOrCreateSessionId();
    }

    if (!params.engagement_time_msec) {
      params.engagement_time_msec = DEFAULT_ENGAGEMENT_TIME_MSEC;
    }

    try {
      const response: Response = await fetch(
        `${this.debug ? GA_DEBUG_ENDPOINT : GA_ENDPOINT}?measurement_id=${MEASUREMENT_ID}&api_secret=${API_SECRET}`,
        {
          method: 'POST',
          body: JSON.stringify({
            client_id: await this.getOrCreateClientId(),
            events: [
              {
                name,
                params
              }
            ]
          })
        }
      );

      if (!this.debug) {
        return;
      }

      console.log(await response);

    } catch (e) {
      console.log('Google Analytics request failed with an exception', e);
    }
  }

  async firePageViewEvent(pageTitle: string, pageLocation: string, additionalParams?: Record<string, any>): Promise<void> {
    return this.fireEvent('page_view', {
      page_title: pageTitle,
      page_location: pageLocation,
      ...additionalParams
    });
  }

  async fireErrorEvent(error: Error, additionalParams?: Record<string, any>): Promise<void> {
    return this.fireEvent('extension_error', {
      ...error,
      ...additionalParams
    });
  }
}
