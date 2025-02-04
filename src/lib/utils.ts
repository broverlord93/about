import { type ClassValue, clsx } from "clsx";
import merge, { type ArrayMergeOptions } from "deepmerge";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const arrayMerge = <TTarget extends object, TSource extends object>(
  target: TTarget[],
  source: TSource[],
  options: ArrayMergeOptions,
): (TTarget | TSource | (TTarget & TSource))[] => {
  const destination = target.slice() as (
    | TTarget
    | TSource
    | (TTarget & TSource)
  )[];

  source.forEach((item, index) => {
    if (typeof destination[index] === "undefined") {
      destination[index] = options.cloneUnlessOtherwiseSpecified(
        item,
        options,
      ) as TSource;
    } else if (options.isMergeableObject(item)) {
      destination[index] = merge(target[index], item, options);
    } else if (target.indexOf(item as unknown as TTarget) === -1) {
      destination.push(item);
    }
  });

  return destination;
};

export const findMatch = (data: string[], find: string, defaultValue: string) =>
  data.findIndex((el) => el === find) ?? defaultValue;

export const objectsToArray = (object: Record<string, unknown>): string[] => {
  return Object.values(object).reduce((result: string[], value: unknown) => {
    if (typeof value === "object" && !Array.isArray(value) && value !== null) {
      return result.concat(objectsToArray(value as Record<string, unknown>));
    }

    if (typeof value === "string") {
      result.push(value);
    }

    return result;
  }, []);
};

export const objectsToString = (object: Record<string, unknown>) => {
  return objectsToArray(object).join(" ");
};
