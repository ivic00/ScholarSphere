import React, { useEffect, useState } from "react";
import userService from "../../services/userService";
import { IUser } from "../../interfaces/IUser";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import FieldSelect from "../FieldSelect/FieldSelect";

function MyFields() {
  const [user, setUser] = useState<IUser>();
  const [expertise, setExpertise] = useState<string[]>([]);
  const [expString, setExpString] = useState<string>("");

  const handleSciFieldChange = (value: string) => {
    setExpString(value);
  };

  function arrayToString(fields: string[]): string {
    return fields.join(";") + ";";
  }

  useEffect(() => {
    userService.getUser().then((res) => setUser(res));
  }, []);

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

  /*useEffect(() => {
    try {
      if (expertise) {
        const newExpertise = arrayToString(expertise)
        console.log(newExpertise)
        userService.updateUserExpertise(newExpertise);
      }
    } catch (error) {}
  }, [expertise]);*/

  return (
    <div>
      <FieldSelect
        onSciFieldChange={handleSciFieldChange}
        existingFields={expertise}
      />
    </div>
  );
}

export default MyFields;
