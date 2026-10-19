"""Live-preview regression: python3 tests/custom_cursor_regression.py."""
import unittest
from playwright.sync_api import sync_playwright


class CursorTargetRegression(unittest.TestCase):
    def test_non_element_targets_do_not_throw_and_element_hover_still_works(self):
        with sync_playwright() as playwright:
            browser = playwright.chromium.launch(headless=True)
            page = browser.new_page(viewport={"width": 1280, "height": 1800})
            errors = []
            page.on("pageerror", lambda error: errors.append(str(error)))
            page.goto("http://localhost:8080", wait_until="domcontentloaded")
            page.locator(".prompt-grid-column").first.wait_for()
            page.wait_for_timeout(1200)
            page.evaluate("""() => {
                for (const type of ['mouseenter', 'mouseleave']) {
                    document.dispatchEvent(new MouseEvent(type));
                    window.dispatchEvent(new MouseEvent(type));
                    const text = document.querySelector('.card-title-text').firstChild;
                    if (text) text.dispatchEvent(new MouseEvent(type));
                }
                document.querySelector('.prompt-grid-column button svg')
                    .dispatchEvent(new MouseEvent('mouseenter'));
            }""")
            page.wait_for_timeout(100)
            self.assertTrue(page.locator("#custom-cursor").evaluate("e => e.classList.contains('hover')"))
            page.evaluate("""() => document.querySelector('.prompt-grid-column button svg')
                .dispatchEvent(new MouseEvent('mouseleave'))""")
            page.wait_for_timeout(100)
            self.assertFalse(page.locator("#custom-cursor").evaluate("e => e.classList.contains('hover')"))
            self.assertEqual(errors, [])
            browser.close()


if __name__ == "__main__":
    unittest.main()