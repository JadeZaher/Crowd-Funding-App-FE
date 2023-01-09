import React from 'react';

const CountBox = ({ title, value }) => {
  return (
    <div className='flex w-[150px] flex-col items-center'>
      <h4 className='w-full truncate rounded-t-[10px] bg-[#1c1c24] p-3 text-center font-epilogue text-[30px] font-bold text-white'>
        {value}
      </h4>
      <p className='w-full rounded-b-[10px] bg-[#28282e] px-3 py-2 text-center font-epilogue text-[16px] font-normal text-[#808191]'>
        {title}
      </p>
    </div>
  );
};

export default CountBox;
