import { createBrowserRouter } from "react-router-dom";
import TextEditor from "./components/TextEditor";
import Root from "./components/Root";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
  },
  { path: "documents/:id", element: <TextEditor /> },
]);

export default router;
