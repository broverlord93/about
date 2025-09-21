// import { useArgs } from "@storybook/preview-api";
// import DatePicker from "./DatePicker";
//
// const meta = {
//   component: DatePicker,
// };
//
// export default meta;
//
// const baseArgs = {
//   value: new Date(),
//   isDisabled: false,
// };
//
// const render = (args) => {
//   const [, setArgs] = useArgs();
//
//   const handleChange = (value) => {
//     setArgs({ value: value });
//   };
//
//   return <DatePicker {...args} onChange={handleChange} />;
// };
//
// export const Default = {
//   render,
//   args: baseArgs,
// };
//
// export const WithoutYear = {
//   render,
//   args: {
//     ...baseArgs,
//     isExcludeYear: true,
//   },
// };
