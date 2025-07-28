import app from "./index";
import { env } from "./config";


app.listen(env.PORT, () => {
  console.log(`Server started on port ${env.PORT}`);
});