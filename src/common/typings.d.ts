/* eslint-disable */
// 该文件由 OneAPI 自动生成，请勿手动修改！

declare namespace API {
  interface PageInfo {
    /** 
1 */
    current?: number;
    pageSize?: number;
    total?: number;
    list?: Array<Record<string, any>>;
  }

  interface PageInfo_UserInfo_ {
    /** 
1 */
    current?: number;
    pageSize?: number;
    total?: number;
    list?: Array<UserInfo>;
  }

  interface Result {
    success?: boolean;
    errorMessage?: string;
    data?: Record<string, any>;
  }

  interface Result_PageInfo_UserInfo__ {
    success?: boolean;
    errorMessage?: string;
    data?: PageInfo_UserInfo_;
  }

  interface Result_UserInfo_ {
    success?: boolean;
    errorMessage?: string;
    data?: UserInfo;
  }

  interface Result_string_ {
    success?: boolean;
    errorMessage?: string;
    data?: string;
  }

  type UserGenderEnum = 'MALE' | 'FEMALE';

  interface UserInfo {
    id?: string;
    name?: string;
    /** nick */
    nickName?: string;
    /** email */
    email?: string;
    gender?: UserGenderEnum;
    key: string;
  }

  interface UserInfoVO {
    name?: string;
    /** nick */
    nickName?: string;
    /** email */
    email?: string;
  }

  /** 性别Enum */
  type GenderEnum = 'MALE' | 'FEMALE';
  /** 级别Enum */
  type LevelEnum =
    | '1'
    | '2'
    | '3'
    | '4'
    | '5'
    | '6'
    | '7'
    | '8'
    | '9'
    | '10'
    | '11'
    | '12';

  /** 员工状态一览 记录类型 */
  interface EmployeeStatus {
    /** 员工ID */
    empId: string;
    /** 员工姓名 */
    empName: string;
    /** 性别 */
    gender?: GenderEnum;
    /** 年龄 */
    age?: number;
    /** 级别 */
    level?: LevelEnum;
    /** 入社时间 */
    joinDate?: string;
    /** 所属部门 */
    department?: string;
    /** 所属部门 */
    departmentName?: string;
    /** 活动中 */
    isActive?: boolean;
    /** key */
    key?: string;
  }

  type definitions_0 = null;
}
