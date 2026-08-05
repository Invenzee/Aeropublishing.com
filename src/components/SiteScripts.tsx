"use client";

import Script from "next/script";

const ZENDESK_SNIPPET_KEY = "f68a92a0-bfa9-4c30-96e9-0f8bc2601292";
const GA_ID = "G-NDYR2R3WP0";
const META_PIXEL_ID = "1595522894901835";

const zendeskAutoOpenScript = `
function initZendeskChat() {
  if (typeof zE === 'function') {
    zE(function() {
      zE('webWidget', 'open');

      zE('webWidget:on', 'chat:unreadMessages', function(number) {
        if (number > 0) {
          zE('webWidget', 'show');
          zE('webWidget', 'open');
        }
      });
    });
  } else {
    setTimeout(initZendeskChat, 300);
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initZendeskChat);
} else {
  initZendeskChat();
}
`;

const zendeskClearStaleInputScript = `
(function () {
  var CLEAR_WINDOW_MS = 1500;

  function getWidgetDoc() {
    var frame = document.querySelector('iframe#webWidget');
    if (!frame) return null;
    try { return frame.contentDocument || frame.contentWindow.document; }
    catch (e) { return null; }
  }

  function clearComposer() {
    var doc = getWidgetDoc();
    if (!doc) return false;

    var box = doc.querySelector('textarea[name="chatBox"], textarea[data-testid="message-field"]');
    if (!box) return false;
    if (box.value === '') return true;

    if (box.dataset.bbUserTyping === '1') return true;

    var setter = Object.getOwnPropertyDescriptor(
      doc.defaultView.HTMLTextAreaElement.prototype, 'value'
    ).set;
    setter.call(box, '');
    box.dispatchEvent(new doc.defaultView.Event('input', { bubbles: true }));
    return true;
  }

  function markTyping() {
    var doc = getWidgetDoc();
    if (!doc) return;
    var box = doc.querySelector('textarea[name="chatBox"], textarea[data-testid="message-field"]');
    if (!box || box.dataset.bbBound === '1') return;
    box.dataset.bbBound = '1';
    box.addEventListener('keydown', function (e) {
      box.dataset.bbUserTyping = '1';
      if (e.key === 'Enter' && !e.shiftKey) {
        setTimeout(function () { box.dataset.bbUserTyping = '0'; }, 0);
      }
    });
  }

  function clearRepeatedly() {
    var start = Date.now();
    var timer = setInterval(function () {
      clearComposer();
      markTyping();
      if (Date.now() - start > CLEAR_WINDOW_MS) clearInterval(timer);
    }, 100);
  }

  function bind() {
    if (typeof window.zE !== 'function') return false;
    try {
      zE('webWidget:on', 'open', function () {
        var box, doc = getWidgetDoc();
        if (doc) {
          box = doc.querySelector('textarea[name="chatBox"], textarea[data-testid="message-field"]');
          if (box) box.dataset.bbUserTyping = '0';
        }
        clearRepeatedly();
      });
      zE('webWidget:on', 'close', function () { clearRepeatedly(); });
      zE('webWidget:on', 'chat:unreadMessages', function () { clearRepeatedly(); });
    } catch (e) { return false; }
    markTyping();
    return true;
  }

  var tries = 0;
  var boot = setInterval(function () {
    if (bind() || ++tries > 100) clearInterval(boot);
  }, 200);
})();
`;

export default function SiteScripts() {
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script
        id="ga-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}', {
              send_page_view: false
            });
            window.addEventListener('load', function() {
              gtag('event', 'page_view');
            });
          `,
        }}
      />

      <Script
        id="meta-pixel"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: `
            window.fbAsyncInit = function() {
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${META_PIXEL_ID}');
              fbq('track', 'PageView');
            };
            setTimeout(function() {
              if(typeof fbAsyncInit === 'function') fbAsyncInit();
            }, 3000);
          `,
        }}
      />

      <Script
        id="ze-snippet"
        src={`https://static.zdassets.com/ekr/snippet.js?key=${ZENDESK_SNIPPET_KEY}`}
        strategy="lazyOnload"
      />
      <Script
        id="zendesk-auto-open"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{ __html: zendeskAutoOpenScript }}
      />
      <Script
        id="zendesk-clear-stale-input"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{ __html: zendeskClearStaleInputScript }}
      />
    </>
  );
}
