import { getIdentity } from '@/common/storage/StorageUtil';

const Header = () => {
  const identity = getIdentity();
  const userName = identity && identity.userName ? identity.userName : '';

  return (
    <div>
      <h3> 当前用户 ： {userName}</h3>
    </div>
  );
};

export default Header;
