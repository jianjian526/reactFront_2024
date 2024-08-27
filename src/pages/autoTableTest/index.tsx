import ProTable, { useTable } from '@ant-design/pro-table';
import { Button, Form, Modal, Steps } from 'antd';
import { useEffect, useState } from 'react';

const { Step } = Steps;

const EmployeeInfoQuery = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const result = await queryEmployeeInfo();
      setData(result);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const handleSearch = async (params) => {
    try {
      setLoading(true);
      const result = await queryEmployeeInfo(params);
      setData(result);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const handleReset = () => {
    // 重置逻辑
  };

  const handleOperation = () => {
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setCurrentStep(0);
    setModalVisible(false);
  };

  const handleModalNext = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handleModalPrev = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const renderOperationModal = () => {
    return (
      <Modal
        visible={modalVisible}
        onCancel={handleModalClose}
        footer={[
          <Button
            key="prev"
            onClick={handleModalPrev}
            disabled={currentStep === 0}
          >
            上一步
          </Button>,
          <Button
            key="next"
            type="primary"
            onClick={handleModalNext}
            disabled={currentStep === 1}
          >
            下一步
          </Button>,
        ]}
      >
        <Steps current={currentStep}>
          <Step title="步骤一" />
          <Step title="步骤二" />
        </Steps>
        {currentStep === 0 && (
          <Form>
            {/* 步骤一的表单内容 */}
            {/* 省略表单项 */}
          </Form>
        )}
        {currentStep === 1 && (
          <Form>
            {/* 步骤二的表单内容 */}
            {/* 省略表单项 */}
          </Form>
        )}
      </Modal>
    );
  };

  const columns = [
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '昵称',
      dataIndex: 'nickname',
      key: 'nickname',
    },
    {
      title: '性别',
      dataIndex: 'gender',
      key: 'gender',
    },
    {
      title: '操作',
      key: 'operation',
      render: (_, record) => (
        <Button type="link" onClick={handleOperation}>
          操作按钮
        </Button>
      ),
    },
  ];

  const { tableProps, search } = useTable({
    request: async (params) => {
      const result = await queryEmployeeInfo(params);
      return {
        data: result,
        success: true,
      };
    },
    columns,
    rowKey: 'id',
  });

  return (
    <div>
      <div>
        <Form>
          {/* 查询条件表单项 */}
          {/* 省略表单项 */}
          <Button type="primary" onClick={search.submit}>
            查询
          </Button>
          <Button onClick={search.reset}>重置</Button>
        </Form>
      </div>
      <div>
        <ProTable {...tableProps} loading={loading} />
      </div>
      {renderOperationModal()}
    </div>
  );
};

export default EmployeeInfoQuery;
