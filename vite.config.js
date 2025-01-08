import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
	plugins: [react()],
	base: "/", // Changed to root path
	build: {
		rollupOptions: {
			output: {
				assetFileNames: "assets/[name].[hash][extname]",
				chunkFileNames: "assets/[name].[hash].js",
				entryFileNames: "assets/[name].[hash].js",
			},
		},
		assetsInlineLimit: 0,
		cssCodeSplit: false,
		sourcemap: true,
	},
	server: {
		headers: {
			"Access-Control-Allow-Origin": "*",
			"Access-Control-Allow-Methods": "GET",
			"Access-Control-Allow-Headers": "Content-Type",
		},
	},
});
