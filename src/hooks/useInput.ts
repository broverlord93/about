import {
  type ChangeEvent,
  type FocusEvent,
  type KeyboardEvent,
  useEffect,
} from "react";
import { type ImmerReducer, useImmerReducer } from "use-immer";

type Value = number | string;

type Actions<M extends object> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        readonly type: Key;
      }
    : {
        readonly type: Key;
        readonly payload: M[Key];
      };
};

const ACTION_TYPES = {
  BLUR: "BLUR",
  CHANGE: "CHANGE",
  DEBOUNCE: "DEBOUNCE",
  EDITING: "EDITING",
  FOCUS: "FOCUS",
  KEY_UP: "KEY_UP",
  RESET: "RESET",
  SET_VALUE: "SET_VALUE",
} as const;

interface ActionPayload {
  [ACTION_TYPES.BLUR]: undefined;
  [ACTION_TYPES.CHANGE]: {
    value: Value;
  };
  [ACTION_TYPES.DEBOUNCE]: undefined;
  [ACTION_TYPES.FOCUS]: undefined;
  [ACTION_TYPES.EDITING]: undefined;
  [ACTION_TYPES.KEY_UP]: undefined;
  [ACTION_TYPES.RESET]: undefined;
  [ACTION_TYPES.SET_VALUE]: {
    value: Value;
  };
}

type Action = Actions<ActionPayload>[keyof ActionPayload];

const KEYS = ["enter", "escape", "tab"] as const;

type Key = (typeof KEYS)[number];

type KeyUp = Record<Key, boolean>;

interface UseInputProps {
  readonly debounce?: number;
  readonly initialValue: Value;
  readonly keyUp?: Partial<KeyUp>;
  readonly validate?: (value: number | string) => boolean;
}

interface InputState {
  readonly debouncedValue: Value;
  readonly isEditing: boolean;
  readonly isTouched: boolean;
  readonly keyUp: KeyUp;
  readonly start: number | undefined;
  readonly value: Value;
}

const useInput = ({
  debounce,
  initialValue = "",
  keyUp,
  validate,
}: UseInputProps) => {
  const init = (initialValue: Value): InputState => ({
    debouncedValue: initialValue || "",
    isTouched: false,
    isEditing: !initialValue,
    keyUp: { enter: true, escape: true, tab: true, ...keyUp },
    start: undefined,
    value: initialValue || "",
  });

  const reducer: ImmerReducer<InputState, Action> = (draft, action) => {
    const { type } = action;

    switch (type) {
      case ACTION_TYPES.BLUR:
      case ACTION_TYPES.KEY_UP:
        draft.isEditing = false;
        draft.isTouched = true;
        break;
      case ACTION_TYPES.CHANGE:
      case ACTION_TYPES.SET_VALUE:
        draft.value = action.payload.value;
        break;
      case ACTION_TYPES.DEBOUNCE:
        draft.debouncedValue = draft.value;
        break;
      case ACTION_TYPES.EDITING:
        draft.isEditing = true;
        draft.isTouched = false;
        break;
      case ACTION_TYPES.FOCUS:
        draft.isTouched = false;
        break;
      case ACTION_TYPES.RESET:
        draft = init(initialValue);
        break;
      default:
        throw new Error(`Unhandled action type: ${type}`);
    }
  };

  const [state, dispatch] = useImmerReducer(reducer, initialValue, init);

  useEffect(() => {
    const timeout = setTimeout(() => {
      dispatch({ type: ACTION_TYPES.DEBOUNCE });
    }, debounce ?? 0);

    return () => clearTimeout(timeout);
  }, [debounce, state.value]);

  const isValid = validate ? validate(state.value) : null;

  const hasError = !isValid && state.isTouched;

  const debounceAction = (action: Action) =>
    setTimeout(() => {
      dispatch(action);
    }, debounce ?? 0);

  const onBlurHandler = () => debounceAction({ type: ACTION_TYPES.BLUR });

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    const payload = { value: event.target.value };

    dispatch({ type: ACTION_TYPES.CHANGE, payload });
  };

  const onFocusHandler = (event: FocusEvent) => {
    event.preventDefault();

    dispatch({
      type: ACTION_TYPES.FOCUS,
    });
  };

  const onKeyUpHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (
      event.code === "Enter" ||
      event.code === "Escape" ||
      event.code === "Tab"
    ) {
      debounceAction({ type: ACTION_TYPES.KEY_UP });
    }
  };

  const onResetHandler = () => dispatch({ type: "RESET" });

  const onToggleEditingHandler = () =>
    debounceAction({ type: ACTION_TYPES.EDITING });

  const setValue = (value: Value) =>
    dispatch({ type: ACTION_TYPES.SET_VALUE, payload: { value } });

  return {
    hasError,
    isValid,
    onBlurHandler,
    onChangeHandler,
    onFocusHandler,
    onKeyUpHandler,
    onResetHandler,
    onToggleEditingHandler,
    setValue,
    ...state,
  };
};

export default useInput;
