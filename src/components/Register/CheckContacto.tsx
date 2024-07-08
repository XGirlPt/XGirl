import React from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { pink } from "@mui/material/colors";
import { FaWhatsapp } from "react-icons/fa";
import { FaSms } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";

const CheckContacto: React.FC = () => {
  return (
    <div>
      <FormGroup className="flex flex-1 text-xs bg-[#1E2427] items-center gap-5">
        <div className="flex justify-between gap-16">
          <div className="flex items-start">
            <FormControlLabel
              control={
                <Checkbox
                  size="small"
                  sx={{ color: "white", "&.Mui-checked": { color: pink[300] } }}
                />
              }
              label={
                <div className="flex items-center">
                  <MdOutlineEmail className="text-white mr-1" />
                  Email
                </div>
              }
              className="text-white mr-4"
            />
          </div>

          <div>
            <FormControlLabel
              control={
                <Checkbox
                  size="small"
                  sx={{ color: "gray", "&.Mui-checked": { color: pink[300] } }}
                />
              }
              label={
                <div className="flex items-center text-gray-300">
                  <FaWhatsapp className="text-gray-300 mr-1" />
                  WhatsApp
                </div>
              }
              className="text-white mr-4"
            />
          </div>

          <div>
            <FormControlLabel
              control={
                <Checkbox
                  size="small"
                  sx={{ color: "gray", "&.Mui-checked": { color: pink[300] } }}
                />
              }
              label={
                <div className="flex items-center text-gray-300">
                  <FaSms className="text-gray-300 mr-1" />
                  SMS
                </div>
              }
              className="text-white mr-4"
            />
          </div>
        </div>
      </FormGroup>
    </div>
  );
};

export default CheckContacto;
