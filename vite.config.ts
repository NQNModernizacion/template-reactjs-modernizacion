import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

const dic = {
    development: "apps/template",
    replica: "",
    production: "",
}

export default defineConfig(({ command, mode }) => {
    console.log(mode, command)
    return {
        base: dic[mode],
        plugins: [react()],
        define: {
            __DEV__: JSON.stringify(mode !== "production"),
        },
    }
})
