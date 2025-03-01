import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";

const GroupRadioButtons = ({ setting, handleChange, formData }: any) => {

  return (
    <div className="radioGrp">
      <FormControl>
        <RadioGroup
          aria-labelledby="demo-controlled-radio-buttons-group"
          name={setting?.name}
          value={formData?.[setting?.name] ? formData?.[setting?.name] : false}
          onChange={handleChange}
        >
          {setting.options?.map((option: any, index: any) => (
            <FormControlLabel
              value={option?.value}
              control={<Radio />}
              label={option?.label}
              key={index}
            />
          ))}
        </RadioGroup>
      </FormControl>
    </div>
  );
};
export default GroupRadioButtons;
