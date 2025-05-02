import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

import App from "./App.tsx";

/** ANONYMOUS page view counter. Records nothing except the time the page was viewed.
 *  No IP, cookies, etc are tracked EVER. */
const ANONYMOUS_PAGE_VIEW_COUNTER = "https://bp2s45dvpfxxy5vex74td2vm6i0sdpuw.lambda-url.us-east-1.on.aws/";
axios.post(ANONYMOUS_PAGE_VIEW_COUNTER);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
