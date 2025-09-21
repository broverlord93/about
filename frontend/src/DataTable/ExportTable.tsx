import { Spinner } from "@components/Spinner";
import { Button } from "@components/ui/button";
import { STATUSES } from "@src/constants";
import { Download } from "lucide-react";
import { ComponentProps, FC, PropsWithChildren } from "react";
import useExcelDownload, { type Sheet } from "./useExcelDownload";

interface ExportTableProps extends ComponentProps<"button"> {
  fileName: string;
  onError?: () => void;
  onLoading?: () => void;
  sheets: Sheet[];
}

const { ERROR, LOADING } = STATUSES;

const ExportTable: FC<PropsWithChildren<ExportTableProps>> = ({
  children,
  disabled,
  fileName,
  onError = () => {},
  onLoading = () => {},
  sheets,
  ...props
}) => {
  const { download, status } = useExcelDownload({ fileName, sheets });

  if (status === ERROR) {
    onError();
  }

  if (status === LOADING) {
    onLoading();
  }

  return (
    <Button
      disabled={disabled || status === LOADING}
      onClick={download}
      {...props}
    >
      {status === LOADING ? <Spinner /> : (children ?? <Download />)}
    </Button>
  );
};

export default ExportTable;
