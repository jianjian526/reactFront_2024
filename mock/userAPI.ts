const users = [
  { id: 0, name: 'Umi', nickName: 'U', gender: 'MALE', key: '1' },
  { id: 1, name: 'Fish', nickName: 'B', gender: 'FEMALE', key: '2' },
];

export default {
  'GET /api/v1/queryUserList': (req: any, res: any) => {
    res.json({
      success: true,
      data: { list: users },
      errorCode: 0,
    });
  },
  'PUT /api/v1/user/': (req: any, res: any) => {
    res.json({
      success: true,
      errorCode: 0,
    });
  },
};
