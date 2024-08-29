import { InputLabel, Select, MenuItem, SelectChangeEvent } from "@mui/material";
import React, { useEffect, useState } from "react";
import axiosInstance from "../../services/axiosInstance";

interface Props {
  onSciFieldChange: (value: string) => void;
  existingFields?: string[];
}

const FieldSelect: React.FC<Props> = ({ onSciFieldChange, existingFields }) => {
  const [sciFieldExpertise, setSciFieldExpertise] = useState<string[]>([]);
  const [selectedExpertise, setSelectedExpertise] = useState<string[]>([]);

  const handleExpertiseChange = (event: SelectChangeEvent<string[]>) => {
    setSelectedExpertise(event.target.value as string[]);
  };

  useEffect(() => {
    const fieldsString = arrayToString(selectedExpertise);
    onSciFieldChange(fieldsString);
  }, [selectedExpertise]);

  useEffect(() => {
    const fetchExpertise = async () => {
      try {
        const response = await axiosInstance.get("api/ScientificFields/fields");
        setSciFieldExpertise(response.data);
      } catch (error) {
        console.error("Error fetching groups:", error);
      }
    };

    fetchExpertise();
  }, []);

  useEffect(() => {
    if (existingFields != null) {
      setSelectedExpertise(existingFields);
      console.log("yaaaaaa", existingFields);
    }
  }, [existingFields]);

  function arrayToString(fields: string[]): string {
    return fields.join(";") + ";";
  }

  function stringToArray(fields: string): string[] {
    return fields.split(";");
  }

  return (
    <div>
      <InputLabel id="sciFieldSelect">Fields</InputLabel>
      <Select
        labelId="sciFieldSelect"
        id="demo-simple-select-standard"
        value={selectedExpertise}
        onChange={handleExpertiseChange}
        label="Scientific Field Group"
        variant="standard"
        multiple
        multiline
        fullWidth
      >
        {sciFieldExpertise.map((group, index) => (
          <MenuItem key={index} value={group}>
            {group.replace(/([A-Z])/g, " $1").trim()}
          </MenuItem>
        ))}
      </Select>
    </div>
  );
};

export default FieldSelect;
