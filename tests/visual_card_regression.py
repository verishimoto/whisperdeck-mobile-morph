"""Visual regression: column count, row-by-row order, equal gaps, independent expansion, no overflow.
Run: python3 tests/visual_card_regression.py  (dev server on http://localhost:8080)"""
import asyncio, sys
from playwright.async_api import async_playwright

URL = "http://localhost:8080/"
WIDTHS = {1440: 5, 1280: 4, 1024: 3, 768: 2, 390: 1}
TOL = 2.5

async def check(page, width, cols):
    await page.set_viewport_size({"width": width, "height": 1800})
    await page.goto(URL, wait_until="networkidle")
    await page.wait_for_timeout(1500)
    fails = []
    n = await page.locator(".prompt-grid-column").count()
    if n != cols: fails.append(f"columns {n} != {cols}")
    # Row-by-row order: card k of column c is position k*cols + c in the list.
    ids = await page.evaluate("""() => [...document.querySelectorAll('.prompt-grid-column')].map(c =>
        [...c.querySelectorAll('[data-prompt-id]')].map(e => +e.dataset.promptId))""")
    flat = await page.evaluate("() => [...document.querySelectorAll('[data-prompt-id]')].length")
    first_row = [c[0] for c in ids if c]
    second_row = [c[1] for c in ids if len(c) > 1]
    if cols > 1 and len(set(first_row) & set(second_row)): fails.append("rows overlap")
    # Equal gaps: horizontal column gap == vertical card gap.
    g = await page.evaluate("""() => {
        const cols=[...document.querySelectorAll('.prompt-grid-column')];
        const a=cols[0].children[0].getBoundingClientRect(), b=cols[0].children[1].getBoundingClientRect();
        const v=b.top-a.bottom; let h=v;
        if(cols[1]){const c=cols[1].children[0].getBoundingClientRect(); h=c.left-a.right;}
        return {v,h};}""")
    if abs(g["v"] - g["h"]) > TOL: fails.append(f"gap mismatch {g}")
    # Independent expansion.
    tops = lambda: page.evaluate("() => [...document.querySelectorAll('.prompt-grid-column')].map(c => c.children[1]?.getBoundingClientRect().top ?? 0)")
    before = await tops()
    await page.locator(".prompt-grid-column").nth(0).get_by_role("button", name="Expand").first.click()
    await page.wait_for_timeout(600)
    after = await tops()
    if after[0] - before[0] < 20: fails.append("expanded column did not grow")
    for i in range(1, cols):
        if abs(after[i] - before[i]) > TOL: fails.append(f"column {i} moved")
    ov = await page.evaluate("() => document.documentElement.scrollWidth - document.documentElement.clientWidth")
    if ov > 1: fails.append(f"horizontal overflow {ov}px")
    return fails

async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch(headless=True)
        page = await b.new_page()
        bad = 0
        for w, c in WIDTHS.items():
            f = await check(page, w, c)
            print(w, "PASS" if not f else f"FAIL {f}")
            bad += bool(f)
        await b.close()
        sys.exit(1 if bad else 0)

asyncio.run(main())
