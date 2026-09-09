"use client";

import { useEffect } from "react";
import Script from "next/script";
import { usePathname } from "next/navigation";
import { track } from "@/lib/analytics/public";

const scriptUrl = process.env.NEXT_PUBLIC_UMAMI_SCRIPT_URL;
const websiteId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID;
const posthogHost = process.env.NEXT_PUBLIC_POSTHOG_HOST;
const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;
const analyticsDisabled = process.env.NEXT_PUBLIC_ANALYTICS_DISABLED === "1";

type PosthogLike = {
  capture: (event: string, properties?: Record<string, string>) => void;
};

declare global {
  interface Window {
    posthog?: PosthogLike;
  }
}

function shouldTrack(pathname: string): boolean {
  if (pathname.startsWith("/admin")) return false;
  if (pathname.startsWith("/studio")) return false;
  if (pathname.startsWith("/portal")) return false;
  return true;
}

export function PublicAnalytics() {
  const pathname = usePathname();

  useEffect(() => {
    if (analyticsDisabled) return;
    if (!pathname || !shouldTrack(pathname)) return;
    track("PAGE", { path: pathname });
    window.posthog?.capture("$pageview", { path: pathname });
  }, [pathname]);

  if (analyticsDisabled) return null;

  const hasUmami = Boolean(scriptUrl && websiteId);
  const hasPosthog = Boolean(posthogHost && posthogKey);
  if (!hasUmami && !hasPosthog) return null;

  return (
    <>
      {hasUmami ? (
        <Script
          src={scriptUrl}
          data-website-id={websiteId}
          data-auto-track="false"
          strategy="afterInteractive"
        />
      ) : null}
      {hasPosthog ? (
        <Script
          id="posthog-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `!function(t,e){var o,n,p,r;e.__SV||(window.posthog&&window.posthog.__loaded)||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}p||((p=t.createElement("script")).type="text/javascript",p.crossOrigin="anonymous",p.async=!0,p.src=s.api_host.replace(".i.posthog.com","-assets.i.posthog.com")+"/static/array.js",p.onerror=function(){p=null},(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r));var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o=["init","capture","identify","alias","people.set","reset","set_config"],n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);posthog.init('${posthogKey}',{api_host:'${posthogHost}',defaults:'2026-05-30',person_profiles:'identified_only',capture_pageview:false});`,
          }}
        />
      ) : null}
    </>
  );
}
