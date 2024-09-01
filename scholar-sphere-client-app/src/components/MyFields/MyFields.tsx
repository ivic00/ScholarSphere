import React, { useEffect, useState } from "react";
import userService from "../../services/userService";
import { IUser } from "../../interfaces/IUser";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import FieldSelect from "../FieldSelect/FieldSelect";
import { useAuthContext } from "../../contexts/AuthContext";
import Typography from '@mui/material/Typography'
import { Box } from "@mui/material";

function MyFields() {
  const { user } = useAuthContext();
  const [expertise, setExpertise] = useState<string[]>([]);
  const [expString, setExpString] = useState<string>("");

  const handleSciFieldChange = (value: string) => {
    setExpString(value);
  };

  function arrayToString(fields: string[]): string {
    return fields.join(";") + ";";
  }

  useEffect(() => {
    if (user) {
      const filteredExpertise = user.expertise
        .split(";")
        .filter((str) => str.trim() !== "");

      setExpertise(filteredExpertise);
    }
  }, [user]);

  useEffect(() => {
    if (expString != "") userService.updateUserExpertise(expString);
  }, [expString]);
  return (
    <Box sx={{width: '100%', alignContent: 'center'}}>
      <Typography variant="h5" color="initial">Edit your expertise fields</Typography>
      <br /><br />
      <FieldSelect
        onSciFieldChange={handleSciFieldChange}
        existingFields={expertise}
      />
    </Box>
  );
}

export default MyFields;
