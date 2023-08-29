import { QuestionMarkOutlined, SecurityOutlined } from '@mui/icons-material';

export const navItems = [
  {
    text: 'Módulo',
    icon: <QuestionMarkOutlined />,
    to: '#',
    permission: 'algo.view',
  },
  {
    text: 'Administración',
    icon: <SecurityOutlined />,
    to: '#',
    permission: 'admin.view',
  },
];
