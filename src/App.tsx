import React from "react";

import "./App.css";
import "antd/dist/antd.css";
import "./styles/layout.css";
import { Layout, Typography } from "antd";
import ApplicationContent from "./components/ApplicationContent";

const { Header, Content } = Layout;
const { Title } = Typography;

function App() {
  return (
    <Layout>
      <Header className="application-header">
        <Title level={2}>L O O P&nbsp;&nbsp;&nbsp;&nbsp;F A S H I O N</Title>
      </Header>
      <Content className="application-content">
        <ApplicationContent />
      </Content>
    </Layout>
  );
}

export default App;
