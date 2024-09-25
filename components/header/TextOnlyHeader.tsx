import React from 'react';
import {
  CombinedHeader,
} from '@/components/header/Header';
import Fonts from '@/constants/Fonts';
import getSize from '@/scripts/getSize';
import Colors from '@/constants/Colors';

const LoginHeader: React.FC = () => {
  return (
    <CombinedHeader
      textProps={{
        text: '로그인',
      }}
    />
  );
};

export const HomeHeader: React.FC = () => {
  return (
    <CombinedHeader
      textProps={{
        text: 'RUNWITH',
        fontFamily: Fonts.hanson,
        fontSize: getSize(20),
        fontColor: Colors.main,
      }}
    />
  )
}
export {
  LoginHeader,
}