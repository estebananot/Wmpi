export interface WompiConfig {
  apiUrl: string;
  publicKey: string;
  privateKey: string;
  integrityKey: string;
  eventsKey: string;
}

export const getWompiConfig = (): WompiConfig => ({
  apiUrl: process.env.WOMPI_API_URL || 'https://api-sandbox.co.uat.wompi.dev/v1',
  publicKey: process.env.WOMPI_PUBLIC_KEY || 'pub_stagtest_g2u0HQd3ZMh05hsSgTS2lUV8t3s4mOt7',
  privateKey: process.env.WOMPI_PRIVATE_KEY || 'prv_stagtest_5i0ZGIGiFcDQifYsXxvsny7Y37tKqFWg',
  integrityKey: process.env.WOMPI_INTEGRITY_KEY || 'stagtest_integrity_nAIBuqayW70XpUqJS4qf4STYiISd89Fp',
  eventsKey: process.env.WOMPI_EVENTS_KEY || 'stagtest_events_2PDUmhMywUkvb1LvxYnayFbmofT7w39N',
});
