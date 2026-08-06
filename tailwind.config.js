/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: { extend: { colors: { ink: 'var(--color-text)', paper: 'var(--color-background)', line: 'var(--color-border)', taupe: 'var(--color-accent)' }, fontFamily: { display: 'var(--font-display)', body: 'var(--font-body)' } } },
  plugins: []
};
