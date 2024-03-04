/**
 * Fix "global is not defined" error when running Vite dev server:
 * - https://github.com/vitejs/vite/issues/2778
 * - https://stackoverflow.com/a/73208485
 */
window.global ||= window;
