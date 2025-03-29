"use client"; // Add if using Next.js App Router
import React, { useState } from "react";
import { Layout, Menu, Input } from "antd";
import {
  DashboardOutlined,
  PictureOutlined,
  ReadOutlined,
  ShoppingOutlined,
  SmileOutlined,
  FlagOutlined,
  CalculatorOutlined,
  UserOutlined,
  CreditCardOutlined,
  SettingOutlined,
  SearchOutlined
} from "@ant-design/icons";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation"; // For Next.js routing

const { Sider } = Layout;

const Sidebar = () => {
  const [searchText, setSearchText] = useState('');
  const pathname = usePathname();
  const router = useRouter();

  // Group menu items
  const mainItems = [
    { key: "/", icon: <DashboardOutlined />, label: "Dashboard" },
    { key: "/gallery", icon: <PictureOutlined />, label: "Gallery" },
    { key: "/blogs", icon: <ReadOutlined />, label: "Blog" },
    { key: "/products", icon: <ShoppingOutlined />, label: "Product" },
    { key: "/services", icon: <SmileOutlined />, label: "Service" },
    { key: "/banner", icon: <FlagOutlined />, label: "Banner" },
    { key: "/calculator", icon: <CalculatorOutlined />, label: "Calculator" },
  ];

  const settingItems = [
    { key: "/profile", icon: <UserOutlined />, label: "Profile" },
    { key: "/billing", icon: <CreditCardOutlined />, label: "Booking" },
    { key: "/settings", icon: <SettingOutlined />, label: "Settings" },
  ];

  // Filter menu items based on search text
  const filteredMainItems = mainItems.filter(item => 
    item.label.toLowerCase().includes(searchText.toLowerCase())
  );

  const filteredSettingItems = settingItems.filter(item => 
    item.label.toLowerCase().includes(searchText.toLowerCase())
  );

  // Handle menu item click
  const handleMenuClick = ({ key }: { key: string }) => {
    router.push(key);
  };

  // Get the currently selected key based on the current path
  const getSelectedKey = () => {
    return pathname || "/";
  };

  return (
    <Sider
      width={250}
      className="h-full"
      theme="light"
      style={{ 
        background: 'var(--background-color, #f5f5f5)', 
        height: '100%', 
        overflow: 'auto' 
      }}
    >
      {/* Search Input */}
      <div style={{ padding: '16px 12px 8px' }}>
        <Input
          placeholder="Search menu..."
          prefix={<SearchOutlined />}
          onChange={(e) => setSearchText(e.target.value)}
          style={{ borderRadius: '6px' }}
          value={searchText}
        />
      </div>

      {/* Main Menu */}
      <Menu
        mode="inline"
        selectedKeys={[getSelectedKey()]}
        onClick={handleMenuClick}
        style={{ 
          borderRight: 0,
          background: 'transparent' 
        }}
      >
        <Menu.ItemGroup key="main" title="Main Menu">
          {filteredMainItems.length > 0 ? (
            filteredMainItems.map(item => (
              <Menu.Item key={item.key} icon={item.icon}>
                {item.label}
              </Menu.Item>
            ))
          ) : (
            <Menu.Item disabled>No results found</Menu.Item>
          )}
        </Menu.ItemGroup>

        <Menu.Divider style={{ margin: '8px 0' }} />

        {/* Settings Menu */}
        <Menu.ItemGroup key="settings" title="Settings">
          {filteredSettingItems.length > 0 ? (
            filteredSettingItems.map(item => (
              <Menu.Item key={item.key} icon={item.icon}>
                {item.label}
              </Menu.Item>
            ))
          ) : (
            searchText && <Menu.Item disabled>No results found</Menu.Item>
          )}
        </Menu.ItemGroup>
      </Menu>
    </Sider>
  );
};

export default Sidebar;