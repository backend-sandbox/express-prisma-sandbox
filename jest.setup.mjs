import { execSync } from "child_process";

export default () => {
  execSync("npm run db:reset -- --force --skip-generate", { stdio: "inherit" });
};
