// 有効期限 （ディフォルト：一日  1000 * 3600 * 24 ms）
// nullの場合、期限なし
const defaultExpires = 1000 * 3600 * 24;

// 認証情報のキー
const identityKey = 'identity_key';

/**
 * Storage関連機能
 */
const _storage = {
  // データを保存する
  save(key, obj, expires = null) {
    // 有効期限を確定する
    let expiresTime = expires ? expires : defaultExpires;
    if (expiresTime !== null) {
      expiresTime = new Date().getTime() + expiresTime;
    }

    // 保存データを作成する
    const inputData = { data: obj, expiresTime: expiresTime };

    // 保存する  (使用localStorage，不使用sessionStorage)
    localStorage.setItem(key, JSON.stringify(inputData));
  },

  // データを取得する
  load(key) {
    let result = null;

    const storage = localStorage.getItem(key);

    // 有効期限について処理
    const nowTime = new Date().getTime();

    if (storage) {
      const obj = JSON.parse(storage);

      if (nowTime < obj.expiresTime) {
        result = obj.data;
      } else {
        localStorage.removeItem(key);
      }
    }

    // データ取得できない場合、処理を行う
    if (result == null) {
      getValueForStorage(key);
    }
    return result;
  },

  // 指定キー関連するデータを削除する
  remove(key) {
    localStorage.removeItem(key);
  },
};

// 認証情報を保存する
const saveIdentity = (obj) => {
  return _storage.save(identityKey, obj);
};

// 認証情報を取得する
const getIdentity = () => {
  return _storage.load(identityKey);
};

// 認証情報をクリアする
const clearIdentity = () => {
  return _storage.remove(identityKey);
};

const save = (key, obj) => {
  return _storage.save(key, obj);
};

const load = (key) => {
  return _storage.load(key);
};

const remove = (key) => {
  return _storage.remove(key);
};

const getValueForStorage = (key) => {
  // if (key === 'identityInfo') {
  //     window.location.href = 'https://react.docschina.org/';
  // }
};

export {
  clearIdentity,
  getIdentity,
  load,
  remove,
  save,
  saveIdentity,
  _storage as storage,
};
