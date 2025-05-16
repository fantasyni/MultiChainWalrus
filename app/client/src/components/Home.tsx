// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Layout, Menu, Card, Row, Col, Button, Typography, Steps, Form, Input } from 'antd';
import {
  SwapOutlined,
  DatabaseOutlined,
  CodeOutlined,
  FileTextOutlined,
  ContactsOutlined,
} from '@ant-design/icons';

const { Header, Content, Footer } = Layout;
const { Title, Paragraph } = Typography;
const { Step } = Steps;

// 页面组件
const Home = () => (
  <div style={{ padding: '24px' }}>
    <Row gutter={[24, 24]}>
      <Col span={24}>
        <Title level={2}>多链存储一站式解决方案</Title>
        <Paragraph>
          通过跨链Swap和智能路由技术，实现无缝的多链资产交互和存储解决方案
        </Paragraph>
      </Col>
      
      <Col xs={24} md={8}>
        <Card title="跨链交换" bordered={false}>
          <p>支持 10+ 公链资产互换</p>
          <p>USDC 作为跨链结算中间件</p>
          <Button type="primary">立即体验</Button>
        </Card>
      </Col>

      <Col xs={24} md={8}>
        <Card title="多链存储" bordered={false}>
          <p>分布式存储解决方案</p>
          <p>自动 Gas 赞助机制</p>
          <Button type="primary">开始存储</Button>
        </Card>
      </Col>

      <Col xs={24} md={8}>
        <Card title="手续费模型" bordered={false}>
          <p>开发者分成比例 0.3%</p>
          <p>多级返佣体系</p>
          <Button type="primary">查看文档</Button>
        </Card>
      </Col>
    </Row>
  </div>
);

const Solutions = () => (
  <div style={{ padding: '24px' }}>
    <Steps current={1} direction="vertical">
      <Step 
        title="资产跨链" 
        description="通过 Wormhole 协议进行跨链消息传递" 
      />
      <Step
        title="流动性池"
        description="在源链和目标链建立 USDC 流动性池"
      />
      <Step
        title="Gas 赞助"
        description="使用 Cetus SDK 自动处理 Gas 费转换"
      />
    </Steps>
  </div>
);

const Developer = () => {
  const [form] = Form.useForm();

  return (
    <div style={{ padding: '24px', maxWidth: '800px', margin: '0 auto' }}>
      <Title level={3}>开发者集成</Title>
      <Form form={form} layout="vertical">
        <Form.Item label="API Key" name="apiKey">
          <Input placeholder="输入你的API密钥" />
        </Form.Item>
        <Form.Item>
          <Button 
            type="primary" 
            onClick={() => console.log(form.getFieldsValue())}
          >
            生成签名
          </Button>
        </Form.Item>
      </Form>
      
      <Title level={4}>SDK 快速接入</Title>
      <pre>
        {`npm install @walrus-sdk/core\n`}
        {`import { createSwap } from '@walrus-sdk/core'`}
      </pre>
    </div>
  );
};

// 主布局
const AppLayout = () => {
  const items = [
    { label: <Link to="/">首页</Link>, key: 'home', icon: <SwapOutlined /> },
    { label: <Link to="/solutions">解决方案</Link>, key: 'solutions', icon: <DatabaseOutlined /> },
    { label: <Link to="/dev">开发者</Link>, key: 'dev', icon: <CodeOutlined /> },
    { label: '博客', key: 'blog', icon: <FileTextOutlined /> },
    { label: '联系', key: 'contact', icon: <ContactsOutlined /> },
  ];

  return (
    <Layout>
      <Header>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img 
            src="/logo.png" 
            alt="logo" 
            style={{ height: 32, marginRight: 24 }}
          />
          <Menu
            theme="dark"
            mode="horizontal"
            items={items}
            style={{ flex: 1 }}
          />
        </div>
      </Header>

      <Content style={{ padding: '0 50px' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/solutions" element={<Solutions />} />
          <Route path="/dev" element={<Developer />} />
        </Routes>
      </Content>

      <Footer style={{ textAlign: 'center' }}>
        Walrus ©2023 支持 Sui/Solana 等多链生态
      </Footer>
    </Layout>
  );
};

// 路由配置
const App = () => (
  <Router>
    <AppLayout />
  </Router>
);

export default App;