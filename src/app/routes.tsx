import { createBrowserRouter } from "react-router";
import { SonaNow } from "./components/SonaNow";
import { TokenTruth } from "./components/TokenTruth";
import { Receipt } from "./components/Receipt";
import { Rules } from "./components/Rules";
import { FixIt } from "./components/FixIt";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: SonaNow,
  },
  {
    path: "/token/:tokenId",
    Component: TokenTruth,
  },
  {
    path: "/receipt",
    Component: Receipt,
  },
  {
    path: "/rules",
    Component: Rules,
  },
  {
    path: "/fix-it",
    Component: FixIt,
  },
]);
