import React from 'react';
import { Menu, Avatar } from 'antd';
import { Link } from 'react-router-dom';
import {
  CloudOutlined,
  BookOutlined,
  RobotOutlined,
  PlayCircleOutlined,
  PictureOutlined,
  SafetyOutlined,
  FileOutlined,
  ShoppingOutlined,
  MailOutlined,
  MobileOutlined,
  TeamOutlined,
  AppstoreOutlined
} from '@ant-design/icons';
import '../styles/CategoryMenu.css';
import { LOGO_URLS, CATEGORY_URLS } from '../data/imageUrls';

// Categories data
const categories = [
  {
    key: 'cloud-storage',
    icon: <CloudOutlined />,
    label: 'Cloud Storage',
    image: CATEGORY_URLS.CLOUD_STORAGE,
    children: [
      { key: 'google-one', label: 'Google One', image: LOGO_URLS.GOOGLE_ONE },
      { key: 'google-drive', label: 'Google Drive', image: LOGO_URLS.GOOGLE_DRIVE },
      { key: 'onedrive', label: 'OneDrive', image: LOGO_URLS.ONEDRIVE },
      { key: 'dropbox', label: 'Dropbox', image: LOGO_URLS.DROPBOX }
    ]
  },
  {
    key: 'learning',
    icon: <BookOutlined />,
    label: 'Learning',
    image: CATEGORY_URLS.LEARNING,
    children: [
      { key: 'coursera', label: 'Coursera', image: LOGO_URLS.MICROSOFT_365 },
      { key: 'udemy', label: 'Udemy', image: LOGO_URLS.MICROSOFT_365 },
      { key: 'skillshare', label: 'Skillshare', image: LOGO_URLS.MICROSOFT_365 },
      { key: 'masterclass', label: 'MasterClass', image: LOGO_URLS.MICROSOFT_365 }
    ]
  },
  {
    key: 'ai-tools',
    icon: <RobotOutlined />,
    label: 'AI Tools',
    image: CATEGORY_URLS.AI_TOOLS,
    children: [
      { key: 'chatgpt', label: 'ChatGPT', image: LOGO_URLS.CHATGPT },
      { key: 'midjourney', label: 'Midjourney', image: LOGO_URLS.MIDJOURNEY },
      { key: 'gemini', label: 'Gemini', image: LOGO_URLS.GEMINI },
      { key: 'claude', label: 'Claude', image: LOGO_URLS.CLAUDE }
    ]
  },
  {
    key: 'entertainment',
    icon: <PlayCircleOutlined />,
    label: 'Entertainment',
    image: CATEGORY_URLS.ENTERTAINMENT,
    children: [
      { key: 'netflix', label: 'Netflix', image: LOGO_URLS.NETFLIX },
      { key: 'spotify', label: 'Spotify', image: LOGO_URLS.SPOTIFY },
      { key: 'youtube', label: 'YouTube Premium', image: LOGO_URLS.YOUTUBE }
    ]
  },
  {
    key: 'graphics',
    icon: <PictureOutlined />,
    label: 'Graphics',
    image: CATEGORY_URLS.GRAPHICS,
    children: [
      { key: 'adobe', label: 'Adobe Creative Cloud', image: LOGO_URLS.ADOBE },
      { key: 'canva', label: 'Canva Pro', image: LOGO_URLS.CANVA },
      { key: 'figma', label: 'Figma', image: LOGO_URLS.FIGMA }
    ]
  },
  {
    key: 'security',
    icon: <SafetyOutlined />,
    label: 'Security',
    children: [
      { key: 'vpn', label: 'VPN Services' },
      { key: 'antivirus', label: 'Antivirus' },
      { key: 'password-managers', label: 'Password Managers' }
    ]
  },
  {
    key: 'office',
    icon: <FileOutlined />,
    label: 'Office',
    children: [
      { key: 'microsoft-365', label: 'Microsoft 365' },
      { key: 'google-workspace', label: 'Google Workspace' }
    ]
  },
  {
    key: 'shopping',
    icon: <ShoppingOutlined />,
    label: 'Shopping',
    children: [
      { key: 'amazon-prime', label: 'Amazon Prime' },
      { key: 'aliexpress', label: 'AliExpress' }
    ]
  },
  {
    key: 'communication',
    icon: <MailOutlined />,
    label: 'Communication',
    children: [
      { key: 'zoom', label: 'Zoom' },
      { key: 'slack', label: 'Slack' },
      { key: 'discord', label: 'Discord Nitro' }
    ]
  },
  {
    key: 'mobile',
    icon: <MobileOutlined />,
    label: 'Mobile',
    children: [
      { key: 'apple-arcade', label: 'Apple Arcade' },
      { key: 'google-play-pass', label: 'Google Play Pass' }
    ]
  },
  {
    key: 'social',
    icon: <TeamOutlined />,
    label: 'Social Media',
    children: [
      { key: 'tiktok', label: 'TikTok' },
      { key: 'twitter', label: 'Twitter Blue' },
      { key: 'linkedin', label: 'LinkedIn Premium' }
    ]
  },
  {
    key: 'more',
    icon: <AppstoreOutlined />,
    label: 'More Categories',
    children: [
      { key: 'gaming', label: 'Gaming' },
      { key: 'development', label: 'Development Tools' },
      { key: 'business', label: 'Business' }
    ]
  }
];

// Function to generate menu items with routing
const getMenuItem = (item) => {
  if (item.children) {
    return {
      key: item.key,
      icon: item.image ? <Avatar src={item.image} size={24} /> : item.icon,
      label: item.label,
      children: item.children.map(child => ({
        key: `${item.key}-${child.key}`,
        label: (
          <Link to={`/category/${item.key}/${child.key}`} className="menu-item-with-image">
            {child.image && <Avatar src={child.image} size={20} style={{ marginRight: 8 }} />}
            {child.label}
          </Link>
        )
      }))
    };
  }
  return {
    key: item.key,
    icon: item.image ? <Avatar src={item.image} size={24} /> : item.icon,
    label: <Link to={`/category/${item.key}`}>{item.label}</Link>
  };
};

const CategoryMenu = () => {
  return (
    <div className="category-menu">
      <Menu
        className="category-menu-list"
        mode="vertical"
        items={categories.map(category => getMenuItem(category))}
      />
    </div>
  );
};

export default CategoryMenu; 