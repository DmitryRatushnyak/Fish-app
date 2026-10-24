// The VISpas lives in Sportvisserij Nederland's VISplanner app. There is no public API,
// so we only open the app (or its store page when it is not installed).
const PLAY = 'https://play.google.com/store/apps/details?id=nl.visplanner';
const APPSTORE = 'https://apps.apple.com/nl/app/visplanner/id543525645';

export function vispasLink(ua = globalThis.navigator?.userAgent ?? '') {
  if (/android/i.test(ua)) {
    // Chrome on Android starts the app if installed, otherwise opens the fallback URL.
    return `intent:#Intent;action=android.intent.action.MAIN;category=android.intent.category.LAUNCHER;package=nl.visplanner;S.browser_fallback_url=${encodeURIComponent(PLAY)};end`;
  }
  if (/iphone|ipad|ipod/i.test(ua)) return APPSTORE;
  return PLAY;
}
