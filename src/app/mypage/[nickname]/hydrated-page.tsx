'use client';

import CertificationList from './components/CertificationList';
import QuestionList from './components/QuestionList';
import SelectToggle from './components/SelectToggle';
import UserInfo from './components/UserInfo';
import { useState } from 'react';

const Mypage = ({ nickname }: { nickname: string }) => {
  const [selected, setSelected] = useState<'certification' | 'question'>('certification');

  return (
    <div>
      <UserInfo />
      <SelectToggle selected={selected} setSelected={setSelected} />
      {selected === 'certification' && <CertificationList />}
      {selected === 'question' && <QuestionList />}
    </div>
  );
};

export default Mypage;
