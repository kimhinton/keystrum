"""V11 probe — does Claude know how to use @keystrum/synth?

Sends a prompt to Anthropic's Claude API and checks whether the response
both imports the package and uses real exported APIs (not hallucinated).

Outcomes (printed as GitHub Actions annotations):
  - notice  : Claude imports @keystrum/synth AND uses a real exported API
  - warning : Claude imports @keystrum/synth but uses an unknown API (hallucinated)
  - warning : Claude is unaware of @keystrum/synth (expected for a new project)
"""

import json
import os
import sys
import urllib.error
import urllib.request

API_KEY = os.environ.get("ANTHROPIC_API_KEY")
if not API_KEY:
    print("::notice::V11: ANTHROPIC_API_KEY not set — skipping probe.")
    sys.exit(0)

# Real exported API surface as of 2026-04-27. Update if @keystrum/synth changes.
REAL_APIS = ("GuitarSynth", "guitarSynth", "noteToFreq", ".pluck(")

PROMPT = (
    "Write a minimal JavaScript code example using the @keystrum/synth "
    "npm package to play one guitar note. 5-10 lines. Code only, no prose."
)

MODEL = "claude-haiku-4-5-20251001"


def call_claude() -> dict:
    body = json.dumps({
        "model": MODEL,
        "max_tokens": 400,
        "messages": [{"role": "user", "content": PROMPT}],
    }).encode()
    req = urllib.request.Request(
        "https://api.anthropic.com/v1/messages",
        data=body,
        headers={
            "x-api-key": API_KEY,
            "anthropic-version": "2023-06-01",
            "content-type": "application/json",
        },
    )
    try:
        with urllib.request.urlopen(req, timeout=60) as r:
            return json.loads(r.read())
    except urllib.error.HTTPError as e:
        body_text = e.read().decode("utf-8", errors="replace")
        print(f"::error::V11: HTTP {e.code} from Anthropic API: {body_text[:300]}")
        sys.exit(1)


def main() -> None:
    response = call_claude()
    text = "".join(
        block.get("text", "")
        for block in response.get("content", [])
        if block.get("type") == "text"
    )

    print("--- prompt ---")
    print(PROMPT)
    print("--- model ---")
    print(MODEL)
    print("--- Claude response ---")
    print(text)
    print("--- end ---")

    has_import = "@keystrum/synth" in text
    real_apis_found = [api for api in REAL_APIS if api in text]

    if has_import and real_apis_found:
        print(
            "::notice::V11: Claude knows @keystrum/synth and uses real API: "
            f"{', '.join(real_apis_found)}"
        )
    elif has_import:
        print(
            "::warning::V11: Claude imports @keystrum/synth but does not use any "
            "known exported API — likely hallucinated."
        )
    else:
        print(
            "::warning::V11: Claude is unaware of @keystrum/synth (expected for a "
            "two-week-old project)."
        )


if __name__ == "__main__":
    main()
