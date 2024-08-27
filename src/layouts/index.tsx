import { clearIdentity } from '@/common/storage/StorageUtil';
import { Modal } from 'antd';
import { Link, Outlet, history } from 'umi';

export default function Layout() {
  const handleLogout = () => {
    Modal.confirm({
      title: '确定要注销吗？',
      onOk() {
        // 删除你的认证信息
        clearIdentity();
        // 跳转到登录页面
        history.push('/login');
      },
      onCancel() {
        // 不做任何操作
      },
    });
  };
  return (
    <div>
      <ul>
        <li>
          <Link to="/">Home</Link> |{' '}
          <a href="#" onClick={handleLogout}>
            Logout
          </a>
        </li>
      </ul>
      <Outlet />
    </div>
  );
}
