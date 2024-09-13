import React from 'react';
import {
  CombinedHeader,
} from '@/components/header/Header';

const LoginHeader: React.FC = () => {
  return (
    <CombinedHeader
      textProps={{
        text: '로그인',
      }}
    />
  );
};

export {
  LoginHeader,
}