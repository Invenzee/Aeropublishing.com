"use client";

import Script from "next/script";

const ZENDESK_SNIPPET_KEY = "f68a92a0-bfa9-4c30-96e9-0f8bc2601292";
const GA_ID = "G-NDYR2R3WP0";
const META_PIXEL_ID = "1595522894901835";

const zendeskAgentOpenScript = `
(function () {
  function openOnAgentMessage(count) {
    if (!count || count < 1 || typeof zE !== 'function') return;
    try {
      zE('webWidget', 'show');
      zE('webWidget', 'open');
    } catch (e) {}
    try {
      zE('messenger', 'open');
    } catch (e) {}
  }

  function keepClosed() {
    if (typeof zE !== 'function') return;
    try { zE('webWidget', 'close'); } catch (e) {}
    try { zE('messenger', 'close'); } catch (e) {}
  }

  function bind() {
    if (typeof zE !== 'function') return false;

    try {
      zE(function () {
        keepClosed();
        zE('webWidget:on', 'chat:unreadMessages', function (number) {
          openOnAgentMessage(number);
        });
      });
    } catch (e) {}

    try {
      zE('messenger', 'close');
      zE('messenger:on', 'unreadMessages', function (count) {
        openOnAgentMessage(count);
      });
    } catch (e) {}

    return true;
  }

  var tries = 0;
  var boot = setInterval(function () {
    if (bind() || ++tries > 100) clearInterval(boot);
  }, 200);
})();
`;

const zendeskMobileBackScript = `
(function () {
  var FLAG = '__zeChat';
  var chatOpen = false;
  var bound = false;

  function closeWidget() {
    if (typeof zE !== 'function') return;
    try { zE('webWidget', 'close'); } catch (e) {}
    try { zE('messenger', 'close'); } catch (e) {}
  }

  function onChatOpen() {
    if (chatOpen) return;
    chatOpen = true;
    try {
      if (history.state && history.state[FLAG]) return;
      var next = history.state && typeof history.state === 'object'
        ? Object.assign({}, history.state)
        : {};
      next[FLAG] = 1;
      history.pushState(next, '', location.href);
    } catch (e) {}
  }

  function onChatClose() {
    if (!chatOpen) return;
    chatOpen = false;
    try {
      if (history.state && history.state[FLAG]) history.back();
    } catch (e) {}
  }

  window.addEventListener('popstate', function () {
    if (!chatOpen) return;
    chatOpen = false;
    closeWidget();
  });

  function bind() {
    if (bound || typeof zE !== 'function') return bound;
    try {
      zE('webWidget:on', 'open', onChatOpen);
      zE('webWidget:on', 'close', onChatClose);
      bound = true;
    } catch (e) {}
    try {
      zE('messenger:on', 'open', onChatOpen);
      zE('messenger:on', 'close', onChatClose);
      bound = true;
    } catch (e) {}
    return bound;
  }

  var tries = 0;
  var boot = setInterval(function () {
    if (bind() || ++tries > 100) clearInterval(boot);
  }, 200);
})();
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
        id="zendesk-agent-open"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{ __html: zendeskAgentOpenScript }}
      />
      <Script
        id="zendesk-mobile-back"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{ __html: zendeskMobileBackScript }}
      />
      <Script
        id="zendesk-clear-stale-input"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{ __html: zendeskClearStaleInputScript }}
      />
    </>
  );
}
