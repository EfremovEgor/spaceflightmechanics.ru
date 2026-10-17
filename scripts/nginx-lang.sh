#!/bin/sh
# Runs on the server, piped over SSH by the deploy (.github/workflows/deploy.yml): keeps the nginx
# /ru redirect in line with VITE_RU_ENABLED. The site config includes this snippet once:
#     include /etc/nginx/snippets/spacescitech-lang.conf;
# Usage: sh nginx-lang.sh true|false
set -e

RU="${1:-false}"
SITE=/etc/nginx/sites-available/spaceflightmechanics.com
SNIPPET=/etc/nginx/snippets/spacescitech-lang.conf

NEW=$(mktemp)
if [ "$RU" = "true" ]; then
    echo "# Russian version is on (VITE_RU_ENABLED=true): /ru/ pages are served as they are." > "$NEW"
else
    cat > "$NEW" <<'CONF'
# Russian version is off (VITE_RU_ENABLED is not "true"): /ru/... opens the English page.
location = /ru { return 302 /; }
location ^~ /ru/ { rewrite ^/ru(/.*)$ $1 redirect; }
CONF
fi

grep -q "$SNIPPET" "$SITE" || echo "warning: $SITE does not include $SNIPPET"

if [ -f "$SNIPPET" ] && cmp -s "$NEW" "$SNIPPET"; then
    rm -f "$NEW"
    echo "nginx: /ru redirect unchanged (ru=$RU)"
    exit 0
fi

mkdir -p "$(dirname "$SNIPPET")"
if [ -f "$SNIPPET" ]; then cp "$SNIPPET" "$SNIPPET.bak"; fi
mv "$NEW" "$SNIPPET"
chmod 644 "$SNIPPET"

if nginx -t 2>/dev/null; then
    systemctl reload nginx
    echo "nginx: /ru redirect updated (ru=$RU)"
else
    if [ -f "$SNIPPET.bak" ]; then mv "$SNIPPET.bak" "$SNIPPET"; fi
    echo "nginx -t failed; previous snippet restored"
    exit 1
fi
