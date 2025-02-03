import { type ClassValue, clsx } from "clsx";
import merge from "deepmerge";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const combineMerge = (target, source, options) => {
  const destination = target.slice();

  source.forEach((item, index) => {
    if (typeof destination[index] === "undefined") {
      destination[index] = options.cloneUnlessOtherwiseSpecified(item, options);
    } else if (options.isMergeableObject(item)) {
      destination[index] = merge(target[index], item, options);
    } else if (target.indexOf(item) === -1) {
      destination.push(item);
    }
  });

  return destination;
};

export const findMatch = (data, find, defaultValue) => {
  const founded = data.findIndex((el) => el === find);

  return founded >= 0 ? find : defaultValue;
};

export const objectsToArray = (object) => {
  let result = [];

  Object.values(object).forEach((value) => {
    if (typeof value === "string") {
      result = [...result, value];
    } else if (
      typeof value === "object" &&
      !Array.isArray(value) &&
      value !== null
    ) {
      result = [...result, ...objectsToArray(value)];
    }

    return undefined;
  });

  return result;
};

export const objectsToString = (object: object) => {
  return objectsToArray(object).join(" ");
};
