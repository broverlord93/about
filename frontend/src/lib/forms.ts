export interface SelectOption<T extends object> {
  label: string;
  value: T[keyof T];
  isFixed?: boolean;
}

export const generateSelectOptions = <T extends object>({
  fixedValues,
  original,
  labelName = "name" as keyof T,
  valueName = "id" as keyof T,
}: {
  fixedValues?: Array<T[keyof T]>;
  original: Array<T>;
  labelName?: keyof T;
  valueName?: keyof T;
}): SelectOption<T>[] =>
  original
    .map((it) => ({
      label: it[labelName] as string,
      value: it[valueName],
      ...(fixedValues ? { isFixed: fixedValues.includes(it[valueName]) } : {}),
    }))
    .filter((it) => it?.label && it?.value)
    .sort((a, b) => a.label.localeCompare(b.label));
