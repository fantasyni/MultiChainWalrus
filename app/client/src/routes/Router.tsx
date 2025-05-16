import { createHashRouter } from "react-router-dom";
import FileUpload from "../components/FileUploader";
import { History } from "../components/History";
import App from "../App";

export const router = createHashRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "upload",
        element: <FileUpload />,
      },
      {
        path: "history",
        element: <History />,
      },
    ],
  },
]);
