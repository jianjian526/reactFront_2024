export const DEFAULT_NAME = 'Umi Max';

/** 下拉列表选项：性别 */
export const selectEnum_gender = {
  MALE: { text: '男', status: 'Default' },
  FEMALE: { text: '女', status: 'Default' },
};

/** 下拉列表选项：级别 */
const levelArray = [
  { key: '', text: '全部', status: 'Default' },
  { key: '1', text: '1级', status: 'Default' },
  { key: '2', text: '2级', status: 'Default' },
  { key: '3', text: '3级', status: 'Default' },
  { key: '4', text: '4级', status: 'Default' },
  { key: '5', text: '5级', status: 'Default' },
  { key: '6', text: '6级', status: 'Default' },
  { key: '7', text: '7级', status: 'Default' },
  { key: '8', text: '8级', status: 'Default' },
  { key: '9', text: '9级', status: 'Default' },
  { key: '10', text: '10级', status: 'Default' },
  { key: '11', text: '11级', status: 'Default' },
  { key: '12', text: '12级', status: 'Default' },
];
export const selectEnum_level = levelArray.reduce(
  (result: any, { key, text, status }) => {
    result[key] = { text, status };
    return result;
  },
  {},
);

/** 下拉列表选项：部门 */
const departmentArray = [
  { key: 'all', text: '全部', status: 'Default' },
  { key: 'DPT01', text: 'TIS一部', status: 'Default' },
  { key: 'DPT02', text: 'TIS二部', status: 'Default' },
];
export const selectEnum_Department = departmentArray.reduce(
  (result: any, { key, text, status }) => {
    result[key] = { text, status };
    return result;
  },
  {},
);
