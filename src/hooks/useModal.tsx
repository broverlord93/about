import { createContext, type FC, type ReactNode, useContext } from "react";
import { type ImmerReducer, useImmerReducer } from "use-immer";

interface ModalContent {
  readonly body?: ReactNode;
  readonly footer?: ReactNode;
  readonly header?: ReactNode;
}

interface ModalControl {
  readonly isOpen: boolean;
}

interface ModalProps {
  readonly centered: boolean;
  readonly fullscreen: boolean;
  readonly size: "sm" | "lg";
}

interface ModalHeaderProps {}

interface ModalBodyProps {}

interface ModalFooterProps {}

interface ModalOptions {
  readonly body?: Partial<ModalBodyProps>;
  readonly footer?: Partial<ModalFooterProps>;
  readonly header?: Partial<ModalHeaderProps>;
  readonly modal?: Partial<ModalProps>;
}

interface Modal extends ModalContent, ModalControl {
  readonly props: ModalOptions;
}

const ACTION_TYPES = {
  ON_TOGGLE: "ON_TOGGLE",
  SET_BODY: "SET_BODY",
  SET_FOOTER: "SET_FOOTER",
  SET_HEADER: "SET_HEADER",
  SET_MODAL: "SET_MODAL",
  SET_MODAL_BODY_PROPS: "SET_MODAL_BODY_PROPS",
  SET_MODAL_FOOTER_PROPS: "SET_MODAL_FOOTER_PROPS",
  SET_MODAL_HEADER_PROPS: "SET_MODAL_HEADER_PROPS",
  SET_MODAL_PROPS: "SET_MODAL_PROPS",
} as const;

type ActionTypes = typeof ACTION_TYPES;
type ActionTypeKey = keyof ActionTypes;
type ActionType = ActionTypes[ActionTypeKey];

type ActionPayload = Partial<ModalContent> & Partial<ModalOptions>;

interface Action {
  type: ActionType;
  payload?: ActionPayload;
}

type StateUpdateFn = (arg: ActionPayload) => void;

interface ModalContextProps extends Modal {
  readonly onToggle: () => void;
  readonly setBody: StateUpdateFn;
  readonly setFooter: StateUpdateFn;
  readonly setHeader: StateUpdateFn;
  readonly setModal: StateUpdateFn;
  readonly setModalProps: StateUpdateFn;
}

const ModalContext = createContext<ModalContextProps | undefined>(undefined);

const reducer: ImmerReducer<Modal, Action> = (draft, action) => {
  const { payload, type } = action;

  switch (type) {
    case ACTION_TYPES.ON_TOGGLE:
      draft.isOpen = !draft.isOpen;
      break;
    case ACTION_TYPES.SET_BODY:
      if (payload?.body) {
        draft.body = payload.body;
      }
      break;
    case ACTION_TYPES.SET_FOOTER:
      if (payload?.footer) {
        draft.footer = payload.footer;
      }
      break;
    case ACTION_TYPES.SET_HEADER:
      if (payload?.header) {
        draft.header = payload.header;
      }
      break;
    case ACTION_TYPES.SET_MODAL:
      if (payload) {
        draft = { ...draft, ...payload };
      }
      break;
    case ACTION_TYPES.SET_MODAL_PROPS:
      if (payload) {
        draft.props = { ...draft.props, ...payload };
      }
      break;
    default:
      throw new Error(`Unrecognized action type ${type} in useModal`);
  }

  return draft;
};

const initialState: Pick<Modal, "props"> = {
  props: {
    body: {},
    footer: {},
    header: {},
    modal: {
      centered: false,
      fullscreen: false,
      size: "sm",
    },
  },
};

export const ModalProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useImmerReducer(reducer, {
    isOpen: false,
    ...initialState,
  });

  const onToggle = () => dispatch({ type: ACTION_TYPES.ON_TOGGLE });

  const setBody: StateUpdateFn = (body) =>
    dispatch({ type: ACTION_TYPES.SET_BODY, payload: body });

  const setFooter: StateUpdateFn = (footer: ActionPayload) =>
    dispatch({ type: ACTION_TYPES.SET_FOOTER, payload: footer });

  const setHeader: StateUpdateFn = (header: ActionPayload) =>
    dispatch({ type: ACTION_TYPES.SET_HEADER, payload: header });

  const setModal: StateUpdateFn = ({ body, footer, header }: ActionPayload) => {
    dispatch({
      type: ACTION_TYPES.SET_MODAL,
      payload: { body, footer, header },
    });
  };

  const setModalProps: StateUpdateFn = ({ modal }: ActionPayload) => {
    dispatch({
      type: ACTION_TYPES.SET_MODAL_PROPS,
      payload: { modal },
    });
  };

  return (
    <ModalContext.Provider
      value={{
        ...state,
        onToggle,
        setBody,
        setFooter,
        setHeader,
        setModal,
        setModalProps,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error(`useModal must be used within a ModalProvider`);
  }

  return context;
};
