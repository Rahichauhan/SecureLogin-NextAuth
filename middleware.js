export { default } from "next-auth/middleware"
//Here in this array we have to add that files that we have to protect
export const config={matcher:["/dashboard"]};