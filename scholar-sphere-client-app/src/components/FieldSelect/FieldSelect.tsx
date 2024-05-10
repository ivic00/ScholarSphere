import { InputLabel, Select, MenuItem, SelectChangeEvent } from "@mui/material";
import React, { useEffect, useState } from "react";
import axiosInstance from "../../services/axiosInstance";

interface Props {
  onSciFieldChange: (value: string) => void;
}

const FieldSelect: React.FC<Props> = ({onSciFieldChange}) => {
  const [sciFieldExpertise, setSciFieldExpertise] = useState<string[]>([]);
  const [expertise, setExpertise] = useState<string>("");

  const [sciFieldGroups, setSciFieldGroups] = useState<string[]>([]);
  const [selectedFieldGroup, setSelectedFieldGroup] = useState<string>();

  const handleSciFieldGroupChange = (event: SelectChangeEvent) => {
    setSelectedFieldGroup(event.target.value);
  };

  const handleexpertiseChange = (event: SelectChangeEvent) => {
    setExpertise(event.target.value);
  };

  useEffect(() => {
    onSciFieldChange(expertise);
  }, [expertise])
  useEffect(() => {
    const fetchExpertise = async () => {
      try {
        const response = await axiosInstance.get(
          "api/ScientificFields/fields/" + selectedFieldGroup
        );
        setSciFieldExpertise(response.data);
      } catch (error) {
        console.error("Error fetching groups:", error);
      }
    };

    fetchExpertise();
  }, [selectedFieldGroup]);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await axiosInstance.get(
          "/api/ScientificFields/groups"
        );
        setSciFieldGroups(response.data);
      } catch (error) {
        console.error("Error fetching groups:", error);
      }
    };
    fetchGroups();
  }, []);
  return (
    <div>
      <InputLabel id="sciFieldGroupSelect">Scientific Field Group</InputLabel>
      <Select
        labelId="sciFieldGroupSelect"
        id="demo-simple-select-standard"
        value={selectedFieldGroup}
        onChange={handleSciFieldGroupChange}
        label="Scientific Field Group"
        fullWidth
      >
        {sciFieldGroups.map((group, index) => (
          <MenuItem key={index} value={group}>
            {group.replace(/([A-Z])/g, " $1").trim()}
          </MenuItem>
        ))}
      </Select>
      <br />
      <br />
      <InputLabel id="sciFieldSelect">Your Expertise</InputLabel>
      <Select
        labelId="sciFieldSelect"
        id="demo-simple-select-standard"
        value={expertise}
        onChange={handleexpertiseChange}
        label="Scientific Field Group"
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
}

export default FieldSelect;
