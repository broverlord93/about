// import { Button, Spinner } from "reactstrap";
// import useExcelDownload, { type Sheet } from "./useExcelDownload";
// import { ERROR, LOADING } from "@src/constants";
// import Icon from "@mdi/react";
// import { mdiDownload } from "@mdi/js";
// import type { ButtonDisplay } from "@types";
//
// interface BaseProps {
//   block?: boolean;
//   disabled?: boolean;
//   fileName: string;
//   onError?: () => void;
//   onLoading?: () => void;
//   outline?: boolean;
//   sheets: Sheet[];
// }
//
// type ExportTableProps = BaseProps & ButtonDisplay;
//
// const ExportTable = ({
//   block = false,
//   buttonDisplay = "text",
//   buttonIconSize = 1,
//   disabled = false,
//   fileName,
//   onError = () => {},
//   onLoading = () => {},
//   outline = false,
//   sheets,
//   variant = "primary",
// }: ExportTableProps) => {
//   const { download, status } = useExcelDownload({ fileName, sheets });
//
//   const getButtonLabel = ({ text }: { text: string }) => {
//     return buttonDisplay === "text" ? (
//       text
//     ) : (
//       <span>
//         <Icon path={mdiDownload} size={buttonIconSize} />
//         {buttonDisplay === "text-and-icon" && `${text}`}
//       </span>
//     );
//   };
//
//   if (status === ERROR) {
//     onError();
//   }
//
//   if (status === LOADING) {
//     onLoading();
//   }
//
//   return (
//     <Button
//       block={block}
//       color={variant}
//       disabled={disabled || status === LOADING}
//       onClick={download}
//       outline={outline}
//     >
//       {status === LOADING ? <Spinner /> : getButtonLabel({ text: "Download" })}
//     </Button>
//   );
// };
//
// export default ExportTable;
