import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// Add structuredClone polyfill
if (typeof globalThis.structuredClone !== "function") {
	globalThis.structuredClone = function (obj) {
		return JSON.parse(JSON.stringify(obj));
	};
}

// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],
	assetsInclude: ['**/*.html'],
});
