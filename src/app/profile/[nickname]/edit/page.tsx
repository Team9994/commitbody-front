'use client';
import React from 'react';

export default function EditPage() {
  return (
    <div className="bg-gray-900 text-white p-5 font-sans min-h-screen flex flex-col mb-10">
      <header className="flex items-center justify-between mb-6">
        <button className="text-2xl"></button>
        <h1 className="text-lg font-normal">프로필 수정</h1>
        <span className="bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"></span>
      </header>
      <form className="space-y-6 flex-grow overflow-y-auto">
        <div className="space-y-2">
          <label htmlFor="nickname" className="text-sm text-gray-400">
            닉네임
          </label>
          <input
            type="text"
            id="nickname"
            placeholder="기존닉네임"
            className="w-full bg-gray-800 p-3 rounded-md"
          />
        </div>
        <div className="space-y-2">
          <span className="text-sm text-gray-400">성별</span>
          <div className="flex space-x-3">
            <button className="flex-1 bg-blue-600 p-3 rounded-md">남자</button>
            <button className="flex-1 bg-gray-800 p-3 rounded-md">여자</button>
          </div>
        </div>
        <div className="space-y-2">
          <span className="text-sm text-gray-400">생년월일</span>
          <div className="flex space-x-2">
            <input
              type="number"
              placeholder="1999"
              className="flex-1 bg-gray-800 p-2 rounded-md text-sm w-1/3"
            />
            <input
              type="number"
              placeholder="12"
              className=" bg-gray-800 w-1/3 p-2 rounded-md text-sm"
            />
            <input
              type="number"
              placeholder="10"
              className=" bg-gray-800 w-1/3 p-2 rounded-md text-sm"
            />
          </div>
        </div>
        {['키(cm)', '몸무게(kg)', '골격근량(kg)', '체지방률(%)'].map((label, index) => (
          <div key={index} className="space-y-2">
            <label htmlFor={label} className="text-sm text-gray-400">
              {label}
            </label>
            <input
              type="number"
              id={label}
              placeholder={index === 0 ? '170' : index === 1 ? '60' : '20'}
              className="w-full bg-gray-800 p-3 rounded-md"
            />
          </div>
        ))}
      </form>
    </div>
  );
}
