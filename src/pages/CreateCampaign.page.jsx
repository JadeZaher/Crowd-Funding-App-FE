import React, { useState } from "react";

//dom
import { useNavigate } from "react-router-dom";
//context
import { useStateContext } from "../context";

//crypto
import { ethers } from "ethers";

//assets
import { money } from "../assets";
import { CustomButton, FormField } from "../components";
import { checkIfImage } from "../utils";

function CreateCampaign() {
  const navigate = useNavigate();
  const { createCampaign } = useStateContext();
  const [isLoading, setisLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    title: "",
    description: "",
    target: "",
    deadline: "",
    image: "",
  });

  const handleUseFieldFormChange = (fieldName, e) => {
    setForm({ ...form, [fieldName]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    checkIfImage(form.image, async (exists) => {
      if (exists) {
        setisLoading(true);
        await createCampaign({
          ...form,
          target: ethers.utils.parseUnits(form.target, 18),
        });
        setisLoading(false);
        navigate("/");
      } else {
        alert("Provide valid image URL");
        setForm({ ...form, image: " " });
      }
    });
  };

  return (
    <div className="sm:p=10 flex flex-col items-center justify-center rounded-[10px] bg-[#1c1c24] p-4">
      {isLoading && "Loader..."}
      <div className="flex items-center justify-center rounded-[10px] bg-[#3a3a43] p-[16px] sm:min-w-[380px]">
        <h1 className="font-epilogue font-bold leading-[38px] text-white sm:text-[25px]">
          Start a Campaign
        </h1>
      </div>
      <form
        onSubmit={handleSubmit}
        className="mt-[65px] flex w-full flex-col gap-[30px]"
      >
        <div className="flex flex-wrap gap-[40px]">
          <FormField
            labelName="Your Name *"
            placeholder="Jhon Doe"
            inputType="text"
            value={form.name}
            handleChange={(e) => handleUseFieldFormChange("name", e)}
          />
          <FormField
            labelName="Campaign Title *"
            placeholder="title"
            inputType="text"
            value={form.title}
            handleChange={(e) => handleUseFieldFormChange("title", e)}
          />
          <FormField
            labelName="Story *"
            placeholder="Add Your Story"
            isTextArea
            value={form.description}
            handleChange={(e) => handleUseFieldFormChange("description", e)}
          />
          <div className="rounded-10px flex h-[120px] w-full items-center justify-start rounded-[10px] bg-[#8c6dfd] p-4">
            <img
              src={money}
              alt="money"
              className="h-[40px] w-[40px] object-contain"
            />
            <h4 className=" ml-[20px] font-epilogue text-[25px] font-bold text-white">
              You will get 100% of the raised amount
            </h4>
          </div>
          <div className="flex flex-wrap gap-[40px]">
            <FormField
              labelName="Goal *"
              placeholder="Eth 0.50"
              inputType="text"
              value={form.target}
              handleChange={(e) => handleUseFieldFormChange("target", e)}
            />
            <FormField
              labelName="End Date *"
              placeholder="End Date"
              inputType="date"
              value={form.deadline}
              handleChange={(e) => handleUseFieldFormChange("deadline", e)}
            />
            <FormField
              labelName="Campaign Image *"
              placeholder="Place Image Url of your campaign"
              inputType="url"
              value={form.image}
              handleChange={(e) => handleUseFieldFormChange("image", e)}
            />
          </div>
          <div className="mt-[40px] flex items-center justify-center">
            <CustomButton
              btnType="submit"
              title="Submit new campaign"
              styles="bg-[#1dc071]"
            />
          </div>
        </div>
      </form>
    </div>
  );
}

export default CreateCampaign;
