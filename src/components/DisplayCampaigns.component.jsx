import React from 'react';

import { useNavigate } from 'react-router-dom';
import { loader } from '../assets';

import { FundCard } from '.';

const DisplayCampaigns = ({ title, isLoading, campaigns }) => {
  const navigate = useNavigate();

  const handleNavigate = (campaign) => {
    navigate(`/campaign-details/${campaign.id}`, { state: campaign });
  };

  return (
    <div>
      <h1 className='text-left font-epilogue text-[18px] font-semibold text-white'>
        {title} ({campaigns?.length})
      </h1>
      <div className='mt-[20px] flex flex-wrap gap-[26px]'>
        {isLoading && (
          <img
            src={loader}
            alt='loader'
            className='h-[100px] w-[100px] object-contain'
          />
        )}

        {!isLoading && campaigns.length === 0 && (
          <p className='font-epilogue text-[14px] font-semibold leading-[30px] text-[#818183]'>
            You have not created any campaigns yet
          </p>
        )}
        {!isLoading &&
          campaigns.length > 0 &&
          campaigns.map((campaign, i) => (
            <FundCard
              key={i}
              {...campaign}
              handleClick={() => handleNavigate(campaign)}
            />
          ))}
      </div>
    </div>
  );
};

export default DisplayCampaigns;
