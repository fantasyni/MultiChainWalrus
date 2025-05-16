import { ClockCircleOutlined, LoadingOutlined, CheckCircleOutlined, CloseCircleOutlined, CloudUploadOutlined, DeleteOutlined, CopyOutlined } from '@ant-design/icons';
import { Upload, Card, Steps, Tag, List, Button, Modal, message, Space, InputNumber, Row, Col, Tooltip } from 'antd';
import { writeContract, readContract, getAccount } from '@wagmi/core'
import { Container, Link } from '@radix-ui/themes';
import { get_contract_address } from '../utils';
import { ApiEndpoint } from '../constants';
import { config } from '../config/wagmi';
import { abi } from '../abi/multichain';
import { useState } from 'react';
import axios from 'axios';

const { Step } = Steps;

const HorizontalTimelineUploader = () => {
  const [files, setFiles] = useState<any[]>([]);
  const [epoch, setEpoch] = useState(1);

  const processSteps = [
    { title: 'CalcCost', key: 'CalcCost' },
    { title: 'SignTranscation', key: 'SignTx' },
    { title: 'UploadWalrus', key: 'UploadWalrus' },
  ];

  const customRequest = async ({ file, onProgress, onSuccess, onError }) => {
    const fileId = "";
    const newFile = {
      uid: file.uid,
      fileId,
      name: file.name,
      size: file.size,
      epoch,
      timeline: processSteps.map(step => ({
        ...step,
        status: 'pending',
        timestamp: null,
        description: null
      })),
      currentStep: 0,
      status: 'pending',
      lastUpdate: Date.now(),
      raw: file
    };

    setFiles(prev => [...prev, newFile]);

    try {
      let costData = await onCalcCost(file, onProgress);
      console.log(costData);

      let hash = await onSendTx(file, costData.cost, costData.data);
      let fileId = await onCheckVaa(file, hash);
      await updateFileId(file.uid, 2, fileId)

      const isLastStep = true;
      if (isLastStep) {
        setFiles(prev => prev.map(f =>
          f.uid === file.uid ? {
            ...f,
            status: 'completed',
            lastUpdate: Date.now()
          } : f
        ));
      }
    } catch (error: any) {
      onError(error);
      console.error(error)
      await updateFileStatus(
        file.uid,
        files.find(f => f.uid === file.uid)?.currentStep || 0,
        'error',
        error.message
      );
    }
  };

  async function onCheckVaa(file: any, hash: string) {
    await updateFileStatus(file.uid, 2, 'processing');

    let response = await axios.post(`${ApiEndpoint}/v1/walrus/checkvaa`, {
      txid: hash,
    });

    let sleep = function (time) {
      return new Promise((resolve) => {
        setTimeout(resolve, time)
      })
    }

    let data = response.data;

    console.log(data);

    if (data.code == 0) {
      await updateFileStatus(file.uid, 2, 'finish');
      return data.data;
    } else {
      await sleep(5000);
      return await onCheckVaa(file, hash);
    }
  }

  async function onSendTx(file: any, cost: bigint, upload_file: string) {
    const account = getAccount(config)
    let chainId = account.chainId;

    if (!chainId) {
      console.error("invalid account")
      return;
    }

    await updateFileStatus(file.uid, 1, 'processing');

    let contract_address = get_contract_address(chainId) as any;

    const payCost = await readContract(config, {
      abi,
      address: contract_address,
      functionName: 'calculatePaymentETH',
      args: [cost],
    })

    let hash = await writeContract(config, {
      abi,
      address: contract_address,
      functionName: 'sendUploadWalrus',
      args: [cost, upload_file],
      value: payCost
    })

    console.log("hash: %s", hash)
    await updateFileStatus(file.uid, 1, 'finish');

    return hash;
  }

  async function onCalcCost(file: any, onProgress: any) {
    await updateFileStatus(file.uid, 0, 'processing');
    const formData = new FormData();
    formData.append('file', file);

    const account = getAccount(config)
    let address = account.address;

    let response = await axios.post(`${ApiEndpoint}/v1/walrus/upload?epoch=${epoch}&account=${address}`, formData, {
      onUploadProgress: progress => {
        onProgress({ percent: Math.round((progress.loaded / progress.total) * 100) }, file);
      },
      headers: { 'Content-Type': 'multipart/form-data' }
    });

    await updateFileStatus(file.uid, 0, 'finish');

    return response.data;
  }

  async function updateFileStatus(uid, stepIndex, status, error = null) {
    setFiles(prev => prev.map(file => {
      if (file.uid === uid) {
        const timeline = [...file.timeline];
        timeline[stepIndex] = {
          ...timeline[stepIndex],
          status,
          timestamp: new Date().toLocaleTimeString(),
          description: error
        };

        return {
          ...file,
          timeline,
          currentStep: status === 'processing' ? stepIndex : file.currentStep,
          status: status === 'error' ? 'error' : file.status,
          lastUpdate: Date.now()
        };
      }
      return file;
    }));
  };

  async function updateFileId(uid, stepIndex, fileId, error = null) {
    setFiles(prev => prev.map(file => {
      if (file.uid === uid) {
        const timeline = [...file.timeline];

        file.fileId = fileId;
        file.fileIdUrl = `https://walruscan.com/testnet/blob/${fileId}`;

        return {
          ...file,
          timeline,
          currentStep: status === 'processing' ? stepIndex : file.currentStep,
          status: status === 'error' ? 'error' : file.status,
          lastUpdate: Date.now()
        };
      }
      return file;
    }));
  };

  return (
    <Container size="4" pt="5" px="4">
      <Card
        title={
          <Row justify="space-between" align="middle">
            <Col>WalrusFileUploader</Col>
            <Col>
              <Space>
                <span style={{ fontSize: 14 }}>Epoch:</span>
                <InputNumber
                  min={1}
                  max={99}
                  value={epoch}
                  style={{ width: 70 }}
                  onChange={value => setEpoch(value || 1)}
                />
              </Space>
            </Col>
          </Row>
        }
        style={{ maxWidth: '100%', margin: 20 }}
        actions={[
          <Button
            danger
            onClick={() => setFiles([])}
            disabled={files.length === 0}
          >
            Clear All
          </Button>
        ]}
      >
        <Upload.Dragger
          customRequest={customRequest as any}
          showUploadList={false}
          multiple
          disabled={files.some(f => ['processing', 'pending'].includes(f.status))}
        >
          <p className="ant-upload-drag-icon">
            <CloudUploadOutlined style={{ fontSize: 48 }} />
          </p>
          <p className="ant-upload-text">Click Or Drag File Upload</p>
          <p className="ant-upload-hint">Epoch: {epoch}</p>
        </Upload.Dragger>

        <List
          style={{ marginTop: 24 }}
          dataSource={files}
          renderItem={file => (
            <List.Item style={{ padding: '16px 0' }}>
              <div style={{ width: '100%' }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: 16
                }}>
                  <Space>
                    <Tag color="#2db7f5">{file.name}</Tag>
                    <Tag color="purple">Epoch: {file.epoch}</Tag>
                    <span style={{ color: '#666' }}>
                      {formatSize(file.size)}
                    </span>
                  </Space>
                  <Button
                    danger
                    size="small"
                    icon={<DeleteOutlined />}
                    onClick={() => Modal.confirm({
                      title: 'Confirm Delete？',
                      onOk: () => {
                        setFiles(prev => prev.filter(f => f.uid !== file.uid));
                        message.success('Have Deleted');
                      }
                    })}
                  />
                </div>

                {/* 横向步骤条 */}
                <div style={{
                  overflowX: 'auto',
                  padding: '8px 0',
                  marginBottom: 8
                }}>
                  <Steps
                    current={file.timeline.findIndex(s => s.status === 'processing')}
                    status={file.status === 'error' ? 'error' : 'process'}
                    size="small"
                    direction="horizontal"
                    style={{
                      width: `${processSteps.length * 180}px`,
                      minWidth: '100%',
                      padding: '0 16px'
                    }}
                  >
                    {file.timeline.map((step) => (
                      <Step
                        key={step.key}
                        title={
                          <div style={{
                            fontWeight: 500,
                            color: getStatusColor(step.status),
                            margin: '0 8px'
                          }}>
                            {step.title}
                          </div>
                        }
                        description={
                          <div style={{
                            fontSize: 12,
                            color: '#666',
                            height: 36,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}>
                            {step.status === 'processing' && 'Processing...'}
                            {step.status === 'completed' && step.timestamp}
                            {step.status === 'error' && (
                              <Tooltip title={step.description}>
                                <span style={{ color: '#ff4d4f' }}>Error</span>
                              </Tooltip>
                            )}
                          </div>
                        }
                        icon={
                          <div style={{
                            position: 'relative',
                            top: 2,
                            fontSize: 18,
                            color: getStatusColor(step.status)
                          }}>
                            {getStepsIcon(step.status)}
                          </div>
                        }
                      />
                    ))}
                  </Steps>
                </div>

                {/* 完成状态显示完整ID */}
                {file.status === 'completed' && (
                  <div style={{
                    fontSize: 12,
                    color: '#666',
                    padding: '8px 12px',
                    backgroundColor: '#fafafa',
                    borderRadius: 4,
                    marginTop: 8
                  }}>
                    Walrus BlobId:
                    <Link ml="3" target="_blank" href={file.fileIdUrl}>{file.fileId}</Link>
                    <Button
                      type="link"
                      size="small"
                      icon={<CopyOutlined />}
                      onClick={() => {
                        navigator.clipboard.writeText(file.fileId);
                        message.success('Copied BlobId');
                      }}
                    />
                  </div>
                )}

                {/* 错误状态提示 */}
                {file.status === 'error' && (
                  <div style={{
                    color: '#ff4d4f',
                    fontSize: 12,
                    paddingLeft: 8
                  }}>
                    Processed failed: {file.timeline[file.currentStep]?.description}
                  </div>
                )}
              </div>
            </List.Item>
          )}
        />
      </Card>
    </Container>
  );
};

// 状态颜色映射
const getStatusColor = (status) => {
  const colors = {
    pending: '#999',
    processing: '#1890ff',
    completed: '#52c41a',
    error: '#ff4d4f'
  };
  return colors[status] || colors.pending;
};

// 步骤图标
const getStepsIcon = (status) => {
  const iconMap = {
    pending: <ClockCircleOutlined />,
    processing: <LoadingOutlined spin />,
    completed: <CheckCircleOutlined />,
    error: <CloseCircleOutlined />
  };
  return iconMap[status] || iconMap.pending;
};

// 文件大小格式化
const formatSize = bytes => {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export default HorizontalTimelineUploader;