import React, { useContext, createContext } from 'react';

import {
  useAddress,
  useContract,
  useMetamask,
  useContractWrite,
} from '@thirdweb-dev/react';
import { ethers } from 'ethers';

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  //select contract
  const { contract } = useContract(
    '0xA73a017FfabbC8b1bF3965e94a679228982Ba039'
  );
  //make your contract writable
  const { mutateAsync: createCampaign } = useContractWrite(
    contract,
    'createCampaign'
  );

  //accesses the address of connected wallets
  const address = useAddress();
  //allows you to connect the metamask wallet
  const connect = useMetamask();

  // function to publish a campaign
  const publishCampaign = async (form) => {
    try {
      const data = await createCampaign([
        address,
        form.title,
        form.description,
        form.target,
        new Date(form.deadline).getTime(),
        form.image,
      ]);
      console.log('Contract call success', data);
    } catch (error) {
      console.log('Contract call failed', error);
    }
  };

  //get campaigns
  const getCampaigns = async () => {
    const campaigns = await contract.call('getCampaigns');

    const parsedCampaings = campaigns.map((campaign, i) => ({
      owner: campaign.owner,
      title: campaign.title,
      description: campaign.description,
      target: ethers.utils.formatEther(campaign.target.toString()),
      deadline: campaign.deadline.toNumber(),
      amountCollected: ethers.utils.formatEther(
        campaign.amountCollected.toString()
      ),
      image: campaign.image,
      pId: i,
    }));
    return parsedCampaings;
  };

  //get user campaigns
  const getUserCampaigns = async () => {
    const campaigns = await getCampaigns();

    const filteredCampaigns = campaigns.filter(
      (campaign) => campaign.owner === address
    );

    return filteredCampaigns;
  };

  //donate
  const donate = async (pId, amount) => {
    const data = await contract.call('donateToCampaign', pId, {
      value: ethers.utils.parseEther(amount),
    });

    return data;
  };

  //get donors

  const getDonations = async (pId) => {
    const donations = await contract.call('getDonators', pId);
    const numberOfDonations = donations[0].length;
    const parsedDonations = [];

    for (let i = 0; i < numberOfDonations; i++) {
      parsedDonations.push({
        donator: donations[0][i],
        donations: ethers.utils.formatEther(donations[1][i].toString()),
      });
    }
    return parsedDonations;
  };

  return (
    <StateContext.Provider
      value={{
        address,
        contract,
        connect,
        createCampaign: publishCampaign,
        getCampaigns,
        getUserCampaigns,
        donate,
        getDonations,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
