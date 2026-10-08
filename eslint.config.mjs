import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';

/**
 * CLAUDE.md §4.6 requires logical Tailwind utilities so the Urdu (RTL) layout mirrors
 * automatically, and §3.2 forbids raw hex. Both are enforced here against string
 * literals inside `className` (which also covers literals passed through `cn()`).
 * The floating WhatsApp button is the one sanctioned exception (§3.10) and carries a
 * local eslint-disable.
 */
const physicalDirectionUtilities =
  "JSXAttribute[name.name='className'] Literal[value=/(?:^|[\\s:])-?(?:(?:ml|mr|pl|pr|left|right|border-l|border-r|rounded-l|rounded-r|rounded-tl|rounded-tr|rounded-bl|rounded-br)-|text-left|text-right|float-left|float-right)/]";

const rawHexInClassName =
  "JSXAttribute[name.name='className'] Literal[value=/#[0-9a-fA-F]{3,8}\\b/]";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      'no-console': 'error',
      'no-restricted-syntax': [
        'error',
        {
          selector: physicalDirectionUtilities,
          message:
            'Use logical Tailwind utilities (ms/me, ps/pe, start/end, text-start/text-end, border-s/border-e, rounded-s/rounded-e). See CLAUDE.md §4.6.',
        },
        {
          selector: rawHexInClassName,
          message:
            'Use a palette token from @theme instead of a raw hex value. See CLAUDE.md §3.2.',
        },
      ],
    },
  },
  globalIgnores(['.next/**', 'out/**', 'build/**', 'next-env.d.ts']),
]);

export default eslintConfig;
