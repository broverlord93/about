# Exporting

The `useExcelDownload` hook can support grouped columns.

A `ColumnDef` must have the `meta.isExportable` propery set to `true`.
If a given column is a child of another column (as in the case with grouped columns), *
*_then the parent column must have this property set to `true` as well_**.
If the parent column does not have `isExportable = true`, then it _and its children_ will not be included in the export.